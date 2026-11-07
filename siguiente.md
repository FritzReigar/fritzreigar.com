# Cierre — portfolio
Fecha: 2026-11-07
Proyecto: portfolio

## 1. De qué va la siguiente
La tanda 2.11 de `plan/fase-2.md`: QA, las fuentes lentas y las cifras. La web aguanta la fuente retrasada sin saltos, se recorre como visitante en siete anchos y con teclado, y cada cifra se recuenta en su fuente.
Es código (v0.2.11): crea `e2e/fuentes.spec.ts`, ajusta presupuestos con su porqué y borra `assets/img/proyectos/`. Deja la web lista para la coherencia (2.12) y el corte (2.13).

## 2. El prompt
```
Tanda 2.11 del portfolio: QA, las fuentes lentas y las cifras.

Lee ENTEROS plan/README.md y, de plan/fase-2.md, «Punto de partida»,
«Decisiones de la fase», «Reglas de la fase», los «Desvíos» y la tanda 2.11,
y lo que la tanda manda leer (la tanda 6.11 del estudio entera y spec-visual
§ 8). Trabaja en la rama astro. No lleva clase. Las cifras de Snugport y
Snugtone se recuentan en sus repos antes de tocar nada. npm run red en verde
antes del commit, marca la casilla, apunta la 2.12 como tanda en curso en el
CLAUDE.md y commit con su versión (v0.2.11). La QA en el teléfono la hago yo
sobre la previa cuando me avises. El push, solo con mi OK.
```

## 3. Modelo y esfuerzo
Opus 5.5 en **medio**: es medir y recorrer, con el método de la 6.11 del estudio ya escrito.

## 4. Cómo abrirla
Sesión nueva en `~/Projects/propios/portfolio`, sin modo plan, con la rama `astro` sacada (`git switch astro`), y `/model` en Opus 5.5 medio.

## 5. Qué traer
- El teléfono y un rato para la QA de la previa entera (`fritzreigar-com.pages.dev`), los dos idiomas: es la única vez que se hace antes del corte.
- Nada de WhatsApp todavía: la `og:image` apunta a `fritzreigar.com/og/…`, que hasta el corte da 404 (comprobado el 2026-11-07). Compartir la previa sale sin imagen; la prueba de WhatsApp va en el corte (2.13).

## 6. Qué te llevas
- `e2e/fuentes.spec.ts`: CLS ≤ 0,01 con `archivo.woff2` retrasada 800 ms en las cuatro páginas de la spec, a 412, 1024 y 1440.
- La web recorrida a 360, 768, 900, 1024, 1280, 1920 y 2560, con teclado, menú del móvil y los dos idiomas; lo que salga, arreglado o en «Desvíos».
- Lighthouse ≥ 95 y el resto 100 en las diez indexables, y cada cifra de la web con la fecha de su recuento en `contenido.md`.
- `assets/img/proyectos/` fuera de la rama (`git ls-files assets/` vacío).

## 7. Decisiones que tomar
- **`www.fritzreigar.com` sigue sin existir** (NXDOMAIN hoy, 2026-11-07), y el enlace de tu LinkedIn apunta ahí. Recomendada: no esperar al corte y añadirlo como dominio personalizado de `portfolio-v1` en el panel de Cloudflare; son dos minutos.
- **Las imágenes OG**: tomé tu «push» como OK a las diez. En la vista compacta de WhatsApp los títulos largos de las fichas pierden algo por los lados (la portada entra entera). Recomendada: dejarlas así, como en el estudio, y mirarlas en WhatsApp en el corte, que es cuando el dominio las sirve; si entonces no te convence, se estrecha la columna (títulos más pequeños en LinkedIn y X) y se sube `?v=` en la `og:image`.
- **El LCP en móvil no es el cartel** (Desvío de la 2.7): la 2.11 lo decide. Recomendada: aceptarlo y corregir spec § 4, porque el rendimiento está en 99-100 en las diez páginas.
- **La caché de `/og/*`**: hoy sale con la de Pages por defecto. Recomendada: ponerle la de una semana del estudio en el corte (2.13).
- **El despliegue de previa `1483e40d` de `portfolio-v1`.** Recomendada: borrarlo en la limpieza del corte.
- **Para la 2.12, no ahora** (Desvío de la 2.8):
  - El «Higher National Diploma» del DAM en `cv-en.html`, que se lee como título obtenido.
  - Inglés británico o americano, para que CV y web digan lo mismo.
  - «al resto de España» frente al «in Spain or abroad» del estudio.
