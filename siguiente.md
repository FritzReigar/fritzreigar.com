# Cierre — portfolio
Fecha: 2026-11-09
Proyecto: portfolio

## 1. De qué va la siguiente
La limpieza del corte, a partir del 16 de noviembre: si la semana ha ido sin incidencias, se borra la web vieja (`portfolio-v1`) y las ramas que sobran, y se quita del `CLAUDE.md` lo de la vuelta atrás.
Es corta y no toca la web. Las fases del plan están cerradas: no hay tanda en curso después de esta.

## 2. El prompt
```
Portfolio: la limpieza del corte (v1.0.0, 2026-11-09).

Lee plan/README.md, el «Pasada la semana sin incidencias» de la tanda 2.13
en plan/fase-2.md y «Desarrollo y deploy» del CLAUDE.md. Trabaja en main.
Primero comprueba con curl que el dominio sigue bien (portada 200, sin
X-Robots-Tag, cf-cache-status DYNAMIC, www con 301 a la raíz) y que hemos
pasado del 2026-11-16; si no, paras y me lo dices. Lo del panel de Cloudflare
lo hago yo: me dices qué tocar, un paso cada vez, y lo compruebas con curl
antes de seguir (borrar el proyecto portfolio-v1, con su despliegue 1483e40d;
la deshabilitada «Cache Everything», si decido borrarla). Borra las ramas
remotas astro y cloudflare/workers-autoconfig con mi OK, y la astro local.
Si tengo Search Console de fritzreigar.com, me guías para mandar el sitemap.
Apunta la fecha en «Desvíos» de plan/fase-2.md y quita del CLAUDE.md el punto
de la vuelta atrás. Cada push a main solo con mi OK en esta sesión.
```

## 3. Modelo y esfuerzo
Opus 5.5 en **medio**: son unos pasos conocidos y lo delicado (borrar) lo confirmas tú.

## 4. Cómo abrirla
Sesión nueva en `~/Projects/propios/portfolio`, sin modo plan, en la rama `main` y a partir del 16 de noviembre.

## 5. Qué traer
- La semana pasada sin incidencias en el dominio.
- El panel de Cloudflare abierto, con la sesión iniciada.
- Saber si tienes Search Console de fritzreigar.com.

## 6. Qué te llevas
- `portfolio-v1` borrado y la web vieja fuera de Cloudflare.
- Solo la rama `main` en GitHub.
- El sitemap nuevo mandado a Search Console, si la tienes.
- El `CLAUDE.md` sin el punto de la vuelta atrás y la fecha apuntada en «Desvíos».

## 7. Decisiones que tomar
- **El error de consola que deja Cloudflare**: `npm run lighthouse -- --dominio` da 92 en buenas prácticas, y PageSpeed, 100. Recomendada: dejarlo; si te molesta, probar `no-transform` solo en el HTML, en una rama, y comprobar antes que siga saliendo comprimido.
- **El banner de LinkedIn** sigue en rojo y con la frase «Web & Product · Snugport · AI Model QA», que ya no es tu titular. Recomendada: pasarlo a cobalto con el texto nuevo, en una tarea aparte.
- **La QA en un teléfono de verdad y en Safari** sigue sin hacerse. Recomendada: cinco minutos en tu Nothing, y lo mismo en un iPhone si hay uno a mano.
- **Las capturas con Navidad** de Missphone. Recomendada: rehacerlas antes del 6 de enero de 2027 (`plan/capturas.md`).
- **`missphone/CLAUDE.md`** sigue diciendo que se factura por privado. Recomendada: corregirlo la próxima vez que abras Missphone.
- **El Lighthouse de Artemisa** es del 2026-11-04. Recomendada: dejarlo hasta que caduque de verdad.
- **«Al resto de España»**: la web lo dice así y el estudio en inglés dice «in Spain or abroad». Recomendada: dejarlo, salvo que quieras ofrecer trabajo fuera.
