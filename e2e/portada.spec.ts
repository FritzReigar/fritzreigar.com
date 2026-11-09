import { expect, type Page, test } from '@playwright/test';

// La portada (tanda 2.3): la primera pantalla enseña lo de plan/spec-visual.md § 7, medido en el
// lienzo, y ninguna imagen se carga por encima del pliegue (spec § 8: el LCP es el nombre).
// Bordes superior e inferior en px desde arriba, con un margen de 24 px a cada lado.
const MARGIN = 24;

type Edges = [top: number, bottom: number];

const FIRST_SCREEN: Record<
  'movil' | 'escritorio',
  { name: Edges; lede: Edges; status: Edges; actions: Edges }
> = {
  // 390 × 844: el nombre con el avatar (89-261), la entradilla (315-454), «Acepto proyectos»
  // con su óvalo (478-521) y los dos botones (545-653).
  movil: { name: [89, 261], lede: [315, 454], status: [478, 521], actions: [545, 653] },
  // 1440 × 900: el nombre con el avatar (108-707) y, bajo la regla, la fila entera (761-869):
  // cada pieza arranca arriba de la fila y ninguna baja de su borde inferior.
  escritorio: { name: [108, 707], lede: [761, 869], status: [761, 869], actions: [761, 869] },
};

const edgesOf = async (page: Page, selector: string): Promise<Edges> => {
  const box = await page.locator(selector).boundingBox();
  if (!box) throw new Error(`${selector} no se pinta`);
  return [Math.round(box.y), Math.round(box.y + box.height)];
};

test('la primera pantalla enseña el nombre, la entradilla, el estado y los botones', async ({
  page,
}, info) => {
  const expected = FIRST_SCREEN[info.project.name as keyof typeof FIRST_SCREEN];
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);

  const measured = {
    name: await edgesOf(page, '.home-hero h1'),
    lede: await edgesOf(page, '.home-hero .lede'),
    status: await edgesOf(page, '.home-hero .status-badge'),
    actions: await edgesOf(page, '.home-hero__actions'),
  };
  const viewport = page.viewportSize()?.height ?? 0;

  for (const [piece, [top, bottom]] of Object.entries(measured)) {
    const [expectedTop, expectedBottom] = expected[piece as keyof typeof expected];
    expect(Math.abs(top - expectedTop), `${piece}: arriba en ${top}`).toBeLessThanOrEqual(MARGIN);
    if (info.project.name === 'movil' || piece === 'name') {
      expect(Math.abs(bottom - expectedBottom), `${piece}: abajo en ${bottom}`).toBeLessThanOrEqual(
        MARGIN,
      );
    } else {
      expect(bottom, `${piece}: abajo en ${bottom}`).toBeLessThanOrEqual(expectedBottom + MARGIN);
    }
    expect(bottom, `${piece} cabe en la primera pantalla`).toBeLessThanOrEqual(viewport);
  }
});

test('el avatar va al lado de «Fritz», pisado solo por el nombre', async ({ page }) => {
  await page.goto('/');
  const avatar = await page.locator('.home-hero .avatar').boundingBox();
  const first = await page.locator('.home-hero h1 > span').first().boundingBox();
  if (!avatar || !first) throw new Error('el avatar o «Fritz» no se pintan');
  // A la derecha de la ventana y en la franja de la primera línea del nombre.
  expect(avatar.x + avatar.width).toBeGreaterThan((page.viewportSize()?.width ?? 0) * 0.6);
  expect(avatar.y).toBeLessThan(first.y + first.height);
  expect(avatar.y + avatar.height).toBeGreaterThan(first.y);
  await expect(page.locator('.home-hero .avatar')).toHaveAttribute('role', 'img');
});

test('ninguna imagen se carga por encima del pliegue: todas con loading="lazy"', async ({
  page,
}) => {
  await page.goto('/');
  const images = page.locator('main img');
  expect(await images.count()).toBeGreaterThan(0);
  const eager = await images.evaluateAll((imgs) =>
    imgs
      .filter((img) => img.getAttribute('loading') !== 'lazy')
      .map((img) => img.getAttribute('src')),
  );
  expect(eager).toEqual([]);
});

// Al pulsar en la nav (tanda 2.13): la sección anterior no asoma bajo la cabecera y el título cae
// cerca de ella, a 32-56 px (--space-block), con 8 px de margen a cada lado.
for (const path of ['/', '/en/']) {
  test(`${path}: las anclas de sección caen justo bajo la cabecera`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);

    const landed = await page.evaluate(async () => {
      const headerBottom = document.querySelector('header')?.getBoundingClientRect().bottom ?? 0;
      const rows = [];
      for (const section of document.querySelectorAll('main section.section[id]')) {
        window.scrollTo({ top: 0, behavior: 'instant' });
        location.hash = section.id;
        await new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done)));
        rows.push({
          id: section.id,
          headerBottom,
          sectionTop: section.getBoundingClientRect().top,
          titleTop: section.querySelector('h2')?.getBoundingClientRect().top ?? 0,
        });
      }
      return rows;
    });

    expect(landed).toHaveLength(5);
    for (const { id, headerBottom, sectionTop, titleTop } of landed) {
      expect(sectionTop, `#${id}: la anterior asoma`).toBeLessThanOrEqual(headerBottom);
      const gap = titleTop - headerBottom;
      expect(gap, `#${id}: título a ${gap} px`).toBeGreaterThanOrEqual(24);
      expect(gap, `#${id}: título a ${gap} px`).toBeLessThanOrEqual(64);
    }
  });
}

test('las tarjetas se pulsan enteras, con un solo enlace cada una', async ({ page }) => {
  await page.goto('/');
  const cards = page.locator('.tap-card');
  // Missphone, Artemisa, Snugtone, Snugport y Galaxian.
  await expect(cards).toHaveCount(5);
  for (const card of await cards.all()) {
    await expect(card.locator('a')).toHaveCount(1);
    // Un punto de la tarjeta lejos del enlace (el borde izquierdo, a media altura y lejos de la
    // cabecera pegada) es el enlace: lo tapa su ::after.
    const hit = await card.evaluate((el) => {
      el.scrollIntoView({ block: 'center' });
      const rect = el.getBoundingClientRect();
      const target = document.elementFromPoint(rect.left + 4, rect.top + rect.height / 2);
      return target?.closest('a') === el.querySelector('a');
    });
    expect(hit).toBe(true);
  }
});
