# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es

Portfolio personal de Fritz (fritzreigar.com). Sitio estático de una sola página: `index.html` + `css/styles.css` + `js/` (`theme.js`, `i18n.js`, `form.js`, `nav.js`, `reveal.js`). Sin framework, sin build, sin dependencias, sin tests.

**Nombre profesional: Fritz Reigar** — es el que va en todo el contenido público del sitio (el nombre real, Fritz Reif Garcia, solo aparece en la URL de LinkedIn).

## Desarrollo y deploy

- No hay comandos de build ni lint. Para ver cambios en local basta abrir `index.html` en el navegador, o servirlo con `python -m http.server`.
- Remote: `https://github.com/FritzReigar/fritzreigar.com.git`, rama `main`. El deploy sale de pushear a `main` (la configuración de hosting no vive en este repo).
- **Ojo con la caché**: tras un push, `fritzreigar.com` puede seguir sirviendo el HTML anterior durante horas — el edge de Cloudflare lo cachea (`cf-cache-status: HIT`) pese al `Cache-Control: max-age=0, must-revalidate`. No es un deploy fallido: se comprueba con `curl -sI https://fritzreigar.com` frente a la misma URL con `?nocache=1`. Se arregla purgando la caché desde el panel de Cloudflare.

## Arquitectura

- **Theming**: variables CSS definidas en `:root` (tema claro, el por defecto) y sobreescritas en `html.dark`. Un script inline en el `<head>` aplica el tema guardado antes del primer pintado (evita parpadeo); `js/theme.js` conecta el botón y persiste la preferencia en `localStorage` (clave `fritzreigar-theme`). Cualquier color nuevo debe entrar como variable con valor en ambos temas, nunca hardcodeado.
- **Bilingüe ES/EN**: el español es el idioma por defecto y vive directamente en el HTML; el inglés está en el diccionario `EN` de `js/i18n.js`. Los elementos traducibles llevan `data-i18n="clave"` (texto), `data-i18n-ph="clave"` (placeholders) o `data-i18n-alt="clave"` (textos alternativos de imagen). Los enlaces al CV llevan `data-cv` y ninguna clave: se les reescribe el `href` al PDF del idioma activo. Al añadir contenido nuevo hay que añadir su clave y traducción al diccionario. Prioridad al elegir idioma: `?lang=es|en` en la URL > `localStorage` (clave `fritzreigar-lang`) > `navigator.language`. Al cambiar a inglés se añade `?lang=en` a la URL con `replaceState`, para poder compartir el enlace ya traducido.
- **Secciones** de `index.html`, en este orden: hero, experiencia, proyectos, stack y formación, servicios y contacto (formulario Formspree), más header sticky con nav y footer. La numeración `01`–`05` de `.section-kicker` es manual: si se reordenan las secciones hay que renumerarlas a mano.
- **Navegación**: `js/nav.js` lleva el menú hamburguesa en móvil y marca con `.is-active` el enlace de la sección visible (IntersectionObserver).
- **Aparición al hacer scroll**: `js/reveal.js` anima los bloques de primer nivel de cada sección. El estado oculto solo se aplica bajo `html.js-reveal`, que añade el propio script: sin JS el contenido sigue visible. No animar `.card` ni `.experience-item`, porque el `transform` del reveal pisaría el de `:hover`.
- **SEO/social**: meta tags, Open Graph, Twitter Card y JSON-LD (`@graph` con `ProfilePage` + `Person`) en el `<head>`, en español. `title` y `meta description` también se traducen vía `js/i18n.js`. Imagen de preview y favicons en `assets/img/`. No hay `hreflang`: el inglés no tiene URL propia servida, así que declararlo sería falso.

## Posicionamiento del contenido

El sitio está orientado a **reclutadores**: el hero y las primeras secciones venden el perfil de desarrollador backend (Java/C++/SQL) y QA de modelos de IA (Lionbridge, DataAnnotation), y los servicios web freelance para negocios (WordPress/WooCommerce, Google Business Profile, dominios/hosting) van después, como línea paralela real pero secundaria. Estética: minimal profesional — nada de neones, glow ni jerga de terminal.

## Proyecto principal: Snugport

Snugport es el proyecto insignia y abre la sección de proyectos como tarjeta destacada. Se escribe **Snugport** (no «SnugPort»). El repo del producto vive aparte; el resumen de handoff que sirvió para escribir la ficha está en `docs/RESUMEN-PARA-PORTFOLIO.md` (gitignored).

