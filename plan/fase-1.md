# Fase 1 — Contenido, capturas, lienzo y andamio

**Qué existe al acabar:** el texto entero de la web nueva en español, verificado y con sus fuentes
(`plan/contenido.md`); todas las capturas que va a enseñar, hechas y apuntadas
(`plan/capturas.md`); el diseño elegido entre tres conceptos y escrito en `plan/spec-visual.md`; y
Astro montado en la rama `astro`, con su red de pruebas en verde y una previa en Pages. **El
dominio sigue sirviendo la web vieja**: el corte es de la fase 2.

**Por qué en este orden:** el diseño se hace con el texto y las capturas de verdad (un lienzo con
textos de relleno decide mal los tamaños), y el diseño decide cómo se cortan los componentes, así
que la fase 2 se planifica cuando exista la spec. El andamio (1.5) no depende del lienzo: puede ir
antes de la 1.3 si conviene, pero después de la 1.1, porque monta las páginas con su texto.

Antes de cualquier tanda: `plan/README.md` entero (las 14 decisiones y la regla 13, que el repo es
público).

---

### Tanda 1.1 — El contenido, en español y verificado   [x] hecha (2026-11-04, v0.1.1)
**Objetivo**: existe `plan/contenido.md` con todo el texto visible de la web nueva en español
(portada, las cuatro fichas, el 404, los `title`, las `description`, el Open Graph y el JSON-LD),
cada afirmación con su fuente, y el `CLAUDE.md` describe el posicionamiento nuevo.

**Modelo**: Opus 5.5, medio.

**Leer antes**:
- ENTEROS: `CLAUDE.md` del portfolio, `index.html`, `plan/README.md` y `docs/cv/cv-es.html`.
- Cómo se vende el estudio: `~/Projects/propios/estudio-reigar/web/src/pages/sobre-mi.astro`,
  `como-trabajo.astro` e `index.astro` («una sola persona al otro lado: yo», «las webs las escribo a
  mano»).
- Lo que dice X y no se puede contradecir: `~/Projects/propios/freelancer-profile/contenido/perfil.md`
  («Giro del 2026-11-01» y «Comprobado en el perfil»), `docs/posicionamiento.md` y
  `contenido/cuentas-a-seguir.md` (el porqué de Snugtone en palabras de Fritz y «sin plantillas,
  cada cliente su web a medida»).
- Missphone: `~/Projects/clientes/missphone/CLAUDE.md` (§3 «Identidad y marca» y §1 «Reglas»), el
  «Qué existe al acabar» de cada fase en `plan/fase-1.md`, `fase-1b.md`, `fase-2.md`, `fase-3.md` y
  `fase-4.md`, y `docs/portfolio/README.md`. De ahí sale lo que hizo Fritz, por fases.
- Artemisa: `~/Projects/clientes/limpiezas-artemisa/CLAUDE.md` (Stack y Estado actual) y su ficha de
  hoy en `index.html`.
- Snugtone: `~/Projects/propios/snugtone/README.es.md`.
- Snugport: la ficha de hoy en `index.html` y la sección «Proyecto principal» del `CLAUDE.md`.

**Archivos**: crea `plan/contenido.md`; toca `CLAUDE.md` (reescribe «Qué es» y «Posicionamiento del
contenido», y el apartado «El CV» queda con la regla nueva «no se contradicen», decisión 4).

**Qué lleva `plan/contenido.md`** (el orden de los bloques es una propuesta: el lienzo puede
cambiarlo, el texto no):
1. **Portada**:
   - **Hero**: el nombre, el avatar (con su `alt`), una línea de quién es (desarrollador web
     freelance en Valencia; webs para negocios con Estudio Reigar y, en sus ratos, apps propias),
     el estado «Acepto proyectos» y dos acciones (estudioreigar.com y «Escríbeme»).
   - **Estudio Reigar**: qué es, quién lo lleva y cómo trabaja, en tres o cuatro frases. Enlaza al
     estudio, sin precios ni lista de servicios (decisión 6).
   - **Trabajo**: Missphone primero y más grande, luego Limpiezas Artemisa. Rótulo, título, dos
     líneas y enlace a la ficha.
   - **Proyectos**: Snugtone primero y más grande, luego Snugport y, en pequeño, Galaxian (sin
     ficha; enlace al repo).
   - **Cómo trabajo**: corto y técnico, para quien sabe: a mano y sin plantillas, tests y CI,
     Lighthouse medido, desarrollo asistido por IA.
   - **Trayectoria**: una línea por puesto (Estudio Reigar, Lionbridge, DataAnnotation, Selectra, la
     docencia y las prácticas), con las fechas del CV; la formación y los idiomas. El enlace al CV,
     discreto.
   - **Contacto**: entradilla, correo y los textos del formulario.
2. **Ficha de Missphone** (la que más pesa):
   - qué es el negocio, en una línea;
   - qué había: una tienda WooCommerce heredada, contado sin culpar al anterior, como las normas de
     casos del estudio;
   - qué hizo Fritz, por fases: el rescate y la recuperación del control, los regalos
     personalizables, las páginas rehechas al nivel de la portada, los flecos, la entrega y el
     lanzamiento. Las cifras se cuentan en la carpeta del cliente: páginas, productos y código a
     medida;
   - el antes/después, con sus pies;
   - el stack;
   - «lo que no se enseña»: ventas, anuncios y datos de clientes.
3. **Ficha de Limpiezas Artemisa**: lo que dice hoy la web, reordenado (web estática, SEO local,
   formulario con Pages Function, CSP estricta, Lighthouse y Google Business Profile), sin métricas
   del perfil del cliente.
