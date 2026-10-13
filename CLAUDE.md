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
- **Secciones** de `index.html`, en este orden: hero, experiencia, proyectos, stack y formación, servicios y contacto (formulario Formspree), más header sticky con nav y footer. Las secciones no van numeradas: la cabecera de sección es la regla gruesa superior + `h2` en caja alta (lo dibuja el CSS del `h2`, sin markup extra).
- **Navegación**: `js/nav.js` lleva el menú hamburguesa en móvil y marca con `.is-active` el enlace de la sección visible (IntersectionObserver).
- **Aparición al hacer scroll**: `js/reveal.js` anima los bloques de primer nivel de cada sección. El estado oculto solo se aplica bajo `html.js-reveal`, que añade el propio script: sin JS el contenido sigue visible. No animar `.card` ni `.experience-item`, porque el `transform` del reveal pisaría el de `:hover`.
- **SEO/social**: meta tags, Open Graph, Twitter Card y JSON-LD (`@graph` con `ProfilePage` + `Person`) en el `<head>`, en español. `title` y `meta description` también se traducen vía `js/i18n.js`. Imagen de preview y favicons en `assets/img/`. No hay `hreflang`: el inglés no tiene URL propia servida, así que declararlo sería falso.

## Posicionamiento del contenido

El sitio está orientado a **reclutadores** y vende el perfil de **desarrollador web y de producto** (desde octubre de 2026; antes era backend Java/C++/SQL y eso ya no es titular): Snugport como producto propio a la venta y en migración a React/TypeScript/Tailwind con tests, webs y tiendas de punta a punta para negocios locales bajo la marca Estudio Reigar, QA de modelos de IA (Lionbridge, DataAnnotation) y desarrollo asistido por IA con tests y CI. TypeScript va primero en lenguajes y en `knowsAbout`; Java, C++ y C# siguen en la lista de lenguajes, pero no encabezan nada. Los servicios web para negocios van después de stack y formación. Estética: **retícula suiza minimal** (rediseño de agosto de 2026) — Archivo como única familia, títulos en caja alta, rojo señal como único acento (`--accent`, `#c62f24` claro / `#f0584b` oscuro), radio cero en todo (nada de esquinas redondeadas), y hairlines que organizan contenido real, no decoración. Nada de neones, glow ni jerga de terminal. Los tres prototipos que originaron el rediseño (`rediseno-1-editorial.html`, `rediseno-2-suizo.html`, `rediseno-3-nocturno.html`, en la raíz, gitignorados) se conservan como referencia por si hay otro rediseño: no desplegar ni enlazar.

## Proyecto principal: Snugport

Snugport es el proyecto insignia y abre la sección de proyectos como tarjeta destacada. Se escribe **Snugport** (no «SnugPort»). El repo del producto vive aparte; el resumen de handoff que sirvió para escribir la ficha está en `docs/RESUMEN-PARA-PORTFOLIO.md` (gitignored).

La ficha de la web reproduce los cuatro bullets del CV: la versión en producción es JavaScript vanilla sin dependencias (PWA instalable, offline), y la migración del panel a React 19 + TypeScript + Tailwind 4 está **en curso**, en paralelo a producción, con más de 600 tests unitarios (Vitest), más de 300 E2E (Playwright) y mutation testing. No volver a poner cifras de tamaño ni de versión (líneas, archivos, secciones, «v2.x»): caducan y ya no cuadran con el CV. Otros hechos verificados en agosto de 2026 contra `~/Projects/propios/snugport-app`: Stripe en producción con webhook propio, muro de pago en las RLS de Postgres, Edge Functions en TypeScript sobre Deno, 4 temas, accesibilidad auditada, bilingüe ES/EN, 80 divisas.

El enlace del sitio y del CV apunta a `https://snugport.app/`, que es el destino vivo. Si vuelve a cambiar, hay que tocarlo en **los dos sitios a la vez** — `index.html` y `docs/cv/cv-es.html`, donde además el texto visible del enlace debe coincidir con el destino. Lo que **no** se puede afirmar: cifras de usuarios registrados, suscriptores o ingresos — no son verificables desde fuera y Fritz no las ha dado. Gimnasio y Comidas tampoco cuentan como features: no están en el producto público. Finanzas y Horario **sí** se pueden contar desde agosto de 2026, ya salen en la landing. El branding está cerrado: no proponer rediseños de marca.

## El CV

El CV vive en `docs/cv/cv-es.html` y `docs/cv/cv-en.html` (los dos gitignored): HTML pensados para imprimirse a PDF desde el navegador, con la misma tipografía y acento que el sitio (desde agosto de 2026, alineados al rediseño suizo: Archivo, rojo `#c62f24`, reglas negras sobre los títulos, sin monoespaciada).

**`cv-en.html` está generado**: su `<head>` entero es copia del de `cv-es.html`, para que los estilos no puedan divergir. Si se toca el diseño, se toca en el español y se regenera el inglés; si se toca el contenido, hay que tocar los dos.

Cada uno ocupa **dos páginas A4 justas** y el margen es real: en agosto de 2026 añadir cinco líneas lo mandó a una tercera. Se comprueba sin abrir el navegador, renderizando y contando páginas:

```bash
chrome --headless --no-pdf-header-footer --print-to-pdf=out.pdf file:///.../cv-es.html
python -c "import re,io; print(re.findall(rb'/Count\s+(\d+)', io.open('out.pdf','rb').read()))"
```

