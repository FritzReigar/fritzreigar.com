// Lighthouse con presupuestos: copia de ~/Projects/propios/estudio-reigar/web/scripts/lighthouse.mjs
// (tanda 1.5). Mide el build servido como en producción (`wrangler pages dev dist`, el mismo
// asset-server de Pages: URLs limpias y la CSP de _headers) o, con --dominio,
// https://fritzreigar.com (después del corte: hasta entonces sirve la web vieja). Sale con 1 si una
// página se sale de lighthouse.budgets.json.
//
// Uso:  npm run lighthouse [-- --dominio] [--ci] [--pasadas N] [--solo /ruta] [--detalle] [--idioma en-US]
//   --dominio      mide https://fritzreigar.com en vez de dist/
//   --ci           umbrales de CI (rendimiento ≥ 90; el resto, igual)
//   --pasadas N    N pasadas en todas las páginas (por defecto, 5 en la portada y 3 en el resto)
//   --solo /ruta   una sola página
//   --detalle      por pasada: TBT, la tarea larga de main.ts y qué se movió (CLS)
//   --idioma xx-XX el idioma del navegador (por defecto es-ES)
//
// Versiones fijadas (Lighthouse 13.5.0 exacta y el Chromium de Playwright): la nota cambia de una
// versión a otra, y así la de esta máquina y la de CI son la misma medida.
//
// Las páginas: las cinco indexables en español. Las gemelas inglesas y el 404 llevan noindex y
// Lighthouse les quitaría el SEO por eso; entran cuando el inglés esté vivo.
//
// Los presupuestos (lighthouse.budgets.json) salen de plan/spec-visual.md § 8: rendimiento ≥ 95 y
// el resto a 100, CLS ≤ 0,01; en CI, rendimiento ≥ 90 (el runner es más lento). Los bytes son
// brutos (resourceSize, sin compresión: comparables en local y en el dominio) y del propio origen;
// la spec da topes en gzip, así que aquí van pasados a bruto con la proporción del lienzo:
//   script ≤ 8 KB        main.ts: 3 KB en gzip
//   stylesheet ≤ 55 KB   la hoja única: 10 KB en gzip (el lienzo, 35,3 KB brutos y 6,5 en gzip)
//   font ≤ 95 KB         un solo woff2 de Archivo (ya va comprimido)
//   document ≤ 120 KB    la portada: 32 KB en gzip (el lienzo, 78,2 brutos y 23,6 en gzip)
//   image ≤ 120 KB       la vitrina de la ficha en AVIF a 1440
//   total ≤ 380 KB       la suma, por página
// La fase 2 los ajusta con lo medido, como el estudio, cada subida con su porqué:
//   document 100 → 120 KB (tanda 2.3, 2026-11-05). La portada pintada pesa 111,4 KB brutos y
//     28,7 en gzip: cumple el tope de verdad (32 KB en gzip, spec § 8), pero comprime a 4:1 y no
//     a los 3,3:1 del lienzo con que se pasó a bruto, porque las bandas repiten cada serie dos
//     veces en <picture> con AVIF y WebP (63,5 KB son el avatar). 120 KB a 4:1 son 30 en gzip.
//     El tope en gzip se mide aparte (`gzip -c dist/index.html | wc -c`).
import { spawn, execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';
import * as chromeLauncher from 'chrome-launcher';
import lighthouse from 'lighthouse';
import { computeMedianRun } from 'lighthouse/core/lib/median-run.js';

const WEB_DIR = join(dirname(fileURLToPath(import.meta.url)), '..');
const LOCAL_ORIGIN = 'http://127.0.0.1:8789';
const DOMAIN_ORIGIN = 'https://fritzreigar.com';
const CATEGORIES = ['performance', 'accessibility', 'best-practices', 'seo'];
const BYTE_TYPES = ['document', 'script', 'stylesheet', 'font', 'image'];

// La portada es la página más larga y la que más baila: 5 pasadas; el resto, 3.
const PAGES = [
  { path: '/', runs: 5 },
  { path: '/trabajo/missphone', runs: 3 },
  { path: '/trabajo/limpiezas-artemisa', runs: 3 },
  { path: '/proyectos/snugtone', runs: 3 },
  { path: '/proyectos/snugport', runs: 3 },
];

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const option = (name) => {
  const index = args.indexOf(name);
  return index === -1 ? undefined : args[index + 1];
};

const useDomain = flag('--dominio');
const ciMode = flag('--ci');
const showDetail = flag('--detalle');
const runsOverride = option('--pasadas') ? Number(option('--pasadas')) : undefined;
const onlyPath = option('--solo');
const browserLang = option('--idioma') ?? 'es-ES';
const origin = useDomain ? DOMAIN_ORIGIN : LOCAL_ORIGIN;

if (runsOverride !== undefined && !(Number.isInteger(runsOverride) && runsOverride > 0)) {
  console.error('--pasadas pide un entero mayor que 0');
  process.exit(2);
}

const LIGHTHOUSE_VERSION = JSON.parse(
  readFileSync(join(WEB_DIR, 'node_modules', 'lighthouse', 'package.json'), 'utf8'),
).version;
const budgets = JSON.parse(readFileSync(join(WEB_DIR, 'lighthouse.budgets.json'), 'utf8'));
const scoreBudgets = { ...budgets.scores, ...(ciMode ? budgets.ciScores : {}) };

const pages = PAGES.filter((page) => !onlyPath || page.path === onlyPath).map((page) => ({
  ...page,
  runs: runsOverride ?? page.runs,
}));
if (pages.length === 0) {
  console.error(`--solo ${onlyPath}: no es ninguna de ${PAGES.map((p) => p.path).join(', ')}`);
  process.exit(2);
}

// ------------------------------------------------------------------ servidor

function startServer() {
  const wrangler = join(WEB_DIR, 'node_modules', 'wrangler', 'bin', 'wrangler.js');
  const child = spawn(
    process.execPath,
    [
      wrangler,
      'pages',
      'dev',
      'dist',
      '--ip',
      '127.0.0.1',
      '--port',
      '8789',
      '--compatibility-date',
      '2026-11-01',
    ],
    { cwd: WEB_DIR, env: { ...process.env, WRANGLER_SEND_METRICS: 'false' }, stdio: 'ignore' },
  );
  return child;
}

function stopServer(child) {
  if (!child || child.exitCode !== null) return;
  // wrangler arranca workerd como hijo: hay que cerrar el árbol entero.
  if (process.platform === 'win32') {
    try {
      execFileSync('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore' });
    } catch {
      // ya había terminado
    }
  } else {
    child.kill('SIGTERM');
  }
}

