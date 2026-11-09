# Fase 2 — Implementación y corte

**Qué existe al acabar:** fritzreigar.com sirve la web en Astro desde el proyecto de Pages
`fritzreigar-com`, con producción en `main` (v1.0.0): la portada y las cuatro fichas pintadas con
`plan/spec-visual.md`, la pieza diferenciadora (el nombre que se recompone, el avatar que se dibuja,
la tinta y el scroll), las doce páginas en español y en inglés, una imagen para compartir por
página e idioma, `www` redirigido a la raíz y los dos CV y LinkedIn de acuerdo con la web.

**Por qué en este orden:** primero el marco y los tokens (todo lo demás se pinta encima), luego los
datos y las capturas (las páginas los leen), después las páginas de la más pesada a la más ligera
y, cuando todas están pintadas **en reposo**, el movimiento de una vez: si las capturas de reposo
no cambian al añadirlo, el reposo está bien dibujado fuera. El inglés entra cuando las piezas
existen, para escribirlo una sola vez; las imágenes OG, cuando hay títulos en los dos idiomas. La QA
y la coherencia van antes del corte, porque el corte publica los CV y lo que dicen.

Planificada el 2026-11-05 (Opus 5.5 en alto, modo plan), tras revisar el código de la rama `astro`
y los «Desvíos» de `plan/fase-1.md`. Antes de cualquier tanda: `plan/README.md` entero (las 14
decisiones y la regla 13, que el repo es público) y, de este archivo, «Punto de partida»,
«Decisiones de la fase» y «Reglas de la fase».

---

## Punto de partida (revisión de la rama `astro`, 2026-11-05)

**El patrón es bueno y se copia:**
- `src/data/routes.ts` es la única lista de páginas: de ella salen el sitemap, el hreflang, el
  enlace de idioma, los enlaces del marco y las pruebas (`e2e/support/pages.ts`). Una página nueva
  entra sola en todo.
- Un solo script externo (`src/scripts/main.ts`), empaquetado en `/_astro/`; la CSP estricta de
  `public/_headers` se prueba sirviendo `dist/` con `wrangler pages dev` (`e2e/rutas.spec.ts`).
- `npm run red` = `check` (`astro check` y Biome) + `build` + `comentarios`
  (`scripts/comments.mjs`) + `e2e` (Playwright y axe a 390 y a 1440) + `lighthouse`
  (`scripts/lighthouse.mjs` contra `lighthouse.budgets.json`). La CI (`.github/workflows/web.yml`)
  corre lo mismo en cada push a `astro` y a `main`, con rendimiento ≥ 90.
- `functions/_middleware.js` pone `X-Robots-Tag: noindex` en cualquier `*.pages.dev`.

**Lo que la fase cambia:**
- El texto está escrito dentro de las páginas (`src/pages/index.astro`, las cuatro fichas, el array
  `career`): pasa a datos (decisión F1).
- `scripts/lighthouse.mjs` lleva las páginas a mano (`PAGES`): pasa a salir de `routes.ts` en la
  2.9, cuando entran las inglesas.
- Los enlaces del marco van en línea con « · » porque sin CSS una lista no llega al tamaño de toque
  (Desvío de la 1.5): con estilos vuelven a ser listas (2.1).
- Las gemelas inglesas llevan `noindex` mientras `en.live` es `false`; al encenderlas hay que
  quitárselo (Desvío de la 1.5; la prueba de hreflang lo caza).
- El manifest (`public/assets/img/site.webmanifest`) tiene los colores viejos y `og-preview.png` es
  del diseño viejo.
- `assets/img/proyectos/*.webp` sigue en la raíz de la rama sin servirse (`plan/capturas.md` tiene
  sus copias).
- `main.ts` solo marca `data-script="main"` en el `<html>`; las pruebas lo usan para saber que la
  CSP lo deja correr. La marca se queda.

**Lo medido para el corte (2026-11-05):**
- `astro` es `main` más 3 commits (y 2 más sin subir): el corte puede ser un *fast-forward*.
- `portfolio-v1` publica la raíz del repo **sin build** en cada push a `main`. Si se empuja `main`
  con Astro sin pausarlo antes, el dominio sirve el código fuente y la portada da 404.
- **`www.fritzreigar.com` no resuelve** (NXDOMAIN con 1.1.1.1), y el enlace de LinkedIn apunta a
  `https://www.fritzreigar.com/` (el editor no acepta otro): hoy está roto.
- `https://fritzreigar.com/` y `/CLAUDE.md` salen con `cf-cache-status: HIT` pese a
  `Cache-Control: public, max-age=0, must-revalidate`; con `?nocache=1`, `MISS`. `/index.html` da
  308 a `/`. `/CLAUDE.md` responde 200: con Astro solo se publica `dist/` (decisión 8).
- Queda una rama remota vieja, `origin/cloudflare/workers-autoconfig` (un `wrangler.jsonc` que
  dejó Cloudflare); se borra en la limpieza del corte.
- `docs/capturas/` pesa 6,4 MB (Missphone, 3,8).

---

## Decisiones de la fase (2026-11-05, en la planificación)

De Fritz:

- **F0. El texto inglés lo traduce Claude y lo revisa Fritz** (tanda 2.8). Nada en inglés se
  publica sin su OK.

Recomendadas (valen mientras Fritz no diga otra cosa):

- **F1. El texto, en datos; las páginas, finas.**
  - La portada, en `src/data/home.ts`: `home: { es: HomeText; en?: HomeText }` (el inglés entra
    en la 2.9), con el mismo estilo que `src/data/ui.ts`.
  - Las fichas, en una colección `cases` (`src/content.config.ts`) con **un JSON por idioma y el
    mismo slug**: `src/content/cases/es/missphone.json` y, en la 2.9,
    `src/content/cases/en/missphone.json`. Cada entrada lleva lo de su tarjeta en la portada
    (rótulo, título, resumen, captura, enlace) y el cuerpo de la ficha; el esquema Zod tiene las
    piezas del cuerpo opcionales.
  - Las capturas, una vez, en `src/data/shots.ts`: la imagen importada y su `alt` por idioma (de
    `plan/capturas.md`); la colección y la portada las nombran por clave.
  - **Sin HTML en los datos y sin `set:html`.** Un enlace o un `code` dentro de una frase (el
    «estudioreigar.com» de Contacto, el `cargo clippy` de Cómo trabajo) lo resuelve el componente
    con un campo propio.
  - **Una sola plantilla de ficha**, `CaseBody`, que pinta las piezas presentes en un orden fijo:
    `PullQuote` → `Prose` → `BeforeAfter` → `FeatureRows` → `FigureList` → `PhaseList` →
    `LayerStack` → `CaseClosing`. Ese orden cuadra con las cuatro fichas de la spec (§ 2.3 y
    § 2.4). Cada página de `src/pages/trabajo/` y `src/pages/proyectos/` (y sus gemelas) se queda
    en pocas líneas: `BaseLayout`, `CaseHero`, `CaseShowcase` y `CaseBody` con su entrada.
- **F2. Las capturas entran al repo** como WebP maestras en `src/assets/shots/`, reducidas con
  `scripts/capturas.py` desde `docs/capturas/` al doble del ancho más grande que pinta la spec
  (§ 6.2), nunca por encima del origen, en calidad alta (90). Se publican de todos modos (van a la
  web). Tope en git: 3 MB entre todas. `astro:assets` saca de ellas AVIF y WebP.
- **F3. La fuente.** La fuente de origen es `Archivo[wdth,wght].ttf` de github.com/google/fonts
  (`ofl/archivo`, licencia OFL), guardada con su `OFL.txt` en `src/assets/fonts/`.
  `scripts/fuente.py` (fontTools, ya instalado: 4.63.0) la recorta con `instancer` a `wdth` 62–100
  y `wght` 400–800 y con `pyftsubset` al latino, más «→» (U+2192) y «↗» (U+2197) si Archivo las
  tiene, y saca `public/fonts/archivo.woff2` (≤ 95 KB) con un `LEEME.txt` de licencia como el de
  `~/Projects/propios/estudio-reigar/web/public/fonts/`. La 2.10 saca del mismo script las
  instancias estáticas en TTF que pide Satori.
- **F4. Lint de tokens** (`scripts/tokens.mjs`, un paso de `npm run red`): ningún color literal
  (`#hex`, `rgb(`, `hsl(`) en `src/` fuera de `src/styles/tokens.css`. La ruta de OG (2.10) lee los
  colores de `tokens.css`, no los copia.
- **F5. Las pruebas de captura** (`toHaveScreenshot`, las 16 vistas de la spec: portada, Missphone,
  Snugtone y el 404, a 390 y a 1440, en claro y en oscuro, en reposo) corren en local y sus
  imágenes van en git con el sufijo `win32`; la CI las salta (llevan la etiqueta `@vista` y la CI
  corre `e2e` con `--grep-invert @vista`), porque Linux pinta la fuente distinta. Las de desbordes,
  movimiento y el resto sí corren en CI. Una captura solo se regenera cuando el cambio es buscado,
  y el commit lo dice.
- **F6. El movimiento, todo en la 2.7**, con las páginas ya pintadas en reposo. Hasta entonces las
  tintas (`Ink`) se pintan trazadas y nada se mueve.
- **F7. Clase (decisión 12): solo la 2.7**, por trazar un SVG con CSS. El scroll
  (`animation-timeline`), Satori, las colecciones y `astro:assets` ya se dieron en el estudio.
- **F8. El CV pasa al cobalto** en la 2.12 (`#1f4fa3`): el `CLAUDE.md` pide que lleve la misma
  tipografía y el mismo acento que el sitio.
- **F9. Después del corte:** la producción de `fritzreigar-com` es `main`; sus previas, todas las
  ramas salvo `main`; la rama `astro` se borra al acabar la semana de vuelta atrás. Empujar a
  `main` es publicar, y sigue necesitando el OK de Fritz.

## Reglas de la fase

- **Mandan la spec y el texto.** El aspecto, de `plan/spec-visual.md`; el texto, de
  `plan/contenido.md` (y desde la 2.8, `plan/contenido-en.md`). El lienzo (`docs/lienzo/final.html`)
  es solo imagen de referencia. Si la spec no dice algo, se apunta en «Desvíos» y se toma lo mínimo.
- **Nada a `main` hasta la 2.13.** Cada push a `astro` despliega la previa
  (`fritzreigar-com.pages.dev`).
- **Cada tanda que pinta una página la añade** a la lista de `e2e/desbordes.spec.ts` y, si es una de
  las cuatro de la spec, a la de `e2e/vistas.spec.ts`.
- **Los presupuestos de `lighthouse.budgets.json` solo suben con su porqué**, escrito en la cabecera
  de `scripts/lighthouse.mjs`, como el estudio.
- **El grep de la regla 13** en cada tanda que toca texto (`plan/fase-1.md`, tanda 1.1,
  «Verificación»), más el de los nombres de la gente de Missphone, escrito solo en la línea de
  comandos.
- **La QA en el teléfono es de Fritz**, sobre la previa, **de una vez cuando todo esté hecho**
  (antes del corte), no al cerrar cada tanda que pinta: lo decidió Fritz el 2026-11-06. El «Qué
  trae Fritz: la QA en el teléfono» de cada tanda queda en suspenso; lo que salga va a «Desvíos».
- **Movimiento** (ya en la spec, se repite porque se olvida): `translate`/`scale`/`opacity`, nunca
  `transform`; todo dentro de `@media (prefers-reduced-motion: no-preference)`; lo del scroll,
  además, dentro de `@supports (animation-timeline: view())` y con propiedades sueltas. Todo vive
  en `src/styles/motion.css`: lo de la carga da solo el `from` y va con `animation-fill-mode:
  backwards` (el `to` implícito es el reposo y, al acabar, la animación desaparece); lo del scroll,
  con `both`. El reposo (la tinta con `stroke-dasharray: 1` y el offset en 0) va en el componente.
