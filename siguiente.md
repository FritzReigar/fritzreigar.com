# Cierre — portfolio
Fecha: 2026-11-07
Proyecto: portfolio

## 1. De qué va la siguiente
La tanda 2.10 de `plan/fase-2.md`: las imágenes OG con Satori. Cada una de las diez páginas indexables tiene su imagen para compartir de 1200 × 630 en su idioma, hecha en el build con la ruta del estudio.
Es código (v0.2.10). La composición es el cartel de la web, con los colores leídos de `tokens.css`.

## 2. El prompt
```
Tanda 2.10 del portfolio: las imágenes OG con Satori.

Lee ENTEROS plan/README.md y, de plan/fase-2.md, «Punto de partida»,
«Decisiones de la fase», «Reglas de la fase», los «Desvíos» y la tanda 2.10,
y lo que la tanda manda leer (la ruta de OG del estudio y su tanda 4.8
enteras). Trabaja en la rama astro. No lleva clase. npm run red en verde
antes del commit, mándame las diez imágenes, marca la casilla, apunta la
2.11 como tanda en curso en el CLAUDE.md y commit con su versión (v0.2.10).
El push, solo con mi OK.
```

## 3. Modelo y esfuerzo
Opus 5.5 en **medio**: es copiar casi entera la ruta del estudio y adaptarla.

## 4. Cómo abrirla
Sesión nueva en `~/Projects/propios/portfolio`, sin modo plan, con la rama `astro` sacada (`git switch astro`), y `/model` en Opus 5.5 medio.

## 5. Qué traer
- Tiempo para mirar las diez imágenes al final: la tanda pide tu OK antes del commit.

## 6. Qué te llevas
- `dist/og/es/*.png` y `dist/og/en/*.png`, una por página indexable, de 1200 × 630 y como mucho 150 KB cada una.
- Cada página indexable con su `og:image` absoluta (con `width`, `height` y `alt`) y `twitter:card` en `summary_large_image`.
- El texto de OG de cada página e idioma, en `routes.ts`, y las instancias TTF de Archivo que saca `scripts/fuente.py --og`.

## 7. Decisiones que tomar
- **`www.fritzreigar.com` sigue sin existir**: hoy da otra vez NXDOMAIN, y el enlace de tu LinkedIn apunta ahí. El corte (2.13) lo arregla. Recomendada: no esperar y añadir `www.fritzreigar.com` como dominio personalizado de `portfolio-v1` en el panel de Cloudflare; son dos minutos.
- **El LCP en móvil no es el cartel** (Desvío de la 2.7). Recomendada: dejarlo para la 2.11 (QA), porque el rendimiento ya está en 99-100 en las diez páginas.
- **El despliegue de previa `1483e40d` de `portfolio-v1`.** Recomendada: borrarlo en la limpieza del corte.
- **Para la 2.12, no ahora** (Desvío de la 2.8):
  - El «Higher National Diploma» del DAM en `cv-en.html`, que se lee como título obtenido.
  - Inglés británico o americano, para que CV y web digan lo mismo.
  - «al resto de España» frente al «in Spain or abroad» del estudio.
