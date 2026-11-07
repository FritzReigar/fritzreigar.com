# Cierre — portfolio
Fecha: 2026-11-07
Proyecto: portfolio

## 1. De qué va la siguiente
La tanda 2.12 de `plan/fase-2.md`: la coherencia. Los dos CV dejan de contradecir a la web nueva, pasan al cobalto, caben en dos A4 justas y se reexportan los PDF que sirve la web. Además, te dejo en `docs/linkedin-cambios.md` la lista de lo que hay que cambiar en LinkedIn.
Es sobre todo contenido, decidido contigo fila a fila en «Choques con el CV» (v0.2.12). Después solo queda el corte (2.13).

## 2. El prompt
```
Tanda 2.12 del portfolio: la coherencia, los dos CV y LinkedIn.

Lee ENTEROS plan/README.md y, de plan/fase-2.md, «Punto de partida»,
«Decisiones de la fase», «Reglas de la fase», los «Desvíos» y la tanda 2.12,
y lo que la tanda manda leer (el CLAUDE.md, «Choques con el CV» de
plan/contenido.md, docs/cv/cv-es.html y las tres memorias). Trabaja en la
rama astro. No lleva clase. Las filas que dicen «decidir» me las preguntas
en el chat antes de tocar el CV; las demás, con tu recomendación. Los dos
PDF, de dos páginas contadas con el comando del CLAUDE.md. npm run red en
verde antes del commit, marca la casilla, apunta la 2.13 como tanda en
curso en el CLAUDE.md y commit con su versión (v0.2.12). LinkedIn no lo
tocas: me dejas la lista. El push, solo con mi OK.
```

## 3. Modelo y esfuerzo
Opus 5.5 en **medio**: es texto y maquetación de un CV que ya existe, con las decisiones tomadas contigo.

## 4. Cómo abrirla
Sesión nueva en `~/Projects/propios/portfolio`, sin modo plan, con la rama `astro` sacada (`git switch astro`), y `/model` en Opus 5.5 medio.

## 5. Qué traer
- Las decisiones de las filas abiertas de «Choques con el CV»: sobre todo el titular (fila 1: CV de producto o freelance) y si Missphone sale o no en la entrada del estudio (fila 10).
- Un rato para mirar los dos PDF antes de dar el OK.
- Nada de LinkedIn abierto: la sesión solo te deja la lista, y los cambios los haces tú.

## 6. Qué te llevas
- `docs/cv/cv-es.html` y `cv-en.html` sin contradicciones con la web, en cobalto `#1f4fa3`, y con las mismas fechas, idiomas, formación y nombres que la web.
- `public/assets/cv/fritz-reigar-cv.pdf` y `fritz-reigar-cv-en.pdf` reexportados, de dos páginas cada uno.
- La lista de choques de `plan/contenido.md` marcada como resuelta, fila a fila.
- `docs/linkedin-cambios.md`: titular, «Acerca de», el puesto del estudio y los proyectos, en inglés y con el texto exacto de cada cambio.

## 7. Decisiones que tomar
- **La QA en el móvil la hice emulada** (Chromium a 412 y 360, perfil de Android), no en un teléfono de verdad, y Safari no está probado. Recomendada: antes del corte, cinco minutos en tu Nothing sobre `fritzreigar-com.pages.dev` (la portada, una ficha y el menú, en los dos idiomas) y, si hay un iPhone a mano, lo mismo en Safari.
- **Android, con la fuente lenta**: allí no hay Arial ni Liberation, así que la letra provisional sigue siendo la del sistema y la página puede saltar más que en Windows o Mac mientras carga Archivo. Recomendada: dejarlo así. Solo pasa con una conexión lenta y en la primera visita, y la precarga ya lo acorta.
- **`www.fritzreigar.com` sigue sin existir** (NXDOMAIN hoy, 2026-11-07), y el enlace de tu LinkedIn apunta ahí. Recomendada: añadirlo ya como dominio personalizado de `portfolio-v1` en el panel de Cloudflare, sin esperar al corte. Son dos minutos, y la lista de LinkedIn de la 2.12 da por hecho que existe.
- **El Lighthouse de Artemisa** es del 2026-11-04. Repetirlo pide tu VPN y bloquear su Analytics. Recomendada: solo si la planificación del corte lo quiere fresco; tres días no lo hacen viejo.
- **Para el corte (2.13), no ahora:**
  - mirar las imágenes OG en WhatsApp cuando el dominio las sirva;
  - la caché de una semana para `/og/*`;
  - borrar el despliegue de previa `1483e40d` de `portfolio-v1`;
  - si el corte se fuera más allá del 6 de enero, rehacer las capturas de Missphone con Navidad.
