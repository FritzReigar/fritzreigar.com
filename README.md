# Portfolio — fritzreigar.com

Portfolio personal de Fritz Reigar: desarrollador backend, QA de modelos de IA y
servicios web para negocios (WordPress/WooCommerce, presencia online local,
dominios y hosting).

Sitio estático de una sola página. Sin frameworks, sin build, sin
dependencias: HTML + CSS + JS vanilla.

## Características

- **Bilingüe ES/EN** — español por defecto en el HTML, inglés en el
  diccionario de `js/i18n.js`. Se puede forzar con `?lang=en` (enlace
  compartible); si no, manda la preferencia guardada y luego el idioma del
  navegador.
- **Tema claro/oscuro** — claro por defecto, respeta `prefers-color-scheme`
  y persiste la preferencia. Sin parpadeo al cargar (script inline en el
  `<head>`).
- **Accesible** — skip link, foco visible, menú de móvil operable por
  teclado, `prefers-reduced-motion` respetado y hoja de estilos de impresión.
- **Sin dependencias JS** — cinco scripts pequeños, ninguna librería.

## Estructura

```
index.html        página única (contenido en español)
404.html          página de error
css/styles.css    estilos y temas (variables en :root y html.dark)
js/theme.js       toggle de tema
js/i18n.js        diccionario EN y toggle de idioma
js/form.js        envío del formulario de contacto (Formspree, sin recarga)
js/nav.js         menú de móvil y sección activa en el nav
js/reveal.js      aparición de bloques al hacer scroll
assets/img/       favicons, imagen Open Graph y retrato del hero
assets/cv/        CV en PDF
```

## Archivos que hay que aportar

- `assets/cv/fritz-reigar-cv.pdf` — ya está. Es una copia del CV que vive en
  `docs/` (gitignored); al actualizar el CV hay que volver a copiarlo aquí.
- `assets/img/fritz.jpg` — retrato del hero, cuadrado (recomendado 640×640).
  **Pendiente.** Mientras no esté, el hero se muestra a una columna sin
  romperse.

## Desarrollo

No hay build: abrir `index.html` en el navegador, o servirlo con
`python -m http.server`. El deploy sale de pushear a `main`.
