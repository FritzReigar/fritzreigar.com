# Contenido de la web nueva, en español

Tanda 1.1 (2026-11-04). Todo el texto visible de fritzreigar.com en Astro: la portada, las cuatro
fichas, el 404, los `title`, las `description`, el Open Graph y el JSON-LD. **El texto manda; el
orden de los bloques lo puede cambiar el lienzo (1.3).** El inglés es de la fase 2.

Cómo se lee: lo que va a la web está en los bloques de texto; cada línea **↳** dice de dónde sale
(ruta y sección). Las notas ↳ son del plan, **no van a la web**. Rutas cortas: `estudio/` =
`~/Projects/propios/estudio-reigar/web/src/pages/`, `missphone/` = `~/Projects/clientes/missphone/`,
`artemisa/` = `~/Projects/clientes/limpiezas-artemisa/`, `snugtone/` = `~/Projects/propios/snugtone/`,
`snugport-app/` = `~/Projects/propios/snugport/snugport-app/`, `x/` =
`~/Projects/propios/freelancer-profile/`.

Reglas que se han aplicado (además de las del `CLAUDE.md` y la regla 13 de `plan/README.md`): de
Missphone, nada de que la hizo Fritz desde cero ni de que se facturó como Estudio Reigar, ni ventas,
ni anuncios, ni nombres de su gente, ni detalles de seguridad; de Artemisa, ni precio ni métricas de
su ficha de Google; de Snugport, ni usuarios, ni suscriptores, ni ingresos; del estudio, ni precios
ni lista de servicios, y sin fechas que delaten lo reciente en lo que habla del estudio.

---

## 0. El marco (todas las páginas)

**Enlace de salto:** Saltar al contenido

**Cabecera:** Fritz Reigar (a la portada) · Trabajo · Proyectos · Cómo trabajo · Trayectoria ·
Contacto · English (cuando exista el inglés)

**Pie:** © 2026 Fritz Reigar · Valencia — CV · GitHub · LinkedIn · X · contact@fritzreigar.com

↳ Nombre profesional y correo: `CLAUDE.md` del portfolio. CV en el pie y en Contacto, discreto:
decisión 4 de `plan/README.md`. X (`x.com/FritzReigar`): `x/docs/posicionamiento.md` §6; el
enlace del perfil de X apunta aquí, así que el pie le devuelve el enlace. LinkedIn: la URL de
siempre (`linkedin.com/in/fritz-reif-garcia`). Sin selector de tema: decisión 9.

---

## 1. Portada

### 1.1 Hero

**Nombre:** Fritz Reigar

**Avatar** — `alt`: «Dibujo de Fritz Reigar: retrato de línea, con barba y camiseta azul, sobre
fondo celeste.»

**Quién es:**
> Desarrollador web freelance en Valencia. Me encanta la tecnología y vivo de ella: hago webs para
> negocios con Estudio Reigar y, en mis ratos, apps propias que publico en abierto.

**Estado:** Acepto proyectos

**Acciones:** Estudio Reigar ↗ (`https://estudioreigar.com/`) · Escríbeme (a `#contacto`)

↳ El avatar es `x/contenido/marca/avatar-nariz-85.png`, el que está puesto en X desde el
2026-11-01: dibujo de línea, camiseta azul `#1f4fa3` y fondo celeste (214, 226, 244) —
`x/contenido/perfil.md` § «La nariz» y § «Comprobado en el perfil». «Me encanta la tecnología y
vivo de ella» y «en mis ratos» son palabras de Fritz en su bio de X (`x/contenido/perfil.md` §
«Comprobado en el perfil, 2026-11-01»). «Apps propias»: Snugtone, pública en GitHub, y Snugport
(`x/contenido/perfil.md`, cabecera «Giro del 2026-11-01»). «Acepto proyectos»: decisión 4.

### 1.2 Estudio Reigar

**Título:** Estudio Reigar

> Estudio Reigar es mi taller: webs, tiendas online y fichas de Google para negocios pequeños.
> Detrás no hay un equipo: quien te contesta y quien escribe la web soy yo. Las webs las escribo a
> mano, sin plantillas y a la medida de cada negocio, y las entrego con su nota de velocidad medida
> y todo a nombre del cliente. En persona en Valencia y l'Horta; al resto de España, a distancia.

**Enlace:** Ver estudioreigar.com ↗

↳ «El nombre del taller», «detrás no hay un equipo», «te contesto yo, y la web la escribo yo»:
`estudio/sobre-mi.astro` (hero). «Las webs las escribo a mano. Sin plantillas compradas»:
`estudio/sobre-mi.astro`, `reasons[0]`. «Sin plantillas, cada cliente su web a medida»: dato de
Fritz en `x/contenido/cuentas-a-seguir.md` (`@klebandev`). «Una sola persona al otro lado: yo»:
`estudio/como-trabajo.astro`, `yesHere`. «Velocidad medida y enseñada»: `estudio/como-trabajo.astro`.
«Todo a tu nombre»: `estudio/index.astro`, `promises`. Valencia y l'Horta / resto de España:
`estudio/sobre-mi.astro` § «Dónde trabajo». Sin precios ni servicios: decisión 6. Sin fechas.

### 1.3 Trabajo

**Título:** Trabajo

**Missphone** (primero y más grande)
- Rótulo: Cliente · Tienda online heredada · En mantenimiento
- > Tienda de móviles de Benetússer con fundas personalizadas, accesorios, reparaciones y regalos
  > con foto. Heredé su tienda WooCommerce: recuperé el control, la puse página a página al nivel
  > de la portada, le añadí los regalos que se diseñan en la web y la lancé.
- Enlace: Ver el caso →

**Limpiezas Artemisa**
- Rótulo: Cliente · Web nueva · Entregada en septiembre de 2026 · En mantenimiento
- > Web a medida para una empresa de limpieza de Valencia: estática, sin una cookie y con una
  > página por servicio para la búsqueda local. Lighthouse en el móvil: 95-96 en rendimiento y 100
  > en lo demás. Y su ficha de Google, al día cada mes.
- Enlace: Ver el caso →

↳ Las fuentes de cada línea están en las fichas (§2 y §3). Fecha de entrega de Artemisa: 3 de
septiembre de 2026, `CLAUDE.md` § «Archivos aportados a mano». Las cifras de Lighthouse se midieron
de nuevo en la 1.2 (2026-11-04): `plan/capturas.md` § «Lighthouse».

### 1.4 Proyectos

**Título:** Proyectos

