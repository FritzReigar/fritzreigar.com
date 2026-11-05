import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { sitePages } from './support/pages';

// axe en las doce páginas, a los dos anchos, con las reglas de WCAG 2.0, 2.1 y 2.2 en A y AA
// (las del estudio).
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'];

for (const sitePage of sitePages) {
  test(`${sitePage.path}: 0 infracciones`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(sitePage.path);
    const { violations } = await new AxeBuilder({ page }).withTags(TAGS).analyze();
    const found = violations.flatMap((violation) =>
      violation.nodes.map((node) => `${violation.id}: ${node.target.join(' ')}`),
    );
    expect(found).toEqual([]);
  });
}
