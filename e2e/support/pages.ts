import { readdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Page } from '@playwright/test';
import { type RouteKey, routes } from '../../src/data/routes';
import type { Lang } from '../../src/data/ui';

// Las doce páginas salen de routes.ts, la misma lista que el sitemap, el hreflang y el enlace de
// idioma: una página nueva entra sola en las pruebas. Nada copiado a mano.
export interface SitePage {
  key: RouteKey;
  lang: Lang;
  path: string;
  /** La página está viva en su idioma (las españolas, siempre; las inglesas, con en.live). */
  live: boolean;
  indexable: boolean;
}

export const sitePages: SitePage[] = routes.flatMap((route) => [
  {
    key: route.key,
    lang: 'es' as const,
    path: route.es.path,
    live: true,
    indexable: route.es.indexable,
  },
  {
    key: route.key,
    lang: 'en' as const,
    path: route.en.path,
    live: route.en.live,
    indexable: route.es.indexable && route.en.live,
  },
]);

/** Las páginas a las que se llega con un enlace: todas menos los dos 404. */
export const reachablePages = sitePages.filter((sitePage) => sitePage.key !== 'not-found');

const DIST = fileURLToPath(new URL('../../dist', import.meta.url));

/** Las URL públicas de los .html de dist/ (/, /trabajo/missphone, /en/404…), sin .html. */
export const builtPaths = (): string[] => {
  const walk = (dir: string): string[] =>
    readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) return walk(path);
      return entry.name.endsWith('.html') ? [path] : [];
    });
  return walk(DIST)
    .map((file) => `/${relative(DIST, file).split(sep).join('/')}`)
    .map((path) => path.replace(/\.html$/, '').replace(/(^|\/)index$/, '$1'))
    .sort();
};

/** Recoge los errores de consola y de página desde ahora (una violación de CSP sale como error). */
export const collectErrors = (page: Page): string[] => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
  return errors;
};
