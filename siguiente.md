# Cierre — portfolio
Fecha: 2026-11-05
Proyecto: portfolio

## 1. De qué va la siguiente
La tanda 2.1 de `plan/fase-2.md`: tokens, Archivo autoalojada y recortada, el marco de todas las páginas (cabecera, menú del móvil, idioma, pie) y el 404 pintado con la spec.
Estrena además el lint de tokens en `npm run red` y las pruebas de vistas (capturas en reposo, solo en local) y de desbordes, que las tandas siguientes van llenando.

## 2. El prompt
```
Tanda 2.1 del portfolio: tokens, la fuente y el marco.

Lee ENTEROS plan/README.md y, de plan/fase-2.md, «Punto de partida»,
«Decisiones de la fase», «Reglas de la fase» y la tanda 2.1, y lo que la
tanda manda leer. Trabaja en la rama astro. Hazla, compruébala con
npm run red (sin verde no hay commit; un test nuevo se ve en rojo antes de
creerse el verde), marca la casilla, apunta la 2.2 como tanda en curso en
el CLAUDE.md y commit con «(v0.2.1)». El push, solo con mi OK.
```

## 3. Modelo y esfuerzo
Opus 5.5 en medio: es una tanda de ejecución con la spec cerrada.

## 4. Cómo abrirla
Sesión nueva en `~/Projects/propios/portfolio`, sin modo plan, con la rama `astro` sacada (`git switch astro`).

## 5. Qué traer
- El OK para bajar `Archivo[wdth,wght].ttf` y `OFL.txt` de `github.com/google/fonts/tree/main/ofl/archivo` (o bajarlos tú a `src/assets/fonts/`).
- El teléfono, para la QA del marco y del 404 sobre la previa (`fritzreigar-com.pages.dev`).

## 6. Qué te llevas
- `tokens.css` y `global.css` con los tokens de la spec, y Archivo servida desde `/fonts/` en un solo woff2 de 95 KB o menos.
- La cabecera, el menú del móvil (que se cierra con un enlace, pulsando fuera y con Escape), el pie y el 404 con su aspecto final, en claro y en oscuro.
- La red con el lint de tokens, las pruebas del marco, las de desbordes y las cuatro vistas del 404.

## 7. Decisiones que tomar
- **Bajar Archivo de Google Fonts.** Recomendada: sí; es OFL y el repo lleva su licencia.
- **`www.fritzreigar.com` no existe hoy**, y el enlace de tu LinkedIn apunta ahí. El corte (2.13) lo arregla; si no quieres esperar, añade ya `www.fritzreigar.com` como dominio personalizado de `portfolio-v1` en el panel. Recomendada: hacerlo ya, son dos minutos.
- **El despliegue de previa `1483e40d` de `portfolio-v1`.** Recomendada: borrarlo cuando quieras, o en la limpieza del corte.
- **La 2.8 (el texto inglés) puede adelantarse** a cualquier momento tras la 2.2. Recomendada: en su orden, salvo que te sobre una tarde para revisarlo antes.
