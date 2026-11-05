// Lo publicado va sin comentarios (~/Projects/CLAUDE.md): busca en dist/ los <!-- --> y los /* */
// de los .html, .css y .js, como el grep de la aceptación de la tanda 1.5. Los avisos de licencia
// (/*! … */ o con @license) se permiten. Sale con 1 si encuentra alguno.
//
// Uso:  npm run comentarios        (después de npm run build)
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const EXTENSIONS = new Set(['.html', '.css', '.js']);
const PATTERN = /<!--|\/\*/g;

const isLicense = (text, index) => {
  if (text.startsWith('/*!', index)) return true;
  const end = text.indexOf('*/', index);
  return end !== -1 && text.slice(index, end).includes('@license');
};

const files = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return files(path);
    return EXTENSIONS.has(extname(entry.name)) ? [path] : [];
  });

let found = 0;
let checked = 0;
for (const file of files(DIST)) {
  checked++;
  const text = readFileSync(file, 'utf8');
  for (const match of text.matchAll(PATTERN)) {
    if (isLicense(text, match.index)) continue;
    const line = text.slice(0, match.index).split('\n').length;
    const snippet = text.slice(match.index, match.index + 60).replace(/\s+/g, ' ');
    console.log(`COMENTARIO ${relative(DIST, file)}:${line}  ${snippet}`);
    found++;
  }
}

if (checked === 0) {
  console.error('dist/ está vacío: npm run build antes');
  process.exit(2);
}
console.log(
  found
    ? `\nCOMENTARIOS: ${found} en dist/`
    : `COMENTARIOS: ninguno en ${checked} archivos de dist/`,
);
process.exit(found ? 1 : 0);