4. **Ficha de Snugtone**:
   - el porqué, en palabras de Fritz;
   - qué hace (suena, va rápido, arregla sin tocar tus archivos, se configura);
   - las cifras medidas del README (9503 archivos, rescaneo en 0,48 s, 609 + 31 pruebas);
   - descarga, licencia MIT y repo;
   - la nota de que todo lo de las capturas es libre.
5. **Ficha de Snugport**: los cuatro bullets de hoy, sin destacarla por encima de Snugtone.
6. **404**, y por página `title`, `description`, OG (título y línea) y el JSON-LD de la portada
   (`ProfilePage` + `Person`, con `worksFor` o `founder` hacia el `#estudio` de estudioreigar.com,
   como ya lo enlaza su JSON-LD).

Cada afirmación lleva al lado, en una nota corta, de dónde sale (ruta y sección). Esas notas son
del plan, no de la web.

**Reglas de contenido** (además de las del `CLAUDE.md`):
- **Missphone**: no se dice que Fritz hizo la tienda desde cero: era heredada, y se cuenta lo que
  hizo él. No se dice que se facturó como Estudio Reigar (el crédito del pie sí es del estudio). Ni
  ventas, ni gasto, ni resultados de anuncios, ni nombres de su gente, ni detalles de seguridad de
  su web (regla 13). El permiso de portfolio está en su presupuesto (`missphone/CLAUDE.md` §3).
- **Artemisa**: ni precio (fue precio de amigo) ni métricas de su ficha de Google. Los Lighthouse
  sí, y se vuelven a medir en la 1.2.
- **Snugport**: ni usuarios, ni suscriptores, ni ingresos; las cifras de tests se recuentan en
  `~/Projects/propios/snugport/snugport-app` antes de escribirlas.
- **Snugtone**: las cifras, del README de la versión publicada (hoy 1.0.1, solo Windows).
- **X**: freelancer, estudioreigar.com y Snugtone tienen que salir y cuadrar.
- **El estudio**: nada que contradiga su web (sin fechas que delaten lo reciente en lo que hable
  del estudio; «programa desde los 18 años»).
- La palabra sencilla primero y la técnica después, solo en lo que lee un cliente; en las fichas,
  el tono técnico sobrio es el bueno: las lee gente que sabe.

**Reutilizar**: los textos de hoy (`index.html`, `js/i18n.js`) donde sigan siendo verdad; las normas
de casos del estudio (`estudio-reigar/web/src/pages/casos/missphone.astro`: «qué me encontré», «lo
que no vas a ver aquí»).

**Fuera de alcance**: el inglés (fase 2), el diseño, cambiar el CV o LinkedIn (fase 2, tanda de
coherencia) y tocar la web publicada.

**Aceptación**:
- `plan/contenido.md` tiene los seis apartados de arriba completos, sin huecos ni «lorem».
- Cada cifra lleva su fuente, y la cifra coincide con la fuente al releerla.
- Hay una lista «Choques con el CV» con cada diferencia entre el texto nuevo y `docs/cv/cv-es.html`
  (Missphone, DragonQuestHispano fuera, Snugtone dentro…), para la tanda de coherencia.
- Fritz ha dado el OK en el chat a lo que se dice de Missphone y de Artemisa.
- El grep de la regla 13 sobre `plan/` y `CLAUDE.md` no saca nada confidencial.

**Verificación**:

    grep -nE "€|Ads|vulnerab|XSS|ventas de" plan/contenido.md CLAUDE.md

y un segundo grep con los nombres de la gente del cliente, que se sacan de
`missphone/CLAUDE.md` § «Quién contesta qué» y se escriben solo en la línea de comandos, nunca en
un archivo del repo. Cada coincidencia se mira a mano: puede ser legítima («sin cifras de
ventas»), no puede ser un dato.

**Qué trae Fritz**: dos líneas de qué es lo mejor de Missphone (es lo que tiene que ver quien
llegue); su titular, si tiene uno; y tiempo para dar el OK a las fichas de los dos clientes.

---

### Tanda 1.2 — Las capturas   [x] hecha (2026-11-04, v0.1.2)
**Objetivo**: cada imagen que la web va a enseñar existe a su tamaño, en `docs/capturas/`, y
`plan/capturas.md` la apunta con su origen, su fecha, su tamaño y su `alt`.

**Modelo**: Opus 5.5, medio.

**Leer antes**:
- ENTEROS: `plan/contenido.md` (los `alt` y qué enseña cada ficha) y
  `~/Projects/clientes/missphone/docs/portfolio/README.md` (cómo se rehace un «después» y por qué
  el «antes» no se toca).
- `~/Projects/clientes/missphone/CLAUDE.md` § «Cómo se audita sin tocar nada»: las reglas de
  conexión a su servidor (VPN, pausas, parar si una petición vuelve vacía).
- `~/Projects/propios/estudio-reigar/CLAUDE.md`, el punto «Casos» (los tamaños de las capturas) y
  «Capturas a 390».
- `~/Projects/propios/freelancer-profile/contenido/perfil.md`, § «La nariz».

**Archivos**: crea `docs/capturas/` (gitignored, no se sube) y `plan/capturas.md` (sí se sube: solo
nombres, tamaños, URL públicas, fechas y `alt`).

**Qué se hace**:

