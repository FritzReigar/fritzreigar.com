import { expect, type Page, test } from '@playwright/test';
import { pathFor, type RouteKey } from '../src/data/routes';
import type { Lang } from '../src/data/ui';

// La fuente lenta (tanda 2.11, plan/spec-visual.md § 8, «Riesgo conocido»). Los carteles van en
// Archivo al 62 % de ancho; si la reserva que se pinta mientras llega la woff2 es más ancha o más
// alta, al cambiar de letra un título se parte distinto y empuja lo de abajo. Con system-ui de
// reserva la portada y el 404 saltaban 0,15 a 1440; con «Archivo Fallback» (la Arial ajustada a
// cada ancho de Archivo, global.css, de scripts/metricas-fuente.py) no pasan de 0,007. Se mide
// como el estudio (tanda 6.11): la woff2 retrasada 800 ms, a 412, 1024 y 1440, en cada tipo de
// página y en los dos idiomas, sumando las entradas de `layout-shift` hasta que la fuente está
// puesta. Tope de la spec: CLS ≤ 0,01. Si falla, dice qué se movió.

const PAGE_KEYS: RouteKey[] = [
  'home',
  'work-missphone',
  'work-artemisa',
  'project-snugtone',
  'project-snugport',
  'not-found',
];
const LANGS: Lang[] = ['es', 'en'];
const VIEWPORTS = [
  { width: 412, height: 915 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
];
const FONT_DELAY_MS = 800;
const MAX_CLS = 0.01;

interface Shift {
  value: number;
  sources: string[];
}

// El observador se registra antes que nada de la página (addInitScript va por el protocolo del
// navegador, no por un <script>: la CSP no lo ve) y guarda cada salto con lo que movió.
const observeShifts = (page: Page) =>
  page.addInitScript(() => {
    const shifts: { value: number; sources: string[] }[] = [];
    (window as unknown as { __shifts: typeof shifts }).__shifts = shifts;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as (PerformanceEntry & {
        value: number;
        hadRecentInput: boolean;
        sources?: { node?: Node | null }[];
      })[]) {
        if (entry.hadRecentInput) continue;
        shifts.push({
          value: entry.value,
          sources: (entry.sources ?? []).map(({ node }) => {
            if (!(node instanceof Element)) return node?.nodeName ?? '?';
            const classes = [...node.classList].filter((name) => !name.startsWith('astro-'));
            const text = (node.textContent ?? '').trim().slice(0, 30);
            return `${node.tagName.toLowerCase()}${classes.map((name) => `.${name}`).join('')} «${text}»`;
          }),
        });
      }
    }).observe({ type: 'layout-shift', buffered: true });
  });

test.describe('la fuente lenta', () => {
  // Los anchos los pone cada prueba: basta con un proyecto.
  test.skip(({ isMobile }) => isMobile, 'los tres anchos van en el proyecto de escritorio');

  for (const key of PAGE_KEYS) {
    for (const lang of LANGS) {
      for (const viewport of VIEWPORTS) {
        const path = pathFor(key, lang);
        test(`${path} a ${viewport.width}: CLS ≤ ${MAX_CLS} con la woff2 a ${FONT_DELAY_MS} ms`, async ({
          page,
        }) => {
          await page.setViewportSize(viewport);
          let fontServed = false;
          await page.route('**/fonts/archivo.woff2', async (route) => {
            await new Promise((resolve) => setTimeout(resolve, FONT_DELAY_MS));
            await route.continue();
            fontServed = true;
          });
          await observeShifts(page);
          await page.goto(path);
          await page.evaluate(() => document.fonts.ready);
          await expect
            .poll(() => page.evaluate(() => document.fonts.check('800 1rem Archivo')))
            .toBe(true);
          // Dos fotogramas para que el cambio de fuente se pinte y su salto, si lo hay, se apunte.
          await page.evaluate(
            () =>
              new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
          );
          expect(fontServed, 'la woff2 se pidió y llegó con retraso').toBe(true);
          const shifts = await page.evaluate(
            () => (window as unknown as { __shifts: Shift[] }).__shifts,
          );
          const cls = shifts.reduce((sum, shift) => sum + shift.value, 0);
          const detail = shifts
            .map((shift) => `${shift.value.toFixed(4)}: ${shift.sources.join(', ')}`)
            .join('\n');
          expect(cls, `lo que se movió:\n${detail}`).toBeLessThanOrEqual(MAX_CLS);
        });
      }
    }
  }
});
