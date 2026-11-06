# Cierre — portfolio
Fecha: 2026-11-06
Proyecto: portfolio

## 1. De qué va la siguiente
La tanda 2.7 de `plan/fase-2.md`: el movimiento, la pieza diferenciadora. Todo en CSS (`src/styles/motion.css`): el nombre que se recompone, el avatar que se dibuja, el óvalo y las flechas de tinta, los carteles y las cifras con el scroll y las bandas que se desplazan.
Es la única tanda con clase: trazar un SVG con CSS (`pathLength`, `stroke-dasharray`, `stroke-dashoffset`), con «Tócalo tú» y tres preguntas en el chat. Las 16 vistas de reposo tienen que seguir pasando sin regenerarlas.

## 2. El prompt
```
Tanda 2.7 del portfolio: el movimiento, la pieza diferenciadora.

Lee ENTEROS plan/README.md y, de plan/fase-2.md, «Punto de partida»,
«Decisiones de la fase», «Reglas de la fase», los «Desvíos» y la tanda 2.7,
y lo que la tanda manda leer. Trabaja en la rama astro. Lleva clase: dámela
corta antes de tocar código, con «Tócalo tú», y espera mis tres respuestas.
Hazla, compruébala con npm run red (sin verde no hay commit; un test nuevo se
ve en rojo antes de creerse el verde; las 16 vistas pasan sin regenerarlas),
marca la casilla, apunta la 2.8 como tanda en curso en el CLAUDE.md y commit
con «(v0.2.7)». El push, solo con mi OK.
```

## 3. Modelo y esfuerzo
Opus 5.5 en **alto**: es la pieza que diferencia la web y la más fácil de romper (el reposo tiene que quedar idéntico sin movimiento).

## 4. Cómo abrirla
Sesión nueva en `~/Projects/propios/portfolio`, sin modo plan, con la rama `astro` sacada (`git switch astro`), y `/model` en Opus 5.5 alto.

## 5. Qué traer
- Un rato tranquilo para la clase: hay que abrir las herramientas del navegador y responder tres preguntas.
- Nada más: la QA en el teléfono va de una vez cuando todo esté hecho (decidido el 2026-11-06).

## 6. Qué te llevas
- La web moviéndose: el nombre y los títulos de ficha que se recomponen al cargar, el avatar que se dibuja, la tinta que se traza y el scroll que cuenta.
- Con «reducir movimiento» del sistema, o en un navegador sin soporte, la web exactamente igual que hoy.
- `e2e/movimiento.spec.ts`, que lo comprueba en las cuatro páginas de la spec.

## 7. Decisiones que tomar
- **`www.fritzreigar.com` sigue sin existir**, y el enlace de tu LinkedIn apunta ahí. El corte (2.13) lo arregla; si no quieres esperar, añade `www.fritzreigar.com` como dominio personalizado de `portfolio-v1` en el panel de Cloudflare. Recomendada: hacerlo ya, son dos minutos.
- **El despliegue de previa `1483e40d` de `portfolio-v1`.** Recomendada: borrarlo en la limpieza del corte.