- **Cero `style=""` y cero `<script>` en línea**: la CSP los bloquea. El JSON-LD es la única
  excepción (`type="application/ld+json"`, que no se ejecuta).

---

### Tanda 2.1 — Tokens, la fuente y el marco   [x] hecha (2026-11-05, v0.2.1)
**Objetivo**: existen los tokens, la hoja global, Archivo autoalojada y el marco de todas las
páginas (cabecera, menú del móvil, idioma, pie) con el aspecto de la spec, el 404 está pintado
entero, y la red tiene el lint de tokens y las pruebas de vistas y de desbordes.

**Modelo**: Opus 5.5, medio.

**Leer antes**:
- ENTEROS: `plan/spec-visual.md` § 1, § 2.1, § 2.2 (Marco y Controles), § 3, § 5 y § 8; y este
  archivo, «Decisiones» y «Reglas».
- `src/layouts/BaseLayout.astro`, `src/data/routes.ts`, `src/data/ui.ts`, `src/scripts/main.ts`,
  `e2e/` entero y `playwright.config.ts`.
- Del estudio (`~/Projects/propios/estudio-reigar/web/`): `src/styles/global.css` (la base),
  `src/components/site/SiteHeader.astro`, `MobileMenu.astro` y `SiteFooter.astro`, `src/scripts/main.ts`
  (cómo cierra el menú), `public/fonts/LEEME.txt` y `e2e/marco.spec.ts`.
- `docs/lienzo/final.html` (solo para mirar: `#no-encontrada` y la cabecera) y
  `docs/lienzo/herramientas/comprobar-desbordes.mjs`.

**Archivos**:
- Se crean: `src/styles/tokens.css`, `src/styles/global.css`; `src/components/site/SkipLink.astro`,
  `SiteHeader.astro`, `MobileMenu.astro`, `LangLink.astro`, `SiteFooter.astro`;
  `src/components/ui/Button.astro`, `ArrowLink.astro`, `Label.astro`, `Ink.astro`;
  `src/components/heroes/ErrorHero.astro`; `src/assets/fonts/Archivo[wdth,wght].ttf` y `OFL.txt`;
  `scripts/fuente.py`; `public/fonts/archivo.woff2` y `LEEME.txt`; `scripts/tokens.mjs`;
  `e2e/marco.spec.ts`, `e2e/vistas.spec.ts`, `e2e/desbordes.spec.ts`.
- Se tocan: `BaseLayout.astro` (hoja, precarga de la fuente, el marco con sus componentes),
  `main.ts` (cierre del menú), `src/pages/404.astro` y `en/404.astro` (con `ErrorHero`; el 404
  inglés con el texto que ya tiene), `site.webmanifest` (colores de los tokens), `package.json`
  (`tokens` en `red`, versión 0.2.1), `.github/workflows/web.yml` (`--grep-invert @vista`).

**Qué se hace**:
- `tokens.css`: los tokens de spec § 1.2 tal cual, con el oscuro por `prefers-color-scheme`.
- `@font-face` de Archivo con `font-stretch: 62% 100%` y `font-weight: 400 800`,
  `font-display: swap` (la 2.11 mide si hay que cambiarlo) y `<link rel="preload">` en todas las
  páginas (spec § 8).
- El marco con listas (`<ul>`) y todo lo pulsable a 44 px como mínimo; `aria-current="page"` en la
  sección de la ficha. `MobileMenu`: `<details>` que se cierra al pulsar un enlace, al pulsar fuera
  y con Escape (que devuelve el foco a «Menú»); sin JS se queda abierto. `LangLink` sigue sin
  pintarse mientras `en.live` sea `false` (ya lo hace `switchHrefOf`).
- `Ink` se pinta trazado (sin animar: F6), con `pathLength="1"` ya puesto y `max-width: none`
  (Decisiones del lienzo).
- `ErrorHero` con el «404» y el título en la misma línea base, la flecha `Ink` solo por encima de
  60rem y los botones según spec § 2.2.

**Reutilizar**: la base y el marco del estudio; `comprobar-desbordes.mjs` (su lógica pasa a
`desbordes.spec.ts`); `sitePages` y `collectErrors` de `e2e/support/pages.ts`.

**Fuera de alcance**: el contenido de la portada y de las fichas, las capturas, el movimiento, el
texto inglés del 404 y la estrategia de carga de la fuente más allá de `swap` + precarga.

**Aceptación**:
- `npm run red` en verde, con el paso de tokens dentro.
- `node scripts/tokens.mjs` sale en rojo con un `#fff` metido a propósito en un `.astro` y en verde
  al quitarlo.
- `public/fonts/archivo.woff2` ≤ 95 KB, con `wdth` 62–100 y `wght` 400–800 (se lee con
  `fontTools.ttLib`: tabla `fvar`); apuntado si «→» y «↗» entraron o no.
- `marco.spec.ts`: el salto lleva el foco a `#contenido`; a 390 el menú abre, se cierra con un
  enlace, pulsando fuera y con Escape (foco en «Menú»); sin JS queda abierto; la ficha de Missphone
  marca «Trabajo» con `aria-current`; `/fonts/archivo.woff2` responde con caché de un año.
- `desbordes.spec.ts` sobre el 404 a 360, 768, 1024 y 1440: ningún texto se sale de su caja ni de
  la ventana; y sale en rojo con un ancho fijo provocado.
- `vistas.spec.ts`: las 4 vistas del 404 (390 y 1440, claro y oscuro) guardadas y en verde en una
  segunda pasada.
- axe a 0 en las doce páginas (ya con listas en el marco).

**Verificación**:

    python scripts/fuente.py
    npm run red
    npx playwright test --grep @vista

**Qué trae Fritz**: el OK para bajar `Archivo[wdth,wght].ttf` y `OFL.txt` de
`github.com/google/fonts/tree/main/ofl/archivo` (o los baja él a `src/assets/fonts/`).

---

### Tanda 2.2 — Las capturas y las fichas como datos   [x] hecha (2026-11-05, v0.2.2)
**Objetivo**: las capturas que enseña la web están en el repo, tipadas y con su `alt`, y el texto
en español de la portada y de las cuatro fichas vive en datos, listo para que lo pinten las
tandas siguientes.

**Modelo**: Opus 5.5, medio.

**Leer antes**:
- ENTEROS: `plan/contenido.md`, `plan/capturas.md`, `plan/spec-visual.md` § 2.1, § 2.3, § 2.4 y
  § 6, y la F1 y la F2 de este archivo.
- `src/pages/index.astro` y las cuatro fichas de hoy (el texto que se mueve).
- Del estudio: `web/src/content.config.ts` y `web/src/content/cases/missphone.json` (cómo se tipa
  una colección con imágenes) y `web/src/components/shop/CaseShowcase.astro` (cómo se usa
  `<Picture>`).

**Archivos**:
- Se crean: `scripts/capturas.py`; `src/assets/shots/…` (una carpeta por pieza, como
  `docs/capturas/`); `src/data/shots.ts`; `src/data/home.ts`; `src/content.config.ts`;
  `src/content/cases/es/missphone.json`, `limpiezas-artemisa.json`, `snugtone.json` y
  `snugport.json`; `src/components/ui/Shot.astro`; `e2e/datos.spec.ts`.
- Se tocan: `src/pages/index.astro` y las cuatro fichas (leen de los datos, aún sin estilo nuevo),
  `package.json` (0.2.2).

**Qué se hace**:
- `capturas.py` lee `docs/capturas/` y escribe las WebP maestras (F2): las de escritorio de 2880 de
  origen, a 1600 o al doble de lo que pinta su componente si es menos; las del móvil, a 600; las
  parejas de Missphone y las de Snugtone, a su tamaño. Se queda la vitrina de Missphone del
  2026-11-04 (la de Navidad: si la web sale pasado Reyes, la 2.11 la rehace).
- `shots.ts`: una clave por captura, su import y `alt: { es, en? }` copiado de `plan/capturas.md`.
  Las de las bandas no llevan `alt`: van con `alt=""` (spec § 6.1).
- El esquema de `cases`: `section ('work'|'projects')`, `kicker`, `title`, `lede`, enlaces
  (`primary`, `secondary?`), la tarjeta de la portada (`card: { label, summary, shot }`), la
  vitrina (`showcase: { desktop, phone?, caption? }`) y las piezas opcionales del cuerpo (F1). Las
  claves de captura se validan contra `shots.ts`.
- `Shot`: `<Picture>` con AVIF y WebP, `width`, `height`, `sizes` por prop, `loading="lazy"` y
  `decoding="async"` salvo que se pida lo contrario (spec § 6.1), y el marco de 1 px.
- `datos.spec.ts`: cada ficha de `routes.ts` tiene su JSON en `es/`, y una entrada en `en/` existe
  si y solo si su `en.live` es `true` (hoy, ninguna). Se ve en rojo creando un `en/` vacío de
  prueba.

**Reutilizar**: el patrón de colección del estudio; la lista de capturas y `alt` de
`plan/capturas.md`; `routes.ts` para la prueba.

**Fuera de alcance**: pintar las piezas (2.3 a 2.6), el inglés, rehacer capturas, el avatar (2.3).

**Aceptación**:
- `npm run red` en verde; las páginas dicen lo mismo que antes (el texto visible no cambia: se
  compara con `get_page_text` o con un `diff` del texto de `dist/` antes y después).
- `du -sh src/assets/shots` ≤ 3 MB.
- `astro check` cae si una entrada nombra una captura que no existe (probado y deshecho).
- Ningún `set:html` en `src/` (`grep -rn "set:html" src` solo saca el JSON-LD de `BaseLayout`).

**Verificación**:

    python scripts/capturas.py
    du -sh src/assets/shots
    npm run red
    grep -rn "set:html" src

**Qué trae Fritz**: nada.

---

### Tanda 2.3 — La portada I: el hero, el estudio, Trabajo, las bandas y Proyectos   [x] hecha (2026-11-05, v0.2.3)
**Objetivo**: la mitad de arriba de la portada está pintada como la spec, con el avatar
vectorizado, hasta «Todo el código público».

**Modelo**: Opus 5.5, medio.

**Leer antes**:
- ENTEROS: `plan/spec-visual.md` § 2.2 (Controles, Héroes y Portada), § 3, § 6.2, § 6.4 y § 7.
- `src/data/home.ts`, `src/data/shots.ts` y los JSON de `src/content/cases/es/`.
- `docs/lienzo/herramientas/avatar-ligero.svgfrag` y la portada de `docs/lienzo/final.html` (solo
  para mirar).

**Archivos**:
- Se crean: `src/components/ui/Avatar.astro`, `StatusBadge.astro`, `SectionTitle.astro`,
  `StackList.astro`; `src/components/heroes/HomeHero.astro`; `src/components/home/StudioBand.astro`,
  `WorkFeature.astro`, `WorkCard.astro`, `ShotBands.astro`, `ProjectFeature.astro`,
  `ProjectCard.astro`, `ProjectMini.astro`.
- Se tocan: `src/pages/index.astro`, `src/styles/global.css` si hace falta, las listas de
  `vistas.spec.ts` y `desbordes.spec.ts`, `package.json` (0.2.3).

**Qué se hace**:
- `Avatar`: el SVG de `avatar-ligero.svgfrag` en línea, **sin `style=""` ni colores literales**:
  cada capa con su clase y su token `--color-avatar-*`; `role="img"` con el `alt` de
  `plan/contenido.md` § 1.1. Se pinta dibujado (F6).
- `HomeHero` con el nombre en dos líneas, el avatar al lado de «Fritz» en todos los anchos y
  pisado solo en la camiseta (spec § 2.2 y Desvíos de la 1.4), y bajo la regla la entradilla, el
  estado con su óvalo trazado y los dos botones.
- Las tarjetas se pulsan enteras (`::after` del `ArrowLink`), con un solo enlace por tarjeta.
- `ShotBands`: dos filas de seis capturas, cada serie dos veces y con las mismas URL, `aria-hidden`
  y `alt=""`, entre filetes fuertes y quietas (el viaje es de la 2.7).

