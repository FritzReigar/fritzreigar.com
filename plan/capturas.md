# Las capturas de la web nueva

Tanda 1.2 (2026-11-04). Cada imagen que la web va a enseñar, con su origen, su fecha, su tamaño
y su `alt`. Los archivos viven en `docs/capturas/` (gitignored: no se suben); aquí solo van
nombres, tamaños, URL públicas, fechas y `alt` (regla 13). Rutas cortas: `estudio/` =
`~/Projects/propios/estudio-reigar/`, `missphone/` = `~/Projects/clientes/missphone/`.

Nada está retocado ni convertido: los recortes, los marcos y el paso a AVIF/WebP son del lienzo
(1.3) y de `astro:assets` (fase 2). Ninguna enseña datos personales, pedidos ni paneles de
administración: en Missphone y Artemisa salen el teléfono, el correo y la nota de Google que las
dos publican en su propia web; en Snugport, los datos de demostración de su landing.

Comprobación (la de la tanda, desde la raíz):

    python -c "from PIL import Image; import glob; [print(f, Image.open(f).size) for f in sorted(glob.glob('docs/capturas/**/*.*', recursive=True))]"

## Avatar

| Archivo | Tamaño | Origen | Fecha | `alt` |
|---|---|---|---|---|
| `avatar/avatar-nariz-85.png` | 400×400 | copia de `freelancer-profile/contenido/marca/avatar-nariz-85.png`, el de X | 2026-11-01 | Dibujo de Fritz Reigar: retrato de línea, con barba y camiseta azul, sobre fondo celeste. |

**Tope: 400 px** (hasta 200 px CSS a densidad 2). `generar-avatares-propuesta.py` no puede sacarlo
más grande: no dibuja, recolorea y retoca `avatar-400.png` con coordenadas medidas sobre esos 400
px, y no hay original mayor en `marca/`. Más grande solo vectorizándolo (es de la 1.3, si el
concepto lo pide).

## Estudio Reigar

`capturar.mjs` de `estudio/docs/diseno-rediseno/`, densidad 2, con `https://estudioreigar.com/`.

| Archivo | Tamaño | Origen | Fecha | `alt` |
|---|---|---|---|---|
| `estudio-reigar/estudio-reigar-desktop.png` | 2880×1800 (1440×900 a 2×) | `https://estudioreigar.com/` | 2026-11-04 | Portada de estudioreigar.com en el ordenador: un cartel azul colgado que dice «Abierto, también en Google» y el titular «Tu negocio lleva años abierto. En internet, todavía no». |
| `estudio-reigar/estudio-reigar-mobile.png` | 780×1688 (390×844 a 2×) | `https://estudioreigar.com/` | 2026-11-04 | La misma portada en el móvil: el cartel arriba, el titular debajo y el botón para pedir el diagnóstico gratis. |

## Missphone: antes y después

Las cinco parejas de la ficha (`plan/contenido.md` § 2, «Antes y después»), en ese orden. Los
«antes» son copia tal cual de `missphone/docs/portfolio/antes/` (31-08-2026, no se pueden repetir).
Los «después», de `missphone/herramientas/capturar-portfolio.mjs` con un `trabajos.json` propio de
estas cinco, sobre el lienzo exacto de su antes: **las cinco casan** (mismo tamaño leído con
Pillow), y las cinco salieron con `estorbos=[]` (sin banner de cookies, sin aviso de envío, sin
barra de administración) y el carrito a 0,00 €.

