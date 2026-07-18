# Portfolio — fritzreigar.com

Portfolio personal de Fritz Reigar: desarrollador backend, QA de IA y servicios
web para negocios (WordPress/WooCommerce, presencia online local, dominios y
hosting).

Sitio estático de una sola página. Sin frameworks, sin build, sin
dependencias: HTML + CSS + JS vanilla.

## Características

- **Bilingüe ES/EN** — español por defecto en el HTML, inglés en el
  diccionario de `js/i18n.js`. Primera visita según el idioma del navegador;
  la elección se guarda en `localStorage`.
- **Tema claro/oscuro** — claro por defecto, respeta `prefers-color-scheme`
  y persiste la preferencia. Sin parpadeo al cargar (script inline en el
  `<head>`).
- **Sin dependencias JS** — dos scripts pequeños: `js/theme.js` y
  `js/i18n.js`.

## Estructura

```
index.html        página única (contenido en español)
css/styles.css    estilos y temas (variables en :root y html.dark)
js/theme.js       toggle de tema
js/i18n.js        diccionario EN y toggle de idioma
assets/img/       favicons e imagen Open Graph
```

## Desarrollo

No hay build: abrir `index.html` en el navegador, o servirlo con
`python -m http.server`. El deploy sale de pushear a `main`.
