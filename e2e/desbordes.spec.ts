import { expect, type Page, test } from '@playwright/test';
import type { RouteKey } from '../src/data/routes';
import { sitePages } from './support/pages';

// Ningún texto se sale de su caja ni de la ventana (plan/spec-visual.md § 3.2), sobre dist/ y a
// los anchos de los cortes. La lógica es la de docs/lienzo/herramientas/comprobar-desbordes.mjs.
// Cada tanda que pinta una página la añade a PAINTED (Reglas de la fase 2).
const PAINTED: RouteKey[] = ['home', 'work-missphone', 'work-artemisa', 'not-found'];
const WIDTHS = [360, 768, 1024, 1440];

const pages = sitePages.filter((sitePage) => PAINTED.includes(sitePage.key));

/** Lo que se sale: textos más anchos que su caja y cajas fuera de la ventana. */
const overflowsOf = (page: Page): Promise<string[]> =>
  page.evaluate(() => {
    const out: string[] = [];
    const name = (el: Element) =>
      `${el.tagName.toLowerCase()}.${[...el.classList].join('.')} «${(el.textContent ?? '').trim().slice(0, 30)}»`;
    const root = document.documentElement;
    if (root.scrollWidth > root.clientWidth) {
      out.push(`la página: ${root.scrollWidth} px en ${root.clientWidth}`);
    }
    for (const el of document.querySelectorAll(
      'h1, h2, h3, p, li, a, span, strong, td, button, summary, label',
    )) {
      const box = el.getBoundingClientRect();
      // Lo que no se ve (el menú cerrado) y lo que es solo para lectores (.sr-only).
      if (box.width <= 1) continue;
      const style = getComputedStyle(el);
      // El título de ficha puede sangrar hacia el margen, como en el lienzo (la herramienta del
      // lienzo solo cazaba lo que se salía de la ventana): para él vale la segunda comprobación.
      const bleeds = el.matches('.case-hero h1, .case-hero h1 span');
      if (!bleeds && style.display !== 'inline' && el.scrollWidth > el.clientWidth + 1) {
        out.push(`se sale de su caja: ${name(el)} (${el.scrollWidth} en ${el.clientWidth})`);
      }
      if (box.right > innerWidth + 1 || box.left < -1) {
        out.push(
          `fuera de la ventana: ${name(el)} (${Math.round(box.left)}..${Math.round(box.right)})`,
        );
      }
    }
    return out;
  });

const load = async (page: Page, path: string, width: number) => {
  await page.setViewportSize({ width, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(path);
  await page.evaluate(() => document.fonts.ready);
};

test.describe('desbordes', () => {
  test.beforeEach(({ page: _page }, info) => {
    test.skip(info.project.name !== 'escritorio', 'los anchos los pone la prueba: con uno basta');
  });

  for (const sitePage of pages) {
    for (const width of WIDTHS) {
      test(`${sitePage.path} a ${width}: nada se sale`, async ({ page }) => {
        await load(page, sitePage.path, width);
        expect(await overflowsOf(page)).toEqual([]);
      });
    }
  }

  // Las bandas de capturas de la portada (ShotBands) cubren la ventana de borde a borde también
  // en pantallas anchas: cada serie va dos veces (plan/spec-visual.md § 2.2).
  for (const width of [1920, 2560]) {
    test(`/ a ${width}: cada banda cubre el ancho de la ventana`, async ({ page }) => {
      await load(page, '/', width);
      const rows = page.locator('.shot-bands__row');
      await expect(rows).toHaveCount(2);
      for (const row of await rows.all()) {
        const box = await row.boundingBox();
        if (!box) throw new Error('una banda no se pinta');
        expect(box.x).toBeLessThanOrEqual(0);
        expect(box.x + box.width).toBeGreaterThanOrEqual(width);
      }
    });
  }

  // La prueba de la prueba: con un ancho fijo provocado, lo caza.
  test('caza un ancho fijo provocado', async ({ page }) => {
    await load(page, '/404', 360);
    // Por el CSSOM: la CSP no deja meter un <style>.
    await page.locator('h1').evaluate((h1) => {
      (h1 as HTMLElement).style.width = '600px';
    });
    expect(await overflowsOf(page)).not.toEqual([]);
  });
});