Si se desborda, el resorte es `line-height` en `body` (está en **1.28** desde el cambio a Archivo, que es más ancha que Outfit: con 1.32 se iba a tres páginas), antes que recortar contenido. Ojo: las `.entrada` llevan `break-inside: avoid`, así que cuando desborda salta el bloque entero y recortar una frase suelta no sirve de nada — hay que tocar el interlineado. `docs/CV_Fritz_Reif_Dev_Text.pdf` es la versión vieja, anterior al giro a backend-first; se conserva solo como referencia.

**Web y CV comparten contenido y tienen que cuadrar**: mismo orden de puestos, mismos bullets, mismos proyectos, mismos niveles de idioma. Si se toca uno, se revisa el otro — una discrepancia la detecta cualquier reclutador.

Niveles de idioma vigentes, fijados por Fritz: español nativo, valenciano C1, **inglés C1**, **alemán A2** (dejó la EOI en 2026; no mencionarla). El CV viejo (`docs/CV_Fritz_Reif_Dev_Text.pdf`) dice B2+ para inglés; está desactualizado, no sirve de referencia para esto. El puesto de 2019 en el Ayuntamiento sí fueron **prácticas** y así debe seguir.

Lionbridge y DataAnnotation son **trabajo por cuenta propia**, no empleo: los dos puestos llevan «Autónomo, remoto» en la línea de organización. Fritz está de autónomo desde julio de 2025. La entrada de desarrollo web se queda en **Abr 2026** aunque la actividad como autónomo sea anterior: sus bullets son de clientes web que llegaron entonces, y retrasar la fecha diría que llevaba un año haciendo webs de cliente.

La formación va **sin fechas ni estado** en los dos sitios, por decisión suya (el 2026-10-13 quitó también el «En curso» del DAM, avisado de que sin estado puede leerse como titulado). El DAM no está terminado: nunca escribirlo como título obtenido.

## LinkedIn

El perfil (`linkedin.com/in/fritz-reif-garcia`) se alineó con el CV en agosto de 2026 y entra en la misma regla de coherencia: si cambian web o CV, se revisa LinkedIn. Decisiones fijas de Fritz: los textos del perfil van **en inglés** (con el idioma del perfil declarado en español), el nombre visible se queda como **Fritz Reif García** (el real; la marca «Fritz Reigar» va solo en el banner), y el puesto destacado de la presentación es Founder & Developer en Snugport.

El banner de portada (1584×396) sale de `docs/banner-linkedin.html` (gitignored), con la estética del rediseño suizo y la composición cargada a la derecha porque la foto de perfil tapa la esquina inferior izquierda. Se renderiza con Chrome headless: `chrome --headless=new --window-size=1584,396 --screenshot=banner-linkedin.png` (con `--user-data-dir` temporal si Chrome está abierto).

Dos trampas del editor de LinkedIn: al añadir un puesto nuevo **sobrescribe el titular** con «(puesto) en (empresa)» y hay que restaurarlo en `edit/intro/`; y el campo «añadir enlace» de contenido multimedia rechaza `https://fritzreigar.com` — solo acepta `https://www.fritzreigar.com/`.

## Archivos aportados a mano

- `assets/cv/fritz-reigar-cv.pdf` y `assets/cv/fritz-reigar-cv-en.pdf` — los PDF exportados desde `docs/cv/cv-es.html` y `docs/cv/cv-en.html`. Los enlazan el botón del header, el CTA principal del hero y el footer, y `js/i18n.js` conmuta entre ellos según el idioma activo. Al cambiar cualquier CV hay que reexportar **los dos**.
- `assets/img/proyectos/*.webp` — las capturas de las tarjetas de proyecto, todas normalizadas a 1200×675 (16:9) para que `object-fit: cover` no recorte de forma distinta en cada una. Snugport es la portada de `snugport.app`; Galaxian, un fotograma del `gameplay_preview.gif` de su repo; Limpiezas Artemisa, la portada de `www.limpiezasartemisa.com` (Chrome headless a 1200×675 con `--force-device-scale-factor=2` y reducida con Pillow).

  CPP-Galaxian-Engine y Limpiezas Artemisa van las dos en **tarjeta ancha** (`.project-card--wide`: ocupa la fila entera de la rejilla, imagen a la izquierda y texto a la derecha, apilada en ≤900 px), Galaxian primero: con una sola tarjeta normal la rejilla de dos columnas quedaba coja. Es el único trabajo de cliente entregado de punta a punta (web + infraestructura + Google Business Profile, entregado el 3 de septiembre de 2026) y necesita sitio para contarlo; lo que se afirma ahí sale del `CLAUDE.md` y del acta de entrega del repo `~/Projects/clientes/limpiezas-artemisa`. No publicar métricas del perfil de Google del cliente (vistas, llamadas, búsquedas): son datos de negocio suyos; los Lighthouse sí, que miden el trabajo de Fritz.

  **Tres proyectos van sin imagen a propósito**, en el índice compacto del final, y no hay que «arreglarlo»: Estudio Reigar (estudioreigar.com; no hay captura y no se inventa), Missphone (la tienda no la hizo Fritz) y DragonQuestHispano, que va el último y rebajado a «proyecto intermodular de clase, descontinuado», sin cifras de visitas ni enlace a la web. Su captura (`dragonquesthispano.webp`) sigue en `assets/` sin usarse. Eso crea la jerarquía: lo que tiene imagen pesa más. Unity-3D-Combat-Prototype salió de la web y del CV en octubre de 2026.
- `assets/img/fritz.jpg` — retrato del hero, cuadrado (recomendado 640×640); se muestra como cuadrado plano con borde, junto al nombre gigante. **Todavía no existe**: mientras falte, un `onerror` retira la figura y el nombre ocupa el ancho entero sin romperse.