| Pieza | De dónde | Qué se hace |
|---|---|---|
| Estudio Reigar | estudioreigar.com | escritorio 1440×900 y móvil 390×844 a densidad 2, con `estudio-reigar/docs/diseno-rediseno/capturar.mjs` (nunca `--window-size`: Chrome headless no baja de 500 px) |
| Missphone, antes/después | `missphone/docs/portfolio/antes/` | se eligen **5 parejas**, las de la ficha (`plan/contenido.md` § 2, «Antes y después»): el hero de la portada a 1440, el hero móvil (lienzo 380×826), las tarjetas de categoría de la portada a 1440, la categoría de fundas a 1440 y el bloque de la tienda a 1440. Los «antes» se copian tal cual. Los «después» se rehacen con `missphone/herramientas/capturar-portfolio.mjs` y un `trabajos.json` propio de esas 5, con salida en `docs/capturas/missphone/despues/` (no en la carpeta del cliente), sobre el mismo lienzo que su antes y con el ancla por contenido. Si el ancla del README ya no existe, se elige mirando el antes |
| Missphone, vitrina | `estudio-reigar/web/src/assets/cases/missphone-{desktop,mobile}.webp` | se copian si siguen cuadrando con la portada servida hoy; si no, se rehacen con el mismo script del estudio |
| Limpiezas Artemisa | `estudio-reigar/web/src/assets/cases/limpiezas-artemisa-*.webp` | se copian; y se vuelven a medir rendimiento, accesibilidad, buenas prácticas y SEO en móvil de la portada y de dos páginas de servicio, con el Lighthouse 13.5.0 del estudio. Las cifras que vayan a la ficha son las de hoy |
| Snugtone | `snugtone/assets/captura*.png` (4, de 1280×860) | se copian; nada que hacer |
| Snugport | snugport.app | escritorio 1440×900 y móvil 390×844 a densidad 2 de la portada de hoy (la de `assets/img/proyectos/snugport.webp` es de agosto) |
| Galaxian | `assets/img/proyectos/cpp-galaxian-engine.webp` | se copia |
| Avatar | `freelancer-profile/contenido/marca/avatar-nariz-85.png` (400×400) | se copia; y se mira si `generar-avatares-propuesta.py` lo saca a 800 px o más. Si no puede, se apunta el tope (400 px: hasta 200 px CSS a densidad 2) |

**Reutilizar**: los tres scripts de captura citados; `missphone/herramientas/verificar-portfolio.py`
como modelo de la comprobación de lienzos.

**Fuera de alcance**: retocar las capturas (recortes, marcos, sombras: eso es del lienzo),
convertirlas a AVIF o WebP (lo hace `astro:assets` en la fase 2), vectorizar el avatar (si el
concepto A lo pide, es de la 1.3) y tocar nada en las webs de los clientes.

**Aceptación**:
- `plan/capturas.md` tiene una fila por archivo: nombre, tamaño en px, origen, fecha y `alt`.
- Las 5 parejas de Missphone tienen el antes y el después **del mismo lienzo exacto** (se comprueba
  leyendo el tamaño de los dos con Pillow), y ningún «después» lleva banner de cookies, aviso de
  envío ni barra de administración (el script los nombra en `estorbos=[...]`).
- Ninguna captura enseña datos personales, pedidos ni paneles de administración.
- Las cifras de Lighthouse de Artemisa medidas hoy quedan en `plan/capturas.md`, y si cambian las de
  `plan/contenido.md`, se corrigen allí.

**Verificación**:

    python -c "from PIL import Image; import glob; [print(f, Image.open(f).size) for f in sorted(glob.glob('docs/capturas/**/*.*', recursive=True))]"

**Qué trae Fritz**: **la VPN puesta** antes de capturar Missphone (sin ella su servidor no responde).

---

### Tanda 1.3 — Lienzo I: tres conceptos   [x] hecha (2026-11-04, mezcla A + C)
**Objetivo**: existen tres prototipos de diseño completos, cada uno con una pieza diferenciadora
distinta, y Fritz elige uno (o una mezcla) viéndolos.

**Modelo**: Opus 5.5, alto (es diseño). Se cargan las skills `frontend-design` y `taste-skill`,
como hizo el estudio en su lienzo; `gpt-tasteskill` y `redesign-skill`, no.

**Leer antes**:
- ENTEROS: `plan/contenido.md`, `plan/capturas.md` y `plan/README.md`.
- La base que se conserva: `css/styles.css` (los tokens de hoy, retícula suiza) y
  `rediseno-2-suizo.html` en la raíz (el prototipo de agosto que ganó). `rediseno-1-editorial.html`
  y `rediseno-3-nocturno.html`, solo como referencia de lo descartado.
- Cómo resolvió el estudio el movimiento sin librerías:
  `~/Projects/propios/estudio-reigar/CLAUDE.md`, «El movimiento» y la línea de
  `animation-timeline`.
- Memoria: Fritz prefiere el minimalismo profesional con un acento; los diseños de terminal o neón
  le abruman.

**Archivos**: crea `docs/lienzo/concepto-a.html`, `concepto-b.html` y `concepto-c.html` (gitignored),
con las capturas por ruta relativa a `docs/capturas/`, y sus capturas de pantalla en
`docs/lienzo/capturas/`.

**La base común** (decisión 1): retícula suiza, Archivo como única familia, títulos en caja alta,
radio cero, hairlines que organizan contenido, acento cobalto `#1f4fa3` y celeste como superficie
del avatar. Tema claro y oscuro por `prefers-color-scheme`. Cada concepto lleva **la portada entera
y la ficha de Missphone**, con el texto de `contenido.md` y las capturas reales, y se mira a 390 y a
1440.

