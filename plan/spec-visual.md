# Spec visual de fritzreigar.com en Astro

Escrita en la tanda 1.4 (2026-11-04) a partir del lienzo final, la mezcla A + C que Fritz eligió
en la 1.3 («Decisiones del lienzo» de `plan/fase-1.md`), pulida. **Desde aquí manda esta spec**: la
fase 2 corta los componentes con ella y pinta cada página con ella, sin volver al lienzo a
adivinar. El lienzo queda como imagen de referencia:

- `docs/lienzo/final.html` (gitignored, no se sube): un solo archivo con cinco vistas que se eligen
  por el fragmento: `final.html` (portada), `#missphone`, `#snugtone`, `#no-encontrada` (el 404),
  `#contacto-con-foto` (la variante de Contacto con la foto opcional) y `#estados-formulario` (los
  tres estados del envío). Todo el CSS va dentro, en un `<style>`; el único JS es `final.js`, que
  cierra el menú del móvil (§ 2.2).
- Sus capturas, en `docs/lienzo/capturas/final-*.png`: las 16 vistas (4 páginas × 390 y 1440 ×
  claro y oscuro), Contacto con foto a 390 y a 1440, los estados del formulario a 1440 en los dos
  temas y la portada con movimiento reducido. Salen de
  `docs/lienzo/herramientas/capturar-final.sh`, que usa `capturar-pagina.mjs` (página entera por CDP,
  tema y movimiento emulados, cada animación acabada: el reposo).

La spec no propone nada: pasa a limpio el lienzo. Lo que no está aquí no está decidido; si hace
falta, se apunta en «Desvíos» de la fase que lo encuentre. **El texto no sale de aquí**: sale de
`plan/contenido.md`, que manda sobre cualquier cita de esta spec.

**Lo que es solo del prototipo y no pasa a Astro:** las cinco vistas en un archivo (`.page`,
`:target`; en Astro cada una es su ruta), el `<link>` a Google Fonts (en Astro la fuente va
autoalojada, § 8), el hueco rayado de la foto (§ 2.5) y las rutas `../capturas/` de las imágenes.

---

## 1. Tokens

### 1.1 Reglas

- **Todo color sale de un token de `:root`**, con su valor en el tema oscuro dentro de
  `@media (prefers-color-scheme: dark)`. Comprobado en el lienzo:
  `grep -nE "#[0-9a-fA-F]{3,6}\b|rgb\(" docs/lienzo/final.html` solo saca líneas de `:root` (21-39) y
  de su bloque oscuro (139-153).
- **Tamaños, espacios, duraciones y curvas también son tokens** (los de abajo). Lo que sigue siendo
  literal está en § 1.3.
- **Nombres en inglés** (regla del ciclo). Los del lienzo ya son los de Astro: la fase 2 los copia tal
  cual a `src/styles/tokens.css`.
- **Sin botón de tema** (decisión 9): el oscuro entra solo por `prefers-color-scheme`.
- Un token que cambia entre 390 y 1440 va con `clamp()`; las tablas dan su valor a los dos anchos.

### 1.2 Los tokens

#### Color

| Token | Claro | Oscuro | Uso |
|---|---|---|---|
| `--color-bg` | #fafbfc | #13161c | fondo de página |
| `--color-surface` | #ffffff | #1a1e26 | campos del formulario y fondo de las capturas mientras cargan |
| `--color-text` | #121417 | #e8ebf0 | texto, carteles, botón secundario encima (fondo) |
| `--color-text-muted` | #545a66 | #a5acb8 | rótulos, notas, pies, texto de las fases y principios, marcadores |
| `--color-line` | #d6dbe3 | #2d333e | filetes finos: marco de capturas, etiquetas del stack, separador del idioma, filas de la tabla |
| `--color-line-strong` | #121417 | #e8ebf0 | cabecera, pie, bordes de botón y campos, filetes de 2 px, marco de las capas |
| `--color-accent` | #1f4fa3 | #8fb0f0 | el cobalto: banda del estudio, botón principal, reglas de 6 px, enlaces, la tinta |
| `--color-accent-hover` | #163c80 | #b6cbf6 | botón principal y enlaces con el ratón encima |
| `--color-on-accent` | #ffffff | #0d1424 | texto sobre cobalto; foco dentro de la banda del estudio |
| `--color-sky` | #d6e2f4 | #1c2a44 | el celeste: Missphone en la portada, las vitrinas de las fichas, el núcleo, el hueco de la foto |
| `--color-on-sky` | #121417 | #e8ebf0 | texto sobre celeste |
| `--color-on-sky-muted` | #3d4757 | #b4c0d6 | rótulos y pies sobre celeste |
| `--color-avatar-sky` | #d6e2f4 | igual | fondo del avatar (el dibujo no cambia con el tema) |
| `--color-avatar-skin` | #f8f6f0 | igual | piel del avatar |
| `--color-avatar-shirt` | #1f4fa3 | igual | camiseta del avatar |
| `--color-avatar-ink` | #141414 | igual | línea y rayado de la barba del avatar |
| `--color-header-bg` | rgb(250 251 252 / 0.92) | rgb(19 22 28 / 0.92) | cabecera pegada, con `backdrop-filter: blur(10px)` |
| `--color-focus` | #1f4fa3 | #8fb0f0 | anillo de foco |
| `--color-error` | #b3261e | #ff8f85 | el aviso de que el formulario no se ha enviado |

En oscuro la banda del estudio pasa a un cobalto claro con texto oscuro (`--color-accent` y
`--color-on-accent` se invierten de luminosidad): es la misma banda, no un tema distinto.

#### Texto

Una sola familia, **Archivo variable** (ejes `wdth` 62–125 y `wght` 400–900; se usan 62–100 y
400–800). Nada de serif ni de monoespaciada: el `code` es Archivo seminegrita.

