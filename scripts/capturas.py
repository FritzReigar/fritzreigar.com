"""Las capturas de la web: WebP maestras en src/assets/shots/ (decisión F2 de plan/fase-2.md).

Lee las de origen de docs/capturas/ (gitignored; su lista, su fecha y su `alt`, en
plan/capturas.md) y escribe una WebP por captura, en calidad 90, en una carpeta por pieza. El
ancho de cada una es el doble del más grande que pinta su componente (plan/spec-visual.md § 6.2),
con 1600 de tope, y nunca por encima del origen:

- el estudio, a 920 (StudioBand pinta 460);
- las de escritorio de 2880 de Missphone y Snugport, a 1600 (la vitrina pinta 987);
- las del móvil, a 600 (el `srcset` de móvil de § 6.2 acaba en 600);
- las parejas de Missphone, Snugtone, Galaxian y la de escritorio de Artemisa, a su tamaño.

Una WebP de origen que no cambia de tamaño se copia tal cual, sin volver a comprimirla. La
vitrina de Missphone es la del 2026-11-04 (la de Navidad): si la web sale pasado Reyes, la 2.11
la rehace y se vuelve a correr esto.

Al acabar comprueba que las parejas de Missphone casan (antes y después del mismo tamaño) y el
tope de 3 MB entre todas, y sale con 1 si algo no cuadra. La AVIF y las variantes de cada
`srcset` las saca astro:assets en el build.

Uso:  python scripts/capturas.py
"""

import shutil
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "docs" / "capturas"
TARGET = ROOT / "src" / "assets" / "shots"

QUALITY = 90
LIMIT_BYTES = 3 * 1024 * 1024

# (origen en docs/capturas/, destino en src/assets/shots/, ancho máximo o None para su tamaño)
SHOTS = [
    ("estudio-reigar/estudio-reigar-desktop.png", "estudio-reigar/desktop.webp", 920),
    ("estudio-reigar/estudio-reigar-mobile.png", "estudio-reigar/mobile.webp", 600),
    ("missphone/vitrina/missphone-desktop-2026-11-04.png", "missphone/desktop.webp", 1600),
    ("missphone/vitrina/missphone-mobile-2026-11-04.png", "missphone/mobile.webp", 600),
    ("missphone/antes/2026-08-31-home-1440-01-hero.jpg", "missphone/before/home-desktop.webp", None),
    ("missphone/despues/2026-11-04-home-1440-01-hero.jpg", "missphone/after/home-desktop.webp", None),
    ("missphone/antes/2026-08-31-home-390-01-hero-ilegible.jpg", "missphone/before/home-mobile.webp", None),
    ("missphone/despues/2026-11-04-home-390-01-hero.jpg", "missphone/after/home-mobile.webp", None),
    ("missphone/antes/2026-08-31-home-1440-03-categorias-ilegibles.jpg", "missphone/before/categories.webp", None),
    ("missphone/despues/2026-11-04-home-1440-03-categorias.jpg", "missphone/after/categories.webp", None),
    ("missphone/antes/2026-08-31-fundas-1440-testimonios-y-texto-sobre-foto.jpg", "missphone/before/cases-page.webp", None),
    ("missphone/despues/2026-11-04-fundas-1440-cabecera.jpg", "missphone/after/cases-page.webp", None),
    ("missphone/antes/2026-08-31-home-1440-05-texto-invisible-sobre-foto.jpg", "missphone/before/home-lower.webp", None),
    ("missphone/despues/2026-11-04-home-1440-05-la-tienda.jpg", "missphone/after/home-lower.webp", None),
    ("limpiezas-artemisa/limpiezas-artemisa-desktop.webp", "limpiezas-artemisa/desktop.webp", 1600),
    ("limpiezas-artemisa/limpiezas-artemisa-mobile.webp", "limpiezas-artemisa/mobile.webp", 600),
    ("snugtone/captura.png", "snugtone/library.webp", None),
    ("snugtone/captura-busqueda.png", "snugtone/search.webp", None),
    ("snugtone/captura-ecualizador.png", "snugtone/equalizer.webp", None),
    ("snugtone/captura-musicbrainz.png", "snugtone/musicbrainz.webp", None),
    ("snugport/snugport-desktop.png", "snugport/desktop.webp", 1600),
    ("snugport/snugport-mobile.png", "snugport/mobile.webp", 600),
    ("galaxian/cpp-galaxian-engine.webp", "galaxian/gameplay.webp", None),
]


def write(source: Path, target: Path, max_width: int | None) -> tuple[int, int]:
    with Image.open(source) as image:
        width, height = image.size
        new_width = width if max_width is None else min(width, max_width)
        target.parent.mkdir(parents=True, exist_ok=True)
        if new_width == width and source.suffix == ".webp":
            shutil.copyfile(source, target)
            return width, height
        new_height = round(height * new_width / width)
        rgb = image.convert("RGB")
        if new_width != width:
            rgb = rgb.resize((new_width, new_height), Image.Resampling.LANCZOS)
        rgb.save(target, "WEBP", quality=QUALITY, method=6)
        return new_width, new_height


def main() -> int:
    missing = [src for src, _, _ in SHOTS if not (SOURCE / src).is_file()]
    if missing:
        print("Faltan capturas de origen en docs/capturas/:", *missing, sep="\n  ")
        return 1

    sizes: dict[str, tuple[int, int]] = {}
    total = 0
    for src, dest, max_width in SHOTS:
        target = TARGET / dest
        sizes[dest] = write(SOURCE / src, target, max_width)
        weight = target.stat().st_size
        total += weight
        print(f"{dest:40} {sizes[dest][0]:>5} x {sizes[dest][1]:<5} {weight / 1024:7.1f} KB")

    ok = True
    for dest, size in sizes.items():
        if "/before/" in dest and sizes[dest.replace("/before/", "/after/")] != size:
            print(f"La pareja de {dest} no casa con su después")
            ok = False

    print(f"{'Total':40} {'':13} {total / 1024:7.1f} KB (tope {LIMIT_BYTES // 1024} KB)")
    if total > LIMIT_BYTES:
        print("Pasa del tope de 3 MB")
        ok = False
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
