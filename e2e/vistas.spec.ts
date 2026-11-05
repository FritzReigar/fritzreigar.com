import { expect, test } from '@playwright/test';

// Las vistas de la spec en reposo (plan/spec-visual.md, «Lo medido»; decisión F5 de plan/fase-2.md):
// página entera, a 390 (proyecto movil) y a 1440 (escritorio), en claro y en oscuro, con movimiento
// reducido. Las imágenes van en git con el sufijo win32 y solo corren en local: la CI salta
// @vista, porque Linux pinta la fuente distinta. Una captura solo se regenera cuando el cambio es
// buscado (`npx playwright test --grep @vista --update-snapshots`), y el commit lo dice.
// Cada tanda que pinta una de las cuatro páginas de la spec la añade a VIEWS.
const VIEWS = [
  { name: 'portada', path: '/' },
  { name: '404', path: '/404' },
];

for (const view of VIEWS) {
  for (const colorScheme of ['light', 'dark'] as const) {
    test(`${view.name} en ${colorScheme === 'light' ? 'claro' : 'oscuro'} @vista`, async ({
      page,
    }) => {
      await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' });
      await page.goto(view.path);
      await page.evaluate(() => document.fonts.ready);
      // Las capturas van con loading="lazy": en una página entera unas cargarían y otras no
      // según el momento. Se piden todas y se espera a que estén pintadas.
      await page.evaluate(() =>
        Promise.all(
          [...document.images].map((img) => {
            img.loading = 'eager';
            return img.decode().catch(() => undefined);
          }),
        ),
      );
      await expect(page).toHaveScreenshot(`${view.name}-${colorScheme}.png`, {
        fullPage: true,
        animations: 'disabled',
      });
    });
  }
}
