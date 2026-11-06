import { expect, type Page, test } from '@playwright/test';
import { pathFor } from '../src/data/routes';

// El movimiento (tanda 2.7, plan/spec-visual.md § 4), todo en src/styles/motion.css. Con
// movimiento reducido no existe ni una animación, ni al cargar ni al bajar; sin él, la portada
// tiene su escena al cargar, que acaba antes de 4 s y desaparece (el reposo es el del CSS, el de
// las vistas), y lo del scroll va con su línea de tiempo. Nada anima transform. Las vistas
// (e2e/vistas.spec.ts) miran el reposo con movimiento reducido; esto mira que se mueva.

const SPEC_PAGES = [
  pathFor('home', 'es'),
  pathFor('work-missphone', 'es'),
  pathFor('project-snugtone', 'es'),
  pathFor('not-found', 'es'),
];

interface Running {
  name: string;
  timeline: string;
  state: string;
  target: string;
  properties: string[];
}

// Las animaciones del documento: su nombre, su línea de tiempo (DocumentTimeline al cargar;
// ViewTimeline con el scroll), su estado, a quién mueven (sus clases sin las astro-*, o su
// etiqueta en minúsculas) y qué propiedades (en camelCase).
const animationsOf = (page: Page): Promise<Running[]> =>
  page.evaluate(() =>
    document.getAnimations().map((animation) => {
      const effect = animation.effect as KeyframeEffect | null;
      const target = effect?.target;
      return {
        name:
          animation instanceof CSSAnimation
            ? animation.animationName
            : animation instanceof CSSTransition
              ? `transición de ${animation.transitionProperty}`
              : animation.constructor.name,
        timeline: animation.timeline?.constructor.name ?? 'ninguna',
        state: animation.playState,
        target: target
          ? [...target.classList].filter((name) => !name.startsWith('astro-')).join(' ') ||
            target.tagName.toLowerCase()
          : '?',
        properties:
          animation instanceof CSSTransition
            ? [animation.transitionProperty]
            : (effect?.getKeyframes() ?? []).flatMap((frame) =>
                Object.keys(frame).filter(
                  (key) => !['offset', 'computedOffset', 'easing', 'composite'].includes(key),
                ),
              ),
      };
    }),
  );

// Baja la página entera a saltos de 0,8 pantallas y junta lo que haya en cada uno.
const scrollThrough = async (page: Page): Promise<Running[]> => {
  const found: Running[] = [];
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = Math.round((page.viewportSize()?.height ?? 844) * 0.8);
  for (let y = 0; y <= height; y += step) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), y);
    await page.waitForTimeout(80);
    found.push(...(await animationsOf(page)));
  }
  return found;
};

const names = (list: Running[]) => [...new Set(list.map((animation) => animation.name))].sort();

test.describe('con movimiento reducido', () => {
  test.use({ reducedMotion: 'reduce' });

  for (const path of SPEC_PAGES) {
    test(`${path}: ni una animación, al cargar ni al bajar la página entera`, async ({ page }) => {
      await page.goto(path);
      expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
      expect(await scrollThrough(page)).toEqual([]);
    });
  }
});