**Snugtone** (primero y más grande)
- Rótulo: App propia · Código abierto (MIT) · 1.0.2 para Windows
- > Reproductor de música de escritorio para tu propia biblioteca, en Rust con Tauri. Sin cortes
  > entre pistas, todos los discos al mismo volumen y una biblioteca de 9503 archivos que se
  > reescanea en 0,48 s.
- Enlace: Ver el proyecto →

**Snugport**
- Rótulo: Producto propio · Gratis, con plan de pago
- > Centro de operaciones para freelancers: horas con tarifa, proyectos, clientes, finanzas y
  > vencimientos. En producción como PWA en JavaScript vanilla, y con el panel migrando a React y
  > TypeScript con más de 1.200 pruebas unitarias.
- Enlace: Ver el proyecto →

**CPP-Galaxian-Engine** (pequeño, sin ficha)
- Rótulo: C++ · 2023
- > Un arcade en C++ sin motor comercial: game loop propio, entidades en arrays estáticos, una
  > máquina de estados para la IA enemiga y colisiones AABB escritas a mano.
- Enlace: Ver el repositorio ↗ (`https://github.com/FritzReigar/CPP-Galaxian-Engine`)

**Pie de la sección:** Todo el código público, en GitHub ↗

↳ Snugtone: `snugtone/README.es.md` (estado, «Qué hace», «Va rápido»). Snugport: §5. Galaxian:
la ficha de hoy en `index.html` y la fecha del CV (`docs/cv/cv-es.html`); va por detrás, sin
ficha y sin presentar a Fritz como programador de videojuegos (decisión 11).

### 1.5 Cómo trabajo

**Título:** Cómo trabajo

1. **A mano y sin plantillas.** HTML, CSS y TypeScript escritos para cada caso, y Astro cuando la
   web tiene varias páginas. Poco JavaScript y nada que no se use.
2. **Pruebas y CI que frenan el despliegue.** En la web del estudio, Playwright, axe y Lighthouse
   pasan antes de publicar; en Snugport, Vitest, Playwright y mutantes; en Snugtone, 656 pruebas y
   `cargo clippy` sin un aviso.
3. **Lighthouse medido, no prometido.** Cada entrega sale con su nota en el móvil, medida y
   enseñada.
4. **Con IA, y con red.** Desarrollo asistido por IA (Claude Code), con la regla de ver cada prueba
   nueva en rojo antes de creerse el verde.

↳ (1) Webs escritas a mano: `estudio/sobre-mi.astro`; Astro: la web del estudio (ficha de hoy en
`index.html`, «Estudio Reigar»); Artemisa es estática sin framework (`artemisa/CLAUDE.md` § Stack).
(2) Web del estudio: ficha de hoy en `index.html` y `docs/cv/cv-es.html`. Snugport:
`snugport-app/panel/package.json` (`vitest`, `@playwright/test`) y `snugport-app/panel/CLAUDE.md`
(los mutantes de `tests/red/mutants.ts`, `npm run red`). Snugtone: 616 del núcleo + 40 de la
cáscara = 656, y clippy sin avisos, `snugtone/README.es.md` § «Compilarlo», en la etiqueta v1.0.2
(recontadas el 2026-11-09). (3)
`estudio/como-trabajo.astro` («Nota de Google en móvil por encima de 90, medida y enseñada»).
(4) Claude Code: `docs/cv/cv-es.html`, habilidades; «un test nuevo se ve en rojo antes de creerse
el verde»: `plan/README.md` § El ciclo, paso 3.

### 1.6 Trayectoria

**Título:** Trayectoria

| Fechas | Puesto | Dónde |
|---|---|---|
| Abr 2026 — hoy | Desarrollador web freelance | Estudio Reigar · Autónomo, Valencia |
| Ene 2026 — hoy | AI Red-Teaming & Prompt Engineer | DataAnnotation Tech · Autónomo, remoto |
| Jul 2025 — hoy | AI QA Analyst / Project Tester | Lionbridge Technologies · Autónomo, remoto |
| Dic 2024 — Oct 2025 | Energy Consultant & Account Manager | Selectra Sur SL · Valencia |
| 2019 | Asistente técnico informático · Prácticas | Ayuntamiento de Valencia — Policía Local |

**Formación:** Técnico Superior en Desarrollo de Aplicaciones Multiplataforma (DAM) — IES El Grao,
Valencia · Especialización en Diseño y Desarrollo de Videojuegos — ESAT, Valencia

**Idiomas:** Español (nativo) · Valenciano (C1) · Inglés (C1) · Alemán (A2)

**Enlace:** CV en PDF ↓

↳ Puestos, organizaciones y fechas: `docs/cv/cv-es.html` § «Experiencia profesional», en su
orden. Lionbridge y DataAnnotation, «Autónomo, remoto»; las prácticas de 2019, como prácticas;
formación sin fechas ni estado; idiomas fijados por Fritz: todo de `CLAUDE.md` § «El CV».
DataAnnotation sin clientes ni modelos (memoria «Confidencialidad de DataAnnotation»). ⚠️ La
línea del estudio lleva «Abr 2026», la fecha del CV, aunque la regla del estudio pide no delatar
lo reciente en lo que hable de él. Fritz la dio por buena el 2026-11-04: la web y el CV no se
contradicen. Las clases particulares (Sep 2018 — Jun 2026) salen de la web por decisión de Fritz
el 2026-11-06 («no creo que añada mucho»); el CV puede seguir llevándolas: callar no es
contradecir.

### 1.7 Contacto

**Título:** Contacto

> ¿Un proyecto, una web que has heredado o una pregunta técnica? Escríbeme: te contesto yo,
> normalmente en menos de 24 horas. Si es para la web de tu negocio, en estudioreigar.com tienes
> cómo trabajo y qué cuesta.

**Correo:** O directamente a contact@fritzreigar.com

**Formulario** (Formspree, el mismo `action` de hoy):
- Nombre — marcador: «Tu nombre o empresa»
- Email — marcador: «tu@email.com»
- Mensaje — marcador: «Cuéntame qué necesitas…»
- Botón: Enviar
- Asunto oculto: «Nuevo mensaje desde fritzreigar.com»
- Mientras envía: «Enviando…»
- Enviado: «Mensaje enviado. Te contesto pronto.»
- Error: «No se ha podido enviar. Prueba otra vez o escríbeme a contact@fritzreigar.com.»

**Enlace discreto:** CV en PDF ↓

↳ Entradilla, etiquetas, marcadores y asunto: `index.html` § contacto; mensajes: `js/form.js`
(`FORM_MSG.es`). «Te contesto yo»: `estudio/index.astro` (cierre). Precios solo en el estudio:
decisión 6. Formspree sin JS y mejorado por `main.ts`: decisión 10.