| Token | 390 · 1440 | Uso |
|---|---|---|
| `--font` | "Archivo", system-ui, sans-serif | todo |
| `--stretch-poster` | 62 % | carteles: nombre, títulos de sección y de ficha, títulos de tarjeta, cifras, 404 |
| `--stretch-narrow` | 75 % | subtítulos en caja alta: principios, cita, parejas, fechas de la trayectoria |
| `--weight-body` · `-medium` · `-semibold` · `-bold` · `-poster` | 400 · 500 · 600 · 700 · 800 | cuerpo · entradillas · rótulos y nav · botones y enlaces · carteles |
| `--text-xs` | 13,6 px | rótulos, etiquetas del stack, cabecera de la tabla, hueco de la foto |
| `--text-s` | 15,2 px | nav, botones, notas, pies, texto de fases |
| `--text-m` | 17 px | cuerpo |
| `--text-l` | 18,4 px | texto de la banda del estudio, fechas de la trayectoria |
| `--text-lede` | 18,4 · 21,6 px | entradillas (hero, ficha, contacto, capas) |
| `--text-h4` | 19,2 px | título de cada fase |
| `--text-h3` | 24 px | títulos de pareja, del cierre, de las capas y de Galaxian; «Antes/Después» |
| `--text-principle` | 24 · 32 px | principios de «Cómo trabajo» y títulos de «Qué hace» |
| `--text-quote` | 25,6 · 48 px | `PullQuote` (Lo mejor, Por qué) |
| `--text-card` | 41,6 · 72 px | títulos de tarjeta (Missphone, Artemisa, Snugtone, Snugport) |
| `--text-display` | 41,6 · 115,2 px | el título del 404 |
| `--text-step` | 70,4 px | números de las fases; cifras de `FigureList` a 35rem o menos |
| `--text-figure` | — · 158,4 px | cifras de `FigureList` (a 390 manda `--text-step`) |
| `--text-poster` | 58,5 · 216 px | títulos de sección |
| `--text-case` | 87,4 · 322,6 px | título de ficha |
| `--text-hero` | 112 · 388,8 px | el nombre y el «404» |
| `--leading-body` · `-lede` · `-tight` · `-card` · `-poster` · `-hero` | 1.6 · 1.5 · 1.1 · 0.9 · 0.8 · 0.78 | cuerpo · entradillas y campos · subtítulos · tarjetas y números · carteles · nombre y 404 |
| `--tracking-poster` · `--tracking-hero` | -0.02em · -0.025em | carteles · nombre y 404 |

Caja alta solo en carteles y subtítulos de cartel (lo dibuja `text-transform`, el texto va en caja
normal en el HTML y en `contenido.md`). Los rótulos pequeños (`.label`) van en caja normal.

#### Espacio

| Token | 390 · 1440 | Uso |
|---|---|---|
| `--space-1` … `--space-7` | 8 · 12 · 16 · 24 · 32 · 48 · 64 px | la escala fija; todo hueco interior sale de aquí |
| `--space-section` | 72 · 136 px | encima de cada sección; encima de la banda del estudio y de las bandas de capturas |
| `--space-band` | 48 · 96 px | relleno vertical de la banda del estudio |
| `--space-block` | 32 · 56 px | bajo cada título de sección; entre bloques de una sección; encima de cada pareja |
| `--space-block-l` | 56 · 96 px | entre Snugtone y la fila de Snugport + Galaxian |
| `--space-end` | 64 · 120 px | al final de la última sección de cada página |
| `--space-inset` | 20 · 40 px | relleno de los bloques celestes |
| `--space-hero-top` | 24 · 43 px | encima del nombre y del título de ficha |
| `--gap-col` | 16 · 32 px | hueco de la rejilla de 12 |
| `--gap-wide` | 24 · 58 px | hueco de las rejillas de 2 y 3 columnas de texto |
| `--gap-band` | 10 · 20 px | entre capturas de las bandas |
| `--gutter` | 16 · 48 px | margen lateral del contenedor |

#### Medidas y forma

| Token | Valor | Uso |
|---|---|---|
| `--width-page` | 1280 px | el contenedor |
| `--width-text` | 64ch | largo máximo de un párrafo |
| `--width-avatar` | 300 px | tope del avatar; su lado es el alto de una línea del nombre (`--text-hero` × `--leading-hero`): 87 px a 390, 162 a 768, 216 a 1024 y 300 a 1440 |
| `--width-photo` · `--width-photo-s` | 176 · 128 px | la foto opcional de Contacto |
| `--width-pair-tall` | 260 px | cada captura de la pareja del móvil |
| `--width-menu` | 320 px | panel del menú del móvil |
| `--height-header` | 64 px | cabecera |
| `--height-button` | 48 px | botones y campos |
| `--size-touch` | 44 px | mínimo de todo lo pulsable (marca, «Menú», filas del menú) |
| `--size-status` | 10 px | el cuadrado de «Acepto proyectos» |
| `--height-band` | 120 · 245 px | alto de cada captura de las bandas |
| `--rule` · `--rule-mid` · `--rule-thick` | 1 · 2 · 6 px | filete fino · filete fuerte y foco · regla cobalto |
| `--rule-poster` | 22 % | largo de la regla bajo cada título de sección |
| `--ink-stroke` | 2.2 | grosor de la tinta, en unidades de su `viewBox` |
| `--hatch-opacity` | 0.5 | el rayado de la barba |

**Radio cero en todo** (decisión 1): ni un `border-radius`, ni una sombra.

#### Movimiento

| Token | Valor | Uso |
|---|---|---|
| `--ease-out` | cubic-bezier(0.16, 1, 0.3, 1) | recomposición, subida, colores |
| `--ease-draw` | cubic-bezier(0.45, 0, 0.2, 1) | la tinta que se traza (avatar, óvalo, flecha) |
| `--duration-hover` | 160 ms | color de botones y subrayado de la nav |
| `--duration-recompose` · `--delay-recompose` | 1,1 s · 0,05 s | el nombre, el título de ficha y el 404 |
| `--duration-rise` · `--delay-rise` · `--distance-rise` | 0,8 s · 0,55 s · 28 px | la fila bajo la regla (hero, ficha, 404) |
| `--duration-trace` · `--delay-trace` | 1,9 s · 0,35 s | la línea del avatar |
| `--duration-ink-fill` · `--delay-ink-fill` | 0,6 s · 1,95 s | la línea del avatar pasa de trazo a relleno |
| `--duration-fill` · `--delay-fill` | 0,7 s · 2,1 s | piel, camiseta y rayado |
| `--duration-ink` · `--delay-ink` | 0,9 s · 2,5 s | el óvalo de «Acepto proyectos» |
| `--stagger` | 0,1 s | entre las dos líneas del nombre y entre los grupos de trazos del avatar |
| `--shift-recompose` · `--shift-figure` | 18 % · 30 % | lo que se desplaza un cartel · una cifra |
| `--band-1-from/-to` · `--band-2-from/-to` | 0 → -15 % · -15 % → 0 | el viaje de cada banda (con la serie doble, ningún borde entra en pantalla) |

### 1.3 Lo que sigue siendo literal

Dibujo fino, no sistema: el `inset` y el tamaño de cada tinta (el óvalo sobresale 6 × 14 px; la flecha
del 404 mide 84 × 46 y la de las parejas 56 × 34), el `outline-offset` de 3 px del foco, el
`padding-bottom: 2px` del subrayado de `.link-arrow`, los 4 px bajo «Antes/Después», el
`margin-top: -0.02em` de la segunda línea del nombre, el `margin-bottom: 0.1em` que asienta el título
del 404 en la línea base del número, el `line-height` 0.85 de las cifras y 1.05 de las parejas, el
`letter-spacing` de 0.01em de la marca y de -0.01em de tarjetas y cita, el `0.45em` de las unidades de
las cifras, el `13rem` de la columna de fechas, el `140px` del área de mensaje, el rayado del hueco
de la foto (9 + 1 px), el `blur(10px)` de la cabecera y los `fr` de los repartos (§ 3.2). Los trazos
del avatar llevan `stroke-width: 1.1` (unidades del `viewBox` de 800).