**Reutilizar**: `Shot`, `Button`, `ArrowLink`, `Label`, `Ink` y `SectionTitle` de la 2.1; los
datos de la 2.2.

**Fuera de alcance**: Cómo trabajo, Trayectoria y Contacto (2.4); el movimiento (2.7).

**Aceptación**:
- `npm run red` en verde, con la portada en `desbordes.spec.ts` (360, 768, 1024 y 1440) y una
  prueba de que a 1920 y a 2560 cada banda cubre el ancho de la ventana.
- La primera pantalla a 390 × 844 y a 1440 × 900 enseña lo de spec § 7 (prueba que mide los bordes
  del nombre, la entradilla, el estado y los botones, con margen de 24 px).
- Documento de la portada ≤ 32 KB en gzip (`gzip -c dist/index.html | wc -c`); ninguna imagen por
  encima del pliegue (todas con `loading="lazy"`).
- `node scripts/tokens.mjs` en verde con el avatar dentro.

**Verificación**:

    npm run red
    gzip -c dist/index.html | wc -c

**Qué trae Fritz**: la QA en el teléfono sobre la previa.

---

### Tanda 2.4 — La portada II: Cómo trabajo, Trayectoria y Contacto, con el formulario   [x] hecha (2026-11-05, v0.2.4)
**Objetivo**: la portada está entera y el formulario de Contacto envía por `fetch` con sus tres
estados, sin dejar de funcionar sin JS.

**Modelo**: Opus 5.5, medio.

**Leer antes**:
- ENTEROS: `plan/spec-visual.md` § 2.2 (las filas de `PrincipleList` a `ContactForm`), § 2.5 y
  § 1.4 (el contraste del error); `plan/contenido.md` § 1.5 a § 1.7.
- `e2e/formulario.spec.ts`; del estudio, `web/src/components/forms/ContactForm.astro`,
  `web/src/scripts/main.ts` (su envío por `fetch`) y `web/e2e/formulario.spec.ts`.
- `docs/lienzo/final.html#estados-formulario` (solo para mirar).

**Archivos**:
- Se crean: `src/components/home/PrincipleList.astro`, `CareerTable.astro`, `CareerExtra.astro`,
  `ContactSection.astro`, `ContactForm.astro`.
- Se tocan: `src/pages/index.astro`, `src/data/home.ts` (la trayectoria sale de aquí),
  `src/scripts/main.ts`, `e2e/formulario.spec.ts`, la lista de vistas (la portada completa),
  `package.json` (0.2.4).

**Qué se hace**:
- `CareerTable` con la cabecera para lectores de pantalla y, a 45rem o menos, una ficha de tres
  líneas por fila.
- `ContactSection` con la prop `photo?`: sin ella no pinta nada en su lugar (spec § 2.5).
- `main.ts`: intercepta el envío, manda `FormData` por `fetch` a Formspree con
  `Accept: application/json`, pone «Enviando…» y `aria-disabled` en el botón y pinta «enviado»
  (`role="status"`) o «error» (`role="alert"`, con el correo enlazado). La validación es la del
  navegador. Los textos, de `formText` en `src/data/ui.ts`.

**Reutilizar**: el formulario de hoy (mismo `action`, mismos `name`, `_gotcha` y `_subject`); el
envío del estudio.

**Fuera de alcance**: la foto de busto (no existe aún), el inglés del formulario (2.9), cualquier
librería.

**Aceptación**:
- `npm run red` en verde.
- `formulario.spec.ts`: sin JS, el POST de hoy; con JS y Formspree contestando 200, el estado
  «enviado» con `role="status"` y el formulario vacío; contestando 500, el estado de error con
  `role="alert"` y el texto escrito sin perder; en ningún caso sale la petición real (interceptada).
- `main.ts` ≤ 3 KB en gzip (`gzip -c dist/_astro/*.js | wc -c`).
- Las 4 vistas de la portada guardadas.

**Verificación**:

    npm run red
    npx playwright test formulario
    gzip -c dist/_astro/*.js | wc -c

**Qué trae Fritz**: la QA en el teléfono; si quiere, un envío real de prueba desde la previa (le
llega a su correo).

---

### Tanda 2.5 — Las fichas de Trabajo: Missphone y Limpiezas Artemisa   [x] hecha (2026-11-05, v0.2.5)
**Objetivo**: las dos fichas de Trabajo están pintadas como la spec, con la plantilla común de
ficha.

**Modelo**: Opus 5.5, medio.

**Leer antes**:
- ENTEROS: `plan/spec-visual.md` § 2.2 (Héroes: `CaseHero`; Fichas), § 2.3, § 2.4, § 3.4, § 6.2 y
  § 7; `plan/contenido.md` § 2 y § 3.
- La F1 de este archivo (el orden de `CaseBody`).
- `docs/lienzo/final.html#missphone` (solo para mirar).

**Archivos**:
- Se crean: `src/components/heroes/CaseHero.astro`; `src/components/case/CaseShowcase.astro`,
  `CaseBody.astro`, `Prose.astro`, `BeforeAfter.astro`, `FigureList.astro`, `PhaseList.astro`,
  `FeatureRows.astro`, `CaseClosing.astro`.
- Se tocan: `src/pages/trabajo/missphone.astro` y `limpiezas-artemisa.astro`, sus JSON si falta
  algo, las listas de vistas y desbordes, `package.json` (0.2.5).

**Qué se hace**:
- `CaseShowcase` `pair` sin `lazy` (asoma en la primera pantalla) y sin `fetchpriority`; a 35rem o
  menos, solo la de escritorio.
- `BeforeAfter` con las cinco parejas, «Antes» en tinta y «Después» en cobalto, y la flecha `Ink`
  trazada entre ellas (alternando su forma; sin flecha en la pareja del móvil ni a 35rem o menos).
- Artemisa sin piezas nuevas (spec § 2.4): `FeatureRows` sin capturas, `FigureList` de cuatro.

**Reutilizar**: todo lo de la 2.1 a la 2.4; `Shot` con los `sizes` de spec § 6.2.

**Fuera de alcance**: las piezas de Proyectos (`PullQuote` sí entra si Missphone la necesita: «Lo
mejor»), el movimiento, el inglés.

**Aceptación**:
- `npm run red` en verde, con las dos fichas en desbordes y las 4 vistas de Missphone guardadas.
- La vitrina de Missphone en AVIF a 1440 ≤ 120 KB (la mide Lighthouse en `image`).
- Documento de cada ficha ≤ 10 KB en gzip.
- La primera pantalla de Missphone enseña lo de spec § 7 (misma prueba que la 2.3).

**Verificación**:

    npm run red
    for f in dist/trabajo/*.html; do echo "$f $(gzip -c $f | wc -c)"; done

**Qué trae Fritz**: la QA en el teléfono.

---

### Tanda 2.6 — Las fichas de Proyectos: Snugtone y Snugport   [x] hecha (2026-11-06, v0.2.6)
**Objetivo**: las dos fichas de Proyectos están pintadas y las 16 vistas de la spec existen como
pruebas.

**Modelo**: Opus 5.5, medio.

**Leer antes**:
- ENTEROS: `plan/spec-visual.md` § 2.2 (Fichas: `PullQuote`, `FeatureRows`, `LayerStack`,
  `CaseClosing`), § 2.3 (las cifras de Snugtone) y § 2.4 (Snugport); `plan/contenido.md` § 4 y § 5.
- `src/components/case/` tal como lo dejó la 2.5.
- `docs/lienzo/final.html#snugtone` (solo para mirar).

**Archivos**:
- Se crean: `src/components/case/PullQuote.astro` (si la 2.5 no la creó) y `LayerStack.astro`.
- Se tocan: `CaseShowcase.astro` (variante `single`), `FeatureRows.astro` (con captura),
  `CaseClosing.astro` (dos columnas y el `Button` de descarga), las dos fichas, sus JSON, las
  listas de vistas y desbordes, `package.json` (0.2.6).

**Qué se hace**:
- Las cinco cifras de Snugtone tal como las reparte spec § 2.3. Snugport sin `FigureList`.
- La nota de las capturas de Snugtone como pie de la vitrina `single`.

**Reutilizar**: la plantilla `CaseBody` de la 2.5.

**Fuera de alcance**: el movimiento; recontar cifras (2.11).

**Aceptación**:
- `npm run red` en verde, con las dos fichas en desbordes.
- `npx playwright test --grep @vista` pasa con las 16 vistas (4 páginas × 2 anchos × 2 temas).
- Documento de cada ficha ≤ 10 KB en gzip.

**Verificación**:

    npm run red
    npx playwright test --grep @vista

**Qué trae Fritz**: la QA en el teléfono.

---

### Tanda 2.7 — El movimiento: la pieza diferenciadora   [x] hecha (2026-11-06, v0.2.7)
**Objetivo**: la web se mueve como dice spec § 4 (una escena al cargar y lo que cuenta el scroll),
todo en CSS, y con movimiento reducido o sin soporte se ve exactamente el reposo de hoy.

**Modelo**: Opus 5.5, **alto** (es la pieza que diferencia la web y la más fácil de romper).

**Lleva clase** (decisión 12, F7): corta, con «Tócalo tú» y tres preguntas en el chat.
- **Concepto**: dibujar un trazo con CSS. Con `pathLength="1"` cualquier camino mide 1; con
  `stroke-dasharray: 1` el trazo es un solo guion del largo del camino, y `stroke-dashoffset` de 1
  a 0 lo hace aparecer de principio a fin. Y por qué el reposo (el trazo entero) se escribe **fuera**
  de la media query: lo que no se mueve tiene que verse bien sin ella.
- **Tócalo tú**: en las herramientas del navegador, cambiar el `stroke-dashoffset` del óvalo de
  «Acepto proyectos» a 0,5 y a -0,5, y quitar `pathLength` para ver qué pasa.
- **Tres preguntas**: qué pasa si la animación se escribe fuera de
  `prefers-reduced-motion: no-preference`; por qué `animation-timeline` no va en el atajo
  `animation`; y por qué el LCP sigue siendo el nombre aunque se mueva.

**Leer antes**:
- ENTEROS: `plan/spec-visual.md` § 1.2 (Movimiento) y § 4; las «Reglas de la fase».
- Del estudio: `~/Projects/propios/estudio-reigar/CLAUDE.md` («El movimiento») y
  `web/e2e/movimiento.spec.ts`.
- `docs/lienzo/final.html` (el CSS del movimiento, para mirar, no para copiar a ciegas).

**Archivos**:
- Se crea: `src/styles/motion.css` (todo el movimiento en un sitio) y `e2e/movimiento.spec.ts`.
- Se tocan: los componentes que se mueven (clases, sin lógica), `global.css` (importa `motion.css`
  la última), `package.json` (0.2.7).

**Qué se hace**: la tabla de spec § 4 entera: la recomposición del nombre, del título de ficha y del
404; la subida de la fila bajo la regla; el avatar (26 trazos en tres grupos, el paso a relleno,
la piel, la camiseta y el rayado); el óvalo; la flecha del 404; los carteles con `view()`; las
bandas con `view-timeline`; las flechas de las parejas; las cifras. Los tokens de movimiento de
§ 1.2, sin números sueltos.

**Reutilizar**: el vocabulario y las pruebas de movimiento del estudio.

**Fuera de alcance**: cualquier JS de movimiento, librerías, `IntersectionObserver`, transiciones
entre páginas, nada en bucle.

**Aceptación**:
- `npm run red` en verde.
- `movimiento.spec.ts`: con movimiento reducido, `document.getAnimations().length === 0` en las
  cuatro páginas de la spec; sin él, en la portada hay animaciones en marcha al cargar y ninguna
  pasados 4 s (salvo las del scroll, que no avanzan sin scroll); ninguna anima `transform`.
- **Las 16 vistas de reposo pasan sin regenerarlas.** Si alguna cambia, el reposo no está bien
  escrito fuera: se arregla el CSS, no la captura.
- Las bandas cubren el ancho a 1920 en el principio y en el final de su viaje.
- Lighthouse: LCP es el nombre (o el título de ficha), CLS ≤ 0,01.
- La clase dada en el chat, con las tres respuestas de Fritz corregidas.

**Verificación**:

    npm run red
    npx playwright test --grep @vista
    npm run lighthouse -- --detalle

**Qué trae Fritz**: un rato para la clase y la QA en el teléfono (con y sin «reducir movimiento»
del sistema).

---

### Tanda 2.8 — El texto inglés   [x] hecha (2026-11-06, sin versión)
**Objetivo**: existe `plan/contenido-en.md` con todo el texto visible de la web en inglés, con el
OK de Fritz, listo para que la 2.9 lo monte sin escribir una línea.

**Modelo**: Opus 5.5, medio.

**Puede adelantarse**: no depende del código; va en cualquier momento después de la 2.2.

**Leer antes**:
- ENTEROS: `plan/contenido.md` y `plan/capturas.md`; `src/data/ui.ts` (lo que ya está en inglés:
  nav, salto, pie, aviso) y `plan/spec-visual.md` § 5 (las etiquetas de la nav, medidas).
- `CLAUDE.md` del portfolio, «Posicionamiento» y «El CV» (nombres de puesto, idiomas, formación).
- Del estudio, su inglés como referencia de tono: `~/Projects/propios/estudio-reigar/web/src/pages/en/`.

**Archivos**: crea `plan/contenido-en.md`.

**Qué se hace**:
- El mismo índice que `contenido.md` (§ 0 a § 6): cada bloque en inglés, adaptado y no calcado
  (lo que en español es local se explica: Benetússer, l'Horta), con los `alt` de cada captura, los
  `title`, `description` y OG, el 404, el formulario y el JSON-LD de la portada en inglés
  (`inLanguage: "en"`).
- Los puestos, en inglés como en `cv-en.html`; la formación, con el nombre del título explicado
  (sin decir que está terminado: el DAM no lo está).
- Las cifras, las mismas y con el formato inglés (0.48 s, 9,503; «more than 1,200»).
- Sin notas de fuente nuevas: cada bloque remite a su gemelo español.

**Reutilizar**: el texto inglés que ya hay en `ui.ts`.

**Fuera de alcance**: el código; cambiar el texto español (si algo no se puede decir igual, va a
«Desvíos» y Fritz decide).

**Aceptación**:
- Cada bloque de `contenido.md` tiene su gemelo, sin huecos.
- La nav inglesa son las etiquetas medidas en spec § 5 (Work, Projects, How I work, Career,
  Contact, Español), o se vuelve a medir.
- El grep de la regla 13 sobre `plan/contenido-en.md`, limpio.
- **Fritz da el OK en el chat**, bloque a bloque o entero.

**Verificación**:

    grep -nE "€|Ads|vulnerab|XSS|sales" plan/contenido-en.md

**Qué trae Fritz**: tiempo para leerlo y corregirlo (tiene C1).

---

### Tanda 2.9 — El inglés, en la web   [x] hecha (2026-11-07, v0.2.9)
**Objetivo**: las doce páginas existen en los dos idiomas, con hreflang recíproco, el enlace de
idioma visible y las inglesas en el sitemap y en Lighthouse.

**Modelo**: Opus 5.5, medio.

**Leer antes**:
- ENTEROS: `plan/contenido-en.md`, `src/data/routes.ts`, `src/data/ui.ts`, `src/data/home.ts` y
  `e2e/hreflang.spec.ts`.
- Los dos Desvíos de la 1.5 sobre el inglés (`plan/fase-1.md`: el `noindex` de las gemelas).

**Archivos**:
- Se crean: `src/content/cases/en/*.json` (cuatro).
- Se tocan: `home.ts` y `ui.ts` (el inglés, y `formText` por idioma), `shots.ts` (los `alt`
  ingleses), `routes.ts` (`en.live: true` y su `lastmod` en las seis), las seis páginas de
  `src/pages/en/` (como las españolas, sin el aviso ni el `noindex`), `scripts/lighthouse.mjs`
  (las páginas, de `routes.ts`), `e2e/datos.spec.ts` si hace falta, `package.json` (0.2.9).

**Qué se hace**: montar `contenido-en.md` tal cual; el `lang` y el `hreflang` de `LangLink`; el
404 inglés con su `ErrorHero` entero; el formulario en inglés en `/en/`; el JSON-LD en inglés en
`/en/`. `notYetText` y su ruta quedan sin uso: se borran.

**Reutilizar**: `routes.ts` (`twinsOf`, `switchHrefOf`) y las pruebas que ya cubren el camino vivo.

**Fuera de alcance**: cambiar el texto (si algo no cuadra al montarlo, «Desvíos»); las imágenes OG.

**Aceptación**:
- `npm run red` en verde: hreflang recíproco en las 10 indexables, el sitemap con las 10 y sus
  `xhtml:link`, axe a 0 en las 12, Lighthouse dentro de presupuesto en las 10.
- `desbordes.spec.ts` con las páginas inglesas; la nav inglesa entera a 56rem.
- Un texto inglés del 404 en `/en/no-existe` (la prueba de `rutas.spec.ts` se ajusta).
- `grep -rn "notYetText" src e2e` no saca nada.

**Verificación**:

    npm run red
    npx playwright test hreflang rutas

**Qué trae Fritz**: la QA en el teléfono en inglés.

---

### Tanda 2.10 — Las imágenes OG con Satori   [x] hecha (2026-11-07, v0.2.10)
**Objetivo**: cada página indexable tiene su imagen para compartir de 1200 × 630 en su idioma,
hecha en el build.

**Modelo**: Opus 5.5, medio.

**Leer antes**:
- ENTEROS: `~/Projects/propios/estudio-reigar/web/src/pages/og/[lang]/[key].png.ts` y la tanda 4.8
  de `~/Projects/propios/estudio-reigar/plan/fase-4.md` (sus Desvíos incluidos).
- `plan/contenido.md` § 6.2 y `plan/contenido-en.md` (los títulos y líneas de OG);
  `plan/spec-visual.md` § 1.2 (colores y tipografía).

**Archivos**:
- Se crean: `src/pages/og/[lang]/[key].png.ts`; las instancias TTF de Archivo en
  `src/assets/fonts/` (las saca `scripts/fuente.py --og`: cartel a `wdth` 62 y `wght` 800, texto a
  `wdth` 100 y `wght` 400 y 600).
- Se tocan: `package.json` (`satori` y `@resvg/resvg-js`, como el estudio; 0.2.10),
  `scripts/fuente.py`, `routes.ts` (el texto de OG de cada página e idioma pasa aquí, como en el
  estudio, porque la ruta de OG lo necesita sin pintar la página; las páginas dejan de pasarlo a
  mano), `BaseLayout.astro` (`og:image` absoluta con su `width`, `height` y `alt`;
  `twitter:card` a `summary_large_image`), `e2e/rutas.spec.ts`.

**Qué se hace**: la composición es el cartel de la web: fondo `--color-bg`, el título en Archivo
estrecha a gran escala, la regla cobalto de 6 px y la línea de OG; en la portada, además, el
avatar sobre su celeste. Los colores se leen de `src/styles/tokens.css` (F4), no se copian.

**Reutilizar**: la ruta del estudio casi entera (`?inline` para las fuentes, `bytesOf`).

**Fuera de alcance**: borrar `public/assets/img/og-preview.png` (sigue respondiendo en su URL por
los enlaces ya compartidos; ninguna página lo enlaza).

**Aceptación**:
- `npm run red` en verde.
- `dist/og/es/*.png` y `dist/og/en/*.png`: una por página indexable (diez), de 1200 × 630, cada
  una ≤ 150 KB (se lee con Pillow).
- Cada página indexable lleva `og:image` con la URL absoluta de la suya, que responde 200 (prueba).
- Las imágenes, mandadas a Fritz.

**Verificación**:

    npm run red
    python -c "from PIL import Image; import glob,os; [print(f, Image.open(f).size, os.path.getsize(f)) for f in sorted(glob.glob('dist/og/*/*.png'))]"