Lo que se puede afirmar (verificado contra el repo `~/Projects/propios/snugport-app` y la web en agosto de 2026): producto en el mercado, sync multidispositivo validado Mac↔Windows, auth completa, **Stripe en producción** con webhook propio y precios públicos (€4,99/mes o €29,99 primer año), muro de suscripción a nivel de RLS de Postgres, PWA instalable con service worker, 4 temas, accesibilidad auditada, offline-first, bilingüe ES/EN, 80 divisas, cero dependencias (no hay `package.json`), ~28.800 líneas, 124 archivos, 13 secciones, v2.26. Las cuatro Edge Functions son ~800 líneas de **TypeScript** sobre Deno, y el webhook de Stripe verifica la firma con HMAC-SHA256 y Web Crypto sin el SDK de Stripe.

Ojo con «cero build»: existe `build.sh`, pero es un script de copia para Cloudflare Pages, no un bundler. La formulación exacta es «sin bundler ni transpilación».

El enlace del sitio y del CV apunta a `https://snugport.app/`, que es el destino vivo. Si vuelve a cambiar, hay que tocarlo en **los dos sitios a la vez** — `index.html` y `docs/cv/cv-es.html`, donde además el texto visible del enlace debe coincidir con el destino. Lo que **no** se puede afirmar: cifras de usuarios registrados, suscriptores o ingresos — no son verificables desde fuera y Fritz no las ha dado. Gimnasio y Comidas tampoco cuentan como features: no están en el producto público. Finanzas y Horario **sí** se pueden contar desde agosto de 2026, ya salen en la landing. El branding está cerrado: no proponer rediseños de marca.

## El CV

El CV vive en `docs/cv/cv-es.html` y `docs/cv/cv-en.html` (los dos gitignored): HTML pensados para imprimirse a PDF desde el navegador, con la misma tipografía y acento que el sitio.

**`cv-en.html` está generado**: su `<head>` entero es copia del de `cv-es.html`, para que los estilos no puedan divergir. Si se toca el diseño, se toca en el español y se regenera el inglés; si se toca el contenido, hay que tocar los dos.

Cada uno ocupa **dos páginas A4 justas** y el margen es real: en agosto de 2026 añadir cinco líneas lo mandó a una tercera. Se comprueba sin abrir el navegador, renderizando y contando páginas:

```bash
chrome --headless --no-pdf-header-footer --print-to-pdf=out.pdf file:///.../cv-es.html
python -c "import re,io; print(re.findall(rb'/Count\s+(\d+)', io.open('out.pdf','rb').read()))"
```

Si se desborda, el resorte es `line-height` en `body` (está en 1.34; a 1.38 ya no cabe), antes que recortar contenido. `docs/CV_Fritz_Reif_Dev_Text.pdf` es la versión vieja, anterior al giro a backend-first; se conserva solo como referencia.

**Web y CV comparten contenido y tienen que cuadrar**: mismo orden de puestos, mismos bullets, mismos proyectos, mismos niveles de idioma. Si se toca uno, se revisa el otro — una discrepancia la detecta cualquier reclutador.

Niveles de idioma vigentes, fijados por Fritz: español nativo, valenciano C1, **inglés C1**, **alemán A2** (dejó la EOI en 2026; no mencionarla). El CV viejo (`docs/CV_Fritz_Reif_Dev_Text.pdf`) dice B2+ para inglés; está desactualizado, no sirve de referencia para esto. El puesto de 2019 en el Ayuntamiento sí fueron **prácticas** y así debe seguir.

La formación va **sin fechas** en los dos sitios, por decisión suya; el DAM conserva «En curso» porque es estado, no fecha. Fritz está repitiendo asignaturas de primero, así que «En curso» seguirá un tiempo: no lo cambies a titulado ni lo dejes sin estado — sin estado se lee como que tiene el título.

## Archivos aportados a mano

- `assets/cv/fritz-reigar-cv.pdf` y `assets/cv/fritz-reigar-cv-en.pdf` — los PDF exportados desde `docs/cv/cv-es.html` y `docs/cv/cv-en.html`. Los enlazan el botón del header, el CTA principal del hero y el footer, y `js/i18n.js` conmuta entre ellos según el idioma activo. Al cambiar cualquier CV hay que reexportar **los dos**.
- `assets/img/proyectos/*.webp` — las capturas de las tarjetas de proyecto, todas normalizadas a 1200×675 (16:9) para que `object-fit: cover` no recorte de forma distinta en cada una. Snugport y DragonQuestHispano son capturas de la web viva; Galaxian y Unity, fotogramas sacados del `gameplay_preview.gif` de sus repos de GitHub. Missphone y Limpiezas Artemisa **no llevan imagen** a propósito: la tienda no la hizo Fritz y la web de Artemisa aún no está en su dominio.
- `assets/img/fritz.jpg` — retrato del hero, cuadrado (recomendado 640×640). **Todavía no existe**: mientras falte, un `onerror` retira la figura y el hero queda a una columna sin romperse.