### 1.4 Contraste de cada pareja

Calculado con la fórmula de WCAG desde los valores de § 1.2. Texto 4,5:1; filetes con función,
foco y la tinta, 3:1. **Todo pasa en los dos temas.**

| Pareja | Claro | Oscuro | Mínimo | Dónde |
|---|---|---|---|---|
| `--color-text` / `--color-bg` | 17,81 | 15,16 | 4,5 | cuerpo y carteles |
| `--color-text` / `--color-surface` | 18,45 | 13,97 | 4,5 | texto escrito en los campos |
| `--color-text-muted` / `--color-bg` | 6,69 | 7,93 | 4,5 | rótulos, notas, fases, CV discreto |
| `--color-text-muted` / `--color-surface` | 6,93 | 7,31 | 4,5 | marcadores de los campos |
| `--color-accent` / `--color-bg` | 7,49 | 8,31 | 4,5 | enlaces, «Después», números de fase |
| `--color-accent-hover` / `--color-bg` | 10,17 | 11,10 | 4,5 | enlace con el ratón encima |
| `--color-on-accent` / `--color-accent` | 7,76 | 8,43 | 4,5 | botón principal, banda del estudio |
| `--color-on-accent` / `--color-accent-hover` | 10,54 | 11,26 | 4,5 | botón principal encima |
| `--color-bg` / `--color-text` | 17,81 | 15,16 | 4,5 | botón secundario encima, «Menú» abierto |
| `--color-on-sky` / `--color-sky` | 14,10 | 12,00 | 4,5 | texto sobre celeste |
| `--color-on-sky-muted` / `--color-sky` | 7,17 | 7,82 | 4,5 | rótulos, pie de la vitrina, hueco de la foto |
| `--color-accent` / `--color-sky` | 5,93 | 6,58 | 3 | tinta y foco sobre celeste (la pareja más justa) |
| `--color-line-strong` / `--color-bg` | 17,81 | 15,16 | 3 | bordes de botón y campo, filetes que separan |
| `--color-focus` / `--color-bg` | 7,49 | 8,31 | 3 | anillo de foco |
| `--color-on-accent` / `--color-accent` | 7,76 | 8,43 | 3 | foco dentro de la banda del estudio |
| `--color-error` / `--color-bg` | 6,31 | 8,21 | 4,5 | aviso de error del formulario |
| `--color-avatar-ink` / `--color-avatar-sky` | 14,07 | igual | 3 | la línea del avatar |

`--color-line` (1,34 y 1,43:1) es solo decorativo: separa lo que ya separa el espacio. Lo que hay
que ver para usar algo (bordes de campos y botones) va en `--color-line-strong`.

Foco: 2 px de `--color-focus` a 3 px de distancia, en todo; dentro de la banda del estudio, en
`--color-on-accent`. Todo lo pulsable mide 44 px o más de alto.

---

## 2. Componentes

### 2.1 El corte en Astro

- **Todo son componentes `.astro` sin JS.** El único script es `src/scripts/main.ts` (decisión 9), y
  en esta web hace dos cosas: mejora el formulario (enviar por `fetch` a Formspree y pintar sus tres
  estados) y cierra el menú del móvil (en el lienzo, `final.js`).
  **Ningún movimiento usa JS**: es CSS (§ 4). El menú del móvil es un `<details>`.
- **Los datos no van en las plantillas**: los textos, en un archivo por idioma (`src/data/`), y las
  fichas (Trabajo y Proyectos) en una colección con Zod, con su rótulo, su resumen de portada, sus
  capturas y sus enlaces. La portada lee las tarjetas de la colección.
- **El avatar es un componente propio** (`Avatar.astro`) con el SVG en línea: la tinta se anima con
  el CSS de la página, cosa que un `<img>` no deja. Su origen es
  `docs/lienzo/herramientas/avatar-ligero.svgfrag` (§ 6.4).
- **Carpetas sugeridas** (las decide la planificación de la fase 2): `src/layouts/` (`BaseLayout`),
  `src/components/site/` (marco), `ui/` (controles y piezas pequeñas), `home/` (secciones de la
  portada) y `case/` (piezas de ficha).
- Las clases del lienzo (en inglés) son buena base para las de Astro, pero no obligan: obliga el
  componente, sus props y su aspecto.

### 2.2 El inventario

#### Marco

| Componente | Qué es | Props | Variantes y estados | Sale en |
|---|---|---|---|---|
| `BaseLayout` | head (title, description, OG, hreflang, JSON-LD), `SkipLink`, `SiteHeader`, `<main>`, `SiteFooter` | `title, description, lang ('es'\|'en'), alternate (ruta gemela), current?, og?, noindex?, jsonLd?` | — | todas |
| `SkipLink` | «Saltar al contenido», fuera de pantalla hasta recibir el foco | `target` | oculto · con foco (cobalto, arriba a la izquierda) | todas |
| `SiteHeader` | marca «Fritz Reigar» (a la portada), cinco enlaces, `LangLink`; pegada arriba, con filete fuerte debajo | `lang, current? ('work'\|'projects'\|'how'\|'career'\|'contact')` | nav entera desde 56rem; por debajo, marca + `MobileMenu`; enlace actual con subrayado cobalto de 2 px (`aria-current="page"`: «Trabajo» en las fichas de Trabajo, «Proyectos» en las de Proyectos) | todas |
| `MobileMenu` | `<details>` «Menú»: panel de 320 px colgado del botón, una fila de 44 px por enlace y el idioma al final | `lang, current?` | cerrado · abierto (botón en tinta invertida); se cierra al pulsar un enlace, al pulsar fuera y con Escape (que devuelve el foco a «Menú»), con `main.ts`; sin JS se queda abierto | todas, por debajo de 56rem |
| `LangLink` | enlace a la gemela en el otro idioma, separado del resto por un filete fino | `href, lang` | «English» en español, «Español» en inglés; `hreflang` y `lang` puestos; **solo se pinta si la gemela está viva** (`en.live`): hasta entonces, ni enlace ni hueco | todas |
| `SiteFooter` | «© 2026 Fritz Reigar · Valencia» y CV, GitHub, LinkedIn, X y el correo | `lang` | en el móvil, dos líneas | todas |

#### Controles y piezas pequeñas

