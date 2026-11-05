// @ts-check
import { defineConfig } from 'astro/config';

// Copia del estudio (~/Projects/propios/estudio-reigar/web/astro.config.mjs), tanda 1.5.
// Vite deja su marca interna /*$vite$:1*/ al final de la hoja cuando cssCodeSplit es false.
// dist/ va sin comentarios: se quita aquí.
/** @type {import('vite').Plugin} */
const stripViteCssMarker = {
  name: 'strip-vite-css-marker',
  enforce: 'post',
  generateBundle(_options, bundle) {
    for (const file of Object.values(bundle)) {
      if (
        file.type === 'asset' &&
        file.fileName.endsWith('.css') &&
        typeof file.source === 'string'
      ) {
        file.source = file.source.replace(/\/\*\$vite\$:\d+\*\//g, '');
      }
    }
  },
};

export default defineConfig({
  site: 'https://fritzreigar.com',
  // El HTML sale byte a byte como se escribe: 'jsx' se come el espacio antes de un enlace que
  // empieza en otra línea.
  compressHTML: false,
  build: {
    // /trabajo/missphone.html se sirve como /trabajo/missphone, como en el estudio.
    format: 'preserve',
    // Una hoja pequeña se incrustaría como <style> y la CSP (style-src 'self') la bloquearía.
    inlineStylesheets: 'never',
  },
  // Los <style> de los componentes no suman especificidad.
  scopedStyleStrategy: 'where',
  vite: {
    build: {
      // Un <script> de menos de 4 KB se incrustaría en el HTML y la CSP lo bloquearía.
      assetsInlineLimit: 0,
      // Una sola hoja para toda la web.
      cssCodeSplit: false,
    },
    plugins: [stripViteCssMarker],
  },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