| # | Archivo | Tamaño | Origen | Fecha | `alt` |
|---|---|---|---|---|---|
| 1 | `missphone/antes/2026-08-31-home-1440-01-hero.jpg` | 1372×882 | `missphone/docs/portfolio/antes/` | 2026-08-31 | Antes: la cabecera de la portada de Missphone era una sola imagen, con «Fundas personalizadas» y un botón «Click aquí» dibujados dentro. |
| 1 | `missphone/despues/2026-11-04-home-1440-01-hero.jpg` | 1372×882 | `https://missphone.es/`, ancla `px 0` | 2026-11-04 | Después: la cabecera con el titular «Fundas personalizadas y accesorios para móvil en Benetússer», los botones «Diseña tu funda» y «Ver los accesorios» y la nota de Google. |
| 2 | `missphone/antes/2026-08-31-home-390-01-hero-ilegible.jpg` | 380×826 | `missphone/docs/portfolio/antes/recortes-movil/` | 2026-08-31 | Antes, en el móvil: la misma imagen de cabecera encogida, con el texto y el botón demasiado pequeños para leerse. |
| 2 | `missphone/despues/2026-11-04-home-390-01-hero.jpg` | 380×826 | `https://missphone.es/`, móvil a 1×, ancla `px 0` | 2026-11-04 | Después, en el móvil: la foto de las fundas arriba y, debajo, el titular, los dos botones y la nota de Google, a tamaño de móvil. |
| 3 | `missphone/antes/2026-08-31-home-1440-03-categorias-ilegibles.jpg` | 1447×849 | `missphone/docs/portfolio/antes/` | 2026-08-31 | Antes: las categorías de la portada, con el nombre de cada una montado sobre su foto y a veces encima del producto. |
| 3 | `missphone/despues/2026-11-04-home-1440-03-categorias.jpg` | 1447×849 | `https://missphone.es/`, ancla «Accesorios para móviles en Benetússer», margen 150 | 2026-11-04 | Después: tarjetas de categoría con la foto a la izquierda y, a su lado, el nombre y el precio desde el que empieza; la de fundas, el doble de ancha. |
| 4 | `missphone/antes/2026-08-31-fundas-1440-testimonios-y-texto-sobre-foto.jpg` | 1431×840 | `missphone/docs/portfolio/antes/` | 2026-08-31 | Antes: la página de fundas, con cuatro párrafos en gris sobre una foto de fundas que no se leen. |
| 4 | `missphone/despues/2026-11-04-fundas-1440-cabecera.jpg` | 1431×840 | `https://missphone.es/fundas/`, ancla `px 0` | 2026-11-04 | Después: la página de fundas abre con una cabecera de color, el titular, dos líneas, el botón «Hazla con tu foto» y la foto enmarcada. |
| 5 | `missphone/antes/2026-08-31-home-1440-05-texto-invisible-sobre-foto.jpg` | 1447×849 | `missphone/docs/portfolio/antes/` | 2026-08-31 | Antes: más abajo en la portada, un bloque de accesorios con el texto en gris sobre una foto oscura, casi invisible. |
| 5 | `missphone/despues/2026-11-04-home-1440-05-la-tienda.jpg` | 1447×849 | `https://missphone.es/`, ancla «La tienda, en Benetússer», margen 220 | 2026-11-04 | Después: en ese sitio, el bloque «La tienda, en Benetússer», con la dirección, la foto del local y los botones para llamar y para llegar. |

Anclas: las del `missphone/docs/portfolio/README.md` (parejas 1, 12, 7 y 5), salvo la 3. Con su
ancla de entonces («Fundas para móvil», margen 245) el encuadre cortaba una línea de texto bajo la
cabecera, porque las tarjetas ya no llevan la foto arriba sino a la izquierda; se ancla al título
de la sección, que deja entrar las ocho tarjetas enteras, como en el antes.

**Estacional:** los «después» del 4 de noviembre llevan la temporada encendida: «Navidad» en el
menú y, en la 1 y la 2, asoma el bloque «Regalos de Navidad con tu foto» al pie del encuadre. Si la
web se publica pasado Reyes, se rehacen con el mismo `trabajos.json`, guardado en
`docs/capturas/missphone/` (desde `missphone/`: `node herramientas/capturar-portfolio.mjs
<ruta>/trabajos.json`, con pausas entre peticiones como pide su `CLAUDE.md`).

## Missphone: vitrina

| Archivo | Tamaño | Origen | Fecha | `alt` |
|---|---|---|---|---|
| `missphone/vitrina/missphone-desktop-2026-11-04.png` | 2880×1800 (1440×900 a 2×) | `https://missphone.es/` | 2026-11-04 | Portada de la tienda online de Missphone en el ordenador: fundas rosas sobre tela, el titular «Fundas personalizadas y accesorios para móvil en Benetússer» y el botón «Diseña tu funda». |
| `missphone/vitrina/missphone-mobile-2026-11-04.png` | 780×1688 (390×844 a 2×) | `https://missphone.es/` | 2026-11-04 | La misma portada en el móvil: la foto de las fundas arriba, el titular y los dos botones debajo. |
| `missphone/vitrina/missphone-desktop-2026-10-08-estudio.webp` | 1440×900 | copia de `estudio/web/src/assets/cases/missphone-desktop.webp` | 2026-10-08 | (de reserva; mismo `alt` que la de hoy) |
| `missphone/vitrina/missphone-mobile-2026-10-08-estudio.webp` | 780×1688 | copia de `estudio/web/src/assets/cases/missphone-mobile.webp` | 2026-10-08 | (de reserva; mismo `alt` que la de hoy) |

Las del estudio **ya no cuadran** con la portada de hoy: llevan arriba la franja del aviso de
envío, «Inicio» en el menú y las cuatro entradas bajo el hero, donde hoy van «Navidad» y el bloque
de regalos de temporada. Se rehicieron con el script del estudio y una línea más, que pulsa
«Descartar» en el aviso de la tienda como hace `capturar-portfolio.mjs` (hoy la franja dice
«Navidad con tu foto: hasta el 20 de diciembre», y caduca). Las dos de octubre se guardan por si el
lienzo prefiere la portada sin temporada.

## Limpiezas Artemisa

