import { expect, type Page, test } from '@playwright/test';
import { pathFor, routes, twinsOf } from '../src/data/routes';
import { builtPaths, sitePages } from './support/pages';

// routes.ts es la única lista de páginas: de ella salen el hreflang, el sitemap y estas pruebas.
// Si una página se construye sin estar en la lista (o al revés), su hreflang y su sitemap mienten.
test('cada página de dist/ está en routes.ts, y cada ruta tiene su página', () => {
  const listed = sitePages.map((sitePage) => sitePage.path).sort();
  expect(builtPaths()).toEqual(listed);
});

const SITE = 'https://fritzreigar.com';

const alternatesOf = async (page: Page): Promise<Record<string, string>> =>
  Object.fromEntries(
    await page
      .locator('link[rel="alternate"][hreflang]')
      .evaluateAll((links) =>
        links.map((link) => [link.getAttribute('hreflang'), link.getAttribute('href')]),
      ),
  );

// El hreflang es recíproco: una página con gemela viva anuncia las dos y x-default (la española),
// y la gemela anuncia exactamente lo mismo. Sin gemela viva, ni hreflang ni enlace de idioma. Los
// 404 no se indexan: sin hreflang, pero con el enlace de idioma a la portada del otro.
for (const sitePage of sitePages) {
  const route = routes.find((candidate) => candidate.key === sitePage.key);
  const twins = route && sitePage.indexable ? twinsOf(route) : undefined;

  test(`${sitePage.path}: hreflang ${twins ? 'recíproco' : 'ausente'}`, async ({ page }) => {
    await page.goto(sitePage.path);
    const own = await alternatesOf(page);
    const switchLink = page.locator('header a[hreflang]');

    if (!twins) {
      expect(own).toEqual({});
      const other = sitePage.lang === 'es' ? 'en' : 'es';
      if (route?.key === 'not-found' && route.en.live) {
        await expect(switchLink).toHaveCount(2);
        for (const link of await switchLink.all()) {
          await expect(link).toHaveAttribute('href', pathFor('home', other));
          await expect(link).toHaveAttribute('hreflang', other);
          await expect(link).toHaveAttribute('lang', other);
        }
      } else {
        await expect(switchLink).toHaveCount(0);
      }
      return;
    }

    expect(own).toEqual({
      es: `${SITE}${twins.es}`,
      en: `${SITE}${twins.en}`,
      'x-default': `${SITE}${twins.es}`,
    });
    const other = sitePage.lang === 'es' ? twins.en : twins.es;
    // Dos: el de la cabecera entera y el del menú del móvil.
    await expect(switchLink).toHaveCount(2);
    for (const link of await switchLink.all()) {
      await expect(link).toHaveAttribute('href', other);
      await expect(link).toHaveAttribute('hreflang', sitePage.lang === 'es' ? 'en' : 'es');
      await expect(link).toHaveAttribute('lang', sitePage.lang === 'es' ? 'en' : 'es');
    }
    await page.goto(other);
    expect(await alternatesOf(page)).toEqual(own);
  });
}
