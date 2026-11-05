# Cierre — portfolio
Fecha: 2026-11-05
Proyecto: portfolio

## 1. De qué va la siguiente
La tanda 2.4 de `plan/fase-2.md`: la portada queda entera, con Cómo trabajo, Trayectoria (tabla que pasa a fichas en el móvil) y Contacto pintados como la spec.
El formulario envía por `fetch` a Formspree con sus tres estados (enviando, enviado y error) y sigue funcionando sin JS.

## 2. El prompt
```
Tanda 2.4 del portfolio: la portada II (Cómo trabajo, Trayectoria y
Contacto, con el formulario).

Lee ENTEROS plan/README.md y, de plan/fase-2.md, «Punto de partida»,
«Decisiones de la fase», «Reglas de la fase», los «Desvíos» y la tanda 2.4,
y lo que la tanda manda leer. Trabaja en la rama astro. Hazla, compruébala
con npm run red (sin verde no hay commit; un test nuevo se ve en rojo antes
de creerse el verde), marca la casilla, apunta la 2.5 como tanda en curso en
el CLAUDE.md y commit con «(v0.2.4)». El push, solo con mi OK.
```

## 3. Modelo y esfuerzo
Opus 5.5 en medio: es una tanda de ejecución con la spec, el lienzo y el envío del estudio como modelo.

## 4. Cómo abrirla
Sesión nueva en `~/Projects/propios/portfolio`, sin modo plan, con la rama `astro` sacada (`git switch astro`).

## 5. Qué traer
- La QA de la 2.3 en el teléfono sobre la previa (`fritzreigar-com.pages.dev`): el hero con el avatar, «Acepto proyectos» y los dos botones en la primera pantalla; la banda del estudio; las tarjetas (que se pulsan enteras); las bandas de capturas y Proyectos; en claro y en oscuro. Lo de abajo de Proyectos aún va sin estilo, a propósito.
- Si quieres, un envío real de prueba desde la previa al acabar la 2.4 (te llega al correo).

## 6. Qué te llevas
- La portada entera: Cómo trabajo (cuatro principios en dos columnas), Trayectoria (tabla, con formación, idiomas y el CV discreto) y Contacto con el formulario.
- `main.ts` enviando por `fetch` con «Enviando…», «enviado» (`role="status"`) y error (`role="alert"`, sin perder lo escrito), en 3 KB de gzip o menos.
- `formulario.spec.ts` con el envío sin JS, el 200 y el 500 interceptados, y las cuatro vistas de la portada completa regeneradas.

## 7. Decisiones que tomar
- **La QA de la 2.3 en el teléfono**: es la primera tanda que pinta la portada nueva. Lo que no te cuadre se dice al abrir la 2.4 y va a «Desvíos». Recomendada: hacerla antes de abrir la 2.4.
- **El presupuesto bruto del documento subió de 100 a 120 KB en Lighthouse** (la portada pesa 111,4 KB brutos y 28,7 en gzip; el tope de la spec, 32 en gzip, se cumple). Está en «Desvíos» y en la cabecera de `scripts/lighthouse.mjs`. Recomendada: darlo por bueno; si la 2.4 se acerca a 120, primero se recorta el `srcset` de las bandas.
- **`www.fritzreigar.com` sigue sin existir**, y el enlace de tu LinkedIn apunta ahí. El corte (2.13) lo arregla; si no quieres esperar, añade `www.fritzreigar.com` como dominio personalizado de `portfolio-v1` en el panel de Cloudflare. Recomendada: hacerlo ya, son dos minutos.
- **El despliegue de previa `1483e40d` de `portfolio-v1`.** Recomendada: borrarlo cuando quieras, o en la limpieza del corte.