**Qué trae Fritz**: su OK a las imágenes.

---

### Tanda 2.11 — QA, las fuentes lentas y las cifras   [x] hecha (2026-11-07, v0.2.11; la QA en el móvil, emulada, por encargo de Fritz)
**Objetivo**: la web aguanta una fuente lenta sin saltos, se ha recorrido como visitante, los
presupuestos son los medidos y cada cifra está recontada en su fuente: lista para el corte.

**Modelo**: Opus 5.5, medio.

**Leer antes**:
- ENTEROS: la tanda 6.11 de `~/Projects/propios/estudio-reigar/plan/fase-6.md` (cómo midió los
  saltos con la fuente retrasada) y `plan/spec-visual.md` § 8 («Riesgo conocido»).
- La revisión como visitante de la 1.4 (`plan/fase-1.md`, Desvíos).
- `CLAUDE.md` del portfolio, «Proyecto principal: Snugport»; `plan/contenido.md` § 4 y § 5 (las
  cifras y de dónde salen).

**Archivos**:
- Se crea: `e2e/fuentes.spec.ts`.
- Se tocan: lo que la QA arregle; `lighthouse.budgets.json` y la cabecera de
  `scripts/lighthouse.mjs`; `plan/contenido.md` y `contenido-en.md` y los datos si una cifra cambia;
  se borra `assets/img/proyectos/`; `package.json` (0.2.11).

**Qué se hace**:
- **La fuente lenta**: `/fonts/archivo.woff2` retrasada 800 ms a 412, 1024 y 1440, en las cuatro
  páginas de la spec; si un cartel se parte distinto y empuja lo de abajo, se elige entre las tres
  salidas de spec § 8 (precarga sola, `@font-face` de reserva con `size-adjust`, o
  `font-display: optional` en los carteles) y se apunta en «Desvíos».
- **Como visitante**: 360, 768, 900, 1024, 1280, 1920 y 2560; el teclado entero (foco visible en
  todo, también en la banda cobalto); la carga a medias; el menú del móvil; los dos idiomas.
- **Las cifras**: las pruebas de Snugport (`npx vitest list` en
  `~/Projects/propios/snugport/snugport-app/panel` y `npx playwright test --list --grep-invert @estres`),
  la versión publicada de Snugtone y sus cifras (`~/Projects/propios/snugtone/README.es.md`). Si
  cambian, se cambian en `contenido.md`, `contenido-en.md` y los datos, y se apunta.
- **Las capturas con Navidad** (`plan/capturas.md`): si el corte va a caer después del 6 de enero
  de 2027, se rehacen la vitrina de Missphone y los «después» 1 y 2 antes del corte (con la VPN de
  Fritz y las reglas de `~/Projects/clientes/missphone/CLAUDE.md`), y se pasan por
  `scripts/capturas.py`.

**Fuera de alcance**: piezas nuevas o cambios de diseño (van a «Desvíos» y a la fase siguiente).

**Aceptación**:
- `npm run red` en verde; `fuentes.spec.ts` con CLS ≤ 0,01 con la fuente retrasada en las cuatro
  páginas y los tres anchos.
- Lighthouse en local: rendimiento ≥ 95 y el resto 100 en las diez indexables; cada cambio de
  `lighthouse.budgets.json`, con su porqué.
- Cada cifra de la web, con la fecha de su recuento en `contenido.md`.
- `git ls-files assets/` vacío.
- Fritz da el OK a la previa entera desde su teléfono.

**Verificación**:

    npm run red
    npx playwright test fuentes
    git ls-files assets/

**Qué trae Fritz**: la QA en el teléfono de toda la web y, si hay que rehacer capturas de
Missphone, la VPN puesta.

---

### Tanda 2.12 — La coherencia: los dos CV y LinkedIn   [x] hecha (2026-11-09, v0.2.12)
**Objetivo**: los dos CV no contradicen la web nueva, llevan su acento y caben en dos A4 justas;
los PDF servidos son los nuevos; y Fritz tiene la lista de lo que cambiar en LinkedIn.

**Modelo**: Opus 5.5, medio.

