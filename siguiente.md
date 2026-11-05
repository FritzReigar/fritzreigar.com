# Cierre — portfolio
Fecha: 2026-11-05
Proyecto: portfolio

## 1. De qué va la siguiente
La tanda 2.3 de `plan/fase-2.md`: se pinta la mitad de arriba de la portada como la spec, con el hero y el avatar vectorizado, el estudio, Trabajo, las dos bandas de capturas (quietas) y Proyectos, hasta «Todo el código público».
Es la primera tanda que usa los datos de la 2.2 (`home.ts`, `shots.ts`, la colección `cases`) y el componente `Shot`.

## 2. El prompt
```
Tanda 2.3 del portfolio: la portada I (el hero, el estudio, Trabajo, las
bandas y Proyectos).

Lee ENTEROS plan/README.md y, de plan/fase-2.md, «Punto de partida»,
«Decisiones de la fase», «Reglas de la fase», los «Desvíos» y la tanda 2.3,
y lo que la tanda manda leer. Trabaja en la rama astro. Hazla, compruébala
con npm run red (sin verde no hay commit; un test nuevo se ve en rojo antes
de creerse el verde), marca la casilla, apunta la 2.4 como tanda en curso en
el CLAUDE.md y commit con «(v0.2.3)». El push, solo con mi OK.
```

## 3. Modelo y esfuerzo
Opus 5.5 en medio: es una tanda de ejecución con la spec y el lienzo ya decididos.

## 4. Cómo abrirla
Sesión nueva en `~/Projects/propios/portfolio`, sin modo plan, con la rama `astro` sacada (`git switch astro`).

## 5. Qué traer
- La QA de la 2.1 en el teléfono sobre la previa (`fritzreigar-com.pages.dev/no-existe`), si aún no la has hecho: el 404, el menú (abrir, cerrar con un enlace y pulsando fuera) y el modo oscuro. La 2.2 no pintó nada nuevo, así que no tiene QA propia.
- Nada más: el avatar y la portada del lienzo ya están en `docs/lienzo/` (sin subir).

## 6. Qué te llevas
- La portada pintada hasta «Todo el código público»: el hero con el avatar dibujado y el estado, el estudio, Trabajo (Missphone grande y Artemisa), las dos bandas de seis capturas y Proyectos (Snugtone grande, Snugport y Galaxian en pequeño).
- Los componentes nuevos de `ui/`, `heroes/` y `home/`, con las tarjetas pulsables enteras.
- Pruebas de la primera pantalla a 390 y 1440, de desbordes en cuatro anchos y de que las bandas cubren 1920 y 2560; la portada en 32 KB o menos de gzip.

## 7. Decisiones que tomar
- **La QA de la 2.3 en el teléfono**, cuando la empujes: es la primera tanda que pinta la portada nueva. Lo que no te cuadre se dice al abrir la 2.4 y va a «Desvíos». Recomendada: hacerla antes de abrir la 2.4.
- **El texto de Snugtone y Artemisa cambió a propósito en la 2.2** (las cinco cifras de «Medido» de Snugtone, las cuatro de Lighthouse de Artemisa y los títulos de «Qué se hizo» separados de su frase), para que los datos tengan ya la forma de la spec. Está en «Desvíos». Recomendada: darlo por bueno; si no, se dice al abrir la 2.3.
- **`www.fritzreigar.com` sigue sin existir**, y el enlace de tu LinkedIn apunta ahí. El corte (2.13) lo arregla; si no quieres esperar, añade `www.fritzreigar.com` como dominio personalizado de `portfolio-v1` en el panel de Cloudflare. Recomendada: hacerlo ya, son dos minutos.
- **El despliegue de previa `1483e40d` de `portfolio-v1`.** Recomendada: borrarlo cuando quieras, o en la limpieza del corte.