async function waitForServer(url, timeoutMs = 60_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // aún no escucha
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`wrangler no respondió en ${timeoutMs / 1000} s (${url})`);
}

// ------------------------------------------------------------------- medida

async function measure(url) {
  const chromeFlags = ['--headless=new', `--lang=${browserLang}`];
  const chrome = await chromeLauncher.launch({
    chromePath: chromium.executablePath(),
    chromeFlags,
  });
  try {
    const result = await lighthouse(url, {
      port: chrome.port,
      onlyCategories: CATEGORIES,
      output: 'json',
      logLevel: 'error',
    });
    if (!result) throw new Error(`Lighthouse no devolvió nada para ${url}`);
    if (result.lhr.runtimeError) {
      throw new Error(`${url}: ${result.lhr.runtimeError.code} ${result.lhr.runtimeError.message}`);
    }
    return result.lhr;
  } finally {
    chrome.kill();
  }
}

// Bytes brutos por tipo, solo del propio origen (fuera cualquier tercero).
function bytesByType(lhr) {
  const pageOrigin = new URL(lhr.finalDisplayedUrl).origin;
  const totals = Object.fromEntries([...BYTE_TYPES, 'other', 'total'].map((type) => [type, 0]));
  for (const request of lhr.audits['network-requests']?.details?.items ?? []) {
    if (new URL(request.url).origin !== pageOrigin) continue;
    const type = String(request.resourceType ?? '').toLowerCase();
    const size = request.resourceSize ?? 0;
    totals[BYTE_TYPES.includes(type) ? type : 'other'] += size;
    totals.total += size;
  }
  return totals;
}

function score(lhr, category) {
  return Math.round((lhr.categories[category]?.score ?? 0) * 100);
}

function detail(lhr) {
  const tbt = Math.round(lhr.audits['total-blocking-time']?.numericValue ?? 0);
  const tasks = lhr.audits['long-tasks']?.details?.items ?? [];
  const mainTask = tasks
    .filter((task) => /\/_astro\/.*\.js/.test(String(task.url)))
    .reduce((longest, task) => Math.max(longest, task.duration ?? 0), 0);
  const shifts = (lhr.audits['layout-shifts']?.details?.items ?? []).map((item) => {
    const node = item.node?.selector ?? item.node?.snippet ?? '?';
    return `${node} ${Number(item.score ?? 0).toFixed(4)}`;
  });
  const reflow = (lhr.audits['forced-reflow-insight']?.details?.items ?? [])
    .flatMap((table) => table.items ?? [])
    .reduce((total, item) => total + (item.reflowTime ?? 0), 0);
  return `TBT ${tbt} ms · tarea de main.ts ${Math.round(mainTask)} ms · reflow forzado ${Math.round(
    reflow,
  )} ms · desplazamientos: ${shifts.length ? shifts.join(', ') : 'ninguno'}`;
}

