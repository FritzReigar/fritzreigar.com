// El lint de tokens (decisión F4 de plan/fase-2.md): ningún color literal (#hex, rgb(), hsl()) en
// src/ fuera de src/styles/tokens.css. Todo color sale de un token, con su valor en los dos temas
// (plan/spec-visual.md § 1.1). Los binarios (src/assets/: fuentes, capturas) no se miran. Sale con 1
// si encuentra alguno.
//
// Uso:  npm run tokens
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'src');
const ALLOWED = join(SRC, 'styles', 'tokens.css');
const EXTENSIONS = new Set([
  '.astro',
  '.css',
  '.ts',
  '.tsx',
  '.js',
  '.mjs',
  '.json',
  '.md',
  '.svg',
]);
// Un # seguido de 3, 4, 6 u 8 cifras hexadecimales y nada más de palabra (no un &#8594; ni un
// #contenido), o una función de color.
const PATTERN =
  /(?<![&\w])#(?:[0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3,4})(?![\w-])|\b(?:rgba?|hsla?)\(/gi;

const files = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return files(path);
    return EXTENSIONS.has(extname(entry.name)) ? [path] : [];
  });

let found = 0;
let checked = 0;
for (const file of files(SRC)) {
  if (file === ALLOWED) continue;
  checked++;
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, index) => {
    for (const match of line.matchAll(PATTERN)) {
      const where = `${relative(ROOT, file).split('\\').join('/')}:${index + 1}`;
      console.log(`COLOR ${where}  ${match[0]}  →  ${line.trim().slice(0, 80)}`);
      found++;
    }
  });
}

console.log(
  found
    ? `\nTOKENS: ${found} colores literales fuera de src/styles/tokens.css`
    : `TOKENS: ningún color literal en ${checked} archivos de src/ (fuera de tokens.css)`,
);
process.exit(found ? 1 : 0);
