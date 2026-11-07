import { expect, type Page, test } from '@playwright/test';
import { navSections, ui } from '../src/data/ui';
import { sitePages } from './support/pages';

// El marco de todas las páginas (plan/spec-visual.md § 2.2 y § 5): el salto, la cabecera entera
// desde 56rem, el menú del móvil por debajo (un <details> que main.ts cierra), la sección marcada
// en las fichas y la fuente autoalojada. Patrón del estudio
// (~/Projects/propios/estudio-reigar/web/e2e/marco.spec.ts).

const MENU = 'details[data-menu]';

// Fuera del menú y de cualquier enlace: la esquina del rótulo «Error 404», a la izquierda del
// panel (que cuelga del botón, a la derecha).
const clickOutside = (page: Page) =>
  page.locator('.error-hero__kicker').click({ position: { x: 4, y: 4 } });

test('el salto lleva el foco a #contenido', async ({ page }) => {
  await page.goto('/404');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: ui.es.skipLink });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await page.keyboard.press('Enter');
  await expect(page.locator('#contenido')).toBeFocused();
});

test('la cabecera: la nav entera desde 56rem y «Menú» por debajo, todo de 44 px', async ({
  page,
}, info) => {
  await page.goto('/404');
  const nav = page.locator('.site-nav');
  const summary = page.locator(`${MENU} summary`);
  const visible = info.project.name === 'movil' ? summary : nav;
  await expect(info.project.name === 'movil' ? nav : summary).toBeHidden();
  await expect(visible).toBeVisible();
  const targets = page.locator('header a:visible, header summary:visible');
  expect(await targets.count()).toBeGreaterThan(0);
  for (const target of await targets.all()) {
    expect((await target.boundingBox())?.height).toBeGreaterThanOrEqual(44);
  }
  // Los enlaces van en listas (el marco ya tiene estilos: Desvío de la 1.5): las secciones y, al
  // final, el idioma.
  await expect(page.locator('.site-nav ul > li > a')).toHaveCount(navSections.length + 1);
  await expect(page.locator(`${MENU} nav ul > li > a`)).toHaveCount(navSections.length + 1);
  await expect(page.locator('footer ul > li > a')).toHaveCount(5);
});

test.describe('el menú del móvil', () => {
  test.beforeEach(async ({ page }, info) => {
    test.skip(info.project.name !== 'movil', 'el menú solo existe por debajo de 56rem');
    await page.goto('/404');
    await page.locator(`${MENU} summary`).click();
    await expect(page.locator(MENU)).toHaveAttribute('open', '');
  });

  test('abre con filas de 44 px, las secciones en el orden de la cabecera y el idioma al final', async ({
    page,
  }) => {
    const links = page.locator(`${MENU} nav a`);
    await expect(links).toHaveText([
      ...navSections.map((section) => ui.es.nav[section]),
      ui.en.langName,
    ]);
    for (const link of await links.all()) {
      await expect(link).toBeVisible();
      expect((await link.boundingBox())?.height).toBeGreaterThanOrEqual(44);
    }
  });

  test('se cierra al pulsar un enlace', async ({ page }) => {
    // Sin navegar: lo que se mira es el menú de esta página.
    await page.evaluate(() => {
      document
        .querySelector('details[data-menu] nav a')
        ?.addEventListener('click', (event) => event.preventDefault());
    });
    await page.locator(`${MENU} nav a`).first().click();
    await expect(page.locator(MENU)).not.toHaveAttribute('open');
  });

  test('se cierra al pulsar fuera', async ({ page }) => {
    await clickOutside(page);
    await expect(page.locator(MENU)).not.toHaveAttribute('open');
  });

  test('se cierra con Escape y el foco vuelve a «Menú»', async ({ page }) => {
    await page.locator(`${MENU} nav a`).first().focus();
    await page.keyboard.press('Escape');
    await expect(page.locator(MENU)).not.toHaveAttribute('open');
    await expect(page.locator(`${MENU} summary`)).toBeFocused();
  });
});

