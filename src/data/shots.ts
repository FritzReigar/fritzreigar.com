// Las capturas que enseña la web, una vez: la clave, la imagen y su `alt` por idioma (decisión F1
// de plan/fase-2.md). Las WebP maestras las escribe scripts/capturas.py desde docs/capturas/; los
// `alt` son los de plan/capturas.md, tal cual. La colección `cases` (src/content.config.ts) y la
// portada (src/data/home.ts) las nombran por su clave, y Zod tumba el build si una clave no está
// aquí. En las bandas de la portada van con alt="" (plan/spec-visual.md § 6.1): eso lo decide el
// componente (Shot, con `decorative`), no el dato. Los `alt` ingleses son los de
// plan/contenido-en.md.
import type { ImageMetadata } from 'astro';
import type { Lang } from './ui';
import estudioDesktop from '../assets/shots/estudio-reigar/desktop.webp';
import estudioMobile from '../assets/shots/estudio-reigar/mobile.webp';
import galaxianGameplay from '../assets/shots/galaxian/gameplay.webp';
import artemisaDesktop from '../assets/shots/limpiezas-artemisa/desktop.webp';
import artemisaMobile from '../assets/shots/limpiezas-artemisa/mobile.webp';
import missphoneAfterCasesPage from '../assets/shots/missphone/after/cases-page.webp';
import missphoneAfterCategories from '../assets/shots/missphone/after/categories.webp';
import missphoneAfterHomeDesktop from '../assets/shots/missphone/after/home-desktop.webp';
import missphoneAfterHomeLower from '../assets/shots/missphone/after/home-lower.webp';
import missphoneAfterHomeMobile from '../assets/shots/missphone/after/home-mobile.webp';
import missphoneBeforeCasesPage from '../assets/shots/missphone/before/cases-page.webp';
import missphoneBeforeCategories from '../assets/shots/missphone/before/categories.webp';
import missphoneBeforeHomeDesktop from '../assets/shots/missphone/before/home-desktop.webp';
import missphoneBeforeHomeLower from '../assets/shots/missphone/before/home-lower.webp';
import missphoneBeforeHomeMobile from '../assets/shots/missphone/before/home-mobile.webp';
import missphoneDesktop from '../assets/shots/missphone/desktop.webp';
import missphoneMobile from '../assets/shots/missphone/mobile.webp';
import snugportDesktop from '../assets/shots/snugport/desktop.webp';
import snugportMobile from '../assets/shots/snugport/mobile.webp';
import snugtoneEqualizer from '../assets/shots/snugtone/equalizer.webp';
import snugtoneLibrary from '../assets/shots/snugtone/library.webp';
import snugtoneMusicbrainz from '../assets/shots/snugtone/musicbrainz.webp';
import snugtoneSearch from '../assets/shots/snugtone/search.webp';

export interface ShotData {
  image: ImageMetadata;
  alt: Record<Lang, string>;
}

const define = <const T extends Record<string, ShotData>>(entries: T): T => entries;