**La pieza de cada concepto**:
- **A, el dibujo.** El avatar se traza solo al cargar: SVG del dibujo, con `stroke-dasharray` y
  `stroke-dashoffset` en CSS. La misma línea de tinta hace de hilo conductor: subraya, rodea una
  captura o une Trabajo con Proyectos al bajar. Exige vectorizar el avatar (con `potrace` o a mano
  a partir del PNG); si la vectorización no queda limpia, se dice y se enseña lo que hay.
- **B, el barrido.** Las capturas se revelan con el scroll y el antes/después de Missphone se barre
  solo al pasar por él: `animation-timeline: view()`, sin JS. La retícula se dibuja al entrar.
- **C, el cartel suizo.** Tipografía a gran escala que se recompone en la retícula con el scroll y
  bandas de capturas que se desplazan a velocidades distintas, todo en CSS.

**Límites que valen para los tres** (son los de la web final):
- todo el movimiento dentro de `@media (prefers-reduced-motion: no-preference)` y con
  `translate`/`scale`/`opacity`, no con `transform` (regla del estudio);
- sin soporte de `animation-timeline` (Firefox), la página se ve entera y bien, solo que quieta;
- nada en línea que la CSP estricta bloquee en la web final: cero `<script>` en línea y, como mucho,
  un script externo pequeño;
- ninguna librería de animación;
- la pieza no tapa ni retrasa el contenido: el LCP sigue siendo texto o una captura;
- contraste AA en los dos temas.

**Reutilizar**: tokens y estructura de `rediseno-2-suizo.html` y `css/styles.css`; el patrón de
`@starting-style` y `animation-timeline` del estudio.

**Fuera de alcance**: Astro, el inglés, el resto de fichas y la spec escrita (es de la 1.4).

**Aceptación**:
- Los tres archivos abren en Chrome sin errores de consola y se ven a 390 y a 1440, en claro y en
  oscuro: se le mandan a Fritz las 8 capturas de cada concepto.
- Con movimiento reducido, cada concepto se ve quieto y completo (captura que lo demuestre).
- Fritz elige en el chat, y la elección (y lo que se mezcle) queda apuntada en «Decisiones del
  lienzo», al pie de este archivo.

**Verificación**: capturas con Chrome headless a 1440×900, y a 390 con
`estudio-reigar/docs/diseno-rediseno/capturar.mjs` (y `--force-prefers-reduced-motion` para la del
movimiento reducido); la consola, con el navegador en primer plano.

**Qué trae Fritz**: un rato para mirarlos en el ordenador y en el móvil, y elegir.

---

### Tanda 1.4 — Lienzo II: la vuelta y la spec   [x] hecha (2026-11-04, lienzo final y `plan/spec-visual.md`)
**Objetivo**: el concepto elegido está pulido en todas las páginas tipo y existe
`plan/spec-visual.md`, que basta para implementarlo sin mirar el prototipo.

**Modelo**: Opus 5.5, alto.

**Leer antes**: ENTEROS, la sección «Decisiones del lienzo» de este archivo, el concepto elegido en
`docs/lienzo/` y `plan/contenido.md`. Como modelo de spec, `~/Projects/propios/estudio-reigar/plan/spec-visual.md`.

**Archivos**: crea `docs/lienzo/final.html` (gitignored) y `plan/spec-visual.md`.

**Qué se dibuja**: la portada, una ficha de Trabajo (Missphone), una ficha de Proyecto (Snugtone) y
el 404, a 390 y a 1440, en claro y en oscuro, con la pieza diferenciadora acabada.

**Qué lleva `spec-visual.md`**:
- los tokens de los dos temas, con el contraste AA de cada pareja texto-fondo medido;
- la escala tipográfica y la retícula (columnas, márgenes y puntos de corte);
- la lista de componentes con sus props y variantes, que es lo que la fase 2 convierte en `.astro`;
- el movimiento: qué se mueve, con qué propiedad y qué curva, y su caída con movimiento reducido y
  sin soporte;
- el presupuesto: KB por tipo (documento, hoja, script, fuentes, imágenes) y Lighthouse
  (rendimiento ≥ 95 y el resto 100, CLS ≤ 0,01, como el estudio);
- el tamaño de cada imagen por componente (para el `sizes` de `astro:assets`);
- el encabezado de cada página (qué asoma en la primera pantalla a 390 × 844 y a 1440 × 900).

**Reutilizar**: la estructura de la spec del estudio.

**Fuera de alcance**: Astro y el inglés (pero la spec deja sitio al selector de idioma y mide el
peor caso de longitud de texto en inglés en la cabecera).

**Aceptación**:
- Fritz da el OK al lienzo final en el chat.
- Cada bloque de `contenido.md` tiene su componente en la spec.
- Todos los colores salen de tokens: el prototipo final no tiene ningún color literal fuera de
  `:root` (se comprueba con grep).

**Verificación**:

    grep -nE "#[0-9a-fA-F]{3,6}\b|rgb\(" docs/lienzo/final.html

Solo puede salir dentro de `:root` y de su bloque de tema oscuro. Más las capturas de las 16 vistas
(4 páginas × 2 anchos × 2 temas), mandadas a Fritz.

**Qué trae Fritz**: nada más que su OK.

---

### Tanda 1.5 — El andamio de Astro   [x] hecha en local (2026-11-05, v0.1.5); el push de `astro` y la previa, pendientes del OK de Fritz
**Objetivo**: en la rama `astro` hay un proyecto Astro en la raíz del repo, con las seis rutas por
idioma, el texto de `contenido.md` sin estilo, la CSP estricta, las pruebas y la CI en verde, y una
previa en Pages con `noindex`.

