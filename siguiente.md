# Cierre — portfolio
Fecha: 2026-11-04
Proyecto: portfolio

## 1. De qué va la siguiente
Tanda 1.4 de `plan/fase-1.md`: el lienzo II. Partiendo de la mezcla A + C elegida (`docs/lienzo/concepto-ac*.html`), se pulen y dibujan cuatro páginas tipo en `docs/lienzo/final.html`: la portada, la ficha de Missphone, la de Snugtone y el 404. Cada una a 390 y a 1440, en claro y en oscuro.
Se escribe `plan/spec-visual.md`, que tiene que bastar para implementar la web en Astro sin mirar el prototipo. Sin Astro todavía.

## 2. El prompt
```
Tanda 1.4 del portfolio: lienzo II, la vuelta y la spec.

Lee ENTEROS plan/README.md, la tanda 1.4 de plan/fase-1.md, sus
«Decisiones del lienzo» y sus «Desvíos», y lo que la tanda mande leer
(plan/contenido.md y, como modelo, la spec-visual.md del estudio). Parte de
la mezcla A + C: docs/lienzo/concepto-ac.html, concepto-ac-missphone.html,
concepto-ac.css y base.css; las herramientas de captura están en
docs/lienzo/herramientas/. Carga las skills frontend-design y taste-skill.
Aligera el avatar vectorizado (hoy 228 KB) y deja Contacto preparado para
una foto real opcional que aún no existe. Dibuja la portada, Missphone,
Snugtone y el 404 en docs/lienzo/final.html y escribe plan/spec-visual.md.
Mándame las 16 capturas (4 páginas × 2 anchos × 2 temas). Regla 13: el repo
es público. Commit local al acabar; el push, solo con mi OK.
```

## 3. Modelo y esfuerzo
Opus 5.5 en alto: es lienzo de diseño y spec.

## 4. Cómo abrirla
Sesión nueva en `~/Projects/propios/portfolio`, sin modo plan.

## 5. Qué traer
- Un rato para revisar las 16 vistas y dar el OK al lienzo final.
- Si ya la tienes, la foto de busto para Contacto (1000 px de lado o más). Si no, no hace falta: la página se ve bien sin ella.

## 6. Qué te llevas
- `docs/lienzo/final.html` con las cuatro páginas tipo acabadas.
- `plan/spec-visual.md` con:
  - tokens con su contraste medido;
  - tipografía y retícula;
  - componentes y movimiento;
  - presupuesto de KB y de Lighthouse;
  - tamaños de las imágenes.
- El avatar aligerado.

Con eso se puede planificar la fase 2 (la web en Astro y el corte). Antes queda la 1.5, el andamio de Astro, que no depende del lienzo.

## 7. Decisiones que tomar
- **El push de los commits del lienzo** (`32684d5`, `dfc5e8e` y el de este cierre). Recomendada: subirlos ya, porque solo tocan `plan/`, `CLAUDE.md` y este archivo.
- **Cómo aligerar el avatar.** Recomendada: simplificar los trazos y dejar el sombreado de la barba como capa ligera, animando solo la línea. Si con eso no baja de unos 60 KB, sacarlo a un archivo aparte.
- **Las capturas con la Navidad** (la vitrina y los «después» 1 y 2 de Missphone). Recomendada: dejarlas así para el lienzo y rehacerlas en la fase 2 si la web sale pasado Reyes.
- **El caso Missphone de estudioreigar.com también lo cuenta a la baja.** Recomendada: rehacerlo en una sesión del proyecto del estudio, copiando de `plan/contenido.md` § 2.
- **Para la 1.5, el nombre del proyecto de Pages** que sirve hoy fritzreigar.com (panel de Cloudflare → Workers y Pages). Recomendada: mirarlo antes de esa tanda.