export const shots = define({
  'estudio-reigar-desktop': {
    image: estudioDesktop,
    alt: {
      es: 'Portada de estudioreigar.com en el ordenador: un cartel azul colgado que dice «Abierto, también en Google» y el titular «Tu negocio lleva años abierto. En internet, todavía no».',
      en: 'The estudioreigar.com home page on a computer: a blue hanging sign that reads «Abierto, también en Google» (open, on Google too) and the headline «Tu negocio lleva años abierto. En internet, todavía no» (your business has been open for years; online, not yet).',
    },
  },
  'estudio-reigar-mobile': {
    image: estudioMobile,
    alt: {
      es: 'La misma portada en el móvil: el cartel arriba, el titular debajo y el botón para pedir el diagnóstico gratis.',
      en: 'The same home page on a phone: the sign at the top, the headline below and the button to ask for the free check-up.',
    },
  },
  'missphone-desktop': {
    image: missphoneDesktop,
    alt: {
      es: 'Portada de la tienda online de Missphone en el ordenador: fundas rosas sobre tela, el titular «Fundas personalizadas y accesorios para móvil en Benetússer» y el botón «Diseña tu funda».',
      en: "The Missphone online store's home page on a computer: pink phone cases on fabric, the headline «Fundas personalizadas y accesorios para móvil en Benetússer» (custom phone cases and accessories in Benetússer) and the «Diseña tu funda» (design your case) button.",
    },
  },
  'missphone-mobile': {
    image: missphoneMobile,
    alt: {
      es: 'La misma portada en el móvil: la foto de las fundas arriba, el titular y los dos botones debajo.',
      en: 'The same home page on a phone: the photo of the cases at the top, with the headline and the two buttons below.',
    },
  },
  'missphone-before-home-desktop': {
    image: missphoneBeforeHomeDesktop,
    alt: {
      es: 'Antes: la cabecera de la portada de Missphone era una sola imagen, con «Fundas personalizadas» y un botón «Click aquí» dibujados dentro.',
      en: 'Before: the Missphone home page header was a single image, with «Fundas personalizadas» (custom cases) and a «Click aquí» (click here) button drawn into it.',
    },
  },
  'missphone-after-home-desktop': {
    image: missphoneAfterHomeDesktop,
    alt: {
      es: 'Después: la cabecera con el titular «Fundas personalizadas y accesorios para móvil en Benetússer», los botones «Diseña tu funda» y «Ver los accesorios» y la nota de Google.',
      en: 'After: the header with the headline «Fundas personalizadas y accesorios para móvil en Benetússer», the «Diseña tu funda» and «Ver los accesorios» (design your case, see the accessories) buttons and the Google rating.',
    },
  },
  'missphone-before-home-mobile': {
    image: missphoneBeforeHomeMobile,
    alt: {
      es: 'Antes, en el móvil: la misma imagen de cabecera encogida, con el texto y el botón demasiado pequeños para leerse.',
      en: 'Before, on a phone: the same header image shrunk, with the text and the button too small to read.',
    },
  },
  'missphone-after-home-mobile': {
    image: missphoneAfterHomeMobile,
    alt: {
      es: 'Después, en el móvil: la foto de las fundas arriba y, debajo, el titular, los dos botones y la nota de Google, a tamaño de móvil.',
      en: 'After, on a phone: the photo of the cases at the top and, below it, the headline, the two buttons and the Google rating, sized for a phone.',
    },
  },
  'missphone-before-categories': {
    image: missphoneBeforeCategories,
    alt: {
      es: 'Antes: las categorías de la portada, con el nombre de cada una montado sobre su foto y a veces encima del producto.',
      en: 'Before: the categories on the home page, with each name set over its photo and sometimes on top of the product.',
    },
  },
  'missphone-after-categories': {
    image: missphoneAfterCategories,
    alt: {
      es: 'Después: tarjetas de categoría con la foto a la izquierda y, a su lado, el nombre y el precio desde el que empieza; la de fundas, el doble de ancha.',
      en: 'After: category cards with the photo on the left and, beside it, the name and the starting price; the phone cases card is twice as wide.',
    },
  },
  'missphone-before-cases-page': {
    image: missphoneBeforeCasesPage,
    alt: {
      es: 'Antes: la página de fundas, con cuatro párrafos en gris sobre una foto de fundas que no se leen.',
      en: 'Before: the phone cases page, with four paragraphs of gray text over a photo of cases, impossible to read.',
    },
  },
  'missphone-after-cases-page': {
    image: missphoneAfterCasesPage,
    alt: {
      es: 'Después: la página de fundas abre con una cabecera de color, el titular, dos líneas, el botón «Hazla con tu foto» y la foto enmarcada.',
      en: 'After: the phone cases page opens with a colored header, the headline, two lines of text, the «Hazla con tu foto» (make it with your photo) button and the framed photo.',
    },
  },
  'missphone-before-home-lower': {
    image: missphoneBeforeHomeLower,
    alt: {
      es: 'Antes: más abajo en la portada, un bloque de accesorios con el texto en gris sobre una foto oscura, casi invisible.',
      en: 'Before: further down the home page, an accessories block with gray text over a dark photo, almost invisible.',
    },
  },
  'missphone-after-home-lower': {
    image: missphoneAfterHomeLower,
    alt: {
      es: 'Después: en ese sitio, el bloque «La tienda, en Benetússer», con la dirección, la foto del local y los botones para llamar y para llegar.',
      en: 'After: in that spot, the «La tienda, en Benetússer» (the shop, in Benetússer) block, with the address, a photo of the shop and buttons to call and get directions.',
    },
  },
  'limpiezas-artemisa-desktop': {
    image: artemisaDesktop,
    alt: {
      es: 'Portada de limpiezasartemisa.com en el ordenador: fondo azul noche, el titular «La limpieza bien hecha se nota al entrar», los botones de presupuesto y de WhatsApp y la foto de un salón limpio.',
      en: 'The limpiezasartemisa.com home page on a computer: a midnight-blue background, the headline «La limpieza bien hecha se nota al entrar» (good cleaning shows the moment you walk in), the quote and WhatsApp buttons and a photo of a clean living room.',
    },
  },
  'limpiezas-artemisa-mobile': {
    image: artemisaMobile,
    alt: {
      es: 'La misma portada en el móvil: el titular, los dos botones y la foto debajo.',
      en: 'The same home page on a phone: the headline, the two buttons and the photo below.',
    },
  },
  'snugtone-library': {
    image: snugtoneLibrary,
    alt: {
      es: 'Snugtone en tema oscuro: la vista de discos con sus portadas, la cola a la derecha y el reproductor abajo.',
      en: 'Snugtone in the dark theme: the album view with its covers, the queue on the right and the player at the bottom.',
    },
  },
  'snugtone-search': {
    image: snugtoneSearch,
    alt: {
      es: 'Snugtone en tema claro: la búsqueda «format:mp3 duration:>2:30» acota la biblioteca a 11 pistas.',
      en: 'Snugtone in the light theme: the search «format:mp3 duration:>2:30» narrows the library down to 11 tracks.',
    },
  },
  'snugtone-equalizer': {
    image: snugtoneEqualizer,
    alt: {
      es: 'El ecualizador de diez bandas de Snugtone, con el preamplificador y el aviso de que subir bandas puede saturar.',
      en: "Snugtone's ten-band equalizer, with the preamp and the warning that boosting bands can clip.",
    },
  },
  'snugtone-musicbrainz': {
    image: snugtoneMusicbrainz,
    alt: {
      es: 'La búsqueda de etiquetas en MusicBrainz: varias ediciones de las Variaciones Goldberg, ordenadas por cuántas pistas coinciden.',
      en: 'The MusicBrainz tag search: several releases of the Goldberg Variations, sorted by how many tracks match.',
    },
  },
  'snugport-desktop': {
    image: snugportDesktop,
    alt: {
      es: 'Landing de Snugport en el ordenador: el titular «Cronómetro, tareas, clientes y vencimientos. Todo tu trabajo freelance en una sola página» y, debajo, el panel con el cronómetro, lo siguiente y las tareas del día.',
      en: "The Snugport landing page on a computer: the headline «Cronómetro, tareas, clientes y vencimientos. Todo tu trabajo freelance en una sola página» (timer, tasks, clients and deadlines: all your freelance work on one page) and, below it, the panel with the timer, what's next and the day's tasks.",
    },
  },
  'snugport-mobile': {
    image: snugportMobile,
    alt: {
      es: 'La misma landing en el móvil: el titular, los botones «Abrir el panel» y «Ver precios» y el panel asomando debajo.',
      en: 'The same landing page on a phone: the headline, the «Abrir el panel» and «Ver precios» (open the panel, see pricing) buttons and the panel peeking out below.',
    },
  },
  galaxian: {
    image: galaxianGameplay,
    alt: {
      es: 'CPP-Galaxian-Engine en marcha: la formación de naves enemigas arriba, la nave del jugador abajo y los marcadores sobre fondo negro.',
      en: "CPP-Galaxian-Engine running: the enemy formation at the top, the player's ship at the bottom and the scores on a black background.",
    },
  },
});

export type ShotKey = keyof typeof shots;

export const shotKeys = Object.keys(shots) as [ShotKey, ...ShotKey[]];
