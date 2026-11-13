# Cierre — portfolio
Fecha: 2026-11-13
Proyecto: portfolio

## 1. De qué va la siguiente
Activar Cloudflare Web Analytics en fritzreigar.com desde el proyecto de Pages, como en el estudio: abrir la CSP, ajustar dos tests y `lighthouse.mjs`, y antes apagar «JavaScript Detections», que es lo que deja buenas prácticas en 92.
Es un encargo suelto, fuera de las fases, y está entero en `plan/analitica.md`.

## 2. El prompt
```
Portfolio: activar Web Analytics desde Pages (opción 1 del 2026-11-13).

Lee plan/README.md, plan/analitica.md entero y «Desarrollo y deploy» y
«Arquitectura» del CLAUDE.md. Sigue los pasos de plan/analitica.md en su
orden. Lo del panel de Cloudflare lo hago yo: me dices qué tocar, un paso
cada vez, y lo compruebas por la API (solo lectura) o con curl antes de
seguir. Trabaja en la rama analitica; tests en rojo antes que la cabecera;
npm run red en verde antes del commit. El push de la rama y el de main,
solo con mi OK en esta sesión.
```

## 3. Modelo y esfuerzo
Opus 5.5 en **medio**: los pasos están escritos y medidos. Si el beacon falla por CORS o la CSP se atasca, se sube a alto.

## 4. Cómo abrirla
Sesión nueva en `~/Projects/propios/portfolio`, sin modo plan, en la rama `main`. No depende de la fecha: puede ir antes o después de la limpieza del corte.

## 5. Qué traer
- El panel de Cloudflare abierto, con la sesión iniciada: la zona fritzreigar.com, Web Analytics de la cuenta y el proyecto de Pages `fritzreigar-com`.
- Un rato seguido: son tres paradas en el panel y dos OK de push (la rama y `main`).

## 6. Qué te llevas
- fritzreigar.com midiendo visitas, rutas y referentes (`t.co` incluido), sin cookies y sin errores de consola.
- Lighthouse en el dominio de vuelta a 100 en buenas prácticas, si la causa del 92 es la que parece.
- `lighthouse.mjs` con `--vpn` y sin sumar visitas falsas al medir con `--dominio`.
- El `CLAUDE.md` y `historia.md` al día.

## 7. Decisiones que tomar
- **La limpieza del corte sigue pendiente**, a partir del 16 de noviembre: borrar `portfolio-v1` y las ramas que sobran. Este cierre ha pisado el suyo; su prompt literal sale con `git show 547f0cf:siguiente.md`. Recomendada: hacerla después de la analítica, en su propia sesión.
- **Qué hacer con `plan/analitica.md` al acabar**. Recomendada: borrarlo; lo cerrado queda en `historia.md`.
- **Si al apagar «JavaScript Detections» el script sigue saliendo**. Recomendada: apuntarlo y seguir con la analítica, que no depende de eso.
- **Las previas `*.pages.dev` también cuentan visitas**. Recomendada: dejarlo y filtrar por host al leer.
- **La QA en un teléfono de verdad y en Safari** sigue sin hacerse. Recomendada: cinco minutos en tu Nothing, y lo mismo en un iPhone si hay uno a mano.
- **Las capturas con Navidad** de Missphone. Recomendada: rehacerlas antes del 6 de enero de 2027 (`plan/capturas.md`).
- **`missphone/CLAUDE.md`** sigue diciendo que se factura por privado. Recomendada: corregirlo la próxima vez que abras Missphone.
- **El Lighthouse de Artemisa** es del 2026-11-04. Recomendada: dejarlo hasta que caduque de verdad.
- **«Al resto de España»**: la web lo dice así y el estudio en inglés dice «in Spain or abroad». Recomendada: dejarlo, salvo que quieras ofrecer trabajo fuera.
