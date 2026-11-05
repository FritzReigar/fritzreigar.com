# Cierre — portfolio
Fecha: 2026-11-05
Proyecto: portfolio

## 1. De qué va la siguiente
La tanda 2.2 de `plan/fase-2.md`: las capturas entran al repo como WebP maestras tipadas y con su `alt`, y el texto en español de la portada y de las cuatro fichas pasa a datos (`home.ts` y la colección `cases`).
No pinta nada nuevo: las páginas tienen que decir exactamente lo mismo que antes, ahora leído de los datos, listo para la 2.3.

## 2. El prompt
```
Tanda 2.2 del portfolio: las capturas y las fichas como datos.

Lee ENTEROS plan/README.md y, de plan/fase-2.md, «Punto de partida»,
«Decisiones de la fase», «Reglas de la fase», los «Desvíos» y la tanda 2.2,
y lo que la tanda manda leer. Trabaja en la rama astro. Hazla, compruébala
con npm run red (sin verde no hay commit; un test nuevo se ve en rojo antes
de creerse el verde), marca la casilla, apunta la 2.3 como tanda en curso en
el CLAUDE.md y commit con «(v0.2.2)». El push, solo con mi OK.
```

## 3. Modelo y esfuerzo
Opus 5.5 en medio: es una tanda de ejecución con el esquema decidido (F1 y F2).

## 4. Cómo abrirla
Sesión nueva en `~/Projects/propios/portfolio`, sin modo plan, con la rama `astro` sacada (`git switch astro`).

## 5. Qué traer
- Nada para la tanda: las capturas de origen ya están en `docs/capturas/` (sin subir).
- Antes, la QA de la 2.1 en el teléfono sobre la previa (`fritzreigar-com.pages.dev/no-existe`): el 404, el menú (abrir, cerrar con un enlace y pulsando fuera) y el modo oscuro.

## 6. Qué te llevas
- `src/assets/shots/` con las capturas reducidas (3 MB como mucho) y `src/data/shots.ts` con su `alt`.
- `src/data/home.ts` y los cuatro JSON de `src/content/cases/es/`, con el esquema Zod que valida las claves de captura.
- `Shot.astro` (AVIF y WebP con `<Picture>`) y `e2e/datos.spec.ts`; las páginas, con el mismo texto que hoy.

## 7. Decisiones que tomar
- **La QA de la 2.1 en el teléfono.** Si algo del marco o del 404 no te cuadra, se dice al abrir la 2.2 y va a «Desvíos» antes de seguir. Recomendada: hacerla antes de abrir la 2.2.
- **`www.fritzreigar.com` sigue sin existir**, y el enlace de tu LinkedIn apunta ahí. El corte (2.13) lo arregla; si no quieres esperar, añade `www.fritzreigar.com` como dominio personalizado de `portfolio-v1` en el panel de Cloudflare. Recomendada: hacerlo ya, son dos minutos.
- **El despliegue de previa `1483e40d` de `portfolio-v1`.** Recomendada: borrarlo cuando quieras, o en la limpieza del corte.
- **La 2.8 (el texto inglés) puede adelantarse** a cualquier momento tras la 2.2. Recomendada: en su orden, salvo que te sobre una tarde para revisarlo antes.