| Componente | Qué es | Props | Variantes y estados |
|---|---|---|---|
| `Button` | botón o enlace con caja de 48 px y borde de 1 px, sin radio | `href?, variant ('primary'\|'secondary'), external?` | primario cobalto · secundario con borde de tinta · encima: el primario oscurece, el secundario se invierte · externo con «↗» en el texto |
| `ArrowLink` | enlace en negrita con subrayado cobalto de 2 px | `href, external?` | normal · encima (texto cobalto) · sobre celeste y sobre cobalto toma el color de su banda |
| `Label` | rótulo pequeño en caja normal, gris | — | sobre celeste, `--color-on-sky-muted` |
| `StatusBadge` | cuadrado cobalto + «Acepto proyectos», rodeado por `InkOval` | `text` | — |
| `Ink` | trazo a mano en SVG, `aria-hidden`, con `pathLength="1"` para trazarse | `shape ('oval'\|'arrow'\|'arrow-down')`, `trigger ('load'\|'scroll')` | óvalo (estado) · flecha recta (404) · flecha que baja y sube (parejas, alternas) |
| `Shot` | una captura con su marco de 1 px y fondo `--color-surface` | `src, alt, width, height, sizes, loading?` | `phone`: se oculta a 35rem o menos |
| `StackList` | etiquetas de tecnología con filete fino | `items` | — |
| `SectionTitle` | el cartel: `h2` en Archivo 62 % a `--text-poster`, con la regla cobalto de 6 px y el 22 % de ancho debajo | `id, text, tone ('plain'\|'accent')` | sobre cobalto, texto y regla en `--color-on-accent`; entra con el scroll (§ 4) |
| `Avatar` | el dibujo vectorizado, en línea | `alt` | se dibuja al cargar (§ 4) |

#### Héroes

| Componente | Qué es | Props | Variantes y estados | Sale en |
|---|---|---|---|---|
| `HomeHero` | el nombre en dos líneas a `--text-hero` («Fritz» a la izquierda, «Reigar» a la derecha) con el `Avatar` arriba a la derecha (columnas 9-12, al lado de «Fritz» en todos los anchos: mide lo que una línea del nombre y el nombre, por encima con `z-index`, le pisa solo la camiseta); bajo la regla cobalto de 6 px, la entradilla (1-6), el `StatusBadge` (7-9) y dos `Button` apilados (10-12) | `name, avatarAlt, lede, status, actions[2]` | por debajo de 60rem la fila bajo la regla se apila; el avatar no se mueve de su sitio | portada |
| `CaseHero` | el rótulo con la sección enlazada («Trabajo» o «Proyecto»), el título a `--text-case`, y bajo la regla la entradilla (1-7) y los enlaces (9-12: un `Button` primario y un `ArrowLink`) | `section, sectionHref, kicker, title, lede, primary, secondary` | — | Missphone, Snugtone; además: Artemisa, Snugport |
| `ErrorHero` | «Error 404», el «404» a `--text-hero` (1-5) y «Esta página no existe» a `--text-display` (6-12) asentados en la misma línea base; bajo la regla, la entradilla (1-6) y tres `Button` apilados (10-12) con la `Ink` flecha apuntando al primero | `code, title, lede, actions[3]` | la flecha solo por encima de 60rem; entre 35 y 60rem, los tres botones en una fila; a 35rem o menos, en columna | 404 |

#### Portada

| Componente | Qué es | Props | Variantes y estados |
|---|---|---|---|
| `StudioBand` | banda cobalto a todo el ancho: `SectionTitle` en `accent`, el texto (1-6) con su `ArrowLink`, y las dos capturas del estudio (7-12, escritorio y móvil en 3fr 1fr, alineadas abajo, con borde en `--color-on-accent`) | `title, text, link, shots{desktop, mobile}` | — |
| `WorkFeature` | la tarjeta grande de Trabajo, pulsable entera (ver debajo): bloque celeste con relleno `--space-inset`; texto (1-4: `Label`, título a `--text-card`, resumen, `ArrowLink` abajo) y la captura de escritorio (5-12) | `entry` (de la colección) | — (solo Missphone) |
| `WorkCard` | la tarjeta normal: captura (1-6) y texto (8-12) sobre el fondo | `entry` | — (Artemisa) |
| `ShotBands` | dos bandas de seis capturas (cada serie dos veces seguida, con las mismas URL: no se descarga nada más, y la banda cubre de borde a borde hasta 2560 px y más), entre filetes fuertes, que se desplazan en sentidos contrarios con el scroll; `aria-hidden`, `alt=""` | `rows[2][6]` | quietas sin soporte o con movimiento reducido |
| `ProjectFeature` | el proyecto grande: texto (1-4) y tres capturas (5-12: una entera arriba y dos debajo) | `entry` | a 35rem o menos, las tres en columna (Snugtone) |
| `ProjectCard` | captura y texto en 5fr 3fr, en las columnas 1-8 | `entry` | a 35rem o menos, apilado (Snugport) |
| `ProjectMini` | captura, rótulo, título a `--text-h3`, dos líneas y enlace al repositorio, en 9-12 con filete a la izquierda | `title, label, text, href, shot` | por debajo de 60rem, filete arriba (Galaxian) |
| `PrincipleList` | cuatro principios en 2 columnas, cada uno con filete fuerte de 2 px arriba y título en caja alta a `--text-principle` | `items[{title, text}]` | 1 columna por debajo de 60rem |
| `CareerTable` | tabla de tres columnas (fechas en Archivo 75 % negrita a `--text-l`, puesto en negrita, dónde), filas separadas por filete fino | `rows` | a 45rem o menos cada fila es una ficha de tres líneas (la cabecera queda solo para lectores de pantalla) |
| `CareerExtra` | formación e idiomas en dos columnas con subtítulo en caja alta, y el CV discreto (`ArrowLink`) | `education[], languages, cvHref` | 1 columna por debajo de 60rem |
| `ContactSection` | `SectionTitle`, la entradilla (con «estudioreigar.com» enlazado), el correo y el CV en gris (1-6) y `ContactForm` (8-12) | `photo?` | sin foto (por defecto) · con foto (§ 2.5) |
| `ContactForm` | nombre, email, mensaje y «Enviar», etiqueta encima de cada campo, campos de 48 px con borde fuerte; asunto oculto | `action, lang` | reposo · enviando («Enviando…» en el botón, que pasa a `--color-accent-hover` con `aria-disabled`) · enviado (una línea bajo el botón con el cuadrado cobalto, `role="status"`) · error (la misma línea en `--color-error`, con el correo enlazado, `role="alert"`); los textos, en `contenido.md` § 1.7; la validación es la del navegador (`required`, `type="email"`); sin JS, POST normal a Formspree. Dibujados en `#estados-formulario` |

