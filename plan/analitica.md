# Analítica — Web Analytics activada desde Pages

Encargo suelto, fuera de las fases (cerradas el 2026-11-09). Planificado el 2026-11-13; se hace en
una sesión nueva, con el prompt del final. El método es el de [`README.md`](README.md).

## Contexto

fritzreigar.com no mide visitas y Fritz quiere saber qué llega (sobre todo desde X, `t.co`) y qué
fichas se leen. De las tres opciones estudiadas el 2026-11-13 (Web Analytics, la analítica de zona
y no medir) eligió la primera. La analítica de zona se descartó porque en el plan Free no da
referentes y solo separa los bots verificados.

Lo que se comprobó ese día y decide cómo se hace:

- **El beacon no se pega a mano.** En el estudio lo inyecta Pages al desplegar (proyecto
  `estudio-reigar`: `build_config.web_analytics_tag` relleno; `fritzreigar-com`: `null`). La
  inyección de zona no funciona con Pages Functions, y este repo tiene `functions/_middleware.js`.
  El build local y el de CI no llevan beacon: solo lo llevan los despliegues de Pages.
- **No cuesta nota.** Portada de estudioreigar.com, con beacon, 3 pasadas: 97 / 100 / 100 / 100.
  El beacon pesa 31,9 KB brutos (10,3 en red), es de terceros y no entra en los presupuestos de
  bytes (`bytesByType` solo cuenta el propio origen).
- **El 92 de buenas prácticas no es de Analytics.** La zona tiene «JavaScript Detections»
  encendido (`GET /zones/{id}/bot_management` → `enable_js: true`) y sirve el script en línea de
  `/cdn-cgi/challenge-platform/`; la zona del estudio lo tiene en `false` y no lo sirve. Se apaga
  primero, aparte, para dejar la causa aislada. Medido el 2026-11-13 en la portada del dominio:
  100 / 100 / 92 / 100.
- **Ya existe un sitio de Web Analytics atado a la zona** (`site_tag 2c468758…`, automático,
  deshabilitado). En el estudio hubo que borrar el de zona para que valiera el de hostname.
- La CI no mide contra el dominio (`.github/workflows/web.yml` corre `lighthouse --ci` en local),
  así que las visitas falsas solo pueden venir de un `--dominio` hecho a mano.

Resultado buscado: el dominio sirve el beacon sin errores de consola, Lighthouse en el dominio
vuelve a 100 en buenas prácticas, y a la semana se leen visitas, rutas y referentes.

## Los pasos

Rama `analitica` desde `main`. El panel lo toca Fritz, un paso cada vez; la sesión lo comprueba por
la API (MCP `cloudflare-api`, solo lectura) o con `curl` antes de seguir.

### 1. Apagar «JavaScript Detections» (Fritz, panel) y medir

- [ ] Zona fritzreigar.com → Security → Settings → Bot traffic → **JavaScript Detections: Off**.
- [ ] Comprobar: `bot_management.enable_js` es `false`; `curl -s https://fritzreigar.com/ | grep -c
      challenge-platform` da 0; `node scripts/lighthouse.mjs --dominio --solo / --pasadas 3` da 100
      en buenas prácticas.
- Si el script sigue saliendo, se apunta y se sigue: no bloquea lo demás.

### 2. El código (rama `analitica`)

Primero los tests, para verlos en rojo; luego la cabecera.

- [ ] `e2e/rutas.spec.ts`, test «las cabeceras de _headers»: esperar
      `script-src 'self' https://static.cloudflareinsights.com;` y
      `connect-src 'self' https://formspree.io https://cloudflareinsights.com`. Renombrar el test
      para que diga Analytics. El test de «un solo script ejecutable» **no cambia**: `dist/` no
      lleva beacon.
- [ ] `public/_headers`: añadir esos dos orígenes a la CSP, igual que
      `~/Projects/propios/estudio-reigar/web/public/_headers`, y reescribir el comentario que hoy
      dice «si se activa Web Analytics».
- [ ] `scripts/lighthouse.mjs`: traer de `estudio-reigar/web/scripts/lighthouse.mjs` las dos
      piezas, sin reinventarlas:
  - `RUM_PATTERN = '*/cdn-cgi/rum*'` y `blockedUrlPatterns: useDomain ? [RUM_PATTERN] : []`, para
    que `--dominio` no sume visitas falsas (34 por pasada completa).
  - `--vpn` con `BEACON_RULE` (`--host-resolver-rules`, en un solo elemento del array): sin él, en
    la máquina de Fritz el beacon no resuelve y buenas prácticas cae a 96.
  - En la cabecera del script: `--vpn` y que `--dominio` no cuenta visitas.
