# Cierre — portfolio
Fecha: 2026-11-06
Proyecto: portfolio

## 1. De qué va la siguiente
La tanda 2.8 de `plan/fase-2.md`: el texto inglés. Sale `plan/contenido-en.md` con todo lo visible de la web en inglés (bloques, `alt`, metadatos, 404, formulario y JSON-LD), adaptado y no calcado, con las cifras en formato inglés.
No toca código. Nada en inglés se publica sin tu OK (decisión F0): la sesión acaba cuando lo das, bloque a bloque o entero.

## 2. El prompt
```
Tanda 2.8 del portfolio: el texto inglés.

Lee ENTEROS plan/README.md y, de plan/fase-2.md, «Punto de partida»,
«Decisiones de la fase», «Reglas de la fase», los «Desvíos» y la tanda 2.8,
y lo que la tanda manda leer. Trabaja en la rama astro. No lleva clase.
Escribe plan/contenido-en.md con el mismo índice que plan/contenido.md y
enséñamelo para que lo corrija; sin mi OK en el chat no se cierra. Pasa el
grep de la regla 13, marca la casilla, apunta la 2.9 como tanda en curso en
el CLAUDE.md y commit «(sin versión: solo documentación)». El push, solo con
mi OK.
```

## 3. Modelo y esfuerzo
Opus 5.5 en **medio**: es texto, no código, y la revisión fina la haces tú (tienes C1).

## 4. Cómo abrirla
Sesión nueva en `~/Projects/propios/portfolio`, sin modo plan, con la rama `astro` sacada (`git switch astro`), y `/model` en Opus 5.5 medio.

## 5. Qué traer
- Un rato para leer el inglés entero y corregirlo: es lo que cierra la tanda.
- Nada más: la QA en el teléfono, con y sin «reducir movimiento», va de una vez cuando todo esté hecho.

## 6. Qué te llevas
- `plan/contenido-en.md` con tu OK: todo el texto inglés de la portada y las cuatro fichas, listo para que la 2.9 lo monte sin escribir una línea.
- La nav inglesa confirmada (Work, Projects, How I work, Career, Contact, Español).

## 7. Decisiones que tomar
- **El LCP en móvil no es el cartel** (Desvío de la 2.7): en la portada es la entradilla y en tres fichas la vitrina. No lo causa el movimiento y el rendimiento sigue en 99-100. Recomendada: dejarlo para la 2.11 (QA) y no tocar el diseño por una métrica que ya está en verde.
- **`www.fritzreigar.com` sigue sin existir** (NXDOMAIN, comprobado hoy), y el enlace de tu LinkedIn apunta ahí. El corte (2.13) lo arregla; si no quieres esperar, añade `www.fritzreigar.com` como dominio personalizado de `portfolio-v1` en el panel de Cloudflare. Recomendada: hacerlo ya, son dos minutos.
- **El despliegue de previa `1483e40d` de `portfolio-v1`.** Recomendada: borrarlo en la limpieza del corte.