**Leer antes**:
- ENTEROS: `CLAUDE.md` del portfolio («El CV» y «LinkedIn»), `plan/contenido.md` § «Choques con el
  CV» (las 15 filas) y § 1.6, y `docs/cv/cv-es.html`.
- Memorias: «Fritz prefiere precisión a inflar el CV», «LinkedIn en inglés y alineado con el CV» y
  «No publicar en LinkedIn».

**Archivos**:
- Se tocan: `docs/cv/cv-es.html` (gitignored), `docs/cv/cv-en.html` (regenerado: su `<head>` es
  copia del español), `public/assets/cv/fritz-reigar-cv.pdf` y `fritz-reigar-cv-en.pdf`,
  `plan/contenido.md` (la lista de choques, marcada como resuelta), `package.json` (0.2.12).
- Se crea: `docs/linkedin-cambios.md` (gitignored).

**Qué se hace**:
- Cada fila de «Choques con el CV», resuelta con Fritz en el chat (las que dicen «decidir», como el
  titular de la fila 1 y Missphone fuera de la entrada del estudio en la 10, las decide él).
- El acento a `#1f4fa3` (F8) y lo demás del diseño igual.
- Exportar los dos PDF con Chrome sin cabecera ni pie y contar páginas (el comando del `CLAUDE.md`);
  si desborda, el resorte es el `line-height` del `body`, no recortar.
- La lista de LinkedIn: titular, «Acerca de», el puesto del estudio y los proyectos, en inglés,
  cada cambio con el texto exacto y dónde va; recordando la trampa del titular al añadir puestos y
  que el enlace del sitio es `https://www.fritzreigar.com/` (funciona desde el corte).

**Reutilizar**: `docs/cv/` y el método de dos páginas del `CLAUDE.md`.

**Fuera de alcance**: tocar LinkedIn (lo hace Fritz), publicar nada, rediseñar el CV.

**Aceptación**:
- Los dos PDF, de 2 páginas (`/Count 2` con el comando del `CLAUDE.md`).
- Ni una contradicción entre web y CV en hechos, fechas, idiomas, formación y nombres: se recorre
  la lista de choques fila a fila y cada una queda con su resolución.
- `npm run red` en verde (los PDF siguen respondiendo en su URL).
- Fritz da el OK a los dos PDF y tiene `docs/linkedin-cambios.md`.

**Verificación**:

    chrome --headless --no-pdf-header-footer --print-to-pdf=out.pdf file:///.../docs/cv/cv-es.html
    python -c "import re,io; print(re.findall(rb'/Count\s+(\d+)', io.open('out.pdf','rb').read()))"
    npm run red

**Qué trae Fritz**: las decisiones de las filas abiertas (titular, Missphone en el CV) y su OK.

---

### Tanda 2.13 — El corte (v1.0.0)   [ ] pendiente
**Objetivo**: fritzreigar.com y www.fritzreigar.com sirven la web en Astro desde `fritzreigar-com`,
con `main` como producción, y la web vieja se queda una semana lista para volver.

**Modelo**: Opus 5.5, **alto** (dominio, DNS y caché: la tabla de §7.5 de
`~/Projects/organizacion-y-flujo.md`).

**Leer antes**:
- ENTEROS: el «Punto de partida» de este archivo (lo medido para el corte), la decisión 7 de
  `plan/README.md` y los dos últimos Desvíos de `plan/fase-1.md` (los proyectos de Pages y la previa
  que publicó `portfolio-v1`).
- `CLAUDE.md` del portfolio, «Ojo con la caché».

**Archivos**: `package.json` (1.0.0); `CLAUDE.md` (reescrito para la web en Astro);
`historia.md` (se crea, con lo cerrado de la web vieja); `plan/README.md` (el paso 6 del ciclo y la
fase 2 cerrada); `README.md` (el estado).

**Antes de empezar** (si algo falta, no se corta):
- `npm run red` en verde en `astro` y la CI del último push, en verde.
- Las tandas 2.1 a 2.12 hechas; Fritz ha dado el OK a la previa entera.
- `git log --oneline astro..main` vacío (si no, se para: `main` ha recibido algo que no se esperaba).
- Fritz tiene a mano el panel de Cloudflare.

**Los pasos** (lo del panel lo hace Fritz; Claude dice qué y comprueba con `curl`):
1. **Pausar los despliegues automáticos de `portfolio-v1`** (*Configuración → Compilaciones*). Sin
   esto, el push del paso 3 publica la raíz del repo en el dominio. Se comprueba que su
   despliegue de producción activo sigue siendo el de la web vieja.
2. En `fritzreigar-com`: rama de producción → `main`; previas → todas las ramas salvo producción.
3. `git switch main && git merge --ff-only astro`; `package.json` a 1.0.0, commit
   «La web en Astro, en el dominio (v1.0.0)», tag `v1.0.0`, y push de `main` y del tag **con el OK
   de Fritz**. Se espera al build de producción de `fritzreigar-com` y a la CI de `main`, y se
   comprueba `https://fritzreigar-com.pages.dev/` (con `noindex`: es `pages.dev`).
4. **Dominios**: quitar `fritzreigar.com` de *Dominios personalizados* de `portfolio-v1` y añadirlo
   a `fritzreigar-com` (Cloudflare reescribe el CNAME de la zona). Añadir también
   `www.fritzreigar.com` a `fritzreigar-com` y una regla de redirección 301 de
   `https://www.fritzreigar.com/*` a `https://fritzreigar.com/${1}` conservando la consulta.
5. **Caché**: mirar en la zona qué regla cachea el HTML (*Caching → Cache Rules* y *Page Rules*);
   quitarla o sacar el HTML de ella, para que valga el `max-age=0` de Pages. Purgar todo.
6. **Comprobar en el dominio**:
   - `curl -sI` de las doce rutas: 200 y sin `X-Robots-Tag`; `/no-existe` y `/en/no-existe`, 404;
     `/index.html`, 308 a `/`;
   - CSP, HSTS y `X-Frame-Options: DENY` en `/`;
   - `/assets/cv/fritz-reigar-cv.pdf` y `-en.pdf`, 200; `/sitemap.xml` y `/robots.txt`, 200;
   - `https://www.fritzreigar.com/trabajo/missphone` → 301 a la raíz con la misma ruta;
   - `/CLAUDE.md`, `/plan/README.md` y `/package.json`, 404;
   - `cf-cache-status` del HTML ya no es `HIT` con una versión vieja (comparar con `?nocache=1`);
   - `npm run lighthouse -- --dominio` dentro de presupuesto.
7. Reescribir el `CLAUDE.md` para la web en Astro (arquitectura, desarrollo y deploy; fuera lo de
   `index.html`, `js/`, `html.dark` y `?lang=en`), llevar lo cerrado de la web vieja a
   `historia.md`, y en `plan/README.md` el paso 6 del ciclo (desde el corte, push a `main` es
   publicar). Commit y push con el OK.

**Vuelta atrás (una semana desde el corte)**: `portfolio-v1` conserva su último despliegue de la
web vieja y no construye nada. Si algo falla en el dominio:
1. Fritz devuelve `fritzreigar.com` a `portfolio-v1` (y quita `www` de `fritzreigar-com`, o lo deja
   redirigiendo).
2. Purgar la caché.
3. Se arregla en una rama, se prueba en su previa y se repite desde el paso 4. El repo no se
   revierte: `main` sigue siendo la web en Astro.

**Pasada la semana sin incidencias** (Fritz): borrar el proyecto `portfolio-v1` (con el despliegue
`1483e40d`), las ramas remotas `astro` y `cloudflare/workers-autoconfig`, y, si tiene Search
Console de fritzreigar.com, mandar el sitemap nuevo. Se apunta la fecha en «Desvíos».

**Fuera de alcance**: cualquier cambio de la web (lo que aparezca va a una tanda nueva), Web
Analytics, tocar el correo de la zona.

**Aceptación**:
- Los puntos del paso 6, todos, con su salida de `curl` en el chat.
- `git tag` tiene `v1.0.0` en `main`, y `main` = `astro`.
- `CLAUDE.md` describe la web en Astro y no la de una sola página.

**Verificación**:

    for p in / /trabajo/missphone /trabajo/limpiezas-artemisa /proyectos/snugtone /proyectos/snugport /en/ /en/work/missphone /en/work/limpiezas-artemisa /en/projects/snugtone /en/projects/snugport /no-existe /CLAUDE.md; do echo "$p $(curl -s -o /dev/null -w '%{http_code}' https://fritzreigar.com$p)"; done
    curl -sI https://fritzreigar.com/ | grep -iE "^HTTP|x-robots|content-security|strict-transport|x-frame|cf-cache"
    curl -sI https://www.fritzreigar.com/trabajo/missphone | grep -iE "^HTTP|^location"
    npm run lighthouse -- --dominio

**Qué trae Fritz**: el panel de Cloudflare abierto, una hora sin prisa y su OK para cada push.

---

## Desvíos

(Lo que aparezca a mitad de una tanda y no estaba, con su fecha y su tanda.)

- **2026-11-05, tanda 2.1: «↗» no está en Archivo.** «→» (U+2192) sí, y entra en el subconjunto;
  «↗» (U+2197) sale de la fuente del sistema, como en el lienzo. `public/fonts/archivo.woff2` pesa
  61,6 KB (tope 95) con `wdth` 62–100 y `wght` 400–800.
- **2026-11-05, tanda 2.1: las parejas alternan dos flechas y `Ink` solo tiene `arrow-down`.** La
  spec da tres formas (`oval`, `arrow`, `arrow-down`); el lienzo pinta las parejas de Missphone
  alternando la que baja y sube (`arrow-down`, línea 995 de `docs/lienzo/final.html`) y la que sube
  y baja (línea 978). La 2.5 decide si añade una cuarta forma o voltea la que hay.
- **2026-11-05, tanda 2.1: el pie mide 44 px por enlace.** El encargo pide todo lo pulsable del
  marco a 44 px; en el lienzo los enlaces del pie eran de una línea. El pie crece unos 10 px a 1440
  y una fila a 390; el resto del marco cuadra con las capturas del lienzo.
- **2026-11-05, tanda 2.1: dos `LangLink` por página.** El de la cabecera entera y el del menú
  del móvil, como en el lienzo. `e2e/hreflang.spec.ts` ya espera los dos para cuando el inglés se
  encienda (2.9).
- **2026-11-05, tanda 2.2: el texto de dos fichas ya tiene la forma de la spec.** El `diff` del
  texto de `dist/` antes y después sale idéntico en la portada, Missphone, Snugport, los 404 y
  todos los `<head>` (metadatos y JSON-LD). Cambian, a propósito, dos fichas, porque sus datos ya
  tienen la forma de la pieza que los pinta: en Snugtone, «Medido» son las cinco cifras de spec
  § 2.3 (las del lienzo, mismas cifras y misma fuente) y la nota de las capturas va bajo la
  cabecera, donde estará la vitrina; en Artemisa, «Qué se hizo» separa el título de cada punto de
  su frase (sin los «:» ni la coma de la frase corrida, y la frase con mayúscula), y «Medido» suma
  las cuatro cifras de spec § 2.4 a su frase, que queda como `note`.
- **2026-11-05, tanda 2.2: la tarjeta lleva `shots` (de una a tres), no `shot`.** Snugtone pinta
  tres capturas en la portada (`ProjectFeature`, spec § 6.3); las demás, una.
- **2026-11-05, tanda 2.2: piezas que no estaban en la lista de archivos.** `src/data/rich.ts` y
  `src/components/ui/Rich.astro`: el texto con un `code`, una negrita o un enlace dentro (el
  `cargo clippy`, el «estudioreigar.com» de Contacto, `X-Frame-Options`, los filtros del buscador
  de Snugtone) va como lista de trozos, sin HTML; es el «campo propio» de la F1, uno solo para
  todos. `src/data/cases.ts` lee la ficha de una ruta (el slug es el último trozo de su ruta
  española: `caseRoutes` y `caseSlugOf`, en `routes.ts`). Y `src/components/case/CaseBody.astro`
  ya existe, **sin estilo y sin capturas**: pinta las piezas presentes en el orden de la F1 para que
  las cuatro fichas lean del JSON sin repetir el marcado; la 2.5 la parte en un componente por
  pieza y la pinta. Los `id` de sus secciones salen del título (`que-hice-por-fases`).