**Las tarjetas se pulsan enteras** (`WorkFeature`, `WorkCard`, `ProjectFeature`, `ProjectCard` y
`ProjectMini`): su `ArrowLink` lleva un `::after` que cubre la tarjeta. Sigue habiendo un solo enlace
por tarjeta, con su texto de siempre y sin perder el `alt` de las capturas; con el ratón encima, el
marco de las capturas y el enlace pasan a cobalto.

#### Fichas

| Componente | Qué es | Props | Variantes y estados |
|---|---|---|---|
| `CaseShowcase` | bloque celeste con las capturas de la ficha | `desktop, phone?, caption?` | `pair` (escritorio y móvil en 5fr 1fr, alineadas abajo: Missphone) · `single` (escritorio en 1-9 y el pie en 10-12, abajo: Snugtone); a 35rem o menos solo la de escritorio |
| `PullQuote` | rótulo (1-2) y la cita en caja normal (en caja alta, pasadas dos líneas no se leía), Archivo 75 % negrita a `--text-quote`, hasta 32ch (3-12) | `label, text` | «Lo mejor» (Missphone), «Por qué» (Snugtone) |
| `Prose` | texto corrido en las columnas 5-12, con lista si la hay | `slot` | «Cómo me la encontré» |
| `BeforeAfter` | la nota de las parejas y una `Pair` por pareja: título en caja alta (1-3) y las dos capturas (4-12) con su pie («Antes» en tinta, «Después» en cobalto) y la `Ink` flecha entre ellas | `note, pairs[{title, before, after, tall?}]` | `tall` (la del móvil: dos columnas de 260 px y sin flecha); sin flecha a 35rem o menos; las flechas alternan su forma |
| `FigureList` | cifras grandes en Archivo 62 % a `--text-figure`, cada una con la regla cobalto de 6 px encima y su frase debajo; cinco cifras en 3 + 2 | `items[{num, unit?, text}]` | a 60rem o menos, 2 columnas y la última entera; a 35rem o menos, cifras a `--text-step` |
| `PhaseList` | `<ol>` en 3 columnas; cada fase con su número cobalto a `--text-step`, título y texto en gris | `items[{title, text}], today?` | 2 columnas por debajo de 60rem, 1 a 35rem o menos; «Hoy sigue en mantenimiento.» debajo |
| `FeatureRows` | una fila por función: título en caja alta a `--text-principle` (1-3), texto (4-7) y su captura (8-12), con filete fuerte arriba | `items[{title, text, shot?}]` | fila sin captura (la última de Snugtone); apiladas por debajo de 60rem |
| `LayerStack` | la entradilla (1-5) y tres capas apiladas dentro de un marco fuerte (7-12): nombre en cartel y una línea; el núcleo, en celeste con regla cobalto | `lede, layers[{name, text, core?}]` | por debajo de 60rem, una debajo de otra; a 35rem o menos, nombre encima de su línea |
| `CaseClosing` | columnas con título en caja alta bajo la regla cobalto | `columns[]` | tres (Missphone: Con qué, Cómo se trabajó, Lo que no se enseña) · dos (Snugtone: Con qué, Descargar, con el `Button` de descarga); 1 columna por debajo de 60rem |

### 2.3 Cada bloque de `contenido.md`, con su componente

| Bloque | Componentes |
|---|---|
| § 0 El marco | `BaseLayout`, `SkipLink`, `SiteHeader` (`LangLink`, `MobileMenu`), `SiteFooter` |
| § 1.1 Hero | `HomeHero` (`Avatar`, `StatusBadge` con `Ink` óvalo, dos `Button`) |
| § 1.2 Estudio Reigar | `StudioBand` |
| § 1.3 Trabajo | `SectionTitle`, `WorkFeature` (Missphone), `WorkCard` (Artemisa), y después `ShotBands` |
| § 1.4 Proyectos | `SectionTitle`, `ProjectFeature` (Snugtone), `ProjectCard` (Snugport), `ProjectMini` (Galaxian), `ArrowLink` «Todo el código público» |
| § 1.5 Cómo trabajo | `SectionTitle`, `PrincipleList` |
| § 1.6 Trayectoria | `SectionTitle`, `CareerTable`, `CareerExtra` |
| § 1.7 Contacto | `ContactSection`, `ContactForm` |
| § 2 Missphone | `CaseHero`, `CaseShowcase` (`pair`), `PullQuote` (Lo mejor), `Prose` (Cómo me la encontré), `BeforeAfter`, `FigureList` (Las cifras), `PhaseList`, `CaseClosing` (tres) |
| § 3 Limpiezas Artemisa | sin dibujar: § 2.4 |
| § 4 Snugtone | `CaseHero`, `CaseShowcase` (`single`, con la nota de las capturas de pie), `PullQuote` (Por qué), `FeatureRows` (Qué hace), `FigureList` (Medido), `LayerStack` (Cómo está hecho; el «Con qué» va al cierre), `CaseClosing` (dos: Con qué y Descargar) |
| § 5 Snugport | sin dibujar: § 2.4 |
| § 6.1 El 404 | `ErrorHero` |
| § 6.2 y 6.3 Metadatos y JSON-LD | props de `BaseLayout` (no se pintan) |

**Las cifras de Snugtone** se escriben como en el lienzo, que reparte el «Medido» de
`contenido.md` § 4 en cinco: 0,48 s (rescaneo de la biblioteca de 9503 archivos y 161 GB), 230 MB
(memoria, aproximada), 609 (pruebas del núcleo, «y 31 más de la cáscara»), 0 (avisos de
`cargo clippy`) y 9503 (rutas M3U de ida y de vuelta). Mismas cifras, misma fuente.

### 2.4 Las páginas que no se dibujaron

Se montan con las piezas de las dibujadas, sin piezas nuevas:

- **Limpiezas Artemisa** (`/trabajo/limpiezas-artemisa`): `CaseHero` (Trabajo; «Ver la web ↗» y el
  caso del estudio), `CaseShowcase` `pair` con sus capturas de escritorio y móvil, `Prose` para «De
  dónde se partía», `FeatureRows` sin capturas para «Qué se hizo» (una fila por punto, el título es
  la parte en negrita), `FigureList` para «Medido» (95-96 de rendimiento y 100 en accesibilidad,
  buenas prácticas y SEO: cuatro cifras, en 2 + 2) y `CaseClosing` de tres (De quién es cada cosa,
  Con qué, Lo que no se enseña).
- **Snugport** (`/proyectos/snugport`): `CaseHero` (Proyecto; «Probar la app ↗» y nada más:
  `secondary` es opcional), `CaseShowcase` `pair` con sus capturas de escritorio y móvil,
  `FeatureRows` sin capturas para los cuatro puntos y `CaseClosing` de uno o dos (Con qué). Sin
  `FigureList`: no se destaca por encima de Snugtone (decisión de contenido).