| Archivo | Tamaño | Origen | Fecha | `alt` |
|---|---|---|---|---|
| `limpiezas-artemisa/limpiezas-artemisa-desktop.webp` | 1440×900 | copia de `estudio/web/src/assets/cases/` | 2026-10-08 | Portada de limpiezasartemisa.com en el ordenador: fondo azul noche, el titular «La limpieza bien hecha se nota al entrar», los botones de presupuesto y de WhatsApp y la foto de un salón limpio. |
| `limpiezas-artemisa/limpiezas-artemisa-mobile.webp` | 780×1688 (390×844 a 2×) | copia de `estudio/web/src/assets/cases/` | 2026-10-08 | La misma portada en el móvil: el titular, los dos botones y la foto debajo. |

La portada de las dos enseña la nota y el número de reseñas que la propia web publica; el texto
de la ficha no cita la cifra (es de su perfil de Google).

### Lighthouse, medido el 2026-11-04

Lighthouse **13.5.0** (el del estudio, `estudio/web/node_modules`), móvil por defecto, contra
`https://www.limpiezasartemisa.com`, con el Chromium de Playwright, `--lang=es-ES`, la regla del
beacon de Analytics por la VPN (Desvío 28 del estudio) y el envío de Analytics bloqueado para no
sumar visitas falsas al cliente. Mediana de 5 pasadas en la portada y de 3 en cada servicio.

| Página | Rendimiento (mediana; pasadas) | Accesibilidad | Buenas prácticas | SEO |
|---|---|---|---|---|
| `/` | **95** (93, 95, 96, 97, 95) | 100 | 100 | 100 |
| `/limpieza-comunidades-valencia` | **96** (97, 96, 94) | 100 | 100 | 100 |
| `/limpieza-hogares-valencia` | **96** (96, 96, 96) | 100 | 100 | 100 |

LCP 2,36–2,45 s, CLS ≤ 0,015, TBT 0–144 ms. Cambia respecto a lo que decía `plan/contenido.md`
(«de 94 a 98»), así que allí pasa a **rendimiento 95-96 y 100 en accesibilidad, buenas prácticas
y SEO**, dicho de esas tres páginas.

## Snugtone

Copias de `~/Projects/propios/snugtone/assets/`, las del README. Todo lo que sale es libre (música
CC0 y de dominio público; portadas CC0 y cuadros de dominio público) y la interfaz está en inglés:
lo dice la nota de las capturas de la ficha.

| Archivo | Tamaño | Origen | Fecha | `alt` |
|---|---|---|---|---|
| `snugtone/captura.png` | 1280×860 | `snugtone/assets/` | 2026-10-15 | Snugtone en tema oscuro: la vista de discos con sus portadas, la cola a la derecha y el reproductor abajo. |
| `snugtone/captura-busqueda.png` | 1280×860 | `snugtone/assets/` | 2026-10-16 | Snugtone en tema claro: la búsqueda «format:mp3 duration:>2:30» acota la biblioteca a 11 pistas. |
| `snugtone/captura-ecualizador.png` | 1280×860 | `snugtone/assets/` | 2026-10-16 | El ecualizador de diez bandas de Snugtone, con el preamplificador y el aviso de que subir bandas puede saturar. |
| `snugtone/captura-musicbrainz.png` | 1280×860 | `snugtone/assets/` | 2026-10-16 | La búsqueda de etiquetas en MusicBrainz: varias ediciones de las Variaciones Goldberg, ordenadas por cuántas pistas coinciden. |

## Snugport

`capturar.mjs` del estudio, densidad 2, con `https://snugport.app/es/`: la raíz sirve la landing
en inglés, y el Chrome headless va en inglés.

| Archivo | Tamaño | Origen | Fecha | `alt` |
|---|---|---|---|---|
| `snugport/snugport-desktop.png` | 2880×1800 (1440×900 a 2×) | `https://snugport.app/es/` | 2026-11-04 | Landing de Snugport en el ordenador: el titular «Cronómetro, tareas, clientes y vencimientos. Todo tu trabajo freelance en una sola página» y, debajo, el panel con el cronómetro, lo siguiente y las tareas del día. |
| `snugport/snugport-mobile.png` | 780×1688 (390×844 a 2×) | `https://snugport.app/es/` | 2026-11-04 | La misma landing en el móvil: el titular, los botones «Abrir el panel» y «Ver precios» y el panel asomando debajo. |

## Galaxian

| Archivo | Tamaño | Origen | Fecha | `alt` |
|---|---|---|---|---|
| `galaxian/cpp-galaxian-engine.webp` | 1200×675 | copia de `assets/img/proyectos/cpp-galaxian-engine.webp` (un fotograma del `gameplay_preview.gif` de su repo) | 2026-08-21 | CPP-Galaxian-Engine en marcha: la formación de naves enemigas arriba, la nave del jugador abajo y los marcadores sobre fondo negro. |
