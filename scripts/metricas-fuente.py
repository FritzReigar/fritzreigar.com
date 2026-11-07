"""La reserva de Archivo con métricas (tanda 2.11, plan/spec-visual.md § 8, «Riesgo conocido»).

Mientras llega public/fonts/archivo.woff2 el navegador pinta con la reserva. Sin ajustar, la
reserva es system-ui: sin eje de ancho, mucho más ancha que los carteles al 62 % y con otra altura
de línea, así que al llegar Archivo los carteles cambian de ancho y de alto y lo de abajo salta
(medido con e2e/fuentes.spec.ts: CLS de 0,15 en la portada y el 404 a 1440). Este script escribe
la familia «Archivo Fallback» que va detrás de "Archivo" en --font: una cara por cada ancho y peso
que pinta la web, todas sobre la Arial local, con

  font-stretch       el de la cara (62 %, 75 % o 100 %): el navegador elige la cara de reserva
                     por el mismo font-stretch que pide el CSS, así cada texto coge la suya
  size-adjust        el ancho medio de Archivo en esa instancia entre el de la Arial, sobre texto
                     de la web (el de los carteles, en caja alta)
  ascent-override    y descent-override y line-gap-override: los de hhea de Archivo, en % del
                     UPM, divididos por size-adjust (el navegador los escala con él)

Es el método del estudio (~/Projects/propios/estudio-reigar/scripts/metricas-fuentes.py), con
instancer para sacar de la variable cada instancia que se mide.

Uso (desde la raíz):  python scripts/metricas-fuente.py
Pega la salida en src/styles/global.css, en lugar del bloque que hay.
"""

import os
import sys
from pathlib import Path

from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "src" / "assets" / "fonts" / "Archivo[wdth,wght].ttf"

SYSTEM_DIRS = [
    "C:/Windows/Fonts",
    "/Library/Fonts",
    "/System/Library/Fonts/Supplemental",
    "/usr/share/fonts/truetype/liberation",
    "/usr/share/fonts/liberation",
]
REGULAR = (["Arial", "ArialMT", "Liberation Sans"],
           ["arial.ttf", "Arial.ttf", "LiberationSans-Regular.ttf"])
BOLD = (["Arial Bold", "Arial-BoldMT", "Liberation Sans Bold"],
        ["arialbd.ttf", "Arial Bold.ttf", "LiberationSans-Bold.ttf"])

# Texto de la web, en los dos idiomas: lo que de verdad se pinta con la reserva.
BODY = (
    "Desarrollador web freelance en Valencia. Me encanta la tecnología y vivo de ella: hago webs "
    "para negocios con Estudio Reigar y, en mis ratos, apps propias que publico en abierto. "
    "Freelance web developer in Valencia. I love technology and make my living from it: I build "
    "websites for businesses with Estudio Reigar and, in my spare time, my own apps."
)
NAV = "Trabajo Proyectos Cómo trabajo Trayectoria Contacto English Work Projects How I work Career Contact Español Acepto proyectos Escríbeme"
POSTER = (
    "FRITZ REIGAR TRABAJO PROYECTOS CÓMO TRABAJO TRAYECTORIA CONTACTO ESTUDIO REIGAR MISSPHONE "
    "LIMPIEZAS ARTEMISA SNUGTONE SNUGPORT WORK PROJECTS HOW I WORK CAREER CONTACT 404 ESTA PÁGINA "
    "NO EXISTE THIS PAGE DOESN'T EXIST QUÉ HICE POR FASES LAS CIFRAS"
)
NARROW = "ABR 2026 HOY SEP 2025 JUL 2019 VISITAS ESTABLES PÁGINAS PRODUCTOS LO QUE NO SE ENSEÑA"
QUOTE = (
    "foobar2000 se me hacía muy anticuado y con demasiadas cosas. Quería algo más simple y "
    "rápido, pero que leyera lo que usa todo el mundo. Y, de paso, aprender Rust."
)

# (font-stretch, rango de font-weight, instancia de Archivo (wdth, wght), reserva, muestra)
FACES = [
    (100, "400", (100, 400), REGULAR, BODY),
    (100, "500", (100, 500), REGULAR, BODY),
    (100, "600", (100, 600), BOLD, NAV),
    (100, "700 800", (100, 700), BOLD, BODY),
    (75, "400 700", (75, 700), BOLD, QUOTE),
    (75, "800", (75, 800), BOLD, NARROW),
    (62, "400 800", (62, 800), BOLD, POSTER),
]


def find_system(files):
    for folder in SYSTEM_DIRS:
        for name in files:
            path = os.path.join(folder, name)
            if os.path.isfile(path):
                return path
    raise SystemExit(f"no encuentro la reserva: {', '.join(files)}")


def mean_advance(font, sample):
    """Avance medio de los caracteres de la muestra, en fracción del UPM."""
    cmap = font.getBestCmap()
    metrics = font["hmtx"]
    upm = font["head"].unitsPerEm
    advances = [metrics[cmap[ord(c)]][0] for c in sample if ord(c) in cmap]
    if len(advances) != len(sample):
        missing = sorted({c for c in sample if ord(c) not in cmap})
        raise SystemExit(f"a {font['name'].getDebugName(4)} le faltan: {''.join(missing)}")
    return sum(advances) / len(advances) / upm


def pct(value):
    return f"{value * 100:.2f}%"


def main():
    variable = TTFont(SOURCE)
    upm = variable["head"].unitsPerEm
    hhea = variable["hhea"]
    for stretch, weights, (wdth, wght), (locals_, files), sample in FACES:
        instance = instancer.instantiateVariableFont(
            TTFont(SOURCE), {"wdth": wdth, "wght": wght}, updateFontNames=False
        )
        scale = mean_advance(instance, sample) / mean_advance(TTFont(find_system(files)), sample)
        src = ", ".join(f'local("{name}")' for name in locals_)
        print("@font-face {")
        print('  font-family: "Archivo Fallback";')
        print("  font-style: normal;")
        print(f"  font-weight: {weights};")
        print(f"  font-stretch: {stretch}%;")
        print(f"  src: {src};")
        print(f"  size-adjust: {pct(scale)};")
        print(f"  ascent-override: {pct(hhea.ascent / upm / scale)};")
        print(f"  descent-override: {pct(abs(hhea.descent) / upm / scale)};")
        print(f"  line-gap-override: {pct(hhea.lineGap / upm / scale)};")
        print("}\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
