// Las seis páginas de la web en los dos idiomas. Es la única fuente de las rutas: de aquí salen el
// sitemap (src/pages/sitemap.xml.ts), el hreflang y el enlace de idioma (BaseLayout), los enlaces
// del marco y las pruebas (e2e/support/pages.ts). Una página en inglés está viva cuando su
// `en.live` es true (las seis desde la tanda 2.9); si alguna dejara de estarlo, los enlaces desde
// /en/ llevarían a la española y saldría del hreflang y del sitemap. El patrón es el del estudio
// (~/Projects/propios/estudio-reigar/web/src/data/routes.ts).
import { type Lang, type NavSection, ui } from './ui';

export type RouteKey =
  | 'home'
  | 'work-missphone'
  | 'work-artemisa'
  | 'project-snugtone'
  | 'project-snugport'
  | 'not-found';

export interface Route {
  key: RouteKey;
  es: {
    path: string;
    // Solo las indexables van al sitemap.
    indexable: boolean;
    lastmod?: string;
    changefreq?: 'monthly' | 'yearly';
    priority?: string;
  };
  en: {
    path: string;
    live: boolean;
    lastmod?: string;
  };
}

export const routes: readonly Route[] = [
  {
    key: 'home',
    es: {
      path: '/',
      indexable: true,
      lastmod: '2026-11-05',
      changefreq: 'monthly',
      priority: '1.0',
    },
    en: { path: '/en/', live: true, lastmod: '2026-11-07' },
  },
  {
    key: 'work-missphone',
    es: {
      path: '/trabajo/missphone',
      indexable: true,
      lastmod: '2026-11-05',
      changefreq: 'monthly',
      priority: '0.8',
    },
    en: { path: '/en/work/missphone', live: true, lastmod: '2026-11-07' },
  },
  {
    key: 'work-artemisa',
    es: {
      path: '/trabajo/limpiezas-artemisa',
      indexable: true,
      lastmod: '2026-11-05',
      changefreq: 'monthly',
      priority: '0.8',
    },
    en: { path: '/en/work/limpiezas-artemisa', live: true, lastmod: '2026-11-07' },
  },
  {
    key: 'project-snugtone',
    es: {
      path: '/proyectos/snugtone',
      indexable: true,
      lastmod: '2026-11-05',
      changefreq: 'monthly',
      priority: '0.8',
    },
    en: { path: '/en/projects/snugtone', live: true, lastmod: '2026-11-07' },
  },
  {
    key: 'project-snugport',
    es: {
      path: '/proyectos/snugport',
      indexable: true,
      lastmod: '2026-11-05',
      changefreq: 'monthly',
      priority: '0.8',
    },
    en: { path: '/en/projects/snugport', live: true, lastmod: '2026-11-07' },
  },
  {
    key: 'not-found',
    es: { path: '/404', indexable: false },
    en: { path: '/en/404', live: true },
  },
];

const byKey = (key: RouteKey): Route => {
  const route = routes.find((candidate) => candidate.key === key);
  if (!route) throw new Error(`routes.ts: no hay ninguna ruta «${key}»`);
  return route;
};

/**
 * Las fichas: las páginas de Trabajo y de Proyectos. Cada una tiene su JSON en la colección
 * `cases` con el slug de su ruta española (src/content.config.ts; lo prueba e2e/datos.spec.ts).
 */
export const caseRoutes: readonly Route[] = routes.filter((route) =>
  /^\/(trabajo|proyectos)\//.test(route.es.path),
);

/** El slug de una ficha: el último trozo de su ruta española (/trabajo/missphone → missphone). */
export const caseSlugOf = (route: Route): string => route.es.path.split('/').pop() ?? '';

/** La ruta de una página en un idioma; si la inglesa aún no está viva, la española. */
export const pathFor = (key: RouteKey, lang: Lang): string => {
  const route = byKey(key);
  return lang === 'en' && route.en.live ? route.en.path : route.es.path;
};

/** El enlace a una sección de la portada: la del idioma si está viva; si no, la española. */
export const sectionHref = (section: NavSection, lang: Lang): string => {
  const target: Lang = lang === 'en' && byKey('home').en.live ? 'en' : 'es';
  return `${pathFor('home', target)}#${ui[target].sectionIds[section]}`;
};

// Con build.format 'preserve', Astro.url.pathname lleva el .html (/trabajo/missphone.html,
// /en/404.html) y el índice sale como / o /en/: se quita el .html para compararla con las de aquí.
const publicPath = (pathname: string): string =>
  pathname.replace(/\.html$/, '').replace(/\/index$/, '/');

/** La página que se está pintando y su idioma, o undefined si no está en la lista. */
export const routeOf = (pathname: string): { route: Route; lang: Lang } | undefined => {
  const path = publicPath(pathname);
  for (const route of routes) {
    if (route.es.path === path) return { route, lang: 'es' };
    if (route.en.path === path) return { route, lang: 'en' };
  }
  return undefined;
};

/** Las dos versiones de una página, si las dos existen: para el hreflang y el sitemap. */
export const twinsOf = (route: Route): { es: string; en: string } | undefined =>
  route.en.live ? { es: route.es.path, en: route.en.path } : undefined;

/**
 * A dónde lleva el enlace de idioma (LangLink): la misma página en el otro idioma, o nada si aún
 * no tiene gemela viva (y entonces no se pinta). El 404 lleva a la portada del otro idioma.
 */
export const switchHrefOf = (pathname: string): string | undefined => {
  const current = routeOf(pathname);
  if (!current?.route.en.live) return undefined;
  const other: Lang = current.lang === 'es' ? 'en' : 'es';
  if (current.route.key === 'not-found') return pathFor('home', other);
  return other === 'en' ? current.route.en.path : current.route.es.path;
};
