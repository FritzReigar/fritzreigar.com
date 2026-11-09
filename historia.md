# fritzreigar.com — historia

Lo cerrado, sacado del `CLAUDE.md`. Lo más nuevo arriba. Lo que sigue mandando hoy está en el
`CLAUDE.md`; esto es el porqué y cómo era antes. El detalle tanda a tanda vive en `plan/`.

## 2026-11-09 — El corte (v1.0.0)

fritzreigar.com pasó a servir la web en Astro desde el proyecto de Pages `fritzreigar-com`, con
`main` como producción. Tanda 2.13 de `plan/fase-2.md`, con los pasos del panel hechos por Fritz.

- **El orden que importaba:** primero pausar los despliegues automáticos de `portfolio-v1`, porque
  publicaba la raíz del repo sin build y un push de Astro habría dejado el dominio con la portada en
  404 y el código a la vista. El push de `main` no generó ningún build allí.
- **La caché:** el HTML salía con `HIT` durante horas por una Cache Rule de la zona, «Cache
  Everything», sobre todas las solicitudes. Se deshabilitó (no se borró) y se purgó todo; desde
  entonces el HTML sale `DYNAMIC`.
- **`www.fritzreigar.com` no resolvía** y el enlace de LinkedIn apuntaba ahí, así que estaba roto.
  Ahora es un dominio de `fritzreigar-com` con un 301 a la raíz que conserva ruta y consulta.
- **`portfolio-v1-6lo.pages.dev`** es la URL de la web vieja; `portfolio-v1.pages.dev` es de otra
  persona. Pages añade un sufijo cuando el nombre está cogido.
- **Lo que inyectaba la zona:** Lighthouse en el dominio dio 92 en buenas prácticas, y 100 en local,
  porque Cloudflare metía scripts que la CSP bloquea. Fritz apagó Bot Fight Mode, Web Analytics y la
  ofuscación de correo. Queda un script en línea de detección de bots que no se pudo atribuir a
  ningún interruptor; PageSpeed da 100 y Fritz lo aceptó.
- **Un arreglo de última hora**, pedido por Fritz al dar el OK a la previa: el salto de la nav a las
  secciones dejaba asomar el final de la anterior bajo la cabecera.

## 2026-11-04 — El replanteamiento

La web dejó de ser una página para reclutadores y pasó a ser la persona detrás de Estudio Reigar: el
estudio por delante, el trabajo freelance antes que la búsqueda de empleo, Trabajo separado de
Proyectos, en Astro y con un rediseño. Las decisiones están en `plan/README.md`; el lienzo y la spec,
en `plan/fase-1.md` y `plan/spec-visual.md`.

## Hasta 2026-11-09 — La web de una sola página

Un sitio estático sin framework, sin build y sin dependencias: `index.html`, `css/styles.css` y
`js/` (`theme.js`, `i18n.js`, `form.js`, `nav.js`, `reveal.js`). Se publicaba la raíz del repo desde
`main` en el proyecto de Pages `portfolio-v1`; por eso `CLAUDE.md`, `README.md` y `plan/` respondían
200 en el dominio.

- **Tema:** variables CSS en `:root` y `html.dark`, un script en línea en el `<head>` contra el
  parpadeo y un botón que guardaba la preferencia en `localStorage`.
- **Bilingüe por JS:** el español en el HTML y el inglés en un diccionario de `js/i18n.js`, con
  `data-i18n` y `?lang=en` en la URL. Sin `hreflang`, porque el inglés no tenía URL propia.
- **Una página con secciones:** hero, experiencia, proyectos, stack y formación, servicios y
  contacto. Snugport abría los proyectos como tarjeta destacada; Galaxian y Limpiezas Artemisa iban
  en tarjeta ancha; Estudio Reigar, Missphone y DragonQuestHispano, sin imagen, en un índice final.
- **Estética de agosto de 2026:** retícula suiza con el rojo señal como único acento (`#c62f24` claro
  y `#f0584b` oscuro), Archivo y radio cero. La web nueva conserva la retícula, Archivo y el radio
  cero, y cambia el acento. Los prototipos del rediseño de agosto siguen en la raíz, gitignorados.
- **Para reclutadores:** el estado era «Abierto a ofertas», el CV iba en el header y en el CTA del
  hero, y la web y el CV llevaban los mismos bullets. Fuera de ella se quedó también
  Unity-3D-Combat-Prototype (octubre de 2026).
