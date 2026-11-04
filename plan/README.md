# plan/ — cómo se trabaja el replanteamiento de fritzreigar.com

Método de §7.5 de `~/Projects/organizacion-y-flujo.md`, adaptado al portfolio en la planificación
del 2026-11-04. Una sesión no recuerda a la anterior y quien planifica no es quien ejecuta: **lo
único que viaja es lo escrito aquí**. El modelo del ciclo es el del estudio
(`~/Projects/propios/estudio-reigar/plan/README.md`); lo que sirva de su web se copia, no se
reinventa.

## Qué se busca

fritzreigar.com deja de ser una página para reclutadores y pasa a ser **la persona detrás de
Estudio Reigar**: el estudio por delante, el trabajo freelance antes que la búsqueda de empleo,
Missphone y Snugtone con peso, Trabajo (clientes) separado de Proyectos (lo propio), y la web en
Astro con un rediseño **top, visual y con una pieza diferenciadora y original**, que siga siendo
rápida y con poco JS porque la mira gente que sabe. La web no puede contradecir la bio de X
(«vivo de ella como freelancer», estudioreigar.com, Snugtone).

## Decisiones de la planificación (2026-11-04)

De Fritz:

1. **Estética: la suiza con azul.** Se quedan la retícula, Archivo como única familia y el radio
   cero. El acento pasa del rojo señal al cobalto del estudio (`#1f4fa3`, el de la camiseta del
   avatar) y el celeste del fondo del avatar se usa como superficie.
2. **Inglés: rutas `/en/` propias**, como el estudio: HTML servido en cada idioma, hreflang
   recíproco con `x-default` al español, sitemap con las dos y cero JS para el idioma. Se acaba el
   conmutador por JS (`?lang=en`).
3. **Estructura: portada y cuatro fichas**, en los dos idiomas: Missphone y Limpiezas Artemisa
   (Trabajo), Snugtone y Snugport (Proyectos).
4. **CV discreto.** Fuera «Abierto a ofertas»; la disponibilidad es «Acepto proyectos». El CV va en
   el pie y en Contacto, y la experiencia, como trayectoria corta. La regla web-CV pasa a ser **«no
   se contradicen»** (mismos hechos, fechas, niveles de idioma y nombres), no «los mismos bullets».
5. **Diseño top, con algo muy diferenciador** («alguna animación o lo que sea, muy original»).
   Por eso, antes de escribir Astro, un lienzo con tres conceptos para elegir viéndolos.

Recomendadas en la planificación (valen mientras Fritz no diga otra cosa):

6. **Qué es esta web al lado de estudioreigar.com**: la persona. El estudio va en el hero y enlaza
   a su web; **servicios y precios viven solo en estudioreigar.com**. Aquí van el trabajo, los
   proyectos y quién es Fritz.
7. **Despliegue.** La web vive en Cloudflare Pages (NS de Cloudflare, 308 de `/index.html` y las
   cabeceras por defecto de Pages, comprobado el 2026-11-04; el nombre del proyecto se mira en el
   panel). Hoy se publica la raíz del repo sin build. El trabajo va en la **rama `astro`**, y su
   previa sale de un **segundo proyecto de Pages** del mismo repo: rama de producción `astro`, build
   `npm run build`, salida `dist`, Node 22, con `noindex` en `*.pages.dev`. En el corte (fase 2) se
   mueve el dominio al proyecto nuevo, la producción pasa a `main` y el proyecto viejo se queda una
   semana como vuelta atrás. En el corte se revisa la regla de caché del HTML de la zona (hoy el
   edge lo sirve con `cf-cache-status: HIT` durante horas). El panel de Cloudflare lo toca Fritz.
8. **Astro en la raíz del repo**, no en `web/`: el repo es solo la web. Solo se publica `dist/`,
   así que `CLAUDE.md`, `README.md`, `plan/` y `siguiente.md` dejan de servirse (hoy responden 200
   en el dominio).
9. **Un solo script**, `src/scripts/main.ts`, externo y con su tope en el presupuesto de
   Lighthouse. **El modo oscuro, solo por `prefers-color-scheme`**: sin botón y sin script en
   línea, que la CSP estricta no deja.
10. **El formulario sigue en Formspree**: funciona sin JS (POST normal) y `main.ts` lo mejora. La
    CSP admite `https://formspree.io` en `form-action` y `connect-src`.
11. **Galaxian** va en Proyectos, por detrás y en pequeño, sin ficha y sin presentar a Fritz como
    programador de videojuegos. **DragonQuestHispano sale** de la web (y del CV en la tanda de
    coherencia). Unity-3D-Combat-Prototype sigue fuera.
12. **Clases en pausa**, como en el estudio: Astro ya se dio allí y el cursillo va en el proyecto de
    profesor. Solo lleva clase corta (concepto, «Tócalo tú», tres preguntas) la tanda que estrene un
    concepto que el estudio no tiene, por ejemplo las animaciones ligadas al scroll.
13. **El repo es público** (`github.com/FritzReigar/fritzreigar.com`). En `plan/`, el `CLAUDE.md` y
    `src/` no entra nada confidencial de clientes: ni ventas, ni gasto o métricas de anuncios, ni
    nombres de su personal, ni precios, ni detalles de seguridad de sus webs (versiones de plugins,
    fallos, cortafuegos). Ese material vive en `docs/`, que está gitignored, o en la carpeta del
    cliente.
