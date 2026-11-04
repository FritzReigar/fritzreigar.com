# Cierre — portfolio
Fecha: 2026-11-04
Proyecto: portfolio

## 1. De qué va la siguiente
Tanda 1.1 de `plan/fase-1.md`: el texto entero de la web nueva en español (portada, las cuatro fichas, el 404, meta, OG y JSON-LD), con la fuente de cada afirmación, en `plan/contenido.md`. Missphone se cuenta por fases, como tienda heredada, y el «Posicionamiento» del `CLAUDE.md` se reescribe con el enfoque freelance.
Sin código: la web publicada no se toca.

## 2. El prompt
```
Tanda 1.1 del portfolio: el contenido, en español y verificado.

Lee ENTEROS plan/README.md y la tanda 1.1 de plan/fase-1.md, y lo que la
tanda mande leer. Hazla entera: sale plan/contenido.md con cada afirmación y
su fuente, la lista «Choques con el CV» y el CLAUDE.md con el posicionamiento
nuevo. Las fichas de Missphone y de Artemisa me las enseñas antes de darlas
por buenas. Recuerda la regla 13: el repo es público. Commit local al acabar;
el push, solo con mi OK.
```

## 3. Modelo y esfuerzo
Opus 5.5 en medio: es una tanda de ejecución.

## 4. Cómo abrirla
Sesión nueva en `~/Projects/propios/portfolio`, sin modo plan.

## 5. Qué traer
- Dos líneas de qué es para ti lo mejor de Missphone: es lo que tiene que ver quien llegue a la ficha.
- Tu titular para el hero, si tienes uno; si no, se propone.
- Un rato para dar el OK a lo que se dice de Missphone y de Artemisa.

## 6. Qué te llevas
`plan/contenido.md` con todo el texto de la web nueva en español y sus fuentes, la lista de choques con el CV para la tanda de coherencia de la fase 2, y el `CLAUDE.md` con el posicionamiento freelance. La siguiente es la 1.2 (capturas, con la VPN puesta para Missphone).

## 7. Decisiones que tomar
- Push del commit del plan (`7a4e7f2`) y de este cierre a `main`: publica `plan/` en el dominio, como ya pasa con el `CLAUDE.md`, hasta el corte a Astro. Recomendada: sí; el repo ya es público.
- El caso Missphone de estudioreigar.com también lo cuenta a la baja. Recomendada: arreglarlo en una sesión del proyecto del estudio cuando la 1.1 tenga el texto aprobado, para copiar de ahí lo que sirva.
- Para la 1.5, el nombre del proyecto de Pages que sirve hoy fritzreigar.com (panel de Cloudflare → Workers y Pages). Recomendada: mirarlo con calma antes de esa tanda; no corre prisa.
