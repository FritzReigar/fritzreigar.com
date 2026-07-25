# Portfolio — fritzreigar.com

Portfolio personal de Fritz Reigar: desarrollador backend, QA de modelos de IA y
servicios web para negocios.

Sitio estático de una sola página, escrito a mano en HTML, CSS y JavaScript
vanilla: sin frameworks, sin build y sin dependencias de terceros.

## Características

- **Bilingüe ES/EN** — español por defecto en el HTML, inglés en el diccionario
  de `js/i18n.js`. El idioma se puede forzar con `?lang=en` para compartir el
  enlace ya traducido; si no, manda la preferencia guardada y después el idioma
  del navegador.
- **Tema claro/oscuro** — claro por defecto, respeta `prefers-color-scheme` y
  persiste la elección. Sin parpadeo al cargar: el tema se aplica desde un
  script inline en el `<head>`, antes del primer pintado.
- **Accesible** — skip link, foco visible, menú de móvil operable por teclado,
  `prefers-reduced-motion` respetado y hoja de estilos de impresión. Las
  animaciones de scroll solo se activan con JS disponible, de modo que el
  contenido siempre es visible.
- **SEO y social** — meta tags, Open Graph, Twitter Card y datos estructurados
  JSON-LD (`ProfilePage` + `Person`).
- **Ligero** — cinco scripts pequeños, ninguna librería.

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
assets/img/       favicons, imagen Open Graph y retrato
assets/cv/        CV en PDF
```

## Desarrollo

No hay build ni dependencias que instalar. Basta con abrir `index.html` en el
navegador, o servir la carpeta:

```
python -m http.server
```

El deploy se hace al pushear a `main`.
