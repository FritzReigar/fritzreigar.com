// Las fichas de la colección `cases` (src/content.config.ts), leídas por la ruta de su página:
// la ficha de una ruta es la entrada <idioma>/<slug>, y el slug es el último trozo de su ruta
// española (caseSlugOf, routes.ts). Así la portada enlaza cada tarjeta con su ficha sin escribir
// ninguna ruta a mano.
import { type CollectionEntry, getCollection, getEntry } from 'astro:content';
import { type Route, type RouteKey, caseRoutes, caseSlugOf, pathFor, routes } from './routes';
import type { Lang } from './ui';

export type CaseEntry = CollectionEntry<'cases'>;
export type CaseSection = CaseEntry['data']['section'];

const routeOfEntry = (entry: CaseEntry): Route => {
  const slug = entry.id.split('/').pop();
  const route = caseRoutes.find((candidate) => caseSlugOf(candidate) === slug);
  if (!route) throw new Error(`cases: la ficha «${entry.id}» no tiene ruta en routes.ts`);
  return route;
};

/** La ficha de una página en un idioma. */
export const getCase = async (key: RouteKey, lang: Lang): Promise<CaseEntry> => {
  const route = routes.find((candidate) => candidate.key === key);
  if (!route || !caseRoutes.includes(route)) throw new Error(`cases: «${key}» no es una ficha`);
  const id = `${lang}/${caseSlugOf(route)}`;
  const entry = await getEntry('cases', id);
  if (!entry) throw new Error(`cases: falta src/content/cases/${id}.json`);
  return entry;
};

/** Las fichas de una sección en un idioma, en su orden de la portada. */
export const getCases = async (lang: Lang, section: CaseSection): Promise<CaseEntry[]> =>
  (
    await getCollection(
      'cases',
      (entry) => entry.id.startsWith(`${lang}/`) && entry.data.section === section,
    )
  ).sort((a, b) => a.data.order - b.data.order);

/** El enlace de una tarjeta de la portada a su ficha. */
export const casePath = (entry: CaseEntry, lang: Lang): string =>
  pathFor(routeOfEntry(entry).key, lang);