- [ ] `npm run red` en verde.

### 3. Activar Web Analytics en Pages (Fritz, panel)

- [ ] Account → Analytics & Logs → Web Analytics → **borrar** el sitio `fritzreigar.com` atado a la
      zona (no tiene datos útiles: 30 cargas en un mes).
- [ ] Workers & Pages → `fritzreigar-com` → Metrics (o Settings) → **Web Analytics → Enable**.
- [ ] Comprobar por API: el proyecto tiene `web_analytics_tag`; hay un sitio nuevo en
      `/accounts/{id}/rum/site_info/list` con `auto_install: false` y host
      `(fritzreigar-com.pages.dev|fritzreigar.com|www.fritzreigar.com)$`.
- El tag se fija por despliegue: producción sigue sin beacon hasta el siguiente despliegue.

### 4. La previa

- [ ] Commit de la rama (archivos nombrados, «… (v1.0.1)») y push de `analitica` con el OK de
      Fritz.
- [ ] En `analitica.fritzreigar-com.pages.dev`: el HTML trae el beacon (`curl | grep
      cloudflareinsights`), la CSP trae los dos orígenes, y en el navegador no hay errores de
      consola y el `POST https://cloudflareinsights.com/cdn-cgi/rum` responde 2xx en la portada y
      en una ficha, en los dos idiomas.
- Si el POST falla por CORS, el sitio no quedó dado de alta por hostname: se revisa el paso 3, no
  se toca la CSP.

### 5. Publicar (solo con el OK de Fritz en esa sesión)

- [ ] Merge de `analitica` a `main` y push. Esperar el despliegue.
- [ ] En el dominio: beacon en las doce páginas, `cf-cache-status: DYNAMIC`, sin `X-Robots-Tag`, y
      `node scripts/lighthouse.mjs --dominio --vpn` dentro de presupuesto en las diez (buenas
      prácticas 100).
- [ ] Lectura por API: `rumPageloadEventsAdaptiveGroups` con el `siteTag` nuevo, agrupando por
      `requestPath`, `refererHost` y `bot`. El mismo día solo confirma que cuenta la visita de
      prueba.

### 6. Dejarlo escrito

- [ ] `CLAUDE.md` (solo lo que decide hoy): en «Lo que Cloudflare inyecta», que JavaScript
      Detections está apagado y que Web Analytics va activada desde el proyecto de Pages, sin pegar
      el snippet; en «CSP estricta», que el único script propio es `main.ts` y que Pages añade el
      beacon y dos comentarios `<!-- Cloudflare Pages Analytics -->` que no salen del repo; y cómo
      medir contra el dominio (`--dominio --vpn`).
- [ ] `historia.md`: entrada con fecha, la causa real del 92 y lo medido.
- [ ] `README.md`: los flags nuevos de `lighthouse`, si lista los demás.
- [ ] `siguiente.md`, decisión 7 («El error de consola que deja Cloudflare»): quitarla si el paso 1
      la resolvió. `historia.md` y `siguiente.md` tenían cambios sin confirmar el 2026-11-13: se
      mira su `git diff` y no se mezclan en el commit sin preguntar.
- [ ] Borrar este archivo o marcarlo cerrado, según diga Fritz.

## Verificación de punta a punta

1. `npm run red` en verde en la rama (los dos asertos de la CSP, vistos antes en rojo).
2. Previa: beacon presente, cero errores de consola, POST a `/cdn-cgi/rum` con 2xx.
3. Dominio: `--dominio --vpn` con las diez páginas en presupuesto y buenas prácticas 100.
4. API: el sitio nuevo registra la visita de prueba; a los 7 días, primera lectura con referentes.

## Lo que queda fuera

- Pegar el snippet en `BaseLayout` o meter el token en el repo.
- Contar en el middleware con Analytics Engine.
- Tocar `lighthouse.budgets.json`: el beacon no entra en los bytes propios.

## Cómo abrir la sesión

Sesión nueva en `~/Projects/propios/portfolio`, sin modo plan, en `main`. Opus 5.5 en medio: son
pasos conocidos y lo que sale fuera lo confirma Fritz. Con el panel de Cloudflare abierto.

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
