# fritzreigar.com

La web personal de Fritz Reigar: la persona detrás de [Estudio Reigar](https://estudioreigar.com/).
Enseña su trabajo para clientes, sus proyectos y quién es.

> **Estado:** la rama `astro` es la web nueva, en construcción (plan en [`plan/`](plan/README.md)).
> `main` sigue publicando la web de una sola página hasta el corte de la fase 2.

## Cómo está hecha

[Astro](https://astro.build/) estático, sin framework de interfaz y con un solo script
(`src/scripts/main.ts`), servido por Cloudflare Pages. Español en la raíz e inglés en `/en/`, con
HTML servido en cada idioma y cero JS para el idioma.

```
src/data/routes.ts     la única lista de páginas: sitemap, hreflang, enlaces y pruebas salen de aquí
src/data/ui.ts         las cadenas del marco y del formulario
src/layouts/           BaseLayout: el <head>, la cabecera, el pie y el script
src/pages/             las páginas (las inglesas, en src/pages/en/)
src/scripts/main.ts    el único script
public/_headers        CSP estricta, HSTS y caché de Pages
functions/             el middleware que pone noindex en *.pages.dev
e2e/                   Playwright y axe contra el build servido por wrangler
scripts/               Lighthouse con presupuestos y el arnés de comentarios de dist/
```

## Desarrollo

Node 22.12 o posterior.

```
npm install
npm run dev        # servidor de desarrollo
npm run red        # la red entera: check, build, comentarios, e2e y lighthouse
```

`npm run red` es lo que corre la CI en cada push a `astro` y a `main`, y sin verde no hay commit.
Las pruebas miden el build servido como en producción (`wrangler pages dev dist`), con las
cabeceras de `_headers`; la primera vez, `npx playwright install chromium`.

## Despliegue

Lo hace Cloudflare Pages desde GitHub: cada rama se construye con `npm run build` y se publica
`dist/`. La previa de la rama `astro` sale de un segundo proyecto de Pages, con `noindex` en
`*.pages.dev`.