---

## 2. Ficha de Missphone — `/trabajo/missphone`

**Rótulo:** Trabajo · Cliente · Tienda online heredada · En mantenimiento

**Título:** Missphone

**Entradilla:**
> Tienda de móviles de Benetússer (Valencia): fundas personalizadas, accesorios, reparaciones y
> regalos con foto, en la tienda de la calle y en su tienda online. La tienda online no la hice yo:
> la heredé funcionando, y esto es lo que he hecho con ella.

**Enlaces:** Ver la tienda ↗ (`https://missphone.es/`) · El caso contado para negocios, en
estudioreigar.com ↗ (`https://estudioreigar.com/casos/missphone`)

**Lo mejor** (de Fritz, redactado):
> Que la web por fin se parece a la tienda: rosa, coqueta y hecha para personalizar, igual en la
> portada que en la última marca. Y que el producto luce: cada cosa con su foto, su precio a la
> vista y, si se personaliza, el diseñador en la misma ficha.

### Cómo me la encontré

> La heredé funcionando y con ventas, sobre WordPress, WooCommerce y un tema comercial, pero en un
> estado que pedía una intervención a fondo antes que un retoque:
> - La cabecera de la portada era una sola imagen, con el «Click aquí» dibujado dentro, así que no
>   llevaba a ninguna parte.
> - Buena parte del texto, en gris sobre fotos, no se leía.
> - Las páginas de regalo no enlazaban a ningún producto.
> - El catálogo repetía la misma ficha por cada modelo de móvil.
> - La administración estaba repartida entre varias manos.
>
> Es lo que le pasa a una web que lleva años abierta sin nadie que la cuide. De quien la montó no
> hablo: no sé con qué presupuesto trabajó ni qué le pidieron.

### Antes y después

Va justo después de «Cómo me la encontré» y con todo el ancho: es la prueba de lo que dice ese
texto, y lo que más pesa de la ficha.

> El «antes» es del 31 de agosto de 2026, guardado antes de tocar nada. El «después» se captura con
> el mismo ancho y el mismo encuadre, o no se compara.

1. **La portada, en escritorio.**
   - Antes: una sola imagen con el botón dibujado dentro, que no llevaba a ninguna parte.
   - Después: una cabecera de verdad, que dice qué es la tienda y dónde está, con dos botones
     (diseñar tu funda y ver los accesorios) y la nota de Google.
2. **La portada, en el móvil.**
   - Antes: la misma imagen, encogida a 380 px hasta no poder leerse.
   - Después: la foto arriba y, debajo, el titular, los dos botones y la nota, a tamaño de móvil.
3. **Las categorías de la portada.**
   - Antes: el nombre de cada categoría montado sobre su foto, a veces encima del propio producto.
   - Después: tarjetas con la foto a un lado y, al otro, el nombre y el precio desde el que
     empieza.
4. **Una categoría, la de fundas.**
   - Antes: cuatro párrafos en gris sobre una foto de fundas, que no se leían.
   - Después: la cabecera de color, con un titular que se lee, un botón para hacerla con tu foto y
     la foto enmarcada; la misma cabecera en todas las páginas.
5. **Más abajo, en la portada.**
   - Antes: un bloque de accesorios con el texto en gris sobre una foto oscura, casi invisible.
   - Después: en ese sitio, la tienda de la calle con su propio bloque, «La tienda, en Benetússer»:
     la dirección, la foto del local y botones para llamar y para llegar.

**Las cifras:**
- **39 páginas** puestas al nivel de la portada: 37 rehechas y 2 nuevas
- **8 productos** que se diseñan y se compran en la web
- **268 fichas** repetidas por modelo, fundidas en **8 productos** con desplegable (252 modelos)
- **15 extensiones** propias en PHP (mu-plugins)
- **14 parejas** de antes y después, con el mismo lienzo

### Qué hice, por fases

**1. El rescate.** Primero, recuperar el control: la administración y los avisos, a nombre de la
casa; una copia de seguridad comprobada antes de tocar nada; los pagos con tarjeta y Bizum y los
gastos de envío, revisados con pedidos de prueba. Y el catálogo: 268 fichas que repetían el mismo
producto por cada modelo de móvil, fundidas en 8 productos con un desplegable de modelo, con cada
dirección vieja redirigida (301) a su producto con el modelo ya elegido.

**2. Los regalos que se diseñan en la web.** Taza, camiseta, cojín y marco, y después alfombrillas
y puzles: 8 productos con el diseñador en la propia ficha, y una extensión que impide comprarlos sin
su diseño. Las 8 páginas de regalo, con foto, texto y un botón que lleva a diseñar o a comprar.

**3. Las páginas, al nivel de la portada.** 37 páginas rehechas —regalo, ocasión, accesorios y las
14 marcas— y 2 nuevas, con las piezas de la portada: cabecera de color con la foto enmarcada,
bandas, tarjetas y fotos. El CSS compartido, escrito una vez en bloques con nombre y no página a
página. Y la portada, con una cabecera propia.

**4. Los flecos.** Un solo H1 y texto alternativo en cada página, los textos que prometían lo que
la tienda no tenía, la tienda y las fichas maquetadas, la imagen al compartir la portada y una
limpieza a fondo antes de la copia final.

**5. La entrega.** La web recorrida entera, de la portada al carrito, en escritorio y en móvil;
una copia final verificada archivo a archivo; y la entrega en persona, en la tienda, con un
documento de todo lo que decidí en su nombre para que lo revisen.

**6. El lanzamiento.** La entrada de estreno en el blog y la ficha de Google al día; una página de
reparación de iPhone con sus ocho averías y sus datos estructurados; la tienda convertida en
escaparate, con las categorías y los productos que se diseñan; y la temporada (Navidad, San
Valentín, el Día de la Madre…) que se enciende y se apaga desde el menú, sin tocar código.

**Hoy** sigue en mantenimiento.

### Con qué

WordPress · WooCommerce · PHP (mu-plugins) · CSS · Fancy Product Designer · JSON-LD (Store,
FAQPage, Service) · API REST de WordPress · Python y Node para medir y capturar sin tocar la tienda

### Cómo se trabajó

> Nada se da por hecho sin medirlo en la web servida, y antes de cada cambio va su copia y su «antes»
> capturado. Es una tienda con pedidos y datos de clientes: no se improvisa.

### Lo que no se enseña

> Cuánto vende, lo que invierte en anuncios y lo que rinden, los datos de sus clientes y el panel
> de la tienda. Tampoco cómo está protegida. Son suyos, y no se publican ni con permiso.

