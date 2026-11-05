// El sitemap, construido desde src/data/routes.ts (el patrón del estudio): un archivo .ts en pages/
// que exporta GET es una ruta que devuelve XML, y el build lo escribe en dist/sitemap.xml.
// Primero las indexables en español, cada una con sus dos xhtml:link si ya tiene gemela viva;
// detrás, las páginas de /en/ vivas. El 404 y las gemelas sin texto no van (noindex).
import type { APIRoute } from 'astro';
import { routes, twinsOf } from '../data/routes';

const SITE = 'https://fritzreigar.com';

const alternates = (twins: { es: string; en: string } | undefined): string[] =>
  twins
    ? [
        `    <xhtml:link rel="alternate" hreflang="es" href="${SITE}${twins.es}"/>`,
        `    <xhtml:link rel="alternate" hreflang="en" href="${SITE}${twins.en}"/>`,
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${twins.es}"/>`,
      ]
    : [];

export const GET: APIRoute = () => {
  const indexable = routes.filter((route) => route.es.indexable);
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ];

  for (const route of indexable) {
    lines.push(
      '  <url>',
      `    <loc>${SITE}${route.es.path}</loc>`,
      `    <lastmod>${route.es.lastmod}</lastmod>`,
      `    <changefreq>${route.es.changefreq}</changefreq>`,
      `    <priority>${route.es.priority}</priority>`,
      ...alternates(twinsOf(route)),
      '  </url>',
    );
  }

  for (const route of indexable.filter((candidate) => candidate.en.live)) {
    lines.push(
      '  <url>',
      `    <loc>${SITE}${route.en.path}</loc>`,
      `    <lastmod>${route.en.lastmod}</lastmod>`,
      ...alternates(twinsOf(route)),
      '  </url>',
    );
  }

  lines.push('</urlset>', '');
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'application/xml' } });
};
