# Cierre — portfolio
Fecha: 2026-11-05
Proyecto: portfolio

## 1. De qué va la siguiente
La tanda 2.6 de `plan/fase-2.md`: las dos fichas de Proyectos, Snugtone y Snugport, pintadas como la spec con las piezas de ficha que dejó la 2.5.
Estrena `LayerStack`, la vitrina `single`, `FeatureRows` con captura y el cierre en dos columnas con el botón de descarga; al acabar existen las 16 vistas (4 páginas × 2 anchos × 2 temas).

## 2. El prompt
```
Tanda 2.6 del portfolio: las fichas de Proyectos (Snugtone y Snugport).

Lee ENTEROS plan/README.md y, de plan/fase-2.md, «Punto de partida»,
«Decisiones de la fase», «Reglas de la fase», los «Desvíos» y la tanda 2.6,
y lo que la tanda manda leer. Trabaja en la rama astro. Hazla, compruébala
con npm run red (sin verde no hay commit; un test nuevo se ve en rojo antes
de creerse el verde), marca la casilla, apunta la 2.7 como tanda en curso en
el CLAUDE.md y commit con «(v0.2.6)». El push, solo con mi OK.
```

## 3. Modelo y esfuerzo
Opus 5.5 en medio: es ejecución con la spec, el lienzo y las piezas de la 2.5 delante.

## 4. Cómo abrirla
Sesión nueva en `~/Projects/propios/portfolio`, sin modo plan, con la rama `astro` sacada (`git switch astro`).

## 5. Qué traer
- La QA en el teléfono de las dos fichas de Trabajo sobre la previa (`fritzreigar-com.pages.dev/trabajo/missphone` y `/trabajo/limpiezas-artemisa`), en claro y en oscuro. Lo que no te cuadre se dice al abrir la 2.6 y va a «Desvíos».
- Si aún no la hiciste, la de la portada entera (la 2.3 y la 2.4).

## 6. Qué te llevas
- Las fichas de Snugtone y de Snugport pintadas: vitrina, cita, filas con captura, las capas de Snugtone, sus cinco cifras y el cierre con la descarga.
- Las 16 vistas guardadas como pruebas y las cuatro fichas en la prueba de desbordes.
- Todas las páginas de la web nueva con su aspecto final, quietas: el movimiento llega en la 2.7.

## 7. Decisiones que tomar
- **La QA de las fichas de Trabajo en el teléfono**: el título de Missphone sangra hacia el margen derecho a propósito (como el lienzo) y la vitrina en el móvil enseña solo la captura de escritorio. Recomendada: hacerla antes de abrir la 2.6.
- **`www.fritzreigar.com` sigue sin existir**, y el enlace de tu LinkedIn apunta ahí. El corte (2.13) lo arregla; si no quieres esperar, añade `www.fritzreigar.com` como dominio personalizado de `portfolio-v1` en el panel de Cloudflare. Recomendada: hacerlo ya, son dos minutos.
- **El despliegue de previa `1483e40d` de `portfolio-v1`.** Recomendada: borrarlo cuando quieras, o en la limpieza del corte.
