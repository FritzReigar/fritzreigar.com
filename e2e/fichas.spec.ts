import { expect, type Page, test } from '@playwright/test';

// Las fichas de Trabajo (tanda 2.5). La primera pantalla de Missphone enseña lo de
// plan/spec-visual.md § 7, medido en el lienzo, con el mismo margen de 24 px que la portada; la
// vitrina es la única imagen que no espera al scroll (spec § 6.1); y las parejas de «Antes y
// después» llevan la flecha de tinta alternando su forma, salvo la del móvil (spec § 2.2).
const MARGIN = 24;

type Edges = [top: number, bottom: number];

const edgesOf = async (page: Page, selector: string): Promise<Edges> => {
  const box = await page.locator(selector).boundingBox();
  if (!box) throw new Error(`${selector} no se pinta`);
  return [Math.round(box.y), Math.round(box.y + box.height)];
};

const near = (measured: number, expected: number, what: string) =>
  expect(Math.abs(measured - expected), `${what} en ${measured}`).toBeLessThanOrEqual(MARGIN);

test('Missphone: la primera pantalla enseña el título, la entradilla, los enlaces y la vitrina', async ({
  page,
}, info) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/trabajo/missphone');
  await page.evaluate(() => document.fonts.ready);

  const title = await edgesOf(page, '.case-hero h1');
  const lede = await edgesOf(page, '.case-hero .lede');
  const links = await edgesOf(page, '.case-hero__links');
  const showcase = await edgesOf(page, '.case-showcase');
  const viewport = page.viewportSize()?.height ?? 0;

  if (info.project.name === 'movil') {
    // 390 × 844: el título (150-220), la entradilla y los dos enlaces (hasta 609) y la vitrina
    // desde 641. Spec § 7 da 641-835, medido con la captura del móvil aún a su lado; oculta (spec
    // § 6.2, nota al pie), la de escritorio pasa de 258 a 326 px de ancho y la vitrina acaba en
    // 877, igual que en la captura del lienzo (Desvíos de la 2.5): asoma y casi cabe entera.
    near(title[0], 150, 'el título, arriba');
    near(title[1], 220, 'el título, abajo');
    near(links[1], 609, 'los enlaces, abajo');
    near(showcase[0], 641, 'la vitrina, arriba');
    near(showcase[1], 877, 'la vitrina, abajo');
    expect(showcase[0], 'la vitrina asoma en la primera pantalla').toBeLessThan(viewport);
  } else {
    // 1440 × 900: el título (145-403), la entradilla y los enlaces (457-586) y el arranque de la
    // vitrina (642-).
    near(title[0], 145, 'el título, arriba');
    near(title[1], 403, 'el título, abajo');
    near(lede[0], 457, 'la entradilla, arriba');
    near(links[0], 457, 'los enlaces, arriba');
    expect(Math.max(lede[1], links[1])).toBeLessThanOrEqual(586 + MARGIN);
    near(showcase[0], 642, 'la vitrina, arriba');
  }
  expect(links[1], 'la acción principal cabe en la primera pantalla').toBeLessThanOrEqual(viewport);
});

for (const path of ['/trabajo/missphone', '/trabajo/limpiezas-artemisa']) {
  test(`${path}: solo la captura de escritorio de la vitrina va sin loading="lazy"`, async ({
    page,
  }) => {
    await page.goto(path);
    const notLazy = await page
      .locator('main img')
      .evaluateAll((imgs) =>
        imgs
          .filter((img) => img.getAttribute('loading') !== 'lazy')
          .map((img) =>
            img.closest('.case-showcase__desktop') ? 'vitrina' : img.getAttribute('src'),
          ),
      );
    expect(notLazy).toEqual(['vitrina']);
    await expect(page.locator('.case-showcase img[fetchpriority]')).toHaveCount(0);
  });
}

test('Missphone: cinco parejas, con la flecha alternando su forma salvo en la del móvil', async ({
  page,
}, info) => {
  await page.goto('/trabajo/missphone');
  const pairs = page.locator('.pair');
  await expect(pairs).toHaveCount(5);
  const shapes = await pairs.evaluateAll((items) =>
    items.map((pair) => {
      const ink = pair.querySelector('.ink');
      return ink ? ([...ink.classList].find((name) => name.startsWith('ink--arrow')) ?? '?') : '-';
    }),
  );
  expect(shapes).toEqual([
    'ink--arrow-up',
    '-',
    'ink--arrow-down',
    'ink--arrow-up',
    'ink--arrow-down',
  ]);

  // «Antes» en tinta y «Después» en cobalto.
  const first = pairs.first();
  const colors = await first
    .locator('figcaption strong')
    .evaluateAll((labels) => labels.map((label) => getComputedStyle(label).color));
  expect(colors[0]).not.toEqual(colors[1]);

  // A 35rem o menos (el proyecto movil, a 390) no hay flecha.
  const visible = await first.locator('.ink').isVisible();
  expect(visible).toBe(info.project.name !== 'movil');
});

test('Limpiezas Artemisa: «Qué se hizo» en siete filas sin capturas y cuatro cifras', async ({
  page,
}) => {
  await page.goto('/trabajo/limpiezas-artemisa');
  await expect(page.locator('.feature-rows > li')).toHaveCount(7);
  await expect(page.locator('.feature-rows img')).toHaveCount(0);
  await expect(page.locator('.figure-list > li')).toHaveCount(4);
  await expect(page.locator('.case-closing h2')).toHaveCount(3);
});