- **2026-11-05, tanda 2.2: `Shot` toma la clave, no `src` y `alt`.** Props: `shot` (clave de
  `shots.ts`), `lang`, `sizes`, y `widths`, `eager`, `decorative` (`alt=""`) y `phone` opcionales;
  `width` y `height` salen de la imagen. El `srcset` va de 400 a 1600 (de 200 a 600 las del móvil)
  sin pasar del origen, que entra como el último. Ninguna página lo usa aún: se probó con una
  página de usar y tirar (AVIF y WebP, `lazy` y `async` por defecto, `alt=""` con `decorative`).
- **2026-11-05, tanda 2.2: lo que queda para la 2.6.** Las tres capas de `LayerStack` de Snugtone
  (`layers`, opcional) no están en `contenido.md`, solo en el lienzo; y los cuatro puntos de
  Snugport van como `FeatureRows` sin título, que es lo que hay en el texto. Las capturas pesan
  1,6 MB entre las 23 (tope 3).
- **2026-11-05, tanda 2.3: el documento de la portada pasa el tope bruto de Lighthouse.** Pesa
  111,4 KB brutos y 28,7 en gzip (tope de la spec, 32 en gzip): las bandas repiten cada serie en
  `<picture>` con AVIF y WebP y comprimen a 4:1, no a los 3,3:1 del lienzo con que se pasó a bruto
  (63,5 KB son el avatar). `document` sube de 100 a 120 KB brutos, con su porqué en la cabecera de
  `scripts/lighthouse.mjs`. La 2.4 añade el estilo de tres secciones: si se acerca a 120, se mira
  quitar el origen del `srcset` de las bandas (no hace falta: el mayor que piden es el doble de
  250 px de alto) antes de volver a subir.
- **2026-11-05, tanda 2.3: piezas y pruebas que no estaban en la lista.** `e2e/portada.spec.ts`:
  la primera pantalla de spec § 7 a 390 × 844 y a 1440 × 900 (margen de 24 px), el avatar al lado
  de «Fritz», todas las imágenes con `loading="lazy"` y las tarjetas pulsables enteras con un solo
  enlace. En `global.css`, lo que cruzan varios componentes: `.section` y `.section--last` (spec
  § 3.4), `.tap-card` (el `::after` del `ArrowLink` y el marco cobalto encima), `.card-text` y
  `.card-title`. `StackList` existe pero no lo usa nadie hasta los cierres de la 2.5.
- **2026-11-05, tanda 2.3: el `id` de la sección va en la `<section>`.** `#trabajo` y
  `#proyectos` llevan a la sección (con su `--space-section` encima, como el lienzo) y el `h2`
  lleva `<id>-titulo` para el `aria-labelledby`. La 2.4 hace lo mismo con las tres que quedan, que
  hoy van con el `id` en el `h2` y sin estilo (solo dentro de `.section` y `.wrap`).
- **2026-11-05, tanda 2.3: la tinta del estado va fuera del `<p>`.** `StatusBadge` es un `div` con
  el texto en un `<p>` y la `Ink` al lado: dentro del `<p>`, el óvalo (que sobresale a propósito)
  contaba como desborde en `e2e/desbordes.spec.ts`.
- **2026-11-05, tanda 2.3: las vistas cargan las capturas antes de la foto.** Con `lazy`, una
  captura de página entera salía con unas imágenes sí y otras no según el momento;
  `e2e/vistas.spec.ts` las pide todas y espera a que se pinten. Capturas nuevas, buscadas: las
  cuatro de la portada (la mitad de abajo sigue sin estilo: la 2.4 las regenera).
- **2026-11-05, tanda 2.3: lo que difiere del lienzo, por la spec.** «Todo el código público» es un
  `ArrowLink` (spec § 2.3), no el enlace cobalto suelto del lienzo. `--height-band` es 120–250 px
  (`tokens.css` desde la 2.1; la tabla de spec § 6.2 da 245): el `sizes` de las bandas sale de ese
  token. El avatar se copió de `avatar-ligero.svgfrag` a `Avatar.astro` tal cual (63,5 KB, sin
  colores ni `style`): el `.svgfrag` vive en `docs/`, que no sube.
- **2026-11-05, tanda 2.4: los textos de los estados van en el HTML, no en `main.ts`.** Salen de
  `formText` (`src/data/ui.ts`), pero `ContactForm` los pinta: «Enviando…» en `data-sending` y las
  líneas de «enviado» y «error» en dos `<template>`. `main.ts` copia el que toca en una de las dos
  líneas vivas (`role="status"` y `role="alert"`), que están en la página desde el principio y
  vacías, para que el lector de pantalla anuncie el cambio. Así `main.ts` no lleva texto en ningún
  idioma y la 2.9 solo pasa `lang` a `ContactForm` (hoy no lo recibe). Pesa 719 B en gzip.
- **2026-11-05, tanda 2.4: los `name` son los de la web de hoy, no los del lienzo.** El lienzo
  escribe `nombre` y `mensaje`; el formulario sigue con `name`, `email` y `message`, como manda
  el encargo (llegan así al correo de Formspree).
- **2026-11-05, tanda 2.4: props que no estaban en la spec.** `ContactSection` recibe además
  `id`, `title`, `lede`, `direct` y `cv` (el texto, de `home.ts`), y `photo` es
  `{ image, alt }`; esa rama (spec § 2.5, `srcset` de 176, 352 y 528) compila pero no la pinta
  ninguna página hasta que exista la foto: quien la ponga mira las vistas a 390 y a 1440.
  `CareerExtra` recibe el CV como `Link` (texto y `href`), no `cvHref`.
- **2026-11-05, tanda 2.4: el documento de la portada pesa 113,1 KB brutos** (tope 120; 111,4 en la
  2.3): el estilo de las tres secciones sumó 1,7. Aún sin tocar las bandas.
- **2026-11-05, tanda 2.4: Playwright no pulsa un botón con `aria-disabled`.** La prueba de que un
  segundo clic mientras envía no repite la petición lo pulsa con `force: true`.
- **2026-11-05, tanda 2.5: el título de ficha sangra hacia el margen.** «MISSPHONE» mide 1332 px
  a 1440 (en una caja de 1280) y llega a 1412: se come el margen derecho sin partirse ni salir de
  la ventana, como en el lienzo, cuya herramienta de desbordes solo cazaba lo que salía de la
  ventana. `e2e/desbordes.spec.ts` exime a `.case-hero h1` de la comprobación de caja, no de la de
  ventana. Sin `overflow-wrap: anywhere`, que lo partía en «MISSPHON / E».
- **2026-11-05, tanda 2.5: `Ink` tiene una cuarta forma, `arrow-up`.** La que sube y baja (línea
  978 de `docs/lienzo/final.html`); las parejas anchas alternan `arrow-up` y `arrow-down`
  empezando por la primera, como el lienzo. Resuelve el Desvío de la 2.1. La `<svg>` lleva además
  la clase `ink--<forma>`, que usa la prueba.
- **2026-11-05, tanda 2.5: la captura del móvil de la vitrina va con `lazy`.** El encargo dice la
  vitrina sin `lazy`; la de escritorio va así, pero la del móvil está oculta a 35rem o menos y con
  `eager` el móvil la descargaría igual. En escritorio asoma en la primera pantalla y carga sin
  esperar. Oculta, se quita también su `<picture>` (`:has`), que si no dejaba una fila vacía con
  su hueco.
- **2026-11-05, tanda 2.5: el JSON de Missphone, a la forma de sus piezas.** Los títulos de las
  parejas y de las fases van sin el punto final (son títulos en caja alta, como en el lienzo), y
  los pies de las parejas, con mayúscula: «Antes» y «Después» ya no van delante en la misma frase.
  En «Las cifras», la unidad es la pieza pequeña a 0,45 em junto a la cifra (la «s» y los «MB» de
  Snugtone): «páginas», «productos»… vuelven a su frase y el 268 lleva «→ 8», como el lienzo. El
  texto de `contenido.md` no cambia.
- **2026-11-05, tanda 2.5: quién pone qué en el cuerpo.** `CaseBody` pone cada sección con su
  cartel (`SectionTitle`); `Prose`, `BeforeAfter`, `FeatureRows`, `FigureList` y `PhaseList` pintan
  solo su contenido. `PullQuote` lleva su rótulo como `h2` con aspecto de rótulo, y cada columna de
  `CaseClosing` es una `<section>` con su `h2`; el cierre es la última sección (`--space-end`). Su
  acción (la descarga de Snugtone) ya sale como `Button` primario; la 2.6 la coloca. Un token
  nuevo, `--gap-pair` (16 → 72 px, el hueco entre las dos capturas de una pareja en el lienzo).
  `FigureList` reparte cuatro cifras en 2 + 2 y, a 60rem o menos, solo pone entera la última si
  queda sola.
- **2026-11-05, tanda 2.5: Snugtone y Snugport, a medio pintar.** Pasan ya por el `CaseBody` nuevo
  (secciones, carteles y cierre con estilo) con su cabecera aún sin estilo y sin vitrina; `LayerStack`
  sigue sin estilo. La 2.6 las acaba.
- **2026-11-05, tanda 2.5: lo medido.** Documento de Missphone, 7,0 KB en gzip (30,9 brutos); de
  Artemisa, 3,8 (12,8): tope 10. La vitrina de Missphone en AVIF: 33,0 KB la de 1200 (la que pide
  1440) y 50,3 la de 1600: tope 120. Largo de Missphone, 8.681 px a 1440 y 8.354 a 390 (lienzo,
  8.690 y 8.367). A 390 la vitrina va de 641 a 877, no a 835 como dice spec § 7: ese número es de
  antes de ocultar la captura del móvil (nota al pie de spec § 6.2), cuando la de escritorio medía
  258 px y no 326; la captura del lienzo da lo mismo que la web, píxel a píxel. Prueba nueva, `e2e/fichas.spec.ts`: la primera pantalla de Missphone (spec § 7),
  la vitrina como única imagen sin `lazy`, las flechas de las parejas y las piezas de Artemisa.
- **2026-11-06, tanda 2.6: las tres capas de Snugtone, del lienzo a `contenido.md`.** El Desvío de
  la 2.2 las dejaba pendientes: van ahora en `contenido.md` § 4 («Las tres capas, de arriba
  abajo»), con el texto del lienzo, que repite la entradilla, y en el JSON (`layers`, el núcleo con
  `core`). Sin el `aria-label` del lienzo en la lista: lo nombra el cartel «Cómo está hecho» y,
  si no, sería texto suelto en el componente.
- **2026-11-06, tanda 2.6: la variante de la vitrina sale de los datos.** `CaseShowcase` no tiene
  prop `variant`: con captura del móvil es `pair` y sin ella, `single` (un `<figure>` con la nota de
  `caption` como `figcaption`, en 10-12 y debajo por debajo de 60rem).
- **2026-11-06, tanda 2.6: las filas sin título y el cierre de una columna.** Los cuatro puntos de
  Snugport no tienen título (Desvío de la 2.2): con el texto en 4-7, las columnas 1-3 quedaban como
  un hueco, así que una fila sin título lleva el texto en 1-7. `CaseClosing` con dos columnas o
  menos usa la rejilla de dos: Snugport pinta solo «Con qué», en la primera mitad. Ninguna de las
  dos cosas está dibujada en el lienzo.
- **2026-11-06, tanda 2.6: lo medido.** Documento de Snugtone, 4,3 KB en gzip (15,8 brutos); de
  Snugport, 2,8 (9,0): tope 10. La primera pantalla de Snugtone cuadra con spec § 7 en los dos
  anchos (margen de 24 px), y entra como prueba en `e2e/fichas.spec.ts` con las piezas de las dos
  fichas. Vistas nuevas, buscadas: las cuatro de Snugtone; con ellas, las 16 de la spec.