**Modelo**: Opus 5.5, medio.

**Leer antes**:
- ENTEROS: `plan/README.md` (decisiones 2 y 7 a 10), `plan/contenido.md`,
  `~/Projects/propios/estudio-reigar/web/astro.config.mjs`, `src/layouts/BaseLayout.astro`,
  `src/data/routes.ts` y `public/_headers`.
- Del estudio, también: `package.json`, `biome.json`, `tsconfig.json`, `playwright.config.ts`,
  `lighthouse.budgets.json`, `scripts/lighthouse.mjs`, `src/components/site/LangSwitch.astro`,
  `src/pages/sitemap.xml.ts`, `src/data/ui.ts` y `.github/workflows/web.yml`.
- `~/Projects/clientes/limpiezas-artemisa/functions/_middleware.js` (el `noindex` solo en
  `pages.dev`).

**Archivos** (todos en la rama `astro`):
- **Se crean**:
  - `package.json`, `astro.config.mjs`, `tsconfig.json` y `biome.json`;
  - `src/layouts/BaseLayout.astro`, `src/data/routes.ts`, `src/data/ui.ts` y
    `src/scripts/main.ts`, este casi vacío;
  - las páginas:
    - en español: `src/pages/index.astro`, `trabajo/missphone.astro`,
      `trabajo/limpiezas-artemisa.astro`, `proyectos/snugtone.astro`, `proyectos/snugport.astro` y
      `404.astro`;
    - en inglés, sus gemelas en `src/pages/en/`, con las rutas `work/…` y `projects/…`; mientras el
      texto inglés no exista, cada una con su `title` y un aviso, y `en.live` en `false` (como el
      patrón del estudio);
  - `src/pages/sitemap.xml.ts`;
  - en `public/`: `robots.txt`, `_headers` y los favicons, el manifest, `og-preview.png` y los dos
    PDF del CV, **en las mismas URLs de hoy** (`/assets/cv/fritz-reigar-cv.pdf` y `-en.pdf`,
    `/assets/img/…`);
  - `functions/_middleware.js`;
  - `e2e/` con las pruebas, `scripts/lighthouse.mjs`, `lighthouse.budgets.json` y
    `.github/workflows/web.yml`.
- **Se tocan**: `.gitignore` (añade `node_modules/`, `dist/`, `.astro/`, `test-results/` y
  `playwright-report/`) y `README.md` (cómo se trabaja ahora).
- **Se retiran de la rama**: `index.html`, `404.html`, `css/`, `js/`, `sitemap.xml` y `robots.txt`
  (se rehacen).

**Qué tiene que cumplir**:
- **`astro.config.mjs`**: copia del estudio, con `site` puesto a `https://fritzreigar.com`, y lo
  mismo de `compressHTML: false`, `inlineStylesheets: 'never'`, `assetsInlineLimit: 0`,
  `cssCodeSplit: false`, el plugin que quita la marca de Vite y la i18n (`es` sin prefijo).
- **`_headers`**:
  - la CSP del estudio, con `form-action 'self' https://formspree.io` y
    `connect-src 'self' https://formspree.io` (más `cloudflareinsights` si se activa Web Analytics);
  - HSTS sin `preload`, `X-Frame-Options: DENY` y `Permissions-Policy`;
  - caché larga en `/_astro/*` y `/fonts/*`.
- **El formulario**: `action` de Formspree, el mismo de `index.html` hoy, que funcione sin JS.
- **Las pruebas** (Playwright, a 390 y a 1440, contra `wrangler pages dev dist`):
  - cada ruta responde 200 y la 404 da 404;
  - el hreflang es recíproco en las páginas con gemela viva;
  - axe da 0 infracciones;
  - la consola sale sin errores de CSP;
  - los dos PDF del CV responden 200 en su URL de siempre.
- **`npm run red`**: `check && build && e2e && lighthouse`. El arnés de comentarios de `dist/` puede
  ser un paso de `e2e` o un script corto, sin copiar entero el `verificar-web.py` del estudio.
- **La CI**: un solo job que corre la red en cada push a `astro` y a `main`, sin publicar nada
  (publica Pages). El repo es público, así que los minutos de Actions no cuentan.

**Reutilizar**: todo lo citado del estudio; `functions/_middleware.js` de Artemisa.

**Fuera de alcance**: estilos, la pieza diferenciadora, el texto inglés, las imágenes OG, tocar
`main` y el dominio.

**Aceptación**:
- `npm run red` sale en verde en local.
- `grep -rE "<!--|/\*" dist --include=*.html --include=*.css --include=*.js` no saca nada, salvo
  avisos de licencia.
- Con un fallo provocado (una ruta borrada de `routes.ts`), la prueba de hreflang sale en rojo, y
  vuelve a verde al deshacerlo.
- Con el OK de Fritz: push de la rama `astro`, la CI en verde y la previa de Pages sirve la portada
  con `X-Robots-Tag: noindex`.

**Verificación**:

    npm run red
    curl -sI https://<proyecto-previa>.pages.dev/ | grep -iE "^HTTP|x-robots-tag|content-security-policy"

**Qué trae Fritz**:
- el nombre del proyecto de Pages que sirve hoy fritzreigar.com (panel de Cloudflare → Workers y
  Pages);
- el proyecto de previa creado con estos ajustes: mismo repo, rama de producción `astro`, preset
  Astro, build `npm run build`, salida `dist` y la variable `NODE_VERSION` = `22`;