- **Las gemelas en inglés** (`/en/…`): las mismas piezas; el peor caso de longitud está medido en § 5.

### 2.5 Contacto con la foto opcional

La foto real de busto aún no existe (Decisiones del lienzo). `ContactSection` la recibe como prop
opcional, y con o sin ella se ve bien:

- **Sin foto** (lo de hoy): la entradilla ocupa las columnas 1-6.
- **Con foto**: las columnas 1-6 se parten en la foto (`--width-photo`, 176 px, proporción 4:5,
  borde fuerte de 1 px, `object-fit: cover`) y el texto al lado, alineados arriba: la foto queda
  junto a «te contesto yo». A 35rem o menos la foto va encima del texto, a 128 px.
- **El archivo**: retrato de busto en 4:5, al menos 704 × 880 px (176 px a 2× con margen para
  `srcset` de 176, 352 y 528). Su `alt` lo escribe Fritz con la foto delante.
- **El hueco rayado del lienzo** (`#contacto-con-foto`) es solo del prototipo: en Astro, sin la prop,
  no se pinta nada.

---

## 3. Retícula y ritmo

### 3.1 El contenedor y la rejilla

- Contenedor de `--width-page` (1280 px) con `--gutter` a los lados (16 → 48 px).
- **Rejilla de 12 columnas** con `--gap-col` (16 → 32 px). Los repartos, en columnas: hero 1-6
  (entradilla) + 7-9 (estado) + 10-12 (botones), avatar 9-12; ficha 1-7 + 9-12; 404 1-5 + 6-12 y
  1-6 + 10-12; estudio 6 + 6; Missphone en portada 4 + 8; Artemisa 6 + 5 (de la 8); Snugtone en
  portada 4 + 8; Snugport 8 + Galaxian 4; Contacto 6 + 5 (de la 8); cita 2 + 10; prosa 5-12; pareja
  3 + 9; funciones 3 + 4 + 5; capas 5 + 6 (de la 7); vitrina `single` 9 + 3.
- Rejillas de texto aparte: principios, formación e idiomas en 2 con `--gap-wide`; fases y cierre en 3;
  cifras en 6 (tres de 2 y dos de 3).
- **Todo alineado a la izquierda**; lo único a la derecha es la segunda línea del nombre y el avatar.

### 3.2 Los puntos de corte

Móvil primero; los cortes, en `rem`:

| Corte | Qué pasa |
|---|---|
| 60rem (960 px) | toda rejilla de 12 se apila (salvo el nombre con el avatar); principios, formación, cierre y estados del formulario a 1 columna; fases y cifras a 2; los botones del hero en dos columnas y los del 404 en tres; la flecha del 404 se va |
| 56rem (896 px) | la nav entera pasa a `MobileMenu` (medida en § 5) |
| 45rem (720 px) | la trayectoria pasa de tabla a fichas |
| 35rem (560 px) | botones en una columna; fases, capas y proyectos en una; sin flecha en las parejas; cifras a `--text-step`; la vitrina sin la captura del móvil; la foto de Contacto encima del texto |

Ningún corte más. Comprobado en el lienzo a 360, 390, 600, 768, 900, 1024, 1280, 1440 y 1920 con
`docs/lienzo/herramientas/comprobar-desbordes.mjs`: ningún texto se sale de su caja ni de la
ventana. Repetirlo sobre `dist/` es una prueba de la fase 2.

### 3.3 Los fondos cuentan dónde estás

| Tono | Token | Dónde |
|---|---|---|
| El fondo | `--color-bg` | casi todo |
| El celeste | `--color-sky` | lo de los clientes y lo del avatar: Missphone en la portada, las vitrinas de las fichas, el núcleo de Snugtone y la foto |
| El cobalto | `--color-accent` | solo la banda del estudio, en la portada, una vez |

La banda cobalto no se repite y el celeste nunca va pegado a la banda. Las bandas de capturas van
entre filetes fuertes, sin fondo.

### 3.4 Espacios y orden

- Sección: `--space-section` encima (72 → 136 px), sin relleno abajo; la última de cada página
  cierra con `--space-end`.
- Bajo cada `SectionTitle`, `--space-block`. Entre tarjetas de una sección, `--space-block`;
  entre Snugtone y la fila siguiente, `--space-block-l`.
- **El orden de la portada**: cabecera → hero → banda del estudio → Trabajo (Missphone, Artemisa) →
  bandas de capturas → Proyectos (Snugtone; Snugport + Galaxian; «Todo el código público») → Cómo
  trabajo → Trayectoria → Contacto → pie.
- **El orden de una ficha**: cabecera → `CaseHero` → `CaseShowcase` → `PullQuote` → secciones con
  `SectionTitle` → `CaseClosing` → pie.
- Largos medidos en el lienzo: portada 8.949 px a 390 (10,6 pantallas de 844) y 8.548 a 1440;
  Missphone 8.367 y 8.690; Snugtone 5.488 y 5.775; el 404 cabe en una pantalla.

---

## 4. Movimiento

Una sola escena al cargar (el nombre se recompone y el avatar se dibuja con su tinta) y, al bajar,
lo que cuenta algo: los carteles que entran, las bandas que viajan, la flecha de cada antes y
después y las cifras. **Todo en CSS, sin librerías y sin JS.** Todo dentro de
`@media (prefers-reduced-motion: no-preference)`; lo ligado al scroll, además, dentro de
`@supports (animation-timeline: view())`, con propiedades sueltas (`animation-timeline` nunca en el
atajo `animation`). **El reposo se dibuja fuera**: con movimiento reducido, sin soporte o antes de
que nada se mueva, la página está entera, el avatar dibujado y la tinta trazada. Lo que se desplaza
va con `translate`, `scale` y `opacity`, nunca con `transform`; la tinta, con `stroke-dashoffset`
sobre `pathLength="1"`.