- **2026-11-06, tanda 2.7: sin clase.** Fritz la saltó («Sin clase jefe»): no hubo «Tócalo tú» ni
  tres preguntas, y ese punto de la aceptación queda fuera por decisión suya.
- **2026-11-06, tanda 2.7: el reposo, sin `forwards`.** Los `@keyframes` de la carga dan solo el
  `from` y van con `backwards`: el `to` implícito es el valor del componente, así que un mismo
  `fade-in` sirve para la piel (opacidad 1) y para el rayado (0,5), y al acabar la animación deja
  de existir (`getAnimations()` vuelve a cero salvo las del scroll, que es lo que mira
  `e2e/movimiento.spec.ts`). `stroke-dasharray: 1` va fuera, en `Ink` y en `Avatar`: con el offset
  en 0 es el trazo entero, y las 16 vistas pasan sin regenerarlas. Las cifras usan
  `figure-from-left` y `figure-from-right` (el `from-left-short` del lienzo). Lightning CSS acorta
  los rangos (`entry 0% entry 100%` sale como `entry`): es lo mismo.
- **2026-11-06, tanda 2.7: el LCP no siempre es el cartel, y no por el movimiento.** Lighthouse
  (móvil) da la entradilla en la portada, la vitrina en Missphone, Snugtone y Snugport, y el título
  solo en Artemisa; a 1440 es el nombre, el título o el «404». `e2e/movimiento.spec.ts` comprueba
  que el elemento del LCP es el mismo con movimiento y con movimiento reducido, en la portada,
  Missphone y el 404: la recomposición no lo cambia ni lo retrasa (rendimiento 99-100, CLS 0 en
  las cinco). Spec § 4 («el LCP es texto: el nombre, el título de ficha o el 404») no se cumple al
  pie de la letra en móvil desde antes de la 2.7: una entradilla de cuatro líneas mide más que una
  palabra del cartel, y la vitrina, más que el título. Lo decide la 2.11 (QA) o la planificación
  del corte; el presupuesto de la vitrina (spec § 8) ya cuenta con ella. `npm run lighthouse --
  --detalle` imprime ahora el elemento del LCP (de `lcp-breakdown-insight`).
- **2026-11-06, tanda 2.7: lo medido.** La hoja única pesa 40,9 KB brutos y 7,4 en gzip (tope 10);
  el documento de la portada, 29,2 KB en gzip (tope 32). La escena de carga acaba a
  los 3,4 s (el óvalo). Las bandas cubren 1920 px en el principio y en el final de su viaje (prueba
  nueva, a cover 0 % y 100 %).
- **2026-11-06, después de la 2.7: fuera las clases particulares.** Fritz quitó de Trayectoria la
  fila «Profesor particular de matemáticas, física y programación» (Sep 2018 — Jun 2026): «no creo
  que añada mucho». Sale de `src/data/home.ts` y de `plan/contenido.md` § 1.6; el CV la conserva
  (la web no lo contradice, solo cuenta menos), y la 2.12 decide si también sale de allí y de
  LinkedIn. Vistas nuevas, buscadas: las cuatro de la portada (una fila menos).
- **2026-11-06, tanda 2.8: el texto inglés, con el OK de Fritz y cinco vueltas.** `plan/contenido-en.md`
  sigue el índice de `contenido.md` y añade, donde los datos parten el texto de otra forma, esa
  forma (las cifras con `num` y `unit`, los títulos sin punto), más los `alt` de las 23 capturas.
  Fritz pidió repasos hasta que dejaran de salir calcos y una vuelta contra el significado del
  español: salieron tres frases que decían otra cosa, ya arregladas. La nav inglesa es la medida en
  spec § 5: no cambia. Cosas que la 2.9 monta y no son solo texto: los enlaces al estudio van a su
  inglés (`https://estudioreigar.com/en/` y `/en/case-studies/…`), el asunto del formulario lleva
  «(English)» y la nota de las capturas de Snugtone pierde la frase de que la interfaz está en inglés.
- **2026-11-06, tanda 2.8: para la 2.12.** `cv-en.html` llama al DAM «Higher National Diploma in…»,
  que en inglés se lee como título obtenido (la web dice «Spain's two-year higher vocational program
  in software», sin estado), y va en inglés británico («Specialisation») mientras la web va en
  americano. Y la web, en los dos idiomas, dice «al resto de España, a distancia», mientras el estudio
  en inglés dice «in Spain or abroad»: si Fritz quiere ampliarlo, cambian los dos textos.
- **2026-11-07, tanda 2.9: las páginas, de dos en dos.** El encargo pedía las seis de
  `src/pages/en/` «como las españolas»; copiarlas habría duplicado el `<style>` de la portada y el
  marcado de las fichas. El cuerpo de cada tipo de página pasa a `src/components/pages/`
  (`HomePage`, `CasePage` y `NotFoundPage`, con `lang` y, en las fichas, la clave de la ruta), y
  las doce páginas se quedan en una línea. `CasePage` saca la sección del rótulo y la que marca la
  cabecera de la `section` del JSON. El texto del 404 pasa de la página a `ui.ts` (`notFound`, por
  idioma), como el resto del marco. En español no cambia ni un píxel a 390.
- **2026-11-07, tanda 2.9: Lighthouse lee las páginas del sitemap del build.** Node no carga
  `routes.ts` desde un `.mjs` (importa `./ui` sin extensión), así que `scripts/lighthouse.mjs` saca
  las diez de `dist/sitemap.xml`, que se construye desde `routes.ts`: una página nueva entra sola
  igual. Las dos portadas, cinco pasadas; el resto, tres.
- **2026-11-07, tanda 2.9: con el idioma vivo, «English» se pinta.** Las ocho vistas a 1440 se
  regeneran, buscado: la diferencia está solo en la franja de la cabecera (y 25–53, la nav corrida
  a la izquierda para hacerle sitio, con su filete), y el largo de cada página no cambia; las ocho
  a 390 pasan sin tocarlas (el idioma va dentro del menú). En `e2e/marco.spec.ts` las listas de la
  cabecera y del menú cuentan el enlace de idioma. Los 404 no llevan hreflang (`noindex`) pero sí el
  enlace de idioma, a la portada del otro (`switchHrefOf`): `e2e/hreflang.spec.ts` lo comprueba,
  con su `hreflang` y su `lang`.
- **2026-11-07, tanda 2.9: «a 56rem» es a 897 px.** La cabecera pasa al menú con
  `max-width: 56rem`, así que a 896 px aún sale «Menu»: la prueba nueva de la nav inglesa entera,
  en una fila y sin salirse, va al primer ancho que la pinta, 897 px.
- **2026-11-07, tanda 2.9: lo demás.** El `alt` inglés es obligatorio (`Record<Lang, string>` en
  `shots.ts`) y `Shot` ya no cae al español. Los `lastmod` españoles se quedan en el 2026-11-05: su
  texto no cambia; los ingleses, 2026-11-07. `e2e/formulario.spec.ts` suma el formulario inglés
  (asunto con «(English)», «Sending…», «Message sent» y el error con el correo). Documento de la
  portada inglesa: 116,5 KB brutos y 29,3 en gzip (tope 120 y 32); la española, 116,0 y 29,2.
  Lighthouse (móvil, mediana): las diez páginas a 99-100 de rendimiento, 100 en lo demás, CLS 0 y
  TBT 0; cada gemela inglesa pesa lo mismo que la española (±0,5 KB de documento).
- **2026-11-07, tanda 2.10: Satori fijado en la 0.35.0.** La 0.35.2 (la que trae `^0.35.0`) usa
  `__dirname` en su ESM y tumba el build (`ReferenceError` al cargar la ruta); la 0.35.0, la del
  estudio, no. Va con versión exacta en `dependencies`, con `@resvg/resvg-js` `^2.6.2`.
- **2026-11-07, tanda 2.10: todo centrado en un eje, por WhatsApp.** La vista compacta de WhatsApp
  recorta el cuadrado central (de x = 285 a 915; Desvío 35 del estudio). En la portada, el nombre en
  dos líneas como el héroe, «Fritz» con el avatar al lado (mide una línea del nombre) y «Reigar» a
  la derecha, a 184 px: el bloque mide 528 px y entra entero en el recorte. En las fichas, el
  título de OG entero en el cartel (Archivo a `wdth` 62 y `wght` 800, caja alta), de 112 a 76 px
  según lo largo, en tres líneas como mucho y con `textWrap: 'balance'`; debajo, la regla cobalto de
  264 px (el 22 % de `--rule-poster`), la línea a 30 px en `--color-text-muted` y `fritzreigar.com`
  en cobalto. Los títulos largos pierden algo por los lados en el recorte, como en el estudio. Las
  fichas no llevan avatar: el encargo lo pone solo en la portada.
- **2026-11-07, tanda 2.10: el texto de OG, de los datos a `routes.ts`.** Sale de `home.ts`, de los
  ocho JSON y del esquema de `cases` (`meta.og`); `routes.ts` lleva `og: Record<Lang, OgText>`
  (`title` y `description`, el texto de `contenido.md` § 6.2 sin cambiar) y `ogImagePathOf`.
  `BaseLayout` ya no recibe `og`: lo saca de la ruta que pinta. Añade `og:image` absoluta,
  `og:image:type`, `width` (1200), `height` (630) y `alt` (el título de OG), y `twitter:card` pasa
  a `summary_large_image`. El PNG se llama como la clave de la ruta (`/og/es/work-missphone.png`),
  no como el slug. El 404 sigue sin Open Graph (prueba).
- **2026-11-07, tanda 2.10: colores y avatar, leídos, no copiados.** La ruta importa
  `tokens.css?raw` y lee los tokens del primer `:root` (el tema claro; una imagen no tiene modo
  oscuro), y `Avatar.astro?raw`, del que saca las cuatro capas y las pinta con sus
  `--color-avatar-*` y el `--hatch-opacity`, como el `<style>` del componente. Si el avatar deja de
  tener 26 trazos y una piel, el build se para. `scripts/tokens.mjs` no ve ningún literal.
- **2026-11-07, tanda 2.10: las TTF y la woff2.** `scripts/fuente.py --og` saca
  `archivo-poster-800.ttf`, `archivo-400.ttf` y `archivo-600.ttf` (45,5-45,8 KB, con el subconjunto
  latino de la woff2), en git y sin publicar: entran con `?inline` (`dist/_astro/` sin TTF).
  Volver a sacar la woff2 con el script da 0,3 KB menos con el mismo fontTools (4.63.0); se queda
  la de git, que esta tanda no toca la fuente publicada.
- **2026-11-07, tanda 2.10: para el corte.** La `og:image` va sin `?v=`: el estudio tuvo que
  añadirlo (Desvío 36, `OG_IMAGE_VERSION`) cuando cambió el dibujo de una imagen ya compartida,
  porque el borde de Cloudflare y WhatsApp la guardan por su URL. Si una imagen cambia después de
  publicarse, se hace lo mismo. `/og/*` sale con la caché por defecto de Pages (`_headers` no estaba
  en la tanda); la 2.13 decide si le pone la de una semana del estudio. Y la `og:image` es absoluta
  al dominio: en la previa las diez responden 200 (`image/png`, 1200 × 630, comprobado en
  `fritzreigar-com.pages.dev` tras el push), pero `https://fritzreigar.com/og/…` da 404 hasta el
  corte, así que compartir la previa sale sin imagen. La prueba de WhatsApp desde el móvil va en la
  2.13, con el dominio ya en Astro.
