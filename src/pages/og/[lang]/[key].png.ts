// La imagen para compartir de cada página indexable (1200 × 630), hecha en el build: el mismo
// truco que sitemap.xml.ts, un .ts en pages/ que exporta GET, pero devuelve un PNG. Satori pinta
// el árbol de abajo como SVG (el texto sale en <path>) y resvg lo pasa a PNG. Sale una por página
// e idioma desde routes.ts (dist/og/es/home.png, dist/og/en/work-missphone.png…). Es la ruta del
// estudio (~/Projects/propios/estudio-reigar/web/src/pages/og/[lang]/[key].png.ts) con el cartel
// de esta web: el título en Archivo estrecha y en caja alta, la regla cobalto de 6 px y la línea
// de debajo; en la portada, el nombre en dos líneas con el avatar al lado de «Fritz», como el héroe.
//
// Las fuentes son TTF estáticas (Satori no lee woff2 ni variables) que saca
// `python scripts/fuente.py --og`. Entran con ?inline y no se publican: con ?url Vite las copiaría
// a dist/_astro/, y new URL(…, import.meta.url) no vale (en el build apunta al trozo empaquetado,
// no a src/; Desvío 31 de la fase 4 del estudio).
//
// Los colores se leen de src/styles/tokens.css (decisión F4), del tema claro: si cambia un token,
// cambia la imagen. El avatar se lee de Avatar.astro: sus cuatro capas, pintadas con sus tokens.
//
// Todo va centrado en un eje: WhatsApp, en la vista compacta, recorta el cuadrado central
// (630 × 630, de x = 285 a 915; Desvío 35 del estudio). En la portada el cartel entero cabe en
// ese cuadrado; en las fichas, los títulos largos pierden algo por los lados.
import { Resvg } from '@resvg/resvg-js';
import type { APIRoute, GetStaticPaths } from 'astro';
import satori from 'satori';
import archivo400 from '../../../assets/fonts/archivo-400.ttf?inline';
import archivo600 from '../../../assets/fonts/archivo-600.ttf?inline';
import archivoPoster from '../../../assets/fonts/archivo-poster-800.ttf?inline';
import avatarSource from '../../../components/ui/Avatar.astro?raw';
import { OG_IMAGE, type OgText, ogImagePathOf, routes } from '../../../data/routes';
import type { Lang } from '../../../data/ui';
import tokensSource from '../../../styles/tokens.css?raw';

// ?inline da un data: en base64; Satori quiere los bytes.
const bytesOf = (dataUrl: string): Buffer => Buffer.from(dataUrl.split(',')[1] ?? '', 'base64');

const fonts = [
  { name: 'Archivo Poster', data: bytesOf(archivoPoster), weight: 800, style: 'normal' },
  { name: 'Archivo', data: bytesOf(archivo400), weight: 400, style: 'normal' },
  { name: 'Archivo', data: bytesOf(archivo600), weight: 600, style: 'normal' },
] as const;

// Los tokens del primer :root de tokens.css (el tema claro), por nombre sin los guiones.
const lightRoot = tokensSource.slice(tokensSource.indexOf(':root'), tokensSource.indexOf('@media'));
const token = (name: string): string => {
  const match = lightRoot.match(new RegExp(`--${name}:\\s*([^;]+);`));
  if (!match?.[1]) throw new Error(`og: no está el token --${name} en tokens.css`);
  return match[1].trim();
};

const COLOR_BG = token('color-bg');
const COLOR_TEXT = token('color-text');
const COLOR_TEXT_MUTED = token('color-text-muted');
const COLOR_ACCENT = token('color-accent');
const RULE_THICK = Number.parseFloat(token('rule-thick'));

// El avatar: las cuatro capas de Avatar.astro, con el color de su token (lo mismo que hace el
// <style> del componente) y en un SVG suelto que Satori pinta como imagen.
const avatarLayer = (layer: string): string[] =>
  [
    ...avatarSource.matchAll(new RegExp(`<path class="avatar-${layer}"[^>]*?\\sd="([^"]+)"`, 'g')),
  ].map((match) => match[1] ?? '');
const avatarPaths = (layer: string, attributes: string): string =>
  avatarLayer(layer)
    .map((d) => `<path d="${d}" fill-rule="evenodd" ${attributes}/>`)
    .join('');
const AVATAR_SVG = [
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">',
  `<rect width="800" height="800" fill="${token('color-avatar-sky')}"/>`,
  avatarPaths('skin', `fill="${token('color-avatar-skin')}"`),
  avatarPaths('shirt', `fill="${token('color-avatar-shirt')}"`),
  avatarPaths('hatch', `fill="${token('color-avatar-ink')}" opacity="${token('hatch-opacity')}"`),
  avatarPaths('line', `fill="${token('color-avatar-ink')}"`),
  '</svg>',
].join('');
if (avatarLayer('line').length !== 26 || avatarLayer('skin').length !== 1) {
  throw new Error('og: Avatar.astro ya no tiene las cuatro capas que se esperaban');
}
const AVATAR_SRC = `data:image/svg+xml;base64,${Buffer.from(AVATAR_SVG).toString('base64')}`;

