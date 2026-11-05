// Las capturas que enseña la web, una vez: la clave, la imagen y su `alt` por idioma (decisión F1
// de plan/fase-2.md). Las WebP maestras las escribe scripts/capturas.py desde docs/capturas/; los
// `alt` son los de plan/capturas.md, tal cual. La colección `cases` (src/content.config.ts) y la
// portada (src/data/home.ts) las nombran por su clave, y Zod tumba el build si una clave no está
// aquí. En las bandas de la portada van con alt="" (plan/spec-visual.md § 6.1): eso lo decide el
// componente (Shot, con `decorative`), no el dato. El `alt` inglés llega en la 2.8.
import type { ImageMetadata } from 'astro';
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
  alt: { es: string; en?: string };
}

const define = <const T extends Record<string, ShotData>>(entries: T): T => entries;

export const shots = define({
  'estudio-reigar-desktop': {
    image: estudioDesktop,
    alt: {
      es: 'Portada de estudioreigar.com en el ordenador: un cartel azul colgado que dice «Abierto, también en Google» y el titular «Tu negocio lleva años abierto. En internet, todavía no».',
    },
  },
  'estudio-reigar-mobile': {
    image: estudioMobile,
    alt: {
      es: 'La misma portada en el móvil: el cartel arriba, el titular debajo y el botón para pedir el diagnóstico gratis.',
    },
  },
  'missphone-desktop': {
    image: missphoneDesktop,
    alt: {
      es: 'Portada de la tienda online de Missphone en el ordenador: fundas rosas sobre tela, el titular «Fundas personalizadas y accesorios para móvil en Benetússer» y el botón «Diseña tu funda».',
    },
  },
  'missphone-mobile': {
    image: missphoneMobile,
    alt: {
      es: 'La misma portada en el móvil: la foto de las fundas arriba, el titular y los dos botones debajo.',
    },
  },
  'missphone-before-home-desktop': {
    image: missphoneBeforeHomeDesktop,
    alt: {
      es: 'Antes: la cabecera de la portada de Missphone era una sola imagen, con «Fundas personalizadas» y un botón «Click aquí» dibujados dentro.',
    },
  },
  'missphone-after-home-desktop': {
    image: missphoneAfterHomeDesktop,
    alt: {
      es: 'Después: la cabecera con el titular «Fundas personalizadas y accesorios para móvil en Benetússer», los botones «Diseña tu funda» y «Ver los accesorios» y la nota de Google.',
    },
  },
  'missphone-before-home-mobile': {
    image: missphoneBeforeHomeMobile,
    alt: {
      es: 'Antes, en el móvil: la misma imagen de cabecera encogida, con el texto y el botón demasiado pequeños para leerse.',
    },
  },
  'missphone-after-home-mobile': {
    image: missphoneAfterHomeMobile,
    alt: {
      es: 'Después, en el móvil: la foto de las fundas arriba y, debajo, el titular, los dos botones y la nota de Google, a tamaño de móvil.',
    },
  },
  'missphone-before-categories': {
    image: missphoneBeforeCategories,
    alt: {
      es: 'Antes: las categorías de la portada, con el nombre de cada una montado sobre su foto y a veces encima del producto.',
    },
  },
  'missphone-after-categories': {
    image: missphoneAfterCategories,
    alt: {
      es: 'Después: tarjetas de categoría con la foto a la izquierda y, a su lado, el nombre y el precio desde el que empieza; la de fundas, el doble de ancha.',
    },
  },
  'missphone-before-cases-page': {
    image: missphoneBeforeCasesPage,
    alt: {
      es: 'Antes: la página de fundas, con cuatro párrafos en gris sobre una foto de fundas que no se leen.',
    },
  },
  'missphone-after-cases-page': {
    image: missphoneAfterCasesPage,
    alt: {
      es: 'Después: la página de fundas abre con una cabecera de color, el titular, dos líneas, el botón «Hazla con tu foto» y la foto enmarcada.',
    },
  },
  'missphone-before-home-lower': {
    image: missphoneBeforeHomeLower,
    alt: {
      es: 'Antes: más abajo en la portada, un bloque de accesorios con el texto en gris sobre una foto oscura, casi invisible.',
    },
  },
  'missphone-after-home-lower': {
    image: missphoneAfterHomeLower,
    alt: {
      es: 'Después: en ese sitio, el bloque «La tienda, en Benetússer», con la dirección, la foto del local y los botones para llamar y para llegar.',
    },
  },
  'limpiezas-artemisa-desktop': {
    image: artemisaDesktop,
    alt: {
      es: 'Portada de limpiezasartemisa.com en el ordenador: fondo azul noche, el titular «La limpieza bien hecha se nota al entrar», los botones de presupuesto y de WhatsApp y la foto de un salón limpio.',
    },
  },
  'limpiezas-artemisa-mobile': {
    image: artemisaMobile,
    alt: {
      es: 'La misma portada en el móvil: el titular, los dos botones y la foto debajo.',
    },
  },
  'snugtone-library': {
    image: snugtoneLibrary,
    alt: {
      es: 'Snugtone en tema oscuro: la vista de discos con sus portadas, la cola a la derecha y el reproductor abajo.',
    },
  },
  'snugtone-search': {
    image: snugtoneSearch,
    alt: {
      es: 'Snugtone en tema claro: la búsqueda «format:mp3 duration:>2:30» acota la biblioteca a 11 pistas.',
    },
  },
  'snugtone-equalizer': {
    image: snugtoneEqualizer,
    alt: {
      es: 'El ecualizador de diez bandas de Snugtone, con el preamplificador y el aviso de que subir bandas puede saturar.',
    },
  },
  'snugtone-musicbrainz': {
    image: snugtoneMusicbrainz,
    alt: {
      es: 'La búsqueda de etiquetas en MusicBrainz: varias ediciones de las Variaciones Goldberg, ordenadas por cuántas pistas coinciden.',
    },
  },
  'snugport-desktop': {
    image: snugportDesktop,
    alt: {
      es: 'Landing de Snugport en el ordenador: el titular «Cronómetro, tareas, clientes y vencimientos. Todo tu trabajo freelance en una sola página» y, debajo, el panel con el cronómetro, lo siguiente y las tareas del día.',
    },
  },
  'snugport-mobile': {
    image: snugportMobile,
    alt: {
      es: 'La misma landing en el móvil: el titular, los botones «Abrir el panel» y «Ver precios» y el panel asomando debajo.',
    },
  },
  galaxian: {
    image: galaxianGameplay,
    alt: {
      es: 'CPP-Galaxian-Engine en marcha: la formación de naves enemigas arriba, la nave del jugador abajo y los marcadores sobre fondo negro.',
    },
  },
});

export type ShotKey = keyof typeof shots;

export const shotKeys = Object.keys(shots) as [ShotKey, ...ShotKey[]];