test.describe('sin JS', () => {
  test.use({ javaScriptEnabled: false });

  test('el menú se queda abierto: ni pulsar fuera ni Escape lo cierran', async ({ page }, info) => {
    test.skip(info.project.name !== 'movil', 'el menú solo existe por debajo de 56rem');
    await page.goto('/404');
    await page.locator(`${MENU} summary`).click();
    await expect(page.locator(MENU)).toHaveAttribute('open', '');
    await clickOutside(page);
    await page.keyboard.press('Escape');
    await expect(page.locator(MENU)).toHaveAttribute('open', '');
    await expect(page.locator(`${MENU} nav a`).first()).toBeVisible();
  });
});

// La nav inglesa (plan/spec-visual.md § 5: 668 px con «Español») cabe entera en una fila en el
// primer ancho que la pinta: la cabecera pasa al menú hasta 56rem (896 px) incluidos.
test('/en/: la nav inglesa entera, en una fila, justo por encima de 56rem', async ({ page }) => {
  await page.setViewportSize({ width: 897, height: 800 });
  await page.goto('/en/');
  await expect(page.locator(`${MENU} summary`)).toBeHidden();
  const links = page.locator('.site-nav a');
  await expect(links).toHaveText([...navSections.map((section) => ui.en.nav[section]), 'Español']);
  const boxes = await Promise.all((await links.all()).map((link) => link.boundingBox()));
  const tops = new Set(boxes.map((box) => Math.round(box?.y ?? -1)));
  expect(tops.size).toBe(1);
  const header = await page.locator('header').evaluate((el) => ({
    scroll: el.scrollWidth,
    client: el.clientWidth,
    right: Math.max(...[...el.querySelectorAll('a')].map((a) => a.getBoundingClientRect().right)),
  }));
  expect(header.scroll).toBeLessThanOrEqual(header.client);
  expect(header.right).toBeLessThanOrEqual(897);
});

// La ficha marca su sección: «Trabajo» en las de Trabajo y «Proyectos» en las de Proyectos (y
// «Work» y «Projects» en las inglesas), en la cabecera entera y en el menú.
for (const [path, lang, section] of [
  ['/trabajo/missphone', 'es', 'work'],
  ['/trabajo/limpiezas-artemisa', 'es', 'work'],
  ['/proyectos/snugtone', 'es', 'projects'],
  ['/proyectos/snugport', 'es', 'projects'],
  ['/en/work/missphone', 'en', 'work'],
  ['/en/work/limpiezas-artemisa', 'en', 'work'],
  ['/en/projects/snugtone', 'en', 'projects'],
  ['/en/projects/snugport', 'en', 'projects'],
] as const) {
  test(`${path} marca «${ui[lang].nav[section]}» con aria-current`, async ({ page }) => {
    await page.goto(path);
    const current = page.locator('header a[aria-current="page"]');
    await expect(current).toHaveCount(2);
    for (const link of await current.all()) await expect(link).toHaveText(ui[lang].nav[section]);
  });
}

test('/fonts/archivo.woff2 responde con caché de un año', async ({ request }) => {
  const response = await request.get('/fonts/archivo.woff2');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('font/woff2');
  expect(response.headers()['cache-control']).toBe('public, max-age=31536000, immutable');
});

for (const sitePage of sitePages) {
  test(`${sitePage.path}: precarga Archivo y la usa`, async ({ page }) => {
    await page.goto(sitePage.path);
    await expect(page.locator('link[rel="preload"][as="font"]')).toHaveAttribute(
      'href',
      '/fonts/archivo.woff2',
    );
    // La cara de Archivo, cargada (check() también da true si la familia no existe).
    const loaded = await page.evaluate(async () => {
      await document.fonts.load('800 16px Archivo');
      return [...document.fonts].filter((face) => face.status === 'loaded').map((f) => f.family);
    });
    expect(loaded).toContain('Archivo');
  });
}