↳ **Qué es el negocio:** el H1 de su portada, «Fundas personalizadas y accesorios para móvil en
Benetússer» (`missphone/plan/fase-1b.md`, tanda 1B.7, «Qué es hoy»); reparaciones: la página de
reparación de iPhone (`missphone/plan/fase-4.md`, tanda 4.13); regalos: `missphone/plan/fase-1.md`.
**Heredada, sin culpar:** `missphone/CLAUDE.md` § 1 (regla 4) y la norma de casos de
`estudio/casos/missphone.astro` («Cómo se cuenta esto»), de donde sale también la última frase de
«Cómo me la encontré». **Lo mejor:** las ideas son de Fritz (chat del 2026-11-04: «destaca lo que
es la tienda en sí, rosa, fancy, muy personalizable, y los productos se ven bien»); el precio a la
vista, en el «desde» de cada tarjeta del después de las categorías
(`docs/capturas/missphone/despues/2026-11-04-home-1440-03-categorias.jpg`). **Cómo me
la encontré:** el tono lo pidió Fritz el 2026-11-04 («recalcar que la encontré en un estado
deplorable, con palabras no tan duras y que suene profesional»). La cabecera-imagen con el botón
dibujado: «un hero sin un solo enlace» (`missphone/contexto/plan.md` § «El acuerdo original») y el
«antes» `2026-08-31-home-1440-01-hero.jpg`. El texto gris sobre fotos: los «antes»
`…-05-texto-invisible-sobre-foto.jpg` y los cinco `…-testimonios-y-texto-sobre-foto.jpg` de
categoría. «Accesos repartidos»: `estudio/casos/missphone.astro` (`found`), dicho aquí sin
detalle. La ficha repetida por modelo: `missphone/contexto/catalogo-y-productos.md` § Catálogo
(eran 328, y 268 eran la misma ficha por modelo). Las páginas de regalo con 0 enlaces en el
cuerpo: `missphone/contexto/regalos-y-ocasiones.md`.
**Fase 1:** `estudio/casos/missphone.astro` (`done`: recuperar el control, copias verificadas,
pagos y envíos con pedidos de prueba); la fusión y las 301: `missphone/contexto/catalogo-y-productos.md`
§ Catálogo (68 publicados tras la fusión, 8 variables, 252 modelos) y `missphone/CLAUDE.md`
(`missphone-variables.php`). **Fase 2:** `missphone/plan/fase-1.md` («Qué existe al acabar»: taza,
camiseta, cojín y marco; 8 páginas de regalo); alfombrillas y puzles: tandas 4.20 y 4.21 en
`missphone/plan/fase-3.md` § 3.3; los 8 productos: la lista de `missphone-design-required.php` en
`missphone/CLAUDE.md` (7195, 7217, 7228, 7229, 7772, 7773, 7805, 7806). **Fase 3:**
`missphone/plan/fase-1b.md` («Qué existe al acabar»: 37 páginas + `/auriculares/` y
`/regalos-por-ocasion/`; hero «tarjeta»; CSS en bloques 46–48) y tanda 1B.7 (la portada).
**Fase 4:** `missphone/plan/fase-2.md` (tandas 2.1 a 2.5). **Fase 5:** `missphone/plan/fase-3.md`
(3.1 recorrido, 3.2 copia verificada por CRC, 3.4 entrega en persona en la tienda el 03-10).
**Fase 6:** `missphone/plan/fase-4.md` (4.2 ficha de Google, 4.3 entrada de estreno, 4.13 la
página de iPhone con 8 secciones y `Service`, 4.24 la tienda como escaparate, 4.19 y 4.22 la
temporada) y el menú de temporada por clases (`missphone/plan/fase-1b.md`, 1B.11). Los anuncios
de la fase 4 no se cuentan (regla 13). **Mantenimiento:** `missphone/plan/fase-3.md` § 3.3
(«mientras mantenga la web») y `estudio/casos/missphone.astro` («Sigue en marcha»).
**Cifras:** 39 = 37 + 2 (`fase-1b.md`); 8 personalizables (lista de design-required); 268 → 8 y
252 modelos (`catalogo-y-productos.md`); 15 mu-plugins = los que nombra `missphone/CLAUDE.md` §
«NO TOCAR» más el de la ficha, contados allí (aquí no se listan: algunos nombres hablan de cómo
está protegida la tienda, regla 13), sin contar el de un solo uso que se borró
(`missphone/bitacora/2026-09-29-3.md`, U10); 14 parejas (`missphone/docs/portfolio/README.md`).
**Recontadas el 2026-11-07** (tanda 2.11) en la carpeta del cliente: los mismos 15 mu-plugins (15
nombres distintos en su `CLAUDE.md`; el de un solo uso solo sale en la bitácora), las ocho fichas
de la lista de design-required, 268 → 8 y 252 modelos, y «14 de 14» en el README de las parejas. El
39 es de la fase 1B, ya cerrada: no cambia.
**Antes y después:** cinco de las 14 parejas de `missphone/docs/portfolio/` (la tanda 1.2 rehace
sus «después»), con los pies escritos el 2026-11-04 mirando las capturas: 1, la `home-1440-01-hero`
(pareja 1 del README); 2, la `home-390-01-hero-ilegible` de `antes/recortes-movil/` (pareja 12);
3, la `home-1440-03-categorias-ilegibles` (pareja 3); 4, la `fundas-1440-testimonios-y-texto-sobre-foto`
(pareja 7); 5, la `home-1440-05-texto-invisible-sobre-foto` (pareja 5, ancla «La tienda, en
Benetússer»). Los dos botones y la nota de Google: tanda 1B.7 y los «después» del 16-09. La quinta
pareja, la de las categorías, la pidió el «antes era horrible» de Fritz (2026-11-04): está en
«Desvíos» de `fase-1.md`. Los pies se revisaron en la 1.2 (2026-11-04) con los «después» de ese
día, en `plan/capturas.md`: la 3 ya no lleva la foto arriba sino a un lado; la 4 gana el titular
y el botón; y la 5 se retitula, porque en el antes ese sitio era un bloque de accesorios, no la
tienda. **Stack:**
`missphone/CLAUDE.md` (mu-plugins, FPD, REST, JSON-LD `Service`) y tanda 1B.7 (`Store` +
`FAQPage`); Python y Node: `missphone/herramientas/` (`capturar-portfolio.mjs`,
`verificar-portfolio.py`). **Cómo se trabajó:** `missphone/CLAUDE.md` § 0 («Nada se da por hecho
sin medirlo») y § 1 regla 6; la frase final, `estudio/casos/missphone.astro`. **Lo que no se
enseña:** `estudio/casos/missphone.astro` (`notShown`) y regla 13. Permiso de portfolio: en su
presupuesto (`missphone/CLAUDE.md` § 3). Sin «Estudio Reigar» como marca del trabajo: se facturó
por privado (`missphone/CLAUDE.md` § 3); el enlace al caso del estudio es el mismo que lleva la
firma del pie de la tienda (`missphone/plan/fase-4.md`, tanda 4.19).

