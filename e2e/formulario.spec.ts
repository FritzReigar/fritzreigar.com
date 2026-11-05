import { expect, test } from '@playwright/test';
import { FORM_ACTION, formText } from '../src/data/ui';

// El formulario de Contacto funciona sin JS (decisión 10): un POST normal a Formspree, con el
// mismo action de la web de hoy, que la CSP deja salir (form-action). Formspree no se toca: la
// petición se intercepta y se contesta aquí.
test.use({ javaScriptEnabled: false });

test('sin JS, envía por POST a Formspree con los campos y el asunto', async ({ page }) => {
  let posted: { method: string; body: string } | undefined;
  await page.route(FORM_ACTION, async (route) => {
    posted = { method: route.request().method(), body: route.request().postData() ?? '' };
    await route.fulfill({ status: 200, contentType: 'text/html', body: '<p>ok</p>' });
  });

  await page.goto('/#contacto');
  const form = page.locator('form');
  await expect(form).toHaveAttribute('action', FORM_ACTION);
  await page.getByLabel(formText.name).fill('Prueba');
  await page.getByLabel(formText.email).fill('prueba@example.com');
  await page.getByLabel(formText.message).fill('Hola');
  await Promise.all([page.waitForURL(FORM_ACTION), form.getByRole('button').click()]);

  expect(posted?.method).toBe('POST');
  const fields = new URLSearchParams(posted?.body);
  expect(fields.get('name')).toBe('Prueba');
  expect(fields.get('email')).toBe('prueba@example.com');
  expect(fields.get('message')).toBe('Hola');
  expect(fields.get('_subject')).toBe(formText.subject);
});
