# Cierre — portfolio
Fecha: 2026-11-06
Proyecto: portfolio

## 1. De qué va la siguiente
La tanda 2.9 de `plan/fase-2.md`: el inglés, en la web. Se monta `plan/contenido-en.md` tal cual en las seis páginas de `/en/` (portada, cuatro fichas y 404), con hreflang recíproco, el enlace de idioma visible y las inglesas en el sitemap y en Lighthouse.
Es código (v0.2.9). El texto no se toca: si algo no cuadra al montarlo, va a «Desvíos».

## 2. El prompt
```
Tanda 2.9 del portfolio: el inglés, en la web.

Lee ENTEROS plan/README.md y, de plan/fase-2.md, «Punto de partida»,
«Decisiones de la fase», «Reglas de la fase», los «Desvíos» y la tanda 2.9,
y lo que la tanda manda leer (plan/contenido-en.md entero, sin cambiarle el
texto). Trabaja en la rama astro. No lleva clase. npm run red en verde antes
del commit, marca la casilla, apunta la 2.10 como tanda en curso en el
CLAUDE.md y commit con su versión (v0.2.9). El push, solo con mi OK.
```

## 3. Modelo y esfuerzo
Opus 5.5 en **medio**: es montar datos en piezas que ya existen y probarlas.

## 4. Cómo abrirla
Sesión nueva en `~/Projects/propios/portfolio`, sin modo plan, con la rama `astro` sacada (`git switch astro`), y `/model` en Opus 5.5 medio.

## 5. Qué traer
- Nada. La tanda pide la QA en el teléfono en inglés, pero desde el 2026-11-06 la QA en el teléfono va de una vez cuando todo esté hecho (`plan/README.md`, el ciclo, punto 3).

## 6. Qué te llevas
- Las doce páginas en los dos idiomas: `/en/` con su portada, sus cuatro fichas y su 404, el formulario en inglés y el JSON-LD en inglés.
- Hreflang recíproco con `x-default`, el sitemap con las diez indexables, y Lighthouse y axe pasando también por las inglesas.
- Fuera `notYetText` y el aviso «not available in English yet».

## 7. Decisiones que tomar
- **`www.fritzreigar.com` sigue sin existir** (NXDOMAIN, comprobado hoy otra vez), y el enlace de tu LinkedIn apunta ahí. El corte (2.13) lo arregla; si no quieres esperar, añade `www.fritzreigar.com` como dominio personalizado de `portfolio-v1` en el panel de Cloudflare. Recomendada: hacerlo ya, son dos minutos.
- **El LCP en móvil no es el cartel** (Desvío de la 2.7). Recomendada: dejarlo para la 2.11 (QA); el rendimiento ya está en 99-100.
- **El despliegue de previa `1483e40d` de `portfolio-v1`.** Recomendada: borrarlo en la limpieza del corte.
- **Para la 2.12, no ahora** (Desvío de la 2.8): el «Higher National Diploma» del DAM en `cv-en.html`, que se lee como título obtenido; británico frente a americano entre CV y web; y «al resto de España» frente al «in Spain or abroad» del estudio.