| Movimiento | Disparador | Duración y curva | Sin soporte | Con movimiento reducido |
|---|---|---|---|---|
| El nombre se recompone | la carga de la portada | «Fritz» entra desde la derecha y «Reigar» desde la izquierda (`translate` de ±18 %), `--duration-recompose`, `--ease-out`, 0,1 s entre las dos | igual (CSS) | quieto |
| El título de ficha y el 404 | la carga | igual: el título desde la derecha; en el 404, «40» desde la derecha y «4» desde la izquierda | igual | quieto |
| La fila bajo la regla sube | la carga | `translate` de 28 px a 0 en `--duration-rise` tras `--delay-rise`, `--ease-out` (hero, ficha; en el 404, el título) | igual | quieta |
| El avatar se dibuja | la carga | los 26 trazos se trazan en `--duration-trace` con `--ease-draw`, en tres grupos (0,35, 0,5 y 0,65 s); en 1,95 s cada trazo pasa a relleno (`--duration-ink-fill`); a los 2,1 s entran piel, camiseta y rayado (`opacity`, `--duration-fill`) | igual | dibujado |
| El óvalo de «Acepto proyectos» | la carga, a los 2,5 s | se traza en `--duration-ink`, `--ease-draw` | igual | trazado |
| La flecha del 404 | la carga, al acabar la subida (1,35 s) | se traza en `--duration-ink`, `--ease-draw` | igual | trazada |
| Los carteles entran | el scroll: `view()` del título | el texto, de `translate` 18 % a 0 entre `entry 0%` y `entry 100%`; la regla, de `scale: 0 1` a `1 1` (origen a la izquierda) entre `entry 50%` y `entry 100%`; `linear`. Acaban justo cuando el título termina de asomar: un cartel que se ve entero nunca está a medias (en tablet en vertical, la banda del estudio asoma en la primera pantalla y su regla parecía un guion suelto) | en su sitio | en su sitio |
| Las bandas viajan | el scroll: `view-timeline` de las bandas, `cover 0%` a `cover 100%` | la primera de 0 a -15 %, la segunda de -15 % a 0, `linear`; con la serie doble, ningún borde de banda entra en pantalla | quietas | quietas |
| La flecha entre antes y después | el scroll: `view-timeline` de la flecha, `entry 30%` a `cover 55%` | se traza, `linear` | trazada | trazada |
| Las cifras entran | el scroll: `view()` de la cifra, `entry 10%` a `cover 40%` | `translate` de ±30 % y `opacity` de 0 a 1; las pares desde la derecha, las impares desde la izquierda | en su sitio | en su sitio |
| Encima | ratón | color de fondo y de texto de los botones y subrayado de la nav en `--duration-hover`, `--ease-out` | igual | igual (es color) |

Reglas:
- **El LCP es texto** (el nombre, el título de ficha o el «404») y se pinta en el primer fotograma: la
  recomposición solo lo desplaza, nunca lo oculta. Nada con `opacity: 0` en la primera pantalla
  salvo los rellenos del avatar, que no es candidato a LCP (SVG en línea).
- **Nada ligado al scroll tapa la primera pantalla**: a 1440 el primer cartel con `view()` queda
  por debajo; a 390 asoma el arranque de la banda del estudio (desde 725 px) y su título empieza a
  entrar desde ahí, sin tapar nada de lo de arriba.
- Sin aparición por secciones (`IntersectionObserver`), sin transición entre páginas y sin nada en
  bucle. El menú del móvil abre y cierra de golpe.
- La prueba de la fase 2: con movimiento reducido, cero animaciones activas
  (`document.getAnimations().length === 0`, como en la captura de movimiento reducido del lienzo).

---

## 5. La cabecera y el idioma

- **El selector es un enlace**, `LangLink`: «English» en español y «Español» en inglés, al final de
  la nav y separado por un filete fino; en el móvil, la última fila del menú. Con una sola gemela por
  página no hace falta el `<details>` del estudio. Lleva `hreflang` y `lang`.
- **Medido en el lienzo con la fuente cargada** (marca + hueco + nav entera): **750 px en español**
  y **668 px con las etiquetas inglesas** (Work, Projects, How I work, Career, Contact, Español). El
  peor caso es el español. La nav entra a 56rem (896 px): con el margen lateral de ese ancho (36 px
  por lado), quedan 74 px de holgura. Si la fase 2 cambia una etiqueta, se vuelve a medir.
- La cabecera es la misma en todas las páginas; la ficha marca su sección con `aria-current`.

---

## 6. Imágenes

### 6.1 Formatos y carga

- Las de origen están en `docs/capturas/` (`plan/capturas.md`, con su `alt`). La fase 2 las sirve con
  `astro:assets` en AVIF y WebP, con `width`, `height`, `srcset` y el `sizes` de § 6.2.
- **`loading="lazy"` y `decoding="async"` en todas**, salvo la vitrina de cada ficha, que asoma en
  la primera pantalla del escritorio y va sin `lazy` (sin `fetchpriority="high"`: el LCP es el
  título).
- Las de las bandas son decorativas: `alt=""` y la banda entera `aria-hidden`.

### 6.2 El ancho de cada imagen, por componente

Ancho pintado en el lienzo, en px CSS (en las bandas, el alto):

| Componente | 390 | 768 | 1024 | 1440 | `sizes` propuesto | Origen |
|---|---|---|---|---|---|---|
| `StudioBand`, escritorio | 257 | 518 | 327 | 456 | `(max-width: 60rem) 70vw, 460px` | 2880 × 1800 |
| `StudioBand`, móvil | 86 | 173 | 109 | 152 | `(max-width: 60rem) 23vw, 152px` | 780 × 1688 |
| `WorkFeature` | 318 | 660 | 570 | 789 | `(max-width: 60rem) 88vw, 790px` | 2880 × 1800 |
| `WorkCard` | 358 | 707 | 452 | 624 | `(max-width: 60rem) 92vw, 624px` | 1440 × 900 |
| `ShotBands` (alto) | 120 | 131 | 174 | 245 | por alto: `width` = alto × proporción; `srcset` de 1× y 2× del alto de 245 | varias |
| `ProjectFeature`, grande | 358 | 707 | 611 | 843 | `(max-width: 60rem) 92vw, 843px` | 1280 × 860 |
| `ProjectFeature`, pequeñas | 358 | 345 | 297 | 413 | `(max-width: 35rem) 92vw, (max-width: 60rem) 45vw, 413px` | 1280 × 860 |
| `ProjectCard` | 358 | 427 | 367 | 512 | `(max-width: 35rem) 92vw, (max-width: 60rem) 56vw, 512px` | 2880 × 1800 |
| `ProjectMini` | 358 | 707 | 271 | 373 | `(max-width: 60rem) 92vw, 373px` | 1200 × 675 |
| `CaseShowcase` `pair`, escritorio | 326 * | 537 | 708 | 987 | `(max-width: 35rem) 84vw, 987px` | 2880 × 1800 |
| `CaseShowcase` `pair`, móvil | — | 107 | 142 | 197 | `197px` (oculta a 35rem o menos) | 780 × 1688 |
| `CaseShowcase` `single` | 326 | 660 | 644 | 892 | `(max-width: 60rem) 86vw, 892px` | 1280 × 860 |
| `BeforeAfter`, pareja ancha | 173 | 334 | 319 | 440 | `(max-width: 60rem) 45vw, 440px` | ~1440 × 850 |
| `BeforeAfter`, pareja alta | 173 | 260 | 260 | 260 | `(max-width: 35rem) 45vw, 260px` | 380 × 826 |
| `FeatureRows` | 358 | 707 | 373 | 515 | `(max-width: 60rem) 92vw, 515px` | 1280 × 860 |
| `ContactSection`, foto | 128 | 176 | 176 | 176 | `(max-width: 35rem) 128px, 176px` | ≥ 704 × 880 |
| `Avatar` | 87 | 162 | 216 | 300 | SVG en línea | `viewBox` 800 |