14. **Versiones**: v0.1.T en la fase 1 y v0.2.T en la fase 2 (la 1.3 es la v0.1.3); la **v1.0.0**
    es el día en que el dominio sirve la web en Astro. Lo que no es código: «(sin versión: solo
    documentación)» o «(sin versión: solo diseño)».

## Las fases

| Fase | Qué | Archivo |
|---|---|---|
| 1 | **Contenido, capturas, lienzo y andamio**: el texto entero verificado, las capturas que faltan, tres conceptos de diseño y la spec, y Astro montado con su red de pruebas en la rama `astro` | [`fase-1.md`](fase-1.md) |
| 2 | **Implementación y corte** (provisional; la planifica su propia sesión cuando exista `plan/spec-visual.md`): marco y tokens, portada, fichas de Trabajo, fichas de Proyectos, la pieza diferenciadora, el inglés entero, imágenes OG con Satori (copiadas del estudio), QA y corte (v1.0.0), y la coherencia: los dos CV (dos páginas A4 justas, reexportados) y la lista de cambios de LinkedIn, que aplica Fritz | `fase-2.md`, cuando se planifique |

Fuera del plan: el caso Missphone de estudioreigar.com, que también lo cuenta a la baja, es trabajo
del proyecto del estudio. Y X: aquí no se publica nada.

## El ciclo

1. **Cada fase abre con una sesión de planificación** (Opus 5.5 en alto, modo plan): revisa lo que
   dejó la anterior (código y «Desvíos»), mide lo que haga falta, parte la fase en tandas en
   `plan/fase-N.md` con la plantilla de abajo y apunta la tanda en curso en el `CLAUDE.md`.
2. **Cada tanda es una sesión nueva** (el modelo y el esfuerzo los dice la propia tanda), en este
   orden:
   1. Leer su encargo ENTERO, y lo que el encargo mande leer.
   2. Hacerla.
   3. **Comprobarla.** Mientras no hay Astro (tandas 1.1 a 1.4), con la verificación que diga la
      tanda. Desde la 1.5, con **`npm run red`** en la raíz: `check` (`astro check` y Biome),
      `build`, `e2e` (Playwright y axe contra `wrangler pages dev dist`) y `lighthouse` (contra
      `lighthouse.budgets.json`). Sin verde no hay commit. Un test nuevo se ve en rojo antes de
      creerse el verde.
   4. Actualizar: la casilla de la tanda, la tanda en curso en el `CLAUDE.md` y las reglas nuevas
      que hayan nacido.
   5. **Commit** en español, nombrando los archivos (nunca `git add -A`: lo sin seguimiento que ya
      estaba es de Fritz), con la versión de la tanda: «Descripción (v0.1.T)».
   6. **El push, solo con el OK de Fritz** en esa sesión. Hasta el corte, `main` sigue publicando
      la web vieja: a `main` no va nada que cambie lo que se ve en el dominio.
   7. **El bloque de cierre**, cuando Fritz dice «cierre»: los siete rótulos de §7.5 en
      `siguiente.md` (sobrescribiendo el anterior) y en el chat.
3. La QA en el teléfono es de Fritz y va al cerrar cada tanda que pinte algo.

## Reglas del ciclo

- **Un encargo es autosuficiente.** Quien lo ejecuta no estuvo en la planificación: lo que no está
  escrito, no lo sabe.
- **Una tanda no crece.** Lo que aparece y no estaba va a «Desvíos» de su fase o a una tanda nueva.
- **No se improvisa arquitectura.** Si el plan resulta estar mal, se apunta en «Desvíos», se toma el
  camino mínimo que no hipoteque nada (o se para) y lo decide la siguiente planificación.
- **Código en inglés; lo publicado, sin comentarios** (`~/Projects/CLAUDE.md`). En inglés, los
  nombres de archivo en `src/`, componentes, props, variables, funciones, clases CSS y tokens. En
  español, el texto visible, las URLs y los comentarios del fuente. `dist/` sale sin comentarios,
  salvo avisos de licencia. En `.astro` se comenta con `{/* */}`, nunca con `<!-- -->`.
- **Lo que se afirma, se puede defender en una entrevista.** Cada cifra sale de su fuente (el repo
  del proyecto, la carpeta del cliente, una medida) y se vuelve a contar antes de publicarla:
  caducan rápido. Las reglas de contenido del `CLAUDE.md` (Snugport, DataAnnotation, formación,
  idiomas, nombre profesional) siguen mandando.
- **Regla 13**: nada confidencial de clientes en lo que sube al repo.

## Plantilla de tanda

    ### Tanda N.M — <nombre>   [ ] pendiente | [x] hecha (fecha, commit)
    **Objetivo**: una frase; qué existe al acabar que antes no.
    **Modelo**: Opus 5.5 y el esfuerzo.
    **Leer antes**: archivos y reglas, con ruta (y cuáles ENTEROS).
    **Archivos**: los que se crean y los que se tocan.
    **Reutilizar**: patrón o función que ya existe, con su ruta.
    **Fuera de alcance**: lo que tienta y no entra.
    **Aceptación**: lista comprobable, cada punto con su cifra o su comando.
    **Verificación**: comandos exactos.
    **Qué trae Fritz**: lo que tiene que tener hecho o a mano.