export const getStaticPaths = (() =>
  routes.flatMap((route) =>
    (['es', 'en'] as const).flatMap((lang) => {
      const text = route.og?.[lang];
      if (!text || !ogImagePathOf(route, lang)) return [];
      return [
        { params: { lang, key: route.key }, props: { lang, text, home: route.key === 'home' } },
      ];
    }),
  )) satisfies GetStaticPaths;

// Satori recibe el árbol como los objetos que devolvería JSX: { type, props: { style, children } }.
type Node = { type: string; props: Record<string, unknown> };
const el = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({
  type,
  props: { style, children },
});

const upper = (text: string, lang: Lang): string => text.toLocaleUpperCase(lang);

// El cartel de una ficha: el título más grande cuanto más corto (en tres líneas como mucho).
const TITLE_WIDTH = 1000;
const posterSize = (title: string): number => {
  // Archivo a wdth 62 y wght 800 gasta unos 0,47 em por letra en caja alta (medido con fontTools).
  const lines = (size: number) => Math.ceil((title.length * 0.47 * size * 1.12) / TITLE_WIDTH);
  return [112, 100, 88, 76].find((size) => lines(size) <= 3) ?? 76;
};

const rule = (width: number): Node =>
  el('div', { width, height: RULE_THICK, backgroundColor: COLOR_ACCENT });

const line = (text: string, width: number): Node =>
  el(
    'div',
    {
      width,
      fontSize: 30,
      lineHeight: 1.4,
      color: COLOR_TEXT_MUTED,
      textAlign: 'center',
      justifyContent: 'center',
      textWrap: 'balance',
    },
    text,
  );

const domain = (): Node =>
  el('div', { fontSize: 24, fontWeight: 600, color: COLOR_ACCENT }, 'fritzreigar.com');

// La portada, como el héroe: «Fritz» con el avatar al lado (el avatar mide lo que una línea del
// nombre) y «Reigar» debajo, a la derecha; la regla, la línea y el dominio.
// El bloque mide lo que «Fritz» más el avatar (unos 520 px a 184): cabe en el recorte de WhatsApp.
const NAME_SIZE = 184;
const NAME_LINE = Math.round(NAME_SIZE * 0.78);
const NAME_GAP = 24;
const homeCard = (lang: Lang, text: OgText): Node => {
  const [first, ...rest] = text.title.split(' ');
  const name = (word: string, style: Record<string, unknown> = {}) =>
    el(
      'div',
      {
        fontFamily: 'Archivo Poster',
        fontSize: NAME_SIZE,
        lineHeight: 0.78,
        letterSpacing: -0.025 * NAME_SIZE,
        height: NAME_LINE,
        ...style,
      },
      upper(word, lang),
    );
  return el('div', { display: 'flex', flexDirection: 'column' }, [
    el('div', { display: 'flex', alignItems: 'flex-end' }, [
      name(first ?? ''),
      {
        type: 'img',
        props: {
          src: AVATAR_SRC,
          width: NAME_LINE,
          height: NAME_LINE,
          style: { marginLeft: NAME_GAP },
        },
      },
    ]),
    el('div', { display: 'flex', justifyContent: 'flex-end' }, [
      name(rest.join(' '), { marginTop: -0.02 * NAME_SIZE }),
    ]),
    el('div', { height: RULE_THICK, marginTop: 28, backgroundColor: COLOR_ACCENT }),
  ]);
};

const caseTitle = (lang: Lang, text: OgText): Node => {
  const size = posterSize(text.title);
  return el('div', { display: 'flex', flexDirection: 'column', alignItems: 'center' }, [
    el(
      'div',
      {
        width: TITLE_WIDTH,
        fontFamily: 'Archivo Poster',
        fontSize: size,
        lineHeight: 0.9,
        letterSpacing: -0.02 * size,
        textAlign: 'center',
        justifyContent: 'center',
        textWrap: 'balance',
      },
      upper(text.title, lang),
    ),
    el('div', { display: 'flex', marginTop: 28 }, [rule(264)]),
  ]);
};

const card = (lang: Lang, text: OgText, home: boolean): Node =>
  el(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '56px 0 44px',
      backgroundColor: COLOR_BG,
      color: COLOR_TEXT,
      fontFamily: 'Archivo',
    },
    [
      el(
        'div',
        {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1,
        },
        [
          home ? homeCard(lang, text) : caseTitle(lang, text),
          el('div', { display: 'flex', marginTop: 28 }, [line(text.description, 880)]),
        ],
      ),
      domain(),
    ],
  );

export const GET: APIRoute = async ({ props }) => {
  const { lang, text, home } = props as { lang: Lang; text: OgText; home: boolean };
  const svg = await satori(card(lang, text, home) as never, {
    width: OG_IMAGE.width,
    height: OG_IMAGE.height,
    fonts: [...fonts],
  });
  const png = new Resvg(svg).render().asPng();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
