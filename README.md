# fritzreigar.com

La web personal de Fritz Reigar: la persona detrás de [Estudio Reigar](https://estudioreigar.com/).
Enseña su trabajo para clientes, sus proyectos y quién es.

> **Estado:** v1.0.0, publicada en [fritzreigar.com](https://fritzreigar.com/) desde `main`. El plan
> que la construyó está en [`plan/`](plan/README.md) y lo cerrado, en [`historia.md`](historia.md).

## Cómo está hecha

[Astro](https://astro.build/) estático, sin framework de interfaz y con un solo script
(`src/scripts/main.ts`), servido por Cloudflare Pages. Español en la raíz e inglés en `/en/`, con
HTML servido en cada idioma y cero JS para el idioma.

```
src/data/routes.ts     la única lista de páginas: sitemap, hreflang, enlaces y pruebas salen de aquí
src/data/ui.ts         las cadenas del marco, de las fichas y del formulario
src/data/home.ts       el texto de la portada
src/data/shots.ts      las capturas, por clave, con su alt
src/content/cases/     las cuatro fichas, un JSON por idioma (esquema en src/content.config.ts)
src/assets/shots/      las capturas en WebP, que astro:assets sirve en AVIF y WebP
src/styles/            tokens.css (los únicos colores literales) y global.css (la base)
src/components/        el marco (site/), los controles (ui/), los héroes (heroes/) y las fichas (case/)
src/assets/fonts/      Archivo variable de origen, con su licencia OFL
src/layouts/           BaseLayout: el <head>, la cabecera, el pie y el script
src/pages/             las páginas (las inglesas, en src/pages/en/)
src/scripts/main.ts    el único script
public/_headers        CSP estricta, HSTS y caché de Pages
functions/             el middleware que pone noindex en *.pages.dev
e2e/                   Playwright y axe contra el build servido por wrangler
scripts/               Lighthouse con presupuestos, los arneses de comentarios y de tokens,
                       fuente.py, que saca public/fonts/archivo.woff2, y capturas.py, que saca
                       src/assets/shots/ de las capturas de origen (docs/, fuera del repo)
```

## Desarrollo

Node 22.12 o posterior.

```
npm install
npm run dev        # servidor de desarrollo
npm run red        # la red entera: check, tokens, build, comentarios, e2e y lighthouse
python scripts/fuente.py   # rehace la fuente (fontTools) desde src/assets/fonts/
python scripts/capturas.py # rehace las capturas (Pillow) desde docs/capturas/
```

`npm run red` es lo que corre la CI en cada push a `astro` y a `main`, y sin verde no hay commit.
Las pruebas miden el build servido como en producción (`wrangler pages dev dist`), con las
cabeceras de `_headers`; la primera vez, `npx playwright install chromium`. Las vistas
(`e2e/vistas.spec.ts`, etiqueta `@vista`) comparan capturas guardadas en Windows y la CI las salta;
se regeneran solo con un cambio buscado: `npx playwright test --grep @vista --update-snapshots`.

## Despliegue

Lo hace Cloudflare Pages desde GitHub, en el proyecto `fritzreigar-com`: `main` es producción y
cada una de las demás ramas sale en `<rama>.fritzreigar-com.pages.dev`, con `noindex`. Se construye
con `npm run build` y se publica `dist/`. Empujar a `main` es publicar.