test.describe('sin preferencia de movimiento', () => {
  test.use({ reducedMotion: 'no-preference' });

  test('la portada: la escena de la carga está en marcha al cargar y acaba antes de 4 s', async ({
    page,
  }) => {
    await page.goto(pathFor('home', 'es'));
    const atLoad = (await animationsOf(page)).filter((a) => a.timeline === 'DocumentTimeline');
    expect(names(atLoad)).toEqual([
      'fade-in',
      'from-left',
      'from-right',
      'ink-fill',
      'rise',
      'trace',
    ]);
    expect(atLoad.every((a) => a.state === 'running')).toBe(true);
    // Los 26 trazos del avatar, cada uno con su trazo y su paso a relleno.
    expect(atLoad.filter((a) => a.target === 'avatar-line')).toHaveLength(52);
    await page.waitForTimeout(4000);
    const later = await animationsOf(page);
    expect(later.filter((a) => a.timeline !== 'ViewTimeline')).toEqual([]);
  });

  test('la portada: lo del scroll va con la vista y no se mueve sin scroll', async ({ page }) => {
    await page.goto(pathFor('home', 'es'));
    const scroll = (await animationsOf(page)).filter((a) => a.timeline === 'ViewTimeline');
    expect(names(scroll)).toEqual(['band-1', 'band-2', 'from-right', 'grow']);
    const progress = () =>
      page.evaluate(() =>
        document
          .getAnimations()
          .filter((a) => a.timeline instanceof ViewTimeline)
          .map((a) => Number(a.effect?.getComputedTiming().progress ?? 0)),
      );
    const before = await progress();
    await page.waitForTimeout(500);
    expect(await progress()).toEqual(before);
  });

  for (const path of [pathFor('work-missphone', 'es'), pathFor('project-snugtone', 'es')]) {
    test(`${path}: el título se recompone, la fila sube y las cifras entran con el scroll`, async ({
      page,
    }, info) => {
      await page.goto(path);
      const all = await animationsOf(page);
      const load = all.filter((a) => a.timeline === 'DocumentTimeline');
      expect(load.map((a) => `${a.name} ${a.target}`).sort()).toEqual([
        'from-right first',
        'rise case-hero__copy',
      ]);
      const scrolled = names(all.filter((a) => a.timeline === 'ViewTimeline'));
      expect(scrolled).toEqual(expect.arrayContaining(['figure-from-left', 'figure-from-right']));
      // La flecha de las parejas, solo en Missphone y por encima de 35rem (abajo no se pinta).
      if (path === pathFor('work-missphone', 'es') && info.project.name === 'escritorio') {
        const inks = all.filter((a) => a.target === 'path');
        expect(names(inks)).toEqual(['trace']);
      }
    });
  }

  test('el 404: el número se recompone, el título sube y la flecha se traza al acabar', async ({
    page,
  }, info) => {
    await page.goto(pathFor('not-found', 'es'));
    const load = (await animationsOf(page)).filter((a) => a.timeline === 'DocumentTimeline');
    const expected = ['from-left second', 'from-right first', 'rise h1'];
    // La flecha solo se pinta por encima de 60rem.
    if (info.project.name === 'escritorio') expected.push('trace path');
    expect(load.map((a) => `${a.name} ${a.target}`).sort()).toEqual(expected.sort());
    if (info.project.name === 'escritorio') {
      const delay = await page
        .locator('.error-hero__ink path')
        .evaluate((path) => getComputedStyle(path).animationDelay);
      expect(delay).toBe('1.35s');
    }
  });

  for (const path of SPEC_PAGES) {
    test(`${path}: nada anima transform ni desborda la página mientras se mueve`, async ({
      page,
    }) => {
      await page.goto(path);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
      const all = [...(await animationsOf(page)), ...(await scrollThrough(page))];
      expect(all.length).toBeGreaterThan(0);
      expect(all.filter((a) => a.properties.includes('transform'))).toEqual([]);
    });
  }

  // Las bandas viajan con la serie doble: en el principio (cover 0 %) y en el final (cover 100 %)
  // de su viaje, cada fila sigue cubriendo la ventana de borde a borde.
  test('las bandas cubren el ancho a 1920 en el principio y en el final de su viaje', async ({
    page,
  }, info) => {
    test.skip(info.project.name !== 'escritorio', 'el ancho lo pone la prueba: con uno basta');
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(pathFor('home', 'es'));
    const bands = page.locator('.shot-bands');
    const { top, bottom } = await bands.evaluate((el) => {
      const box = el.getBoundingClientRect();
      return { top: box.top + window.scrollY, bottom: box.bottom + window.scrollY };
    });
    for (const [where, y, expected] of [
      ['el principio', top - 1080, 0],
      ['el final', bottom, 1],
    ] as const) {
      await page.evaluate((to) => window.scrollTo({ top: to, behavior: 'instant' }), y);
      await page.waitForTimeout(150);
      const rows = await page.locator('.shot-bands__row').evaluateAll((all) =>
        all.map((row) => {
          const [animation] = row.getAnimations();
          const box = row.getBoundingClientRect();
          return {
            progress: Number(animation?.effect?.getComputedTiming().progress ?? -1),
            left: box.left,
            right: box.right,
          };
        }),
      );
      expect(rows, where).toHaveLength(2);
      for (const row of rows) {
        expect(row.progress, where).toBeCloseTo(expected, 1);
        expect(row.left, where).toBeLessThanOrEqual(0);
        expect(row.right, where).toBeGreaterThanOrEqual(1920);
      }
    }
  });

  // El LCP es texto del héroe y el movimiento no lo cambia (spec § 4, «Reglas»): la recomposición
  // y la subida solo desplazan. A 1440 es el nombre (o el título, o el «404»); a 390, la
  // entradilla, que en tres o cuatro líneas mide más que una palabra del cartel (ya lo era antes
  // de la 2.7: Desvíos de la fase).
  for (const path of [
    pathFor('home', 'es'),
    pathFor('work-missphone', 'es'),
    pathFor('not-found', 'es'),
  ]) {
    test(`${path}: el LCP es el mismo texto del héroe que con movimiento reducido`, async ({
      page,
    }) => {
      const lcpOf = async () => {
        await page.goto(path);
        return page.evaluate(
          () =>
            new Promise<string>((resolve) => {
              new PerformanceObserver((list) => {
                const entries = list.getEntries() as (PerformanceEntry & { element?: Element })[];
                const element = entries.at(-1)?.element;
                const hero = element?.closest('.home-hero, .case-hero, .error-hero');
                resolve(
                  hero && element?.tagName !== 'IMG'
                    ? `${element?.tagName.toLowerCase()} «${element?.textContent?.trim().slice(0, 20)}»`
                    : `fuera del héroe: ${element?.outerHTML.slice(0, 80)}`,
                );
              }).observe({ type: 'largest-contentful-paint', buffered: true });
            }),
        );
      };
      const moving = await lcpOf();
      await page.emulateMedia({ reducedMotion: 'reduce' });
      const still = await lcpOf();
      expect(moving).not.toMatch(/^fuera/);
      expect(moving).toBe(still);
    });
  }
});