- su OK para el push.

---

## Decisiones del lienzo

**2026-11-04, tanda 1.3: Fritz elige la mezcla de A y C.** El prototipo es
`docs/lienzo/concepto-ac.html` y `concepto-ac-missphone.html`, con `concepto-ac.css` sobre `base.css`;
es el punto de partida de la 1.4.

- **De C, la estructura y la tipografía:** el nombre a tamaño de cartel en Archivo estrecha, que se
  recompone al cargar (y pisa el pie del avatar a propósito, como en C); los títulos de sección en
  cartel con su regla cobalto, que entran con el scroll; la banda cobalto del estudio; Missphone
  sobre el bloque celeste; las dos bandas de capturas entre Trabajo y Proyectos; y en la ficha, los
  números grandes y las fases en tres columnas.
- **De A, el dibujo:** el avatar vectorizado se traza solo al cargar (línea y luego rellenos), y la
  tinta cobalto sale donde dice algo: el óvalo alrededor de «Acepto proyectos» y la flecha entre
  cada antes y su después en la ficha (no en la pareja del móvil, ni a 560 px o menos).
- **Lo que se queda fuera:** B entero; la línea de A que unía Trabajo con Proyectos (ese papel ya lo
  hacen las bandas de C, y juntas se pisaban); y el lazo de tinta alrededor de la captura de
  Missphone, que Fritz descartó porque, al salir solo ahí, se leía como adorno.
- **El avatar se queda, y la foto real va aparte.** Fritz preguntó si poner una foto en su lugar. Se
  queda el avatar en el hero: es su imagen en X, el celeste de la web sale de su fondo y es el origen
  de la tinta. Una foto real de busto irá en Contacto, junto a «te contesto yo», cuando Fritz la
  tenga (está pendiente). La 1.4 la prevé como pieza opcional: con o sin ella, Contacto se ve bien.
- **Para la 1.4:** aligerar el avatar (228 KB), y las tintas llevan `max-width: none`, porque la base
  (`svg { max-width: 100% }`) las recortaba y el óvalo no cerraba alrededor del texto.

**2026-11-04, tanda 1.4: Fritz da el OK al lienzo final** (`docs/lienzo/final.html`, con la
revisión como visitante de los Desvíos aplicada). **Desde aquí manda `plan/spec-visual.md`**: la
fase 2 se planifica y se pinta con ella, y el lienzo queda solo como imagen de referencia.

## Desvíos

(Lo que aparezca a mitad de una tanda y no estaba, con su fecha y su tanda.)

- **2026-11-04, tanda 1.1: el antes/después de Missphone pasa de 4 a 5 parejas.** Fritz pidió que
  se viera bien el estado en que heredó la tienda («el antes era horrible»). Se añade la pareja de
  las tarjetas de categoría de la portada (la 3 de `missphone/docs/portfolio/README.md`, ancla
  «Fundas para móvil», margen 245), y la tanda 1.2 se ajusta para pedir 5.
- **2026-11-04, tanda 1.1: los temas de Snugport van sin cifra.** La landing dice siete, el panel en
  React tiene cinco en el código y Fritz cuenta cuatro.
- **2026-11-04, tanda 1.2: el Lighthouse de Artemisa baja de «94 a 98» a «95-96».** Medido hoy
  con la 13.5.0 en la portada y dos servicios (medianas 95, 96 y 96; pasadas sueltas de 93 a 97), y
  buenas prácticas sube a 100. Corregido en `plan/contenido.md` (tarjeta, ficha y `description`).
- **2026-11-04, tanda 1.2: la pareja 3 de Missphone se reancla y tres pies se reescriben.** Las
  tarjetas de categoría ya no llevan la foto arriba sino a un lado, y el ancla de su README
  («Fundas para móvil», 245) cortaba una línea bajo la cabecera: se ancla al título de la sección.
  Los pies de la 3 y la 4 se ajustan a lo que enseña hoy el «después», y la 5 se retitula: en el
  antes ese sitio era un bloque de accesorios, no la tienda.
- **2026-11-04, tanda 1.2: la vitrina de Missphone se rehace y sale con la Navidad.** La del
  estudio ya no cuadraba. Se rehízo con su script y una línea que descarta el aviso de la tienda
  (hoy, «hasta el 20 de diciembre»). La portada de hoy lleva la temporada («Navidad» en el menú y su
  bloque de regalos), y también los «después» 1 y 2: si se publica pasado Reyes, se rehacen
  (`plan/capturas.md`). Las de octubre se guardan de reserva.
- **2026-11-04, tanda 1.2: Snugport se captura en `/es/`.** La raíz sirve la landing en inglés.
  Y la landing dice «panel gratuito… sin cuenta, y tus datos se quedan en tu dispositivo», mientras
  la ficha (`plan/contenido.md` § 5) dice «A la venta» y «a la venta por suscripción con Stripe».
  No tiene por qué ser contradicción (tiene «Ver precios»), pero puesta al lado de la captura se
  leía raro. **Fritz decidió el mismo día: «gratis, con plan de pago»** (el panel es gratis y se
  paga la sincronización entre dispositivos). Aplicado en `plan/contenido.md` § 1.4, § 5 y § 6.2, y
  apuntado en «Choques con el CV» (fila 15).
- **2026-11-04, tanda 1.2: el avatar no pasa de 400 px.** `generar-avatares-propuesta.py` retoca
  `avatar-400.png` con coordenadas de esos 400 px y no hay original mayor. Tope: 200 px CSS a 2×.
