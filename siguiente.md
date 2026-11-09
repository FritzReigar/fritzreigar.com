# Cierre — portfolio
Fecha: 2026-11-09
Proyecto: portfolio

## 1. De qué va la siguiente
La tanda 2.13 de `plan/fase-2.md`, el corte: fritzreigar.com y `www` pasan a servir la web en Astro desde el proyecto de Pages `fritzreigar-com`, con `main` como producción, y la web vieja se queda una semana lista para volver.
Es la última de la fase (v1.0.0). Tocas tú el panel de Cloudflare y la sesión te dice qué hacer y lo comprueba con `curl`.

## 2. El prompt
```
Tanda 2.13 del portfolio: el corte (v1.0.0).

Lee ENTEROS plan/README.md y, de plan/fase-2.md, «Punto de partida»,
«Decisiones de la fase», «Reglas de la fase», los «Desvíos» y la tanda 2.13,
y lo que la tanda manda leer (la decisión 7 de plan/README.md, los dos
últimos Desvíos de plan/fase-1.md y «Ojo con la caché» del CLAUDE.md).
Trabaja desde la rama astro. No lleva clase. Comprueba primero el «Antes de
empezar»: si algo falta, no se corta y me lo dices. Lo del panel de
Cloudflare lo hago yo: me dices qué tocar, un paso cada vez, y lo compruebas
con curl antes de seguir. Sin el paso 1 (pausar portfolio-v1) no hay push a
main. Cada push, de main o del tag, solo con mi OK en esta sesión. Al acabar,
los puntos del paso 6 con su salida de curl en el chat, marca la casilla,
reescribe el CLAUDE.md para la web en Astro y lleva lo cerrado a historia.md.
```

## 3. Modelo y esfuerzo
Opus 5.5 en **alto**: es dominio, DNS y caché, y un fallo se ve en la web publicada.

## 4. Cómo abrirla
Sesión nueva en `~/Projects/propios/portfolio`, sin modo plan, con la rama `astro` sacada (`git switch astro`), y `/model` en Opus 5.5 alto.

## 5. Qué traer
- Tu OK a la previa entera (`fritzreigar-com.pages.dev`), dado antes de empezar: el plan lo pide para cortar.
- El panel de Cloudflare abierto, con la sesión iniciada.
- Una hora sin prisa, y estar para dar el OK a cada push.

## 6. Qué te llevas
- fritzreigar.com sirviendo la web en Astro desde `fritzreigar-com`, con `main` como producción, el tag `v1.0.0` y `main` igual a `astro`.
- `www.fritzreigar.com` redirigiendo a la raíz con un 301, así que el enlace de LinkedIn vuelve a funcionar.
- La regla de caché del HTML revisada, para que dejes de ver la versión vieja durante horas.
- Los CV nuevos servidos en el dominio, y `/CLAUDE.md` y `/plan/` dando 404.
- `portfolio-v1` pausado con la web vieja, como vuelta atrás durante una semana.
- `CLAUDE.md` reescrito para la web en Astro e `historia.md` con lo cerrado de la web vieja.

## 7. Decisiones que tomar
- **La QA en el móvil sigue siendo emulada**: ni un teléfono de verdad ni Safari. Recomendada: antes del corte, cinco minutos en tu Nothing sobre la previa (la portada, una ficha y el menú, en los dos idiomas) y, si hay un iPhone a mano, lo mismo en Safari.
- **El Lighthouse de Artemisa** es del 2026-11-04, y repetirlo pide tu VPN y bloquear su Analytics. Recomendada: dejarlo; aún no es viejo.
- **El banner de LinkedIn** sigue en rojo y con la frase «Web & Product · Snugport · AI Model QA», que ya no es tu titular. Recomendada: pasarlo a cobalto con el texto nuevo, en una tarea aparte después del corte.
- **`missphone/CLAUDE.md`** sigue diciendo que se factura por privado. Recomendada: corregirlo la próxima vez que abras Missphone.
- **«Al resto de España»**: la web lo dice así y el estudio en inglés dice «in Spain or abroad». Recomendada: dejarlo, salvo que quieras ofrecer trabajo fuera; entonces cambian los dos textos.
- **Para el corte, no ahora:**
  - mirar las imágenes OG en WhatsApp cuando el dominio las sirva;
  - la caché de una semana para `/og/*`;
  - borrar el despliegue de previa `1483e40d` de `portfolio-v1`, pasada la semana;
  - si el corte se fuera más allá del 6 de enero, rehacer las capturas de Missphone con Navidad.
