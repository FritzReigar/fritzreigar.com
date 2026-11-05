# Cierre — portfolio
Fecha: 2026-11-05
Proyecto: portfolio

## 1. De qué va la siguiente
La planificación de la fase 2 (implementación y corte): partir en tandas `plan/fase-2.md` con `plan/spec-visual.md`, sobre el andamio de Astro que ya está en la rama `astro` y con su previa en `fritzreigar-com.pages.dev`.
Es la fase que pinta la web (marco y tokens, portada, fichas, la pieza diferenciadora, el inglés, las imágenes OG), la pone en el dominio (v1.0.0) y pone de acuerdo los CV y LinkedIn.

## 2. El prompt
```
Planificación de la fase 2 del portfolio: implementación y corte.

Lee ENTEROS plan/README.md, plan/fase-1.md (con todos sus «Desvíos», sobre
todo los cinco añadidos de arquitectura y los de la tanda 1.5) y
plan/spec-visual.md; y plan/contenido.md y plan/capturas.md. Antes de
planificar nada, revisa el código de la rama astro (src/, e2e/, scripts/,
public/_headers, la CI): es el patrón que la fase 2 va a copiar. Trabaja en
la rama astro.

Parte la fase en tandas en plan/fase-2.md con la plantilla de
plan/README.md, apunta la tanda en curso en el CLAUDE.md y deja dicho qué
tanda lleva clase (decisión 12: solo la que estrene un concepto que el
estudio no tiene). El corte (v1.0.0) mueve el dominio de portfolio-v1 a
fritzreigar-com: déjalo como una tanda con su lista de pasos y su vuelta
atrás. Regla 13: el repo es público. Sin código en esta sesión; commit
local del plan, y el push solo con mi OK.
```

## 3. Modelo y esfuerzo
Opus 5.5 en alto: es planificación de fase. No hace falta extra alto: el framework ya está estrenado (la 1.5) y la spec está cerrada.

## 4. Cómo abrirla
Sesión nueva en `~/Projects/propios/portfolio`, en modo plan, con la rama `astro` sacada (`git switch astro`).

## 5. Qué traer
- Tu OK para subir a `astro` los dos commits del cierre de la 1.5 (`3af5776` y el de este `siguiente.md`), si no los has subido ya.
- Qué haces con el texto inglés (ver la decisión de abajo).
- Nada más: la foto de busto y las capturas nuevas pueden llegar durante la fase.

## 6. Qué te llevas
- `plan/fase-2.md` con todas las tandas de la fase, cada una con su objetivo, archivos, aceptación y verificación, en orden y con su modelo.
- El `CLAUDE.md` apuntando a la tanda 2.1, y el temario de la clase si alguna tanda la lleva.
- La tanda de corte escrita paso a paso: dominio de `portfolio-v1` a `fritzreigar-com`, producción a `main`, la caché del HTML, las previas de los dos proyectos y la semana de vuelta atrás.

## 7. Decisiones que tomar
- **Subir los commits del cierre de la 1.5 a `astro`.** Recomendada: sí; ese push hace además el primer build con `NODE_VERSION` = `22` fijado, y así queda comprobado.
- **Quién escribe el texto inglés.** Recomendada: Claude lo traduce de `plan/contenido.md` en una tanda propia y tú lo revisas (tienes C1); nada en inglés sale sin tu OK.
- **La foto de busto para Contacto** (4:5, 704 × 880 px o más). Recomendada: traerla cuando la tengas; la spec ya la prevé y sin ella la página se ve bien.
- **Las capturas con la Navidad** (la vitrina y los «después» 1 y 2 de Missphone). Recomendada: rehacerlas si la web sale pasado Reyes.
- **Las previas de `fritzreigar-com`**, que hoy construyen todas las ramas. Recomendada: dejarlas hasta el corte y resolverlas en esa tanda; antes del corte no se empuja nada a `main`.
- **El despliegue de previa `1483e40d` de `portfolio-v1`** (la raíz del repo, con `noindex`). Recomendada: borrarlo tú desde *Implementaciones* cuando quieras; no corre prisa.
- **El caso Missphone de estudioreigar.com también lo cuenta a la baja.** Recomendada: rehacerlo en una sesión del proyecto del estudio, copiando de `plan/contenido.md` § 2.