---

## 3. Ficha de Limpiezas Artemisa — `/trabajo/limpiezas-artemisa`

**Rótulo:** Trabajo · Cliente · Web nueva · Entregada en septiembre de 2026 · En mantenimiento

**Título:** Limpiezas Artemisa

**Entradilla:**
> Empresa de limpieza de Valencia —hogares, oficinas, comunidades, cristales, garajes y fin de
> obra— con buenas reseñas en Google y sin web propia. Web nueva, a medida, y su ficha de Google
> puesta a punto.

**Enlaces:** Ver la web ↗ (`https://www.limpiezasartemisa.com/`) · El caso contado para negocios,
en estudioreigar.com ↗ (`https://estudioreigar.com/casos/limpiezas-artemisa`)

### De dónde se partía

> Sin web propia, varios dominios comprados y ninguno enseñando nada, y la ficha de Google sin
> fotos ordenadas ni categorías bien puestas.

### Qué se hizo

- **Una web estática, sin framework ni dependencias**, en Cloudflare Pages y desplegada desde
  GitHub en cada push: portada, una página por servicio (seis), blog y las páginas legales, más una
  página de error propia.
- **SEO local:** una página por servicio para que Google enseñe la que toca a quien busca
  «limpieza de comunidades» y no la portada; datos estructurados (LocalBusiness, Service,
  BreadcrumbList, BlogPosting); sitemap y alta en Search Console.
- **El formulario, sin terceros en el navegador:** una Pages Function que envía con Resend y que
  solo confirma el envío si responde el servidor, con validación y filtros contra el spam en el
  servidor y sin captcha. Al lado, WhatsApp y una barra fija de llamar y escribir en el móvil.
- **CSP estricta y ni una cookie:** cabeceras de seguridad (CSP, HSTS, `X-Frame-Options`) y
  analítica sin cookies, así que tampoco banner: pedir permiso para algo que no ocurre sería
  incorrecto además de molesto.
- **Los dominios, ordenados:** uno principal y el resto llevando a él con su certificado, sin mover
  el dominio ni el correo de su proveedor.
- **Google Business Profile:** auditoría inicial, descripción reescrita, catálogo de servicios
  completo, zonas de servicio ampliadas y publicaciones que enlazan a la web.
- **Después:** mantenimiento mensual de la ficha, un artículo al mes en el blog, actualizaciones y
  copias.

### Medido

> Lighthouse en el móvil, en la portada y en dos páginas de servicio: **rendimiento 95-96, y 100 en
> accesibilidad, buenas prácticas y SEO**.

### De quién es cada cosa

> Del cliente: los dominios, el alojamiento y el correo, la ficha de Google y Search Console. Yo
> soy el gestor técnico, no el dueño.

### Con qué

HTML · CSS · JavaScript · Cloudflare Pages · Pages Functions · Resend · JSON-LD · Cloudflare Web
Analytics · Search Console · Google Business Profile

### Lo que no se enseña

> Lo que costó, y los números de su ficha de Google: vistas, llamadas y búsquedas son datos de su
> negocio. Lo que se mide aquí es la web.

↳ **Servicios:** las seis páginas de servicio del repo (`git ls-files` en `artemisa/`:
comunidades, cristales, fin de obra, garajes, hogares, oficinas). **Reseñas y punto de partida:**
`estudio/casos/limpiezas-artemisa.astro` (`startingPoint`; la cifra de reseñas no se pone: es de
su ficha). **Estática, Pages, deploy en cada push, Resend, «solo confirma si responde el
servidor», validación, filtros sin captcha, `_headers` (CSP, HSTS, `X-Frame-Options`), analítica
sin cookies y sin banner, dominios y correo en su proveedor:** `artemisa/CLAUDE.md` § Stack; sin
el detalle de los filtros ni de los registros DNS (regla 13). **Páginas:** portada, 6 de servicio,
blog con 3 artículos y 3 legales hoy (14, más el 404), `git ls-files "*.html"` en `artemisa/` el
2026-11-04; no se pone la cifra porque el estudio dice «trece» contando las de la entrega
(`estudio/casos/limpiezas-artemisa.astro`). **Datos estructurados:** ficha de hoy en `index.html`.
**Una página por servicio para Google, «sería incorrecto además de molesto», de quién es cada
cosa:** `estudio/casos/limpiezas-artemisa.astro`. **Ficha de Google:** ficha de hoy en
`index.html` (sin el «20 municipios», que es dato de su perfil). **Mantenimiento:**
`estudio/casos/limpiezas-artemisa.astro` § «Y después de entregar» (sin precio). **Lighthouse:**
medido en la 1.2 (2026-11-04) con Lighthouse 13.5.0 en móvil contra el dominio: medianas de 95 en
la portada y de 96 en comunidades y en hogares, y 100 en lo demás (`plan/capturas.md` §
«Lighthouse»). Sustituye al «de 94 a 98» de la ficha de hoy en `index.html`. **Entrega:** 3 de septiembre de 2026 (`CLAUDE.md` del
portfolio). **Lo que no se enseña:** regla de contenido de la tanda 1.1 (precio de amigo, métricas
del perfil).

---

## 4. Ficha de Snugtone — `/proyectos/snugtone`

**Rótulo:** Proyecto · App propia · Código abierto (MIT) · 1.0.2 para Windows

**Título:** Snugtone

**Entradilla:**
> Reproductor de música de escritorio para tu propia biblioteca, escrito en Rust con Tauri. Gratis
> y de código abierto.

**Acciones:** Descargar para Windows ↗ (`https://github.com/FritzReigar/snugtone/releases`) ·
Código en GitHub ↗ (`https://github.com/FritzReigar/snugtone`)

### Por qué

> foobar2000 se me hacía muy anticuado y con demasiadas cosas. Quería algo más simple y rápido, pero
> que leyera lo que usa todo el mundo. Y, de paso, aprender Rust.

### Qué hace

- **Suena.** FLAC, MP3, Opus, WAV, AAC, ALAC, Vorbis y AIFF, sin cortes entre pistas. Todos los
  discos al mismo volumen: mide la sonoridad él mismo (EBU R128, por disco, a 0,04 LU de ffmpeg).
  Ecualizador de diez bandas que, apagado, no toca ni un bit. Y si los auriculares se apagan a
  media canción, pasa a otra salida y sigue desde el mismo milisegundo.
