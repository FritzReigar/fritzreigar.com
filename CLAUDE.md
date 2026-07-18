# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es

Portfolio personal de Fritz (fritzreigar.com). Sitio estático de una sola página: `index.html` + `css/styles.css` + `js/` (`theme.js`, `i18n.js`, `form.js`, `nav.js`). Sin framework, sin build, sin dependencias, sin tests.

**Nombre profesional: Fritz Reigar** — es el que va en todo el contenido público del sitio (el nombre real, Fritz Reif Garcia, solo aparece en la URL de LinkedIn).

## Desarrollo y deploy

- No hay comandos de build ni lint. Para ver cambios en local basta abrir `index.html` en el navegador, o servirlo con `python -m http.server`.
- Remote: `https://github.com/FritzReigar/portfolio-v1.git`, rama `main`. El deploy sale de pushear a `main` (la configuración de hosting no vive en este repo).

## Arquitectura

- **Theming**: variables CSS definidas en `:root` (tema claro, el por defecto) y sobreescritas en `html.dark`. Un script inline en el `<head>` aplica el tema guardado antes del primer pintado (evita parpadeo); `js/theme.js` conecta el botón y persiste la preferencia en `localStorage` (clave `fritzreigar-theme`). Cualquier color nuevo debe entrar como variable con valor en ambos temas, nunca hardcodeado.
- **Bilingüe ES/EN**: el español es el idioma por defecto y vive directamente en el HTML; el inglés está en el diccionario `EN` de `js/i18n.js`. Los elementos traducibles llevan `data-i18n="clave"` (texto) o `data-i18n-ph="clave"` (placeholders). Al añadir contenido nuevo hay que añadir su clave y traducción al diccionario. Preferencia en `localStorage` (clave `fritzreigar-lang`); primera visita según `navigator.language`.
- **Secciones** de `index.html`: hero, servicios, experiencia, proyectos, stack y contacto (formulario Formspree), más header sticky con nav y footer.
- **SEO/social**: meta tags y Open Graph en el `<head>` (en español); la imagen de preview y favicons viven en `assets/img/`. `title` y `meta description` también se traducen vía `js/i18n.js`.

## Posicionamiento del contenido

Perfil híbrido, con el mismo peso: desarrollador (backend Java/C++, QA de IA para Lionbridge y DataAnnotation) y servicios web freelance para negocios (WordPress/WooCommerce, Google Business Profile, dominios/hosting). Estética: minimal profesional — nada de neones, glow ni jerga de terminal.
