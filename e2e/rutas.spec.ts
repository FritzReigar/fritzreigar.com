import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, test } from '@playwright/test';
import { OG_IMAGE, pathFor, routes } from '../src/data/routes';
import { ui } from '../src/data/ui';
import { collectErrors, sitePages } from './support/pages';

// Las doce páginas, servidas por wrangler con la CSP real de _headers: un script o un estilo en
// línea saldría aquí como error de consola, y main.ts no llegaría a marcar el <html>.
test('son 12 páginas: seis por idioma', () => {
  expect(sitePages).toHaveLength(12);
});

for (const sitePage of sitePages) {
  test(`${sitePage.path} responde 200, en su idioma, sin errores y con main.ts`, async ({
    page,
  }) => {
    const errors = collectErrors(page);
    const response = await page.goto(sitePage.path);
    expect(response?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', sitePage.lang);
    expect((await page.title()).length).toBeGreaterThan(0);
    // Un solo script ejecutable, externo y de /_astro/, y ha corrido.
    await expect(page.locator('script:not([type="application/ld+json"])')).toHaveCount(1);
    await expect(page.locator('script[type="module"]')).toHaveAttribute('src', /^\/_astro\//);
    await expect(page.locator('html')).toHaveAttribute('data-script', 'main');
    expect(errors, 'errores de consola').toEqual([]);
  });

  test(`${sitePage.path}: ${sitePage.indexable ? 'canonical' : 'noindex'}`, async ({ page }) => {
    await page.goto(sitePage.path);
    const robots = page.locator('meta[name="robots"]');
    const canonical = page.locator('link[rel="canonical"]');
    if (sitePage.indexable) {
      await expect(robots).toHaveCount(0);
      await expect(canonical).toHaveAttribute('href', `https://fritzreigar.com${sitePage.path}`);
    } else {
      await expect(robots).toHaveAttribute('content', 'noindex');
      await expect(canonical).toHaveCount(0);
    }
  });
}

// La imagen para compartir (tanda 2.10): cada indexable anuncia la suya, absoluta, con medidas y
// alt, y la imagen responde; el 404 no lleva Open Graph.
for (const sitePage of sitePages) {
  test(`${sitePage.path}: ${sitePage.indexable ? 'su imagen para compartir' : 'sin Open Graph'}`, async ({
    page,
    request,
  }) => {
    await page.goto(sitePage.path);
    const image = page.locator('meta[property="og:image"]');
    if (!sitePage.indexable) {
      await expect(page.locator('meta[property^="og:"]')).toHaveCount(0);
      return;
    }
    const og = routes.find((route) => route.key === sitePage.key)?.og?.[sitePage.lang];
    const path = `/og/${sitePage.lang}/${sitePage.key}.png`;
    await expect(image).toHaveAttribute('content', `https://fritzreigar.com${path}`);
    await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute(
      'content',
      String(OG_IMAGE.width),
    );
    await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute(
      'content',
      String(OG_IMAGE.height),
    );
    await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute(
      'content',
      og?.title ?? '',
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      'content',
      og?.title ?? '',
    );
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
      'content',
      og?.description ?? '',
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      'content',
      'summary_large_image',
    );
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toBe('image/png');
  });
}

// Las imágenes de dist/og/: una por indexable e idioma, de 1200 × 630 (la cabecera IHDR del PNG)
// y de 150 KB como mucho.
test('dist/og/ tiene diez PNG de 1200 × 630 y ≤ 150 KB', () => {
  const dir = fileURLToPath(new URL('../dist/og', import.meta.url));
  const files = readdirSync(dir).flatMap((lang) =>
    readdirSync(join(dir, lang)).map((name) => join(dir, lang, name)),
  );
  const expected = sitePages.filter((sitePage) => sitePage.indexable);
  expect(files).toHaveLength(expected.length);
  expect(files).toHaveLength(10);
  for (const file of files) {
    const png = readFileSync(file);
    expect([png.readUInt32BE(16), png.readUInt32BE(20)], file).toEqual([
      OG_IMAGE.width,
      OG_IMAGE.height,
    ]);
    expect(statSync(file).size, file).toBeLessThanOrEqual(150 * 1024);
  }
});

for (const [lang, path] of [
  ['es', '/no-existe'],
  ['en', '/en/no-existe'],
] as const) {
  const { title, home } = ui[lang].notFound;
  test(`${path} → 404 en su idioma`, async ({ page }) => {
    const errors = collectErrors(page);
    const failed: string[] = [];
    page.on('response', (response) => {
      if (response.status() >= 400) failed.push(new URL(response.url()).pathname);
    });
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
    await expect(page.locator('html')).toHaveAttribute('lang', lang);
    await expect(page.locator('h1')).toHaveText(title);
    await expect(page.getByRole('link', { name: home })).toHaveAttribute(
      'href',
      pathFor('home', lang),
    );
    await expect(page.locator('html')).toHaveAttribute('data-script', 'main');
    // El único 404 es el del propio documento, que Chrome apunta en la consola; nada más falla.
    expect(failed).toEqual([path]);
    expect(errors.filter((error) => !error.includes('status of 404'))).toEqual([]);
  });
}

// Las URL de la web de hoy que siguen sirviendo lo mismo: los CV (los enlaza LinkedIn y quien
// los guardó), los iconos, el manifest y la imagen de compartir. Y el avatar del JSON-LD.
for (const [path, type] of [
  ['/assets/cv/fritz-reigar-cv.pdf', 'application/pdf'],
  ['/assets/cv/fritz-reigar-cv-en.pdf', 'application/pdf'],
  ['/assets/img/favicon.ico', 'image/'],
  ['/assets/img/apple-touch-icon.png', 'image/png'],
  ['/assets/img/site.webmanifest', ''],
  ['/assets/img/og-preview.png', 'image/png'],
  ['/assets/img/fritz-reigar-avatar.png', 'image/png'],
] as const) {
  test(`${path} responde 200`, async ({ request }) => {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type'] ?? '').toContain(type);
  });
}

test('las cabeceras de _headers: CSP con Formspree, HSTS, marcos y permisos', async ({
  request,
}) => {
  const headers = (await request.get('/')).headers();
  const csp = headers['content-security-policy'] ?? '';
  expect(csp).toContain("default-src 'self'");
  expect(csp).toContain("script-src 'self';");
  expect(csp).toContain("style-src 'self';");
  expect(csp).toContain("form-action 'self' https://formspree.io");
  expect(csp).toContain("connect-src 'self' https://formspree.io");
  expect(csp).toContain("frame-ancestors 'none'");
  expect(headers['strict-transport-security']).toBe('max-age=31536000; includeSubDomains');
  expect(headers['x-frame-options']).toBe('DENY');
  expect(headers['permissions-policy']).toBe('camera=(), microphone=(), geolocation=()');
});

test('lo de /_astro/ se cachea un año', async ({ page, request }) => {
  await page.goto('/');
  const src = await page.locator('script[type="module"]').getAttribute('src');
  const response = await request.get(src ?? '');
  expect(response.status()).toBe(200);
  expect(response.headers()['cache-control']).toBe('public, max-age=31536000, immutable');
});

test('en *.pages.dev, X-Robots-Tag: noindex; en el dominio, no', async ({ request }) => {
  const preview = await request.get('/', { headers: { host: 'fritzreigar-astro.pages.dev' } });
  expect(preview.headers()['x-robots-tag']).toBe('noindex');
  const domain = await request.get('/', { headers: { host: 'fritzreigar.com' } });
  expect(domain.headers()['x-robots-tag']).toBeUndefined();
});

test('el sitemap lleva las indexables y robots.txt apunta a él', async ({ request }) => {
  const sitemap = await (await request.get('/sitemap.xml')).text();
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const expected = routes
    .filter((route) => route.es.indexable)
    .flatMap((route) => [route.es.path, ...(route.en.live ? [route.en.path] : [])])
    .map((path) => `https://fritzreigar.com${path}`);
  expect(locs.sort()).toEqual(expected.sort());
  const robots = await (await request.get('/robots.txt')).text();
  expect(robots).toContain('Sitemap: https://fritzreigar.com/sitemap.xml');
});