// ------------------------------------------------------------- presupuestos

function checkBudgets(lhr) {
  const failures = [];
  for (const category of CATEGORIES) {
    const value = score(lhr, category);
    if (value < scoreBudgets[category])
      failures.push(`${category} ${value} < ${scoreBudgets[category]}`);
  }
  const cls = lhr.audits['cumulative-layout-shift']?.numericValue ?? 0;
  if (cls > budgets.cls) failures.push(`CLS ${cls.toFixed(4)} > ${budgets.cls}`);
  const bytes = bytesByType(lhr);
  for (const [type, limit] of Object.entries(budgets.bytes)) {
    if (bytes[type] > limit) failures.push(`${type} ${kb(bytes[type])} > ${kb(limit)}`);
  }
  return failures;
}

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

// ------------------------------------------------------------------- tabla

function pad(text, width) {
  const value = String(text);
  return value.length >= width ? value : value + ' '.repeat(width - value.length);
}

async function main() {
  const server = useDomain ? undefined : startServer();
  const cleanup = () => stopServer(server);
  process.on('SIGINT', () => {
    cleanup();
    process.exit(130);
  });

  try {
    if (server) await waitForServer(`${LOCAL_ORIGIN}/`);
    console.log(
      `Lighthouse ${LIGHTHOUSE_VERSION} · móvil · ${origin}${ciMode ? ' · umbrales de CI' : ''}`,
    );
    console.log(`Chrome: ${chromium.executablePath()}\n`);

    const rows = [];
    let failed = false;

    for (const page of pages) {
      const url = `${origin}${page.path}`;
      const runs = [];
      for (let index = 0; index < page.runs; index++) {
        const lhr = await measure(url);
        runs.push(lhr);
        const perf = score(lhr, 'performance');
        const cls = (lhr.audits['cumulative-layout-shift']?.numericValue ?? 0).toFixed(4);
        const line = `  ${page.path} pasada ${index + 1}/${page.runs}: rend. ${perf} · CLS ${cls}`;
        console.log(showDetail ? `${line} · ${detail(lhr)}` : line);
      }
      const median = computeMedianRun(runs);
      const failures = checkBudgets(median);
      if (failures.length) failed = true;
      rows.push({ page, median, runs, failures });
    }

    const header = [
      pad('Página', 30),
      pad('Rend.', 14),
      pad('Acc.', 5),
      pad('Práct.', 7),
      pad('SEO', 5),
      pad('LCP', 7),
      pad('CLS', 7),
      pad('TBT', 6),
      pad('doc', 8),
      pad('js', 8),
      pad('css', 8),
      pad('fuentes', 8),
      pad('img', 8),
      'total',
    ].join(' ');
    console.log(`\n${header}`);
    for (const { page, median, runs } of rows) {
      const bytes = bytesByType(median);
      const perfAll = runs.map((lhr) => score(lhr, 'performance'));
      console.log(
        [
          pad(page.path, 30),
          pad(`${score(median, 'performance')} (${perfAll.join('·')})`, 14),
          pad(score(median, 'accessibility'), 5),
          pad(score(median, 'best-practices'), 7),
          pad(score(median, 'seo'), 5),
          pad(Math.round(median.audits['largest-contentful-paint']?.numericValue ?? 0), 7),
          pad((median.audits['cumulative-layout-shift']?.numericValue ?? 0).toFixed(4), 7),
          pad(Math.round(median.audits['total-blocking-time']?.numericValue ?? 0), 6),
          pad(kb(bytes.document), 8),
          pad(kb(bytes.script), 8),
          pad(kb(bytes.stylesheet), 8),
          pad(kb(bytes.font), 8),
          pad(kb(bytes.image), 8),
          kb(bytes.total),
        ].join(' '),
      );
    }
    console.log('\nLa fila es la pasada mediana (computeMedianRun); entre paréntesis, todas.');

    for (const { page, failures } of rows) {
      for (const failure of failures) console.log(`FALLA ${page.path}: ${failure}`);
    }
    console.log(
      failed
        ? '\nLIGHTHOUSE: fuera de presupuesto'
        : `\nLIGHTHOUSE: ${rows.length} de ${rows.length} páginas dentro de presupuesto`,
    );
    return failed ? 1 : 0;
  } finally {
    cleanup();
  }
}

main().then(
  (code) => process.exit(code),
  (error) => {
    console.error(error);
    process.exit(1);
  },
);
