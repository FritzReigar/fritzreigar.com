# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es

La web personal de Fritz (fritzreigar.com): **la persona detrás de Estudio Reigar**. Enseña su trabajo para clientes, sus proyectos y quién es; los servicios y los precios viven solo en estudioreigar.com. Web estática en Astro, con un solo script, servida por Cloudflare Pages: portada y cuatro fichas, en español y en inglés (doce páginas con los dos 404).

**Nombre profesional: Fritz Reigar** — es el que va en todo el contenido público del sitio (el nombre real, Fritz Reif Garcia, solo aparece en la URL de LinkedIn).

El método y las decisiones están en [`plan/README.md`](plan/README.md), que se lee al arrancar cualquier sesión del plan. Las fases 1 y 2 están cerradas y no hay tanda en curso. Mandan [`plan/spec-visual.md`](plan/spec-visual.md) en el aspecto, [`plan/contenido.md`](plan/contenido.md) y [`plan/contenido-en.md`](plan/contenido-en.md) en el texto, y [`plan/capturas.md`](plan/capturas.md) en las imágenes (los archivos de origen, en `docs/capturas/`, sin subir). Lo cerrado está en [`historia.md`](historia.md).

El repo es público: en `plan/`, en `src/` y en este archivo no entra nada confidencial de clientes (decisión 13 de `plan/README.md`).

## Desarrollo y deploy

- `npm run dev` para trabajar; `npm run red` (check, tokens, build, comentarios de `dist/`, e2e y Lighthouse) en verde antes de cada commit, y la CI la corre en cada push a `astro` y a `main`. Cómo está montada, en el `README.md`.
- Remote: `https://github.com/FritzReigar/fritzreigar.com.git`.
- **Empujar a `main` es publicar**, y solo va con el OK de Fritz en esa sesión. El trabajo va en una rama y se mira en su previa antes.
- **El proyecto de Pages es `fritzreigar-com`:** producción `main`, build `npm run build`, salida `dist`, Node 22. El resto de ramas salen en `<rama>.fritzreigar-com.pages.dev`, con `noindex` (`functions/_middleware.js`).
- **El panel de Cloudflare lo toca Fritz.** El token del MCP no tiene permisos sobre la zona.
- **`www.fritzreigar.com`** es un dominio de `fritzreigar-com` y redirige con 301 a la raíz, con ruta y consulta, por una regla de redirección de la zona.
- **Caché:** el HTML sale `cf-cache-status: DYNAMIC`, con la Cache Rule «Cache Everything» de la zona deshabilitada. Si vuelve a salir `HIT`, alguien la ha encendido. Se comprueba con `curl -sI https://fritzreigar.com` frente a la misma URL con `?nocache=1`.
- **Lo que Cloudflare inyecta en el HTML:** Bot Fight Mode, Web Analytics y la ofuscación de correo están apagados en la zona. Aun así, cada página lleva un script en línea de `/cdn-cgi/challenge-platform/` que la CSP bloquea: un error en la consola y `best-practices` 92 en `npm run lighthouse -- --dominio`, frente a 100 en PageSpeed. Aceptado por Fritz el 2026-11-09. Si molesta, la documentación de Cloudflare da una vía, `Cache-Control: no-transform` solo en el HTML, comprobando antes en una previa que siga saliendo comprimido.
- **HSTS:** el `max-age` que se ve en el dominio (15552000, sin `includeSubDomains`) lo pone la zona y pisa al de `public/_headers`.
- **Imágenes OG:** el borde y WhatsApp las guardan por su URL. Si una cambia después de publicarse, se le añade `?v=` a la `og:image`, como en el estudio.
- **Vuelta atrás, hasta el 2026-11-16:** `portfolio-v1` (`portfolio-v1-6lo.pages.dev`) conserva la web vieja, con los despliegues automáticos pausados. Si algo falla en el dominio, Fritz le devuelve `fritzreigar.com` y purga la caché; el repo no se revierte y se arregla en una rama. Pasada la semana, Fritz borra `portfolio-v1` y las ramas remotas `astro` y `cloudflare/workers-autoconfig`, y manda el sitemap a Search Console si la tiene.