\* Medido con la captura del móvil oculta (el lienzo la ocultó en la tanda; antes medía 258).

`srcset` sugerido: 400, 800, 1200 y 1600 de ancho para las de escritorio (nunca por encima del
origen); 200, 400 y 600 para las de móvil.

### 6.3 Las capturas que enseña cada página

Las que lleva el lienzo y su orden son las de esta spec: el estudio (escritorio y móvil), Missphone
(vitrina de escritorio en la portada; escritorio y móvil en su ficha; las cinco parejas), Artemisa
(escritorio), Snugtone (las cuatro: la principal en la vitrina, las otras tres en `FeatureRows`; en
la portada, principal, búsqueda y ecualizador), Snugport (escritorio) y Galaxian. Las bandas repiten
doce de ellas (después de Missphone, Snugport, Artemisa, Snugtone, el estudio y Galaxian). Las
fechas, los `alt` y lo de rehacerlas pasado Reyes, en `plan/capturas.md`.

### 6.4 El avatar, aligerado

- `docs/lienzo/herramientas/aligerar-avatar.py` lo vectoriza otra vez desde el PNG de 400 px con las
  mismas cuatro capas (piel, camiseta, rayado y 26 trazos de línea): rellenos trazados de una máscara
  suavizada (el borde cae bajo la línea, sin halo), rayado sin motas de menos de 14 unidades, caminos
  en coordenadas relativas y enteras sobre una retícula de 800 (medio píxel del PNG).
- **De 228,7 KB a 62,6 KB** (79,0 a 18,0 KB en gzip), `viewBox="0 0 800 800"`. Se ve igual a
  300 px; lo único que se simplifica es el cuello de la camiseta (una línea en vez de dos finas).
- Sale en el HTML de la portada (no en un archivo aparte: la tinta se anima con el CSS de la página).

---

## 7. La primera pantalla de cada página

Medido en el lienzo con `docs/lienzo/herramientas/medir-final.mjs` (borde superior e inferior, en
px desde arriba, con la cabecera de 64 px), que también saca los anchos de § 5 y § 6.2.

| Página | 390 × 844 | 1440 × 900 |
|---|---|---|
| Portada | el nombre con el avatar al lado de «Fritz» (89-261), la entradilla (315-454), «Acepto proyectos» con su óvalo (478-521), los dos botones (545-653) y el arranque de la banda del estudio (725-); a 360 × 740 también caben los dos botones | el nombre con el avatar (108-707), la regla y la fila entera: entradilla, estado y los dos botones (761-869) |
| Missphone | rótulo, título (150-220), la entradilla, «Ver la tienda ↗» y el enlace al caso (hasta 609) y la vitrina (641-835) | rótulo, título (145-403), entradilla y enlaces (457-586) y el arranque de la vitrina (642-) |
| Snugtone | rótulo, título, entradilla, «Descargar para Windows ↗» (380-428), «Código en GitHub ↗» y casi toda la vitrina (504-868) | rótulo, título (145-403), entradilla y enlaces (457-548) y la vitrina (604-) |
| 404 | todo: el número (125-213), el título, la entradilla y los tres botones (hasta 567) | todo: el número y el título (145-448), la entradilla y los tres botones (502-670) |

La acción principal de cada página está siempre en la primera pantalla, en los dos anchos.

---

## 8. Presupuesto

Medido sobre el lienzo; el tope es lo que la fase 2 no puede pasar (gzip, por página):

| Pieza | Lienzo | Tope |
|---|---|---|
| Documento de la portada | 78,2 KB (23,6 en gzip): 62,9 del avatar y 15,3 de marcado (las bandas llevan su serie dos veces) | 32 KB gzip, con el `<head>` y el JSON-LD |
| Documento de una ficha | Missphone 14,4 KB (4,5 gzip); Snugtone 7,3 (2,7) | 10 KB gzip |
| Documento del 404 | 2,3 KB (0,9 gzip) | 5 KB gzip |
| Hoja de estilo, una para todo el sitio | 35,3 KB sin comentarios (6,5 gzip), con las reglas del prototipo | 10 KB gzip |
| Script (`main.ts`: el formulario y el menú) | `final.js`, el menú: 0,7 KB (0,4 gzip) | 3 KB gzip |
| Fuentes | Archivo variable, subconjunto latino con `wdth` y `wght`: 90,1 KB (Google Fonts) | un solo woff2, 95 KB; autoalojado, precargado en las páginas con cartel en la primera pantalla (todas) |
| Imágenes de la primera pantalla | la vitrina de la ficha (las de la portada van por debajo) | la vitrina en AVIF, ≤ 120 KB a 1440 |

**Lighthouse** (móvil, como el estudio): rendimiento ≥ 95 y el resto a 100; **CLS ≤ 0,01**.

Lo que el diseño ya hace por el rendimiento: el LCP es texto; ninguna imagen por encima del pliegue
en la portada; cero JS de movimiento; un solo archivo de fuente; imágenes con medidas.

**Riesgo conocido: la fuente estrecha y el CLS.** Los carteles usan Archivo al 62 % de ancho; la
fuente de reserva (system-ui) no tiene ese eje y es mucho más ancha. Las líneas del nombre no se
mueven (son bloques de alto fijo por `line-height`), pero un título de sección o de tarjeta puede
partirse en más líneas con la reserva y empujar lo de abajo. La fase 2 lo mide como el estudio (la
woff2 retrasada 800 ms, a 412, 1024 y 1440) y elige: precarga sola, una `@font-face` de reserva
ajustada (`size-adjust` sobre una fuente estrecha local) o `font-display: optional` en los
carteles.

**Las flechas.** «→» (U+2192) y «↗» (U+2197) no están en el subconjunto latino de Google Fonts
(«↓», U+2193, sí): en el lienzo salen de la fuente del sistema. Al autoalojar, la fase 2 mira si
Archivo las tiene y, si las tiene, las mete en el subconjunto.

---

## 9. Pendiente de material

- **La foto real de busto** para Contacto (§ 2.5). Hasta entonces, Contacto sin foto.
- **Las capturas con Navidad** (Missphone): si se publica pasado Reyes, se rehacen (`plan/capturas.md`).
- **El texto en inglés** (fase 2): entra en las mismas piezas; la cabecera ya está medida (§ 5).
