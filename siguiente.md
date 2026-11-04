# Cierre — portfolio
Fecha: 2026-11-04
Proyecto: portfolio

## 1. De qué va la siguiente
Tanda 1.5 de `plan/fase-1.md`: el andamio de Astro. En la rama `astro`, el proyecto en la raíz del repo con las seis rutas por idioma, el texto de `plan/contenido.md` sin estilo, la CSP estricta, las pruebas (Playwright, axe, Lighthouse) y la CI en verde, más una previa en Pages con `noindex`.
Es la última tanda de la fase 1; después toca planificar la fase 2 con `plan/spec-visual.md`.

## 2. El prompt
```
Tanda 1.5 del portfolio: el andamio de Astro.

Lee ENTEROS plan/README.md y la tanda 1.5 de plan/fase-1.md, con sus
«Desvíos», y todo lo que la tanda mande leer del estudio y de Artemisa
(astro.config.mjs, BaseLayout, routes.ts, _headers, playwright, lighthouse,
la CI y el _middleware.js del noindex). El texto sale de plan/contenido.md.
De plan/spec-visual.md, solo los nombres de los componentes y las rutas:
los estilos son de la fase 2. Trabaja en la rama astro, nunca en main
(main sigue publicando la web vieja). npm run red en verde antes de cada
commit, y un test nuevo se ve en rojo antes de creerse el verde. Regla 13:
el repo es público. Commit local al acabar; el push de la rama astro, solo
con mi OK.
```

## 3. Modelo y esfuerzo
Opus 5.5 en medio: es una tanda de ejecución, y Astro ya se dio en el estudio (sin clase, decisión 12).

## 4. Cómo abrirla
Sesión nueva en `~/Projects/propios/portfolio`, sin modo plan.

## 5. Qué traer
- El nombre del proyecto de Pages que sirve hoy fritzreigar.com (panel de Cloudflare → Workers y Pages).
- El proyecto de previa creado: mismo repo, rama de producción `astro`, preset Astro, build `npm run build`, salida `dist` y la variable `NODE_VERSION` = `22`.
- Tu OK para el push de la rama `astro` cuando la red esté en verde.

## 6. Qué te llevas
- La rama `astro` con el proyecto en la raíz: las seis páginas en español y sus gemelas en `/en/`, el sitemap, `robots.txt`, `_headers` con la CSP del estudio y los dos PDF del CV en sus URLs de siempre.
- `npm run red` en verde: `astro check` y Biome, el build, Playwright con axe a 390 y a 1440 y Lighthouse con sus presupuestos.
- La CI en GitHub Actions y, con tu OK, la previa en `*.pages.dev` sirviendo la portada con `X-Robots-Tag: noindex`.

Con eso cierra la fase 1, y la siguiente sesión es la planificación de la fase 2 (Opus 5.5 en alto, modo plan), que corta los componentes con `plan/spec-visual.md`.

## 7. Decisiones que tomar
- **Crear el proyecto de previa en Pages antes de abrir la sesión.** Recomendada: sí, para que la tanda acabe con la previa viva; si no, la tanda se cierra en local y la previa queda para el principio de la fase 2.
- **La foto de busto para Contacto** (4:5, 704 × 880 px o más). Recomendada: traerla cuando la tengas; la spec ya la prevé y sin ella la página se ve bien.
- **Las capturas con la Navidad** (la vitrina y los «después» 1 y 2 de Missphone). Recomendada: rehacerlas en la fase 2 si la web sale pasado Reyes.
- **El caso Missphone de estudioreigar.com también lo cuenta a la baja.** Recomendada: rehacerlo en una sesión del proyecto del estudio, copiando de `plan/contenido.md` § 2.
