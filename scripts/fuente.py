"""La fuente de la web: Archivo variable, recortada y en woff2 (decisión F3 de plan/fase-2.md).

Parte de src/assets/fonts/Archivo[wdth,wght].ttf (github.com/google/fonts, ofl/archivo, licencia
OFL) y saca public/fonts/archivo.woff2:

- los ejes, recortados con instancer a lo que usa la web: wdth 62-100 y wght 400-800;
- los caracteres, al subconjunto latino de Google Fonts más las flechas «→» (U+2192) y «↗»
  (U+2197) si Archivo las tiene (plan/spec-visual.md § 8). «↗» no está en Archivo: sale de la
  fuente del sistema;
- sin hinting (la web se lee en pantallas de alta densidad y así pesa menos).

Al acabar comprueba el resultado (ejes de fvar y tope de 95 KB) y sale con 1 si no cuadra.

Con --og saca, en vez de la woff2, las instancias estáticas en TTF que pide Satori para las
imágenes de compartir (src/pages/og/[lang]/[key].png.ts, tanda 2.10): Satori no lee woff2 ni
fuentes variables. Son tres, con el mismo subconjunto: el cartel (wdth 62, wght 800) y el texto
(wdth 100, wght 400 y 600). Viven en src/assets/fonts/ y no se publican: la ruta las mete en el
build con ?inline.

Uso:  python scripts/fuente.py
      python scripts/fuente.py --og
"""

import sys
from io import BytesIO
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "src" / "assets" / "fonts" / "Archivo[wdth,wght].ttf"
TARGET = ROOT / "public" / "fonts" / "archivo.woff2"

AXES = {"wdth": (62, 100), "wght": (400, 800)}

# Las instancias de Satori: nombre del archivo y su punto de los ejes.
OG_INSTANCES = {
    "archivo-poster-800.ttf": {"wdth": 62, "wght": 800},
    "archivo-400.ttf": {"wdth": 100, "wght": 400},
    "archivo-600.ttf": {"wdth": 100, "wght": 600},
}
LIMIT_BYTES = 95 * 1024

# El subconjunto «latin» de Google Fonts (el mismo unicode-range que sirve su CSS).
LATIN = [
    (0x0000, 0x00FF),
    (0x0131, 0x0131),
    (0x0152, 0x0153),
    (0x02BB, 0x02BC),
    (0x02C6, 0x02C6),
    (0x02DA, 0x02DA),
    (0x02DC, 0x02DC),
    (0x0304, 0x0304),
    (0x0308, 0x0308),
    (0x0329, 0x0329),
    (0x2000, 0x206F),
    (0x20AC, 0x20AC),
    (0x2122, 0x2122),
    (0x2191, 0x2191),
    (0x2193, 0x2193),
    (0x2212, 0x2212),
    (0x2215, 0x2215),
    (0xFEFF, 0xFEFF),
    (0xFFFD, 0xFFFD),
]
ARROWS = {0x2192: "→", 0x2197: "↗"}


def wanted_codepoints(font: TTFont) -> list[int]:
    """Los del latino que la fuente tiene, más las flechas que tenga."""
    cmap = font.getBestCmap()
    latin = [cp for start, end in LATIN for cp in range(start, end + 1)]
    return sorted(cp for cp in set(latin) | set(ARROWS) if cp in cmap)


def instantiate(axes: dict) -> tuple[TTFont, list[int]]:
    """La fuente de origen con los ejes fijados o recortados, y los caracteres que se quieren."""
    font = TTFont(SOURCE)
    codepoints = wanted_codepoints(font)
    # El instancer deja tablas a medio cargar que el subsetter no sabe leer: se guarda y se
    # vuelve a abrir antes de recortar.
    buffer = BytesIO()
    instancer.instantiateVariableFont(font, axes).save(buffer)
    buffer.seek(0)
    return TTFont(buffer), codepoints


def build_og() -> bool:
    """Las tres TTF estáticas de Satori; sale con False si alguna sigue siendo variable."""
    ok = True
    for name, axes in OG_INSTANCES.items():
        font, codepoints = instantiate(axes)
        options = subset.Options()
        options.hinting = False
        options.desubroutinize = True
        options.name_IDs = ["*"]
        options.name_languages = ["*"]
        options.layout_features = ["*"]
        subsetter = subset.Subsetter(options)
        subsetter.populate(unicodes=codepoints)
        subsetter.subset(font)
        target = SOURCE.parent / name
        subset.save_font(font, str(target), options)
        static = "fvar" not in TTFont(target)
        print(f"{target.relative_to(ROOT).as_posix()}: {target.stat().st_size / 1024:.1f} KB, {axes}")
        if not static:
            print("MAL: sigue siendo variable")
            ok = False
    return ok


def build_woff2() -> None:
    font, codepoints = instantiate(AXES)
    for cp, char in ARROWS.items():
        print(f"«{char}» U+{cp:04X}: {'entra' if cp in codepoints else 'no está en Archivo'}")

    options = subset.Options()
    options.flavor = "woff2"
    options.hinting = False
    options.desubroutinize = True
    options.name_IDs = ["*"]
    options.name_languages = ["*"]
    options.layout_features = ["*"]
    subsetter = subset.Subsetter(options)
    subsetter.populate(unicodes=codepoints)
    subsetter.subset(font)

    TARGET.parent.mkdir(parents=True, exist_ok=True)
    subset.save_font(font, str(TARGET), options)


def check() -> bool:
    size = TARGET.stat().st_size
    axes = {axis.axisTag: (axis.minValue, axis.maxValue) for axis in TTFont(TARGET)["fvar"].axes}
    print(f"{TARGET.relative_to(ROOT).as_posix()}: {size / 1024:.1f} KB, ejes {axes}")
    ok = True
    if size > LIMIT_BYTES:
        print(f"MAL: pasa de {LIMIT_BYTES // 1024} KB")
        ok = False
    for tag, (low, high) in AXES.items():
        if axes.get(tag) != (low, high):
            print(f"MAL: el eje {tag} debería ir de {low} a {high}")
            ok = False
    return ok


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    if "--og" in sys.argv[1:]:
        sys.exit(0 if build_og() else 1)
    build_woff2()
    sys.exit(0 if check() else 1)