- **Va rápido con una biblioteca grande.** Rescaneo en 0,48 s, la lista en menos de un segundo,
  carpetas vigiladas y un buscador que acota (`formato:flac`, `duracion:>3:30`, `año:2016`…).
- **Arregla sin tocar tus archivos.** Comprueba FLAC y ALAC muestra a muestra con su MD5, corrige
  etiquetas en la biblioteca y no en el archivo, y trae etiquetas de MusicBrainz enseñando la
  comparación campo a campo antes de cambiar nada.
- **Se configura.** Tema, densidad, columnas, salida de audio y todos los atajos desde dentro, con
  efecto al momento; debajo, tres archivos TOML legibles. En español y en inglés.

### Medido

- Biblioteca real de **9503 archivos y 161 GB**: rescaneo en **0,48 s**, unos **230 MB** de memoria
- **609 pruebas** del núcleo y **31** de la cáscara; `cargo clippy` **sin un aviso**
- Importar y exportar M3U: **9503 rutas de ida y 9503 de vuelta**, sin perder una

### Cómo está hecho

> El núcleo es Rust puro —motor de audio, cola, biblioteca, configuración— y no sabe que Tauri
> existe, así que se prueba sin abrir una ventana. La cáscara de Tauri pone la ventana y la salida de
> audio real (cpal). La interfaz es HTML, CSS y JavaScript sin framework ni paso de compilación.

**Las tres capas, de arriba abajo** (las del lienzo, con el mismo texto que la entradilla):
- **Interfaz:** HTML, CSS y JavaScript sin framework ni paso de compilación
- **Cáscara:** Tauri 2: la ventana y la salida de audio real (cpal)
- **Núcleo:** Rust puro: motor de audio, cola, biblioteca y configuración. No sabe que Tauri existe

**Con qué:** Rust · Tauri 2 · cpal · HTML/CSS/JS vanilla · TOML · MusicBrainz

### Descargar

> El instalador para Windows está en GitHub. No está firmado: Windows avisará con «Windows protegió
> su PC»; se pulsa «Más información» y «Ejecutar de todas formas». El código está pensado también
> para Linux, que va después; macOS y móvil, más adelante. Licencia MIT.

**Nota de las capturas:**
> Todo lo que sale en las capturas es libre: la música, CC0 y de dominio público; las portadas, CC0
> y cuadros de dominio público. La interfaz de las capturas está en inglés.

↳ **Recontado el 2026-11-07** (tanda 2.11): la publicada sigue siendo la 1.0.1 (`gh release list`:
«Latest», del 2026-10-16), y el README no ha cambiado. Las pruebas de la 1.0.1 (`34c4b4a`, «La 1.0.1, pública», en el repo de trabajo)
son 626 `#[test]` en `nucleo/` con 17 ignoradas y 39 en `src-tauri/` con 8: 609 + 31 que corren,
las del README. En `main`, sin publicar, ya son 633 y 48 (`cargo test --workspace -- --list`): la
web habla de la publicada y se queda con 609 + 31 hasta que salga otra. Las cifras de «Va rápido»
(9503, 161 GB, 0,48 s, < 1 s, 230 MB, M3U) son medidas del README y no se repiten aquí.

↳ **Recontado el 2026-11-09:** la publicada es la 1.0.2 (`v1.0.2`) y su README da 616 + 40 = 656.

Todo de `snugtone/README.es.md` (versión publicada 1.0.2, solo Windows): estado, «Qué hace»
(las cuatro partes), «Va rápido» (9503 archivos, 161 GB, 0,48 s, < 1 s, 230 MB, M3U 9503),
«Compilarlo» (616 + 40, clippy, `nucleo/`, `src-tauri/` con cpal, `ui/` sin framework, Tauri CLI
`^2`), «Descargar» (instalador sin firmar) y la nota `<sub>` de las capturas. **El porqué:**
palabras de Fritz a `@pablogimenezz` el 03-11 («Es el porqué de Snugtone según Fritz; vale como
material») y «Mostly to learn it», de `snugtone/vision.md`, ambas en
`x/contenido/cuentas-a-seguir.md`. «Pero con lo que usa todo el mundo» se ha escrito «que leyera
lo que usa todo el mundo» para que se entienda sin contexto: **Fritz lo confirma**. Repo
`github.com/FritzReigar/snugtone`: comprobado 200 (`x/contenido/cuentas-a-seguir.md`, 03-11).

---

## 5. Ficha de Snugport — `/proyectos/snugport`

**Rótulo:** Proyecto · Producto propio · Gratis, con plan de pago

**Título:** Snugport

**Entradilla:**
> Centro de operaciones para freelancers: tracker de horas con tarifa, proyectos, pipeline de
> clientes, finanzas, vencimientos y checklists.

**Acción:** Probar la app ↗ (`https://snugport.app/`)

- La versión en producción, en JavaScript vanilla sin dependencias, es una PWA instalable que
  funciona offline.
- Migración en curso del panel a React 19 + TypeScript + Tailwind 4, en paralelo a producción: más
  de 1.200 pruebas unitarias (Vitest), más de 300 E2E (Playwright) en móvil y escritorio, y
  mutation testing.
- Gratis, sin cuenta y sin límite; el plan de pago, por suscripción con Stripe, lleva tus datos
  entre dispositivos. Backend sobre Supabase (Postgres, Auth y Edge Functions en TypeScript): el
  muro de pago vive en las políticas RLS de Postgres, no en el cliente.
- Accesibilidad auditada (contraste AA, trampa de foco, `prefers-reduced-motion`), temas a elegir,
  interfaz bilingüe ES/EN y 80 divisas.

**Con qué:** JavaScript vanilla · React · TypeScript · Tailwind · Supabase · Postgres RLS · Stripe ·
PWA · Cloudflare Pages