- **2026-11-04, tanda 1.3: cada concepto son dos páginas y una hoja.** En vez de un archivo por
  concepto, `concepto-X.html` (portada), `concepto-X-missphone.html` (ficha, enlazada desde «Ver el
  caso») y `concepto-X.css`, sobre una `base.css` común con los tokens de los dos temas (todas las
  parejas texto-fondo pasan AA: la más justa, el cobalto sobre celeste, 5,9:1). Cero JS en los tres,
  ni un `style=""` ni un `<script>` en línea; el menú del móvil es un `<details>`.
- **2026-11-04, tanda 1.3: el avatar vectorizado queda limpio, pero pesa.** Con `potrace` (el
  módulo de Python) en cuatro capas: línea, piel, camiseta y el rayado de la barba, que es lo único
  que pierde algo de finura. El SVG pesa 228 KB sin comprimir, metido en el HTML: si gana A, la 1.4
  lo aligera (menos decimales y nodos) o lo saca a un archivo. Los scripts del lienzo
  (vectorizar, empalmar, capturar) quedan en `docs/lienzo/herramientas/`.
- **2026-11-04, tanda 1.3: las capturas, con un script propio y no con `capturar.mjs`.** El del
  estudio solo saca la primera pantalla; `herramientas/capturar-pagina.mjs` saca la página entera
  por CDP, emula tema y movimiento reducido, recoge la consola y, en el reposo, acaba cada animación
  (las ligadas al scroll pasan al reloj del documento), como la paridad del estudio. Por eso en las
  8 capturas de B el antes/después sale ya barrido (solo el «después»): la pieza de cada concepto se
  ve en una captura más a mitad del movimiento (`concepto-X-pieza-*.png`). Sin soporte de
  `animation-timeline` o con movimiento reducido, B pone las parejas lado a lado.
- **2026-11-04, tanda 1.3: C necesita el eje de anchura de Archivo.** El cartel usa Archivo estrecha
  (`font-stretch` 62 %, del eje `wdth` 62–125). En el lienzo viene de Google Fonts; si gana C, la
  fase 2 autoaloja la variable con ese eje y lo cuenta en el presupuesto de fuentes.
- **2026-11-04, tanda 1.4: `final.html` es un archivo con cinco vistas.** La portada, `#missphone`,
  `#snugtone`, `#no-encontrada` (el 404) y `#contacto-con-foto`, que se eligen por el fragmento con
  `:target`; el CSS va dentro, en un `<style>`, para que el grep de la aceptación lo vea entero.
  Cero JS. Las 16 capturas y tres más (Contacto con foto a 390 y a 1440, y la portada con movimiento
  reducido) salen de `docs/lienzo/herramientas/capturar-final.sh`.
- **2026-11-04, tanda 1.4: el avatar, de 228,7 a 62,6 KB** (18 KB en gzip), con
  `herramientas/aligerar-avatar.py`: mismas cuatro capas, rellenos trazados de una máscara suavizada
  (el lienzo I dejaba un halo claro fuera de la línea), rayado sin motas y caminos relativos en
  enteros sobre un `viewBox` de 800. Lo único que se simplifica es el cuello de la camiseta (una línea
  en vez de dos finas).
- **2026-11-04, tanda 1.4: el 404 pone el título al lado del número.** Con el número solo, media
  pantalla quedaba vacía a 1440: «Esta página no existe» va a su derecha, asentado en la misma línea
  base, y la tinta es una flecha hacia «Volver al inicio».
- **2026-11-04, tanda 1.4: a 390 la vitrina de Missphone no lleva la captura del móvil** (le quedaban
  52 px), y el título de ficha baja su mínimo (a 6,2rem «MISSPHONE» se salía por la derecha).
- **2026-11-04, tanda 1.4: el idioma es un enlace, no un desplegable.** «English» al final de la nav,
  tras un filete. Medido con la fuente: marca y nav ocupan 750 px en español y 668 con las etiquetas
  inglesas; la nav entera entra a 56rem.
- **2026-11-04, tanda 1.4: «→» y «↗» no están en el subconjunto latino de Archivo** de Google Fonts
  (sale la del sistema). Al autoalojar la fuente, la fase 2 mira si Archivo las tiene y las incluye
  (`plan/spec-visual.md` § 8).
- **2026-11-04, tanda 1.4: la revisión como visitante cambia seis cosas.** Probado a 360, 768, 900,
  1024, 1280, 1920 y 2560, con la carga a medias, el menú del móvil y el teclado:
  - el avatar va siempre al lado de «Fritz», con el alto de una línea del nombre, porque entre 600 y
    960 px el nombre le tapaba la cara (a 360 × 740, de paso, caben ya los dos botones del hero);
  - el menú del móvil se cierra al pulsar un enlace, al pulsar fuera y con Escape (`main.ts`; en el
    lienzo, `final.js`);
  - las bandas llevan cada serie dos veces y viajan desde 0, porque dejaban huecos vacíos al empezar y
    en pantallas de 1920 o más;
  - las citas van en caja normal, porque 50 palabras en mayúsculas no se leían;
  - las tarjetas de Trabajo y Proyectos se pulsan enteras, y «estudioreigar.com» va enlazado en
    Contacto;
  - el formulario tiene sus tres estados dibujados (`#estados-formulario`) y un token nuevo,
    `--color-error`.
  Y dos ajustes menores: los botones del 404 van en una fila de tres en tablet, y «English» no se
  pinta hasta que exista el inglés.
