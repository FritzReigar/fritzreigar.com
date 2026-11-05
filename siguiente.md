# Cierre — portfolio
Fecha: 2026-11-05
Proyecto: portfolio

## 1. De qué va la siguiente
La tanda 2.5 de `plan/fase-2.md`: las dos fichas de Trabajo, Missphone y Limpiezas Artemisa, pintadas como la spec con la plantilla común de ficha (`CaseHero`, `CaseShowcase` y `CaseBody` partido en una pieza por bloque).
Missphone estrena las parejas de antes y después con su flecha, las cifras y las fases; Artemisa se monta con las mismas piezas, sin ninguna nueva.

## 2. El prompt
```
Tanda 2.5 del portfolio: las fichas de Trabajo (Missphone y Limpiezas
Artemisa).

Lee ENTEROS plan/README.md y, de plan/fase-2.md, «Punto de partida»,
«Decisiones de la fase», «Reglas de la fase», los «Desvíos» y la tanda 2.5,
y lo que la tanda manda leer. Trabaja en la rama astro. Hazla, compruébala
con npm run red (sin verde no hay commit; un test nuevo se ve en rojo antes
de creerse el verde), marca la casilla, apunta la 2.6 como tanda en curso en
el CLAUDE.md y commit con «(v0.2.5)». El push, solo con mi OK.
```

## 3. Modelo y esfuerzo
Opus 5.5 en medio: es ejecución con la spec y el lienzo delante, aunque es la tanda con más piezas de la fase (nueve componentes de ficha).

## 4. Cómo abrirla
Sesión nueva en `~/Projects/propios/portfolio`, sin modo plan, con la rama `astro` sacada (`git switch astro`).

## 5. Qué traer
- La QA en el teléfono de la portada entera sobre la previa (`fritzreigar-com.pages.dev`), en claro y en oscuro: la 2.3 (hero, banda del estudio, Trabajo, bandas y Proyectos) y lo nuevo de la 2.4, que es Cómo trabajo, Trayectoria (en el móvil, una ficha por puesto) y Contacto.
- Si quieres, un envío real de prueba desde el formulario de la previa: te llega al correo y es la única forma de ver Formspree de punta a punta (las pruebas lo interceptan siempre).

## 6. Qué te llevas
- Las fichas de Missphone y de Limpiezas Artemisa pintadas: vitrina celeste, cita, «Cómo me la encontré», las cinco parejas de antes y después, las cifras, las fases y el cierre en tres columnas.
- Las piezas de ficha que reutilizan Snugtone y Snugport en la 2.6.
- Las cuatro vistas de Missphone guardadas y las dos fichas en la prueba de desbordes.

## 7. Decisiones que tomar
- **La QA de la portada en el teléfono**: con la 2.4 ya está entera. Lo que no te cuadre se dice al abrir la 2.5 y va a «Desvíos». Recomendada: hacerla antes de abrir la 2.5.
- **El envío real de prueba**: el formulario usa el mismo `action` de hoy, así que debería llegarte igual que ahora. Recomendada: uno, desde la previa, para quedarte tranquilo.
- **`www.fritzreigar.com` sigue sin existir**, y el enlace de tu LinkedIn apunta ahí. El corte (2.13) lo arregla; si no quieres esperar, añade `www.fritzreigar.com` como dominio personalizado de `portfolio-v1` en el panel de Cloudflare. Recomendada: hacerlo ya, son dos minutos.
- **El despliegue de previa `1483e40d` de `portfolio-v1`.** Recomendada: borrarlo cuando quieras, o en la limpieza del corte.