↳ Los cuatro bullets de hoy (`index.html`, `docs/cv/cv-es.html`) con las cifras **recontadas el
2026-11-07** (tanda 2.11) en `snugport-app/` (último commit `45e9e67`, panel v0.5.9, con cambios sin
commit en dos archivos de pruebas): `npx vitest list` en `panel/` = **1.264** pruebas unitarias;
`npx playwright test --list --grep-invert @estres` = 620 ejecuciones en 31 archivos, que son **319
pruebas distintas** (301 en móvil y escritorio + 18 del proyecto `artefacto`). El 2026-11-04 eran
1.246 y 315 (commit `e8a9a62`, panel v0.5.8): «más de 1.200» y «más de 300» siguen valiendo. React `^19.3.0` y Tailwind `^4.3.3` en `panel/package.json`. Mutation
testing: los mutantes de `panel/tests/red/mutants.ts` (`npm run red`, `panel/CLAUDE.md`). **Temas,
sin cifra:** la landing dice «uno de los siete temas»
(`~/Projects/propios/snugport/snugport-web/public/es/index.html`, línea 525), que es la versión en
producción; el panel en React lleva cinco en `panel/src/styles/themes.css` (nightwatch, daybreak,
cuaderno, caoba y tinta); y Fritz dice que en React son cuatro (2026-11-04). Las tres cuentas no
cuadran y cambian con la migración, así que no se da número. **80 divisas:** 80 entradas `{ code: … }` en
`snugport-app/js/dominio.js` (recontadas el 2026-11-07). Stripe, RLS, Edge Functions, accesibilidad, bilingüe: verificados en
agosto de 2026 (`CLAUDE.md` § «Proyecto principal: Snugport»). Sin usuarios, suscriptores ni
ingresos. No se destaca por encima de Snugtone (tanda 1.1). **Gratis, con plan de pago:** lo
decidió Fritz el 2026-11-04 (Desvíos de la 1.2), porque la landing dice «el panel es gratis. Lo
que se paga es que viaje entre tus dispositivos» y «Gratis no es una prueba: todas las secciones,
sin límite ni caducidad» (`https://snugport.app/es/`, leída ese día). Sin precios aquí.

---

## 6. El 404, los `title`, las `description`, el Open Graph y el JSON-LD

### 6.1 El 404

- `title`: Página no encontrada · Fritz Reigar
- Rótulo: Error 404
- Título: Esta página no existe
- > O ha cambiado de sitio. Lo que buscabas seguramente está en la portada.
- Acciones: Volver al inicio · Ver el trabajo · Ver los proyectos

↳ Texto de hoy en `404.html` («Página no encontrada», «no existe o ha cambiado de sitio»), sin la
línea en inglés: el inglés tendrá su 404 en `/en/` (decisión 2).

### 6.2 Por página

| Página | `title` | `description` | OG: título | OG: línea |
|---|---|---|---|---|
| Portada | Fritz Reigar · Desarrollador web freelance en Valencia | Soy Fritz Reigar, desarrollador web freelance en Valencia. Hago webs para negocios con Estudio Reigar y, en mis ratos, apps propias como Snugtone. | Fritz Reigar | Desarrollador web freelance en Valencia: webs para negocios con Estudio Reigar y apps propias en abierto. |
| Missphone | Missphone · Trabajo · Fritz Reigar | Una tienda WooCommerce heredada: recuperar el control, regalos que se diseñan en la web, 39 páginas al nivel de la portada, la entrega y el lanzamiento. | Missphone: una tienda heredada, puesta al día | Del rescate al lanzamiento de una tienda online de Benetússer, por fases y con su antes y después. |
| Limpiezas Artemisa | Limpiezas Artemisa · Trabajo · Fritz Reigar | Web estática a medida para una empresa de limpieza de Valencia: SEO local, sin cookies, CSP estricta y Lighthouse móvil de 95-96 en rendimiento y 100 en lo demás. | Limpiezas Artemisa: web nueva y ficha de Google | Una página por servicio, sin una cookie y con la nota de Lighthouse medida. |
| Snugtone | Snugtone · Proyecto · Fritz Reigar | Reproductor de música de escritorio en Rust y Tauri, gratis y de código abierto: sin cortes, mismo volumen en todos los discos y rescaneo en 0,48 s. | Snugtone, un reproductor de música en Rust | Para tu propia biblioteca: rápido, sin tocar tus archivos y con licencia MIT. |
| Snugport | Snugport · Proyecto · Fritz Reigar | Centro de operaciones para freelancers: PWA en JavaScript vanilla en producción y panel en migración a React y TypeScript, con más de 1.200 pruebas. | Snugport, el centro de operaciones del freelancer | Horas, proyectos, clientes y finanzas en un panel: gratis, con plan de pago. |
| 404 | Página no encontrada · Fritz Reigar | — (con `noindex`) | — | — |

↳ Cada línea resume lo de su ficha; las cifras, las mismas y con la misma fuente. Formato de
`title` del estudio («Página · Sección · Marca»: `estudio/casos/missphone.astro`).

### 6.3 JSON-LD de la portada

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "https://fritzreigar.com/#page",
      "url": "https://fritzreigar.com/",
      "name": "Fritz Reigar · Desarrollador web freelance en Valencia",
      "inLanguage": "es-ES",
      "mainEntity": { "@id": "https://fritzreigar.com/#fritz" }
    },
    {
      "@type": "Person",
      "@id": "https://fritzreigar.com/#fritz",
      "name": "Fritz Reigar",
      "url": "https://fritzreigar.com/",
      "image": "https://fritzreigar.com/assets/img/fritz-reigar-avatar.png",
      "jobTitle": "Desarrollador web",
      "description": "Desarrollador web freelance en Valencia. Hace webs para negocios con Estudio Reigar y apps propias como Snugtone.",
      "email": "mailto:contact@fritzreigar.com",
      "address": { "@type": "PostalAddress", "addressLocality": "Valencia", "addressCountry": "ES" },
      "worksFor": { "@id": "https://estudioreigar.com/#estudio" },
      "alumniOf": [
        { "@type": "EducationalOrganization", "name": "IES El Grao", "address": "Valencia, España" },
        { "@type": "EducationalOrganization", "name": "ESAT — Escuela Superior de Arte y Tecnología", "address": "Valencia, España" }
      ],
      "knowsLanguage": [
        { "@type": "Language", "name": "Español", "alternateName": "es" },
        { "@type": "Language", "name": "Valenciano", "alternateName": "ca" },
        { "@type": "Language", "name": "Inglés", "alternateName": "en" },
        { "@type": "Language", "name": "Alemán", "alternateName": "de" }
      ],
      "knowsAbout": [
        "Desarrollo web", "TypeScript", "JavaScript", "Astro", "React", "Tailwind CSS",
        "Rust", "Tauri", "Accesibilidad web (WCAG AA)", "Playwright", "Vitest",
        "Cloudflare Pages", "Supabase", "PostgreSQL", "Stripe", "WordPress", "WooCommerce",
        "SEO local", "Google Business Profile", "Evaluación de modelos de IA"
      ],
      "sameAs": [
        "https://github.com/FritzReigar",
        "https://www.linkedin.com/in/fritz-reif-garcia/",
        "https://x.com/FritzReigar"
      ]
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://estudioreigar.com/#estudio",
      "name": "Estudio Reigar",
      "url": "https://estudioreigar.com/",
      "founder": { "@id": "https://fritzreigar.com/#fritz" }
    }
  ]
}
```

↳ Los `@id` cruzados son los del estudio: su `ProfessionalService` es `#estudio` con `founder`
`https://fritzreigar.com/#fritz`, y su `Person` lleva `jobTitle` «Desarrollador web» y `worksFor`
`#estudio` (`estudio/index.astro` y `estudio/sobre-mi.astro`). Aquí solo se declara el nodo del
estudio por referencia, con lo mínimo para que se resuelva. `worksFor` deja de nombrar a Lionbridge
y DataAnnotation: la persona va por el estudio (decisión 6); los dos siguen en Trayectoria. La ruta
de `image` es propuesta: la fija la 1.5 cuando monte `public/`. Formación e idiomas: `docs/cv/cv-es.html`.

