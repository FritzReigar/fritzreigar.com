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
- **Bilingüe ES/EN**: el español es el idioma por defecto y vive directamente en el HTML; el inglés está en el diccionario `EN` de `js/i18n.js`. Los elementos traducibles llevan `data-i18n="clave"` (texto) o `data-i18n-ph="clave"` (placeholders). Al añadir contenido nuevo hay que añadir su clave y traducción al diccionario. Prioridad al elegir idioma: `?lang=es|en` en la URL > `localStorage` (clave `fritzreigar-lang`) > `navigator.language`. Al cambiar a inglés se añade `?lang=en` a la URL con `replaceState`, para poder compartir el enlace ya traducido.
- **Secciones** de `index.html`, en este orden: hero, experiencia, proyectos, stack y formación, servicios y contacto (formulario Formspree), más header sticky con nav y footer. La numeración `01`–`05` de `.section-kicker` es manual: si se reordenan las secciones hay que renumerarlas a mano.
- **Navegación**: `js/nav.js` lleva el menú hamburguesa en móvil y marca con `.is-active` el enlace de la sección visible (IntersectionObserver).
- **Aparición al hacer scroll**: `js/reveal.js` anima los bloques de primer nivel de cada sección. El estado oculto solo se aplica bajo `html.js-reveal`, que añade el propio script: sin JS el contenido sigue visible. No animar `.card` ni `.experience-item`, porque el `transform` del reveal pisaría el de `:hover`.
- **SEO/social**: meta tags, Open Graph, Twitter Card y JSON-LD (`@graph` con `ProfilePage` + `Person`) en el `<head>`, en español. `title` y `meta description` también se traducen vía `js/i18n.js`. Imagen de preview y favicons en `assets/img/`. No hay `hreflang`: el inglés no tiene URL propia servida, así que declararlo sería falso.

## Posicionamiento del contenido

El sitio está orientado a **reclutadores**: el hero y las primeras secciones venden el perfil de desarrollador backend (Java/C++/Spring Boot) y QA de modelos de IA (Lionbridge, DataAnnotation), y los servicios web freelance para negocios (WordPress/WooCommerce, Google Business Profile, dominios/hosting) van después, como línea paralela real pero secundaria. Estética: minimal profesional — nada de neones, glow ni jerga de terminal.

## Proyecto principal: Snugport

Snugport es el proyecto insignia y abre la sección de proyectos como tarjeta destacada. Se escribe **Snugport** (no «SnugPort»). El repo del producto vive aparte, en `~/Projects/propios/panel-de-control`; el resumen de handoff que sirvió para escribir la ficha está en `docs/RESUMEN-PARA-PORTFOLIO.md` (gitignored).

Lo que se puede afirmar: app desplegada, sync multidispositivo validado Mac↔Windows, auth completa, muro de suscripción a nivel de RLS de Postgres, 4 temas, accesibilidad auditada, offline-first, cero dependencias, ~8.200 líneas, 10 secciones.

El enlace del sitio y del CV apunta a `https://panel-de-control-5j7.pages.dev/`, que es el destino vivo. El dominio definitivo será `snugport.app`: cuando esté vinculado a Cloudflare Pages hay que cambiarlo en **los dos sitios a la vez** — `index.html` (hay un comentario marcándolo) y `docs/cv/cv-es.html`, donde además el texto visible del enlace debe coincidir con el destino. Lo que **no** se puede afirmar: que ya cobra clientes, que hay usuarios pagando, que Stripe está en producción, ni contar Finanzas/Horario/Gimnasio/Comidas como features. El branding está cerrado: no proponer rediseños de marca.

## El CV

El CV vive en `docs/cv/cv-es.html` (gitignored): un HTML pensado para imprimirse a PDF desde el navegador, con la misma tipografía y acento que el sitio. Ocupa dos páginas A4 justas — al añadir contenido hay que comprobar que no se va a una tercera. `docs/CV_Fritz_Reif_Dev_Text.pdf` es la versión vieja, anterior al giro a backend-first; se conserva solo como referencia.

**Web y CV comparten contenido y tienen que cuadrar**: mismo orden de puestos, mismos bullets, mismos proyectos, mismos niveles de idioma. Si se toca uno, se revisa el otro — una discrepancia la detecta cualquier reclutador.

Niveles de idioma vigentes, fijados por Fritz: español nativo, valenciano C1, **inglés C1**, **alemán B1**. El CV viejo (`docs/CV_Fritz_Reif_Dev_Text.pdf`) dice B2+ y A2; está desactualizado, no sirve de referencia para esto. El puesto de 2019 en el Ayuntamiento sí fueron **prácticas** y así debe seguir.

La formación va **sin fechas** en los dos sitios, por decisión suya; el DAM conserva «En curso» porque es estado, no fecha.

## Archivos aportados a mano

- `assets/cv/fritz-reigar-cv.pdf` — el PDF exportado desde `docs/cv/cv-es.html`. Lo enlazan el botón del header, el CTA principal del hero y el footer. Al cambiar el CV hay que reexportarlo y sobrescribirlo aquí.
- `assets/img/fritz.jpg` — retrato del hero, cuadrado (recomendado 640×640). **Todavía no existe**: mientras falte, un `onerror` retira la figura y el hero queda a una columna sin romperse.