- **2026-11-07, tanda 2.10: lo medido.** Diez PNG de 1200 × 630, de 43 a 56 KB (tope 150).
  Prueba nueva en `e2e/rutas.spec.ts`: la `og:image` de cada indexable (absoluta, con medidas, `alt`,
  título y línea de `routes.ts`) y su 200 con `image/png`, el 404 sin Open Graph, y los diez PNG de
  `dist/og/` con su cabecera IHDR y su peso. Rojo visto antes del verde: un PNG quitado de `dist/`
  y `hmoe.png` en la `og:image` de `/en/` dan seis fallos (los dos anchos). `npm run red` en verde:
  363 pruebas y 57 saltadas (las que solo corren en un proyecto: desbordes y bandas en el de
  escritorio, el menú del móvil en el de móvil), Lighthouse móvil
  99-100 en las diez y CLS 0.
- **2026-11-07, tanda 2.11: la fuente lenta, con la segunda salida de spec § 8.** Con la woff2
  retrasada 800 ms y system-ui de reserva, la portada saltaba 0,147 a 1024 y 0,145 a 1440 (la línea
  «Reigar», que va a la derecha, se corría 280 px, y todo el texto bajaba unos píxeles al cambiar la
  altura de línea), el 404 0,16 y 0,15, y las fichas 0,011; a 412, la portada y el 404, 0,03. Ni la
  precarga sola (ya estaba) ni `font-display: optional` (si la woff2 no llega a tiempo, los carteles
  se quedan en la reserva toda la visita, y con system-ui no caben). Sale la `@font-face` de
  reserva: «Archivo Fallback», siete caras sobre la Arial local (`local("Arial")`, `ArialMT` y
  `Liberation Sans`, o sus negritas), una por cada `font-stretch` (62, 75 y 100 %) y peso que pinta
  la web, con el `size-adjust` del ancho medio de Archivo en esa instancia sobre texto de la web y
  las métricas verticales de su `hhea`; el navegador elige la cara por el mismo `font-stretch` que
  pide el CSS. Las escribe `scripts/metricas-fuente.py` (el método del estudio, con `instancer`) y
  van detrás de "Archivo" en `--font`. La primera vuelta medía el 400 y el 500 con la misma cara, y
  la entradilla (500) partía en cuatro líneas en vez de cinco a 412 (0,016): el 500 lleva la suya.
  Con la fuente buena no cambia nada (las 16 vistas pasan sin regenerarlas): la única letra que
  no está en Archivo, «↗», tampoco está en la Arial y sigue saliendo de system-ui. En Android no hay
  Arial ni Liberation: allí la reserva sigue siendo system-ui, sin probar en el teléfono.
- **2026-11-07, tanda 2.11: `e2e/fuentes.spec.ts`, en las seis páginas.** El encargo pedía las
  cuatro de la spec; entran también Artemisa y Snugport, y los dos idiomas: 36 pruebas en el
  proyecto de escritorio (los anchos los pone cada una), visto el rojo antes del verde (12 de 24 en
  rojo con system-ui). El peor caso queda en 0,0061 (Missphone a 1024); la portada, 0,0048, y el
  404, 0,0022. El observador de `layout-shift` entra con `addInitScript`, que va por el protocolo
  del navegador y la CSP no ve.
- **2026-11-07, tanda 2.11: la revisión como visitante, sin nada que arreglar.** A 360, 768, 900,
  1024, 1280, 1920 y 2560, en las doce páginas: ningún desborde ni scroll horizontal (el título de
  ficha sigue comiéndose el margen derecho a propósito, Desvío de la 2.5); por encima de 1440 todo
  se queda en la caja de 1280, centrada. El teclado: 30 paradas en la portada y de 10 a 17 en el
  resto, todas con su contorno de 2 px visible y en pantalla, también «Ver estudioreigar.com» en la
  banda cobalto (blanco sobre cobalto). El menú del móvil, en los dos idiomas, se cierra con
  Escape. Con las imágenes retenidas hasta después de pintar, la portada, Missphone y Snugtone no
  se mueven al llegar (CLS 0, el alto de la página igual ±1 px): todas llevan `width` y `height`.
- **2026-11-07, tanda 2.11: el LCP de móvil, aceptado.** El Desvío de la 2.7 lo dejaba para aquí:
  en el móvil el LCP es la entradilla en la portada y la vitrina en las fichas que la llevan, no el
  cartel. Con rendimiento 99-100 en las diez no hay nada que ganar moviéndolo; spec § 8 lo dice ya
  así.
- **2026-11-07, tanda 2.11: los presupuestos no cambian.** Medido (móvil, mediana): las diez a
  99-100 de rendimiento, 100 en lo demás, CLS 0 y TBT 0. Todo cabe en los topes de spec § 8, con lo
  medido en la cabecera de `scripts/lighthouse.mjs`. La hoja sube de 40,9 a 41,6 KB brutos (7,6 en
  gzip, tope 10) por las siete caras de reserva. `npm run red` en verde: 399 pruebas y 93 saltadas
  (las 36 nuevas de la fuente lenta no corren en el proyecto del móvil), las 16 vistas sin tocar.
- **2026-11-07, tanda 2.11: las cifras.** Snugport, recontado en `snugport-app` (panel v0.5.9):
  1.264 unitarias y 319 E2E distintas (eran 1.246 y 315); «más de 1.200» y «más de 300» siguen
  valiendo, y 80 divisas. Snugtone: la publicada sigue siendo la 1.0.1, con 609 + 31 pruebas que
  corren (contadas en el commit de la publicación, sin las ignoradas; en `main` sin publicar ya son
  616 + 40). Missphone: las cinco cifras, recontadas en la carpeta del cliente, iguales. Artemisa
  se queda con el Lighthouse del 2026-11-04 (repetirlo pide la VPN y el bloqueo de Analytics del
  cliente: si la planificación del corte lo quiere fresco, va allí). Nada cambia en la web ni en los
  datos: solo las fechas de recuento en `contenido.md` y `contenido-en.md`.
- **2026-11-07, tanda 2.11: las capturas con Navidad se quedan.** El corte va dos tandas detrás y
  cae antes del 6 de enero de 2027. Si se retrasara más allá, la 2.13 rehace la vitrina de
  Missphone y los «después» 1 y 2 antes de publicar (`plan/capturas.md`).
- **2026-11-07, tanda 2.11: `assets/` fuera de git.** Las cuatro WebP de `assets/img/proyectos/`
  (las de la web vieja) salen de la rama; `git ls-files assets/` da vacío. La de Galaxian vive en
  `docs/capturas/galaxian/`, y las de Artemisa y Snugport tienen capturas nuevas. `main` las sigue
  sirviendo hasta el corte.
- **2026-11-07, tanda 2.11: la QA en el móvil la hace Claude, emulada.** Fritz la pasó («Haz tú la
  QA en móvil también»). Va sobre el build de la tanda servido con `wrangler pages dev` (la previa
  aún no lo tiene: falta el push), en Chromium con el perfil del Pixel 7 (táctil y agente de
  Android) a 412 × 915, el ancho de su Nothing, y a 360: no es un teléfono de verdad, y ni WebKit
  (iPhone) ni la reserva de la fuente en Android se han probado. Recorridas las doce páginas en
  reposo, de arriba abajo, en claro y en oscuro (las seis españolas a 412; las cuatro de la spec en
  oscuro; la portada, Missphone y Snugtone inglesas a 360), y la portada y Missphone con el
  movimiento encendido, bajando a saltos: nada tenue ni a medias en mitad de la pantalla. El menú,
  en las doce: seis enlaces, lleva a su sitio y se cierra al pulsar. Los 31 enlaces distintos
  responden 200 (LinkedIn da 999, su respuesta a los robots). Salieron dos zonas de toque pequeñas,
  arregladas sin mover un píxel (las 16 vistas pasan sin regenerarlas):
  - **El pie**: «X» medía 10 px de ancho y «CV», 21. Cada enlace se come la mitad del hueco de
    24 px a cada lado (`padding-inline` en el enlace, y la lista sale 12 px por cada borde con
    `margin-inline` en negativo para que el texto no se mueva; con el negativo en cada enlace,
    `e2e/desbordes.spec.ts` lo daba como texto que se sale del `li`): «X» pasa a 34 y «CV» a 45,
    sin solaparse.
  - **«Código en GitHub ↗» en la cabecera de Snugtone** (y «Code on GitHub ↗»): 31 px de alto. Un
    `::before` lo alarga hacia arriba hasta el botón, 43 px, sin pisarlo; hacia abajo no se puede,
    porque la cabecera lleva `overflow: clip` (el título que sangra) y lo recorta. Los de dos
    líneas (Missphone y Artemisa) ya medían 49.
  Lo visto y que se queda, por ser diseño y no fallo: en el móvil las parejas de antes y después de
  Missphone son dos capturas de 180 px que no se leen (el pie de cada una cuenta lo que hay), y
  «QUÉ HICE, / POR FASES» lleva la coma de la primera línea casi tocando la segunda, por el
  interlineado apretado del cartel.
- **2026-11-07, tanda 2.11: la fuente lenta no corre en la CI.** Con el push, la CI dio rojo en 7
  de las 36 de `e2e/fuentes.spec.ts`, todas españolas: 0,012-0,023 (la portada a los tres anchos,
  Missphone a 412 y 1024, Artemisa y Snugport a 412). La CI sí tiene la Liberation Sans (la instala
  `playwright install --with-deps`), pero Linux pinta sus anchos un pelo distinto que Windows la
  Arial, y algunas entradillas parten en otra línea. Ajustar el `size-adjust` a Linux sería
  perseguir saltos de línea concretos (el estudio lo probó y empeoraba, tanda 6.11). La prueba
  lleva la etiqueta `@fuente` y la CI corre `e2e` con `--grep-invert "@vista|@fuente"`, como las
  vistas (F5): las dos miden cómo pinta la fuente el sistema, y corren en local. Lo que eso deja
  dicho: en Linux, y en Android (sin Arial ni Liberation: system-ui), el salto con la fuente lenta
  puede ser mayor que en Windows y en macOS.
- **2026-11-09, tanda 2.12: Missphone se queda en la entrada del estudio.** La fila 10 proponía
  sacarla; Fritz decidió lo contrario: «como Artemisa y dándole más importancia», va la primera y
  con dos puntos, porque ya se factura con normalidad. La web no cambia: no dice que sea del
  estudio, pero tampoco lo niega. `~/Projects/clientes/missphone/CLAUDE.md` sigue diciendo que se
  factura por privado: se actualiza allí, no en esta tanda.
- **2026-11-09, tanda 2.12: las clases particulares se quedan en el CV**, con «Sep 2018 — Jun 2026»,
  la fecha que tiene LinkedIn (leída ese día). Fritz lo pidió así; sin ellas el CV tenía un hueco de
  2019 a diciembre de 2024.
- **2026-11-09, tanda 2.12: Snugport sigue el primero del CV** (fila 5). La web pone delante
  Snugtone; el CV puede quedarse en lo suyo y a quien lo lee le pesa más un producto con pagos y
  pruebas. El perfil los nombra en ese orden.
- **2026-11-09, tanda 2.12: lo que dejó la 2.8.** El DAM en `cv-en.html` deja de llamarse «Higher
  National Diploma» y va como en la web, y el inglés pasa a americano («Specialization», «math»).
  Lo de «al resto de España» frente a «in Spain or abroad» del estudio no se toca: es texto de la
  web y Fritz no ha pedido ampliarlo.
- **2026-11-09, tanda 2.12: fuera de la lista de choques.** Lionbridge y DataAnnotation llevan ya
  «autónomo, remoto» en el CV, como pide el `CLAUDE.md` (la fila 14 no lo vio). En la cabecera, una
  regla mínima para que los dos enlaces del pie de la entrada del estudio no salgan azul navegador.
- **2026-11-09, tanda 2.12: la primera página acaba en el 79 %.** La entrada del estudio, con
  `break-inside: avoid` y ya más larga, salta con su cabecera a la segunda: la 1 es perfil y
  proyectos, la 2, experiencia en adelante. `line-height` sigue en 1.28 y las dos páginas caben.
  Cifras recontadas ese día: 1.264 unitarias, 620 ejecuciones de E2E (31 archivos) y 80 divisas en
  `snugport-app` (panel v0.5.11); la publicada de Snugtone sigue siendo la 1.0.1.