## Arquitectura

La lista de carpetas está en el `README.md`. Lo que decide cómo se toca:

- **`src/data/routes.ts` es la única lista de páginas**: de ella salen el sitemap, el hreflang, el enlace de idioma, los enlaces del marco, las rutas de OG y las pruebas (`e2e/support/pages.ts`). Una página nueva entra sola en todo.
- **El texto va en datos y las páginas son finas.** La portada, en `src/data/home.ts`; las fichas, en `src/content/cases/{es,en}/<slug>.json` (una plantilla, `CaseBody`, pinta las piezas presentes en un orden fijo); el marco, en `src/data/ui.ts`; las capturas, por clave, en `src/data/shots.ts`. Sin HTML en los datos y sin `set:html`: un enlace o un `code` dentro de una frase van con `src/data/rich.ts`.
- **Dos idiomas con HTML propio:** español en la raíz, inglés en `/en/`, hreflang recíproco con `x-default` al español y cero JS para el idioma.
- **Tokens:** ningún color literal en `src/` fuera de `src/styles/tokens.css` (lo vigila `scripts/tokens.mjs`). Modo oscuro, solo por `prefers-color-scheme`.
- **Movimiento:** todo en `src/styles/motion.css`, con `translate`/`scale`/`opacity` (nunca `transform`), dentro de `prefers-reduced-motion: no-preference`, y lo del scroll además dentro de `@supports (animation-timeline: view())`.
- **CSP estricta** (`public/_headers`): cero `style=""` y cero `<script>` en línea; un solo script, `src/scripts/main.ts`. La única excepción es el JSON-LD. Si se activa Web Analytics, `_headers` dice qué añadir.
- **Formulario:** Formspree, funciona sin JS (POST normal) y `main.ts` lo mejora. Los `name` son `name`, `email` y `message`.
- **Comentarios:** `dist/` sale sin ellos, salvo avisos de licencia (`scripts/comments.mjs`). En `.astro` se comenta con `{/* */}`, nunca con `<!-- -->`.
- **Presupuestos:** `lighthouse.budgets.json` solo sube con su porqué, escrito en la cabecera de `scripts/lighthouse.mjs`.
- **Las vistas** (`e2e/vistas.spec.ts`) comparan capturas guardadas en Windows y la CI las salta, igual que la fuente lenta. Una captura solo se regenera cuando el cambio es buscado, y el commit lo dice.

Estética: **retícula suiza con el cobalto del estudio** (`#1f4fa3`) y el celeste del avatar como superficie, Archivo como única familia (estrecha en los carteles), radio cero y hairlines que organizan contenido real. El avatar que se dibuja, con tinta cobalto, es la pieza diferenciadora. Nada de neones, glow ni jerga de terminal. Los tres prototipos de agosto (`rediseno-*.html`, en la raíz, gitignorados) no se despliegan ni se enlazan.

## Posicionamiento del contenido

La web es **la persona detrás de Estudio Reigar**: un **desarrollador web freelance en Valencia** que hace webs para negocios con el estudio y, en sus ratos, apps propias que publica en abierto. No es una web para reclutadores: el estado es «Acepto proyectos» (nunca «Abierto a ofertas»), el CV va discreto (pie y Contacto) y la experiencia es una trayectoria corta, una línea por puesto.