- **2026-11-04, tras la tanda 1.4: cinco añadidos para la planificación de la fase 2.** Astro se queda
  (web estática de contenido, cero JS por defecto, rutas `/en/`, `astro:assets` y todo lo del estudio
  reutilizable). Lo que se propone sumar, pequeño y casi todo pruebas, para que el diseño no se rompa
  sin verse:
  1. **Pruebas de captura de las 16 vistas** (`toHaveScreenshot` de Playwright), en reposo como el
     lienzo: si el avatar vuelve a pisar la cara en tablet, rojo.
  2. **Las comprobaciones del lienzo, como pruebas en `e2e/`**: ningún texto se sale de su caja a
     360, 768, 1024 y 1440; con movimiento reducido, cero animaciones; las bandas cubren de borde a
     borde a 1920. Salen de `docs/lienzo/herramientas/comprobar-desbordes.mjs` y de las medidas de
     la revisión como visitante.
  3. **Un lint de tokens en `npm run red`**: el grep de colores de la 1.4, sobre `src/`, para que
     ningún color se escriba fuera de `tokens.css`.
  4. **Un script que recorte Archivo**: solo los ejes y los rangos usados (`wdth` 62–100, `wght`
     400–800) y «→» y «↗» si la fuente los tiene; es lo que la deja por debajo de los 95 KB del
     presupuesto (`plan/spec-visual.md` § 8).
  5. **Las fichas como datos**: una colección por idioma con el mismo slug y una prueba de que cada
     ficha en español tiene su gemela; así `LangLink` solo se pinta cuando existe.
  Fuera: CMS, islas de React, Tailwind (la spec ya es CSS con tokens), `ClientRouter` y analítica con
  cookies. Y una línea que mirar al planificar: Cloudflare empuja los proyectos nuevos de Pages hacia
  Workers con archivos estáticos; el estudio y Artemisa siguen en Pages con `_headers` y middleware,
  así que lo coherente es quedarse en Pages salvo que algo lo impida.
- **2026-11-05, tanda 1.5: los enlaces del marco van en línea, no en lista.** Sin CSS, una `<ul>`
  de enlaces apila cajas de 18 px y axe da `target-size` (WCAG 2.2, 2.5.8) en las doce páginas. La
  cabecera, el pie y las acciones del 404 van en un párrafo con « · », como los escribe
  `contenido.md` § 0; la fase 2 los pasa a lista con su tamaño de toque.
- **2026-11-05, tanda 1.5: las gemelas inglesas sin texto llevan `noindex`, y la prueba de hreflang
  cubre el caso.** Con `en.live` en `false`, cada una sale con su `title`, el aviso (en inglés,
  `notYetText` de `ui.ts`) y el enlace a la española, sin canonical ni hreflang y fuera del sitemap
  y de Lighthouse. Probado el camino vivo poniendo Snugport en `live: true`: con la gemela aún en
  `noindex`, la española anunciaba un hreflang que la inglesa no devolvía (rojo); sin el `noindex`,
  recíproco (verde). Al encender cada gemela en la fase 2 hay que quitarle el `noindex`.
- **2026-11-05, tanda 1.5: la ruta borrada del fallo provocado es la del 404.** Borrar una ficha de
  `routes.ts` ya tumba el build (`pathFor` lanza «no hay ninguna ruta»), antes de llegar a las
  pruebas. La del 404 no la pide nadie por clave, así que el build pasa y la prueba sale en rojo con
  `/404` y `/en/404` construidas sin ruta; deshecho, verde. La prueba compara los `.html` de `dist/`
  con `routes.ts` en los dos sentidos.
- **2026-11-05, tanda 1.5: lo que la tanda no decía y se resolvió por lo mínimo.**
  - El avatar del JSON-LD (`contenido.md` § 6.3) se sirve en `/assets/img/fritz-reigar-avatar.png`:
    copia de `x/contenido/marca/avatar-nariz-85.png` (400 × 400, 79 KB). Ninguna página lo carga.
  - Sin `og:image` hasta las imágenes de Satori (fase 2), y `twitter:card` en `summary`.
    `og-preview.png` sigue en su URL, pero es la del diseño viejo.
  - El `name` del manifest pasa a «Fritz Reigar · Desarrollador web freelance en Valencia» (decía
    «Desarrollador backend y QA de IA»). Sus colores, con los estilos.
  - El formulario conserva los `name` de hoy (`name`, `email`, `message`) y el `_gotcha`, oculto con
    `hidden` porque la CSP no deja `style=""`.
  - Las cuatro capturas de `assets/img/proyectos/` se quedan en la raíz, fuera de `public/`: no se
    sirven y la fase 2 decide (`plan/capturas.md` ya tiene sus copias).
  - Los cuatro puntos de Snugport van sin título de sección: `contenido.md` no les da uno.
  - El 404 inglés dice solo «This page does not exist» y lleva a la portada; su texto es de la
    fase 2.
  - Los presupuestos de bytes de `lighthouse.budgets.json` salen de los topes en gzip de
    `spec-visual.md` § 8, pasados a bruto con la proporción del lienzo (el porqué, en la cabecera de
    `scripts/lighthouse.mjs`). Hoy: 100 en las cinco páginas, documento máximo 11,7 KB.
  - Sin Web Analytics en la CSP: no está activo. Si se activa, `_headers` dice qué añadir.
- **2026-11-05, tanda 1.5: npm 11 no corre los `postinstall` de `esbuild` y `workerd`** (pide
  `npm approve-scripts`). No hacen falta: los binarios llegan por sus dependencias opcionales y
  funcionan. La CI usa el npm de Node 22, que sí los corre.