---

## Choques con el CV

Diferencias entre este texto y `docs/cv/cv-es.html` (y por tanto `cv-en.html`), para la tanda de
coherencia de la fase 2. La regla nueva es **«no se contradicen»** (decisión 4): no hace falta que
el CV lleve lo mismo, pero sí que no diga lo contrario.

| # | Qué | El CV dice | La web nueva dice | Qué hacer en el CV |
|---|---|---|---|---|
| 1 | Titular | «Desarrollador web y de producto · Fundador de Snugport · Webs para negocios · QA de modelos de IA» | «Desarrollador web freelance en Valencia» | Decidir si el CV sigue siendo de producto o pasa a freelance; no se contradicen, pero no suenan a la misma persona |
| 2 | Disponibilidad | «Disponible en híbrido en Valencia o en remoto» (perfil) | «Acepto proyectos»; fuera «Abierto a ofertas» | Quitar o cambiar la frase del perfil |
| 3 | Snugport, pruebas unitarias | «más de 600 tests unitarios (Vitest)» | «más de 1.200» (1.264 contadas el 2026-11-07) | Subir la cifra (las dos lenguas) |
| 4 | Snugport, temas | «4 temas» | «temas a elegir», sin cifra (producción tiene siete según su landing; el panel en React, cinco en el código y cuatro según Fritz) | Quitar la cifra o recontarla con Fritz en ese momento |
| 5 | Snugport, peso | Primer proyecto y el más largo | Detrás de Snugtone, sin destacar | Reordenar si el CV quiere el mismo orden; no es contradicción |
| 6 | Snugtone | No está | Primer proyecto, con ficha | Añadirlo como proyecto |
| 7 | Rust | No está en «Lenguajes» | Snugtone en Rust; `knowsAbout` lo lleva | Añadir Rust (y Tauri) a habilidades |
| 8 | DragonQuestHispano | Está en Proyectos | Fuera (decisión 11) | Quitarlo |
| 9 | Missphone, alcance | «mantenimiento y corrección de su tienda WooCommerce… catálogo, pasarela de pago y envíos» | Rescate, 8 personalizables, 39 páginas al nivel de la portada, entrega y lanzamiento | Ampliar el bullet; los dos cuentan que es heredada |
| 10 | Missphone, marca | Va como bullet dentro de la entrada «Estudio Reigar» | No se dice que sea del estudio: se facturó por privado (`missphone/CLAUDE.md` § 3) | Sacarlo de «Estudio Reigar» o cambiar la entrada a «Desarrollador web freelance» sin colgarlo de la marca |
| 11 | Estudio Reigar | Proyecto «web propia, en producción» (Astro, CI) | Bloque del estudio en la portada; su web no es un proyecto | Puede quedarse; no es contradicción |
| 12 | Artemisa, páginas | «web estática de 13 páginas» | Sin cifra (hoy son 14 más el 404, con el blog crecido) | Quitar la cifra o decir «entregada con 13» |
| 13 | Galaxian | «personal, completado», con tarjeta propia en proyectos | En pequeño, sin ficha | No es contradicción |
| 14 | Estudio y datos personales | — | — | Sin choques en puestos, fechas, idiomas, formación ni nombres: la Trayectoria copia el CV |
| 15 | Snugport, modelo | «producto propio, a la venta» y «A la venta por suscripción con Stripe» | «Gratis, con plan de pago»: el panel es gratis y se paga la sincronización | Decir lo mismo: gratis, con plan de pago por suscripción |

**Resuelta en la tanda 2.12 (2026-11-09), fila a fila, en los dos CV:**

| # | Resolución |
|---|---|
| 1 | Titular: «Desarrollador web freelance en Valencia · Apps propias · QA de modelos de IA» (Fritz). El perfil empieza igual |
| 2 | Fuera «Disponible en híbrido en Valencia o en remoto» |
| 3 | «más de 1.200 tests unitarios» (1.264, recontadas el 2026-11-09) |
| 4 | «temas a elegir», sin cifra |
| 5 | No se reordena: Snugport sigue el primero, sin contradicción |
| 6 | Snugtone añadido, detrás de Snugport |
| 7 | Rust en «Lenguajes» y Tauri en «Frontend y escritorio» |
| 8 | DragonQuestHispano, fuera |
| 9 | Missphone, ampliado: el rescate, 8 regalos que se diseñan en la ficha, 39 páginas, entrega y lanzamiento |
| 10 | Missphone se queda en la entrada de Estudio Reigar, como Artemisa, la primera y con más peso (Fritz, 2026-11-09) |
| 11 | Se queda |
| 12 | Artemisa, sin cifra de páginas |
| 13 | Se queda |
| 14 | Sin choques; Lionbridge y DataAnnotation pasan a «autónomo, remoto» |
| 15 | «gratis con plan de pago»; el bullet, como la ficha de la web |

---

## Para Fritz

Resuelto con Fritz en el chat del 2026-11-04:

1. **Fichas de Missphone (§2) y de Artemisa (§3)**: OK. En Missphone pidió fotos del antes y el
   después, y que se note el estado en que la heredó, dicho con palabras profesionales. Por eso
   está «Cómo me la encontré» y el antes/después va con todo el ancho, ahora con cinco parejas.
2. **Lo mejor de Missphone**: las ideas son suyas, redactadas en §2.
3. **Titular**: se queda «Desarrollador web freelance en Valencia».
4. **«Abr 2026» en la Trayectoria**: se queda.
5. **El porqué de Snugtone**: vale «que leyera lo que usa todo el mundo».
6. **Temas de Snugport**: sin cifra (ver §5).