- **Qué pesa, en este orden:** el estudio (en el hero, enlazando a estudioreigar.com), el **Trabajo** para clientes (Missphone primero y más grande, luego Limpiezas Artemisa) y los **Proyectos** propios (Snugtone primero y más grande, luego Snugport, y Galaxian en pequeño y sin ficha). Trabajo y Proyectos van separados.
- **Coherencia con X y con el estudio:** la web no puede contradecir la bio de X («vivo de ella como freelancer», estudioreigar.com, proyectos que comparte) ni la web del estudio (una sola persona, webs escritas a mano y sin plantillas, todo a nombre del cliente, programa desde los 18 años). En lo que hable del estudio, sin fechas que delaten lo reciente y sin precios ni lista de servicios.
- **Tono:** técnico y sobrio en las fichas, que las lee gente que sabe; la palabra sencilla primero solo en lo que lee un cliente.
- **Missphone** se cuenta como tienda **heredada** (nunca «hecha desde cero»), sin culpar al anterior, por fases y con lo que hizo Fritz. En el CV va dentro de la entrada de Estudio Reigar, primero y con más peso que Artemisa; la web no lo cuelga de la marca. **Artemisa**, sin precio y sin métricas de su ficha de Google, que son datos de negocio suyos; los Lighthouse sí, que miden el trabajo de Fritz.
- **Fuera:** DragonQuestHispano y Unity-3D-Combat-Prototype. Galaxian no presenta a Fritz como programador de videojuegos.

## Snugport

Se escribe **Snugport** (no «SnugPort»). El repo del producto vive aparte; el resumen de handoff está en `docs/RESUMEN-PARA-PORTFOLIO.md` (gitignored).

La versión en producción es JavaScript vanilla sin dependencias (PWA instalable, offline), y la migración del panel a React 19 + TypeScript + Tailwind 4 está **en curso**, en paralelo a producción, con pruebas unitarias (Vitest), E2E (Playwright) y mutation testing. No poner cifras de tamaño ni de versión (líneas, archivos, secciones, «v2.x»): caducan. Las cifras se recuentan en `~/Projects/propios/snugport/snugport-app` antes de escribirlas: el 2026-11-09 eran 1.264 unitarias, así que la web y el CV dicen «más de 1.200». Los temas no llevan cifra: la landing dice siete, el panel en React tiene cinco y Fritz cuenta cuatro. Otros hechos verificados en agosto de 2026 contra ese repo: Stripe en producción con webhook propio, muro de pago en las RLS de Postgres, Edge Functions en TypeScript sobre Deno, accesibilidad auditada, bilingüe ES/EN y 80 divisas.

El enlace de la web y del CV apunta a `https://snugport.app/`. Si cambia, hay que tocarlo en **todos los sitios a la vez**: `src/content/cases/{es,en}/snugport.json` y `docs/cv/cv-es.html` y `cv-en.html`, donde además el texto visible del enlace debe coincidir con el destino. Lo que **no** se puede afirmar: cifras de usuarios registrados, suscriptores o ingresos, que no son verificables desde fuera y Fritz no las ha dado. Gimnasio y Comidas no cuentan como features: no están en el producto público. Finanzas y Horario **sí**, ya salen en la landing. El branding está cerrado: no proponer rediseños de marca.

## El CV

El CV vive en `docs/cv/cv-es.html` y `docs/cv/cv-en.html` (los dos gitignored): HTML pensados para imprimirse a PDF desde el navegador, con la misma tipografía y acento que la web (Archivo, cobalto `#1f4fa3`, reglas negras sobre los títulos, sin monoespaciada). Los PDF que sirve la web están en `public/assets/cv/`: `fritz-reigar-cv.pdf` y `fritz-reigar-cv-en.pdf`. Al cambiar cualquier CV hay que reexportar **los dos**.

**`cv-en.html` está generado**: su `<head>` entero es copia del de `cv-es.html`, para que los estilos no puedan divergir. Si se toca el diseño, se toca en el español y se regenera el inglés; si se toca el contenido, hay que tocar los dos.

Cada uno ocupa **dos páginas A4 justas** y el margen es real. Se comprueba sin abrir el navegador, renderizando y contando páginas:

```bash
chrome --headless --no-pdf-header-footer --print-to-pdf=out.pdf file:///.../cv-es.html
python -c "import re,io; print(re.findall(rb'/Count\s+(\d+)', io.open('out.pdf','rb').read()))"
```

Si se desborda, el resorte es `line-height` en `body` (está en **1.28**), antes que recortar contenido. Ojo: las `.entrada` llevan `break-inside: avoid`, así que cuando desborda salta el bloque entero y recortar una frase suelta no sirve de nada: hay que tocar el interlineado. `docs/CV_Fritz_Reif_Dev_Text.pdf` es la versión vieja; se conserva solo como referencia.

**Web y CV no se contradicen**: mismos hechos, mismas fechas, mismos niveles de idioma y mismos nombres (decisión 4 de `plan/README.md`). No tienen que llevar los mismos bullets ni los mismos proyectos. Si se toca uno, se revisa el otro. El cotejo fila a fila está en «Choques con el CV» de `plan/contenido.md`.

Niveles de idioma vigentes, fijados por Fritz: español nativo, valenciano C1, **inglés C1**, **alemán A2** (dejó la EOI en 2026; no mencionarla). El CV viejo dice B2+ para inglés y no sirve de referencia. El puesto de 2019 en el Ayuntamiento sí fueron **prácticas** y así debe seguir.

Lionbridge y DataAnnotation son **trabajo por cuenta propia**, no empleo: los dos puestos llevan «Autónomo, remoto» en la línea de organización. Fritz está de autónomo desde julio de 2025. La entrada de desarrollo web se queda en **Abr 2026** aunque la actividad como autónomo sea anterior: sus bullets son de clientes web que llegaron entonces, y retrasar la fecha diría que llevaba un año haciendo webs de cliente.

La formación va **sin fechas ni estado** en los dos sitios, por decisión suya (avisado de que sin estado puede leerse como titulado). El DAM no está terminado: nunca escribirlo como título obtenido.

## LinkedIn

El perfil (`linkedin.com/in/fritz-reif-garcia`) entra en la misma regla de coherencia: si cambian web o CV, se revisa LinkedIn. Decisiones fijas de Fritz: los textos del perfil van **en inglés** (con el idioma del perfil declarado en español), el nombre visible se queda como **Fritz Reif García** (el real; la marca «Fritz Reigar» va solo en el banner), y el puesto destacado de la presentación es Freelance Web Developer en Estudio Reigar.

El banner de portada (1584×396) sale de `docs/banner-linkedin.html` (gitignored), con la composición cargada a la derecha porque la foto de perfil tapa la esquina inferior izquierda. Se renderiza con Chrome headless: `chrome --headless=new --window-size=1584,396 --screenshot=banner-linkedin.png` (con `--user-data-dir` temporal si Chrome está abierto).

Dos trampas del editor de LinkedIn: al añadir un puesto nuevo **sobrescribe el titular** con «(puesto) en (empresa)» y hay que restaurarlo en `edit/intro/`; y el campo «añadir enlace» de contenido multimedia rechaza `https://fritzreigar.com`: solo acepta `https://www.fritzreigar.com/`.

## Imágenes y archivos aportados a mano

- **Capturas:** las maestras en WebP viven en `src/assets/shots/` (tope en git: 3 MB) y salen de `docs/capturas/` con `scripts/capturas.py`; `astro:assets` saca AVIF y WebP. Con su origen y su `alt`, en `plan/capturas.md`.
- **Temporada:** la vitrina de Missphone y los «después» 1 y 2 llevan la Navidad. Si la web sigue así pasado el 6 de enero de 2027, se rehacen (`plan/capturas.md`).
- **Foto de Contacto:** `ContactSection` tiene su rama con `photo` (compila, no la pinta ninguna página) y la foto todavía no existe. Quien la ponga mira las vistas a 390 y a 1440.
