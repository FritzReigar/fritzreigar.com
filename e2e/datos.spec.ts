import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, test } from '@playwright/test';
import { caseRoutes, caseSlugOf } from '../src/data/routes';

// Las fichas viven en la colección `cases`: un JSON por idioma con el slug de su ruta española
// (src/content.config.ts). Cada ficha de routes.ts tiene su JSON en es/, y el de en/ existe si y
// solo si su gemela inglesa está viva: un JSON inglés sin gemela viva sería texto sin revisar
// (decisión F0) esperando a publicarse, y una gemela viva sin JSON no tendría qué pintar. Un JSON
// que no es de ninguna ficha no lo enlaza nadie.
const CASES = fileURLToPath(new URL('../src/content/cases', import.meta.url));

const jsonSlugsIn = (lang: 'es' | 'en'): string[] => {
  const dir = join(CASES, lang);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((name) => name.endsWith('.json'))
    .map((name) => name.replace(/\.json$/, ''))
    .sort();
};

test('las fichas de routes.ts son cuatro', () => {
  expect(caseRoutes.map((route) => route.key)).toEqual([
    'work-missphone',
    'work-artemisa',
    'project-snugtone',
    'project-snugport',
  ]);
});

test('cada ficha tiene su JSON en es/, y no sobra ninguno', () => {
  const expected = caseRoutes.map(caseSlugOf).sort();
  expect(jsonSlugsIn('es')).toEqual(expected);
});

test('en en/ están exactamente las fichas con la gemela inglesa viva', () => {
  const expected = caseRoutes
    .filter((route) => route.en.live)
    .map(caseSlugOf)
    .sort();
  expect(jsonSlugsIn('en')).toEqual(expected);
});

test('en src/content/cases/ solo hay es/ y en/', () => {
  const dirs = readdirSync(CASES, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
  expect(dirs.every((dir) => dir === 'es' || dir === 'en')).toBe(true);
});
