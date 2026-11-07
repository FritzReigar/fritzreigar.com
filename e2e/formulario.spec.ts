import { expect, type Page, type Request, test } from '@playwright/test';
import { EMAIL, FORM_ACTION, formText } from '../src/data/ui';

const text = formText.es;

// El formulario de Contacto (plan/spec-visual.md § 2.2, ContactForm; decisión 10). Sin JS, un POST
// normal a Formspree con el mismo action de la web de hoy, que la CSP deja salir (form-action).
// Con JS, main.ts lo manda por fetch (connect-src) y pinta sus tres estados. Formspree nunca se
// toca: toda petición a formspree.io se intercepta y se contesta aquí.

const fill = async (page: Page): Promise<void> => {
  await page.getByLabel(text.name).fill('Prueba');
  await page.getByLabel(text.email).fill('prueba@example.com');
  await page.getByLabel(text.message).fill('Hola');
};

// Cualquier petición a Formspree pasa por aquí: la cuenta, la guarda y contesta `status`.
const answer = async (page: Page, status: number, sent: Request[]): Promise<void> => {
  await page.route('https://formspree.io/**', async (route) => {
    sent.push(route.request());
    await route.fulfill({ status, contentType: 'application/json', body: '{}' });
  });
};

test.describe('sin JS', () => {
  test.use({ javaScriptEnabled: false });

  test('envía por POST a Formspree con los campos y el asunto', async ({ page }) => {
    let posted: { method: string; body: string } | undefined;
    await page.route(FORM_ACTION, async (route) => {
      posted = { method: route.request().method(), body: route.request().postData() ?? '' };
      await route.fulfill({ status: 200, contentType: 'text/html', body: '<p>ok</p>' });
    });

    await page.goto('/#contacto');
    const form = page.locator('form');
    await expect(form).toHaveAttribute('action', FORM_ACTION);
    await expect(form).toHaveAttribute('method', /post/i);
    await fill(page);
    await Promise.all([page.waitForURL(FORM_ACTION), form.getByRole('button').click()]);

    expect(posted?.method).toBe('POST');
    const fields = new URLSearchParams(posted?.body);
    expect(fields.get('name')).toBe('Prueba');
    expect(fields.get('email')).toBe('prueba@example.com');
    expect(fields.get('message')).toBe('Hola');
    expect(fields.get('_subject')).toBe(text.subject);
    expect(fields.get('_gotcha')).toBe('');
  });
});

test.describe('con JS', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
  });

  test('en reposo no hay estado a la vista y el botón dice «Enviar»', async ({ page }) => {
    await page.goto('/#contacto');
    await expect(page.locator('html')).toHaveAttribute('data-script', 'main');
    const form = page.locator('form');
    await expect(form.getByRole('status')).toBeEmpty();
    await expect(form.getByRole('alert')).toBeEmpty();
    await expect(form.getByRole('button')).toHaveText(text.submit);
    await expect(form.getByRole('button')).not.toHaveAttribute('aria-disabled');
  });

  test('vacío, la validación del navegador lo frena y no sale nada', async ({ page }) => {
    const sent: Request[] = [];
    await answer(page, 200, sent);
    await page.goto('/#contacto');
    await page.locator('form').getByRole('button').click();
    await expect(page.getByLabel(text.name)).toBeFocused();
    expect(sent).toHaveLength(0);
  });

  test('mientras envía, «Enviando…» con aria-disabled, y un segundo clic no repite', async ({
    page,
  }) => {
    const sent: Request[] = [];
    let release: () => void = () => {};
    const held = new Promise<void>((resolve) => {
      release = resolve;
    });
    await page.route('https://formspree.io/**', async (route) => {
      sent.push(route.request());
      await held;
      await route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
    });

    await page.goto('/#contacto');
    await fill(page);
    const button = page.locator('form').getByRole('button');
    await button.click();
    await expect(button).toHaveText(text.sending);
    await expect(button).toHaveAttribute('aria-disabled', 'true');
    // Playwright no pulsa lo que lleva aria-disabled: el segundo clic va forzado.
    await button.click({ force: true });
    release();
    await expect(page.locator('form').getByRole('status')).toHaveText(text.sent);
    expect(sent).toHaveLength(1);
  });

  test('Formspree contesta 200: «enviado» con role="status" y el formulario vacío', async ({
    page,
  }) => {
    const sent: Request[] = [];
    await answer(page, 200, sent);
    await page.goto('/#contacto');
    await fill(page);
    const form = page.locator('form');
    await form.getByRole('button').click();

    const status = form.getByRole('status');
    await expect(status).toHaveText(text.sent);
    await expect(status).toBeVisible();
    await expect(form.getByRole('alert')).toBeEmpty();
    await expect(form.getByRole('button')).toHaveText(text.submit);
    await expect(form.getByRole('button')).not.toHaveAttribute('aria-disabled');
    for (const label of [text.name, text.email, text.message]) {
      await expect(page.getByLabel(label)).toHaveValue('');
    }

    // Una sola petición, por fetch, al action de hoy, pidiendo JSON, con los campos y el asunto.
    expect(sent).toHaveLength(1);
    const [request] = sent;
    expect(request.url()).toBe(FORM_ACTION);
    expect(request.method()).toBe('POST');
    expect(request.headers().accept).toBe('application/json');
    const body = request.postData() ?? '';
    for (const value of ['Prueba', 'prueba@example.com', 'Hola', text.subject]) {
      expect(body).toContain(value);
    }
    await expect(page).toHaveURL(/\/#contacto$/);
  });

  test('Formspree contesta 500: el error con role="alert", el correo enlazado y lo escrito sigue', async ({
    page,
  }) => {
    const sent: Request[] = [];
    await answer(page, 500, sent);
    await page.goto('/#contacto');
    await fill(page);
    const form = page.locator('form');
    await form.getByRole('button').click();

    const alert = form.getByRole('alert');
    await expect(alert).toHaveText(text.failed);
    await expect(alert).toBeVisible();
    await expect(alert.getByRole('link', { name: EMAIL })).toHaveAttribute(
      'href',
      `mailto:${EMAIL}`,
    );
    await expect(form.getByRole('status')).toBeEmpty();
    await expect(form.getByRole('button')).toHaveText(text.submit);
    await expect(form.getByRole('button')).not.toHaveAttribute('aria-disabled');
    await expect(page.getByLabel(text.name)).toHaveValue('Prueba');
    await expect(page.getByLabel(text.email)).toHaveValue('prueba@example.com');
    await expect(page.getByLabel(text.message)).toHaveValue('Hola');
    expect(sent).toHaveLength(1);

    // Al volver a probar, el error se va: tras un 200, solo queda «enviado».
    await page.unrouteAll();
    await answer(page, 200, sent);
    await form.getByRole('button').click();
    await expect(form.getByRole('status')).toHaveText(text.sent);
    await expect(form.getByRole('alert')).toBeEmpty();
  });

  test('sin red: el mismo error', async ({ page }) => {
    await page.route('https://formspree.io/**', (route) => route.abort('internetdisconnected'));
    await page.goto('/#contacto');
    await fill(page);
    await page.locator('form').getByRole('button').click();
    await expect(page.locator('form').getByRole('alert')).toHaveText(text.failed);
    await expect(page.getByLabel(text.message)).toHaveValue('Hola');
  });
});

// En /en/ el mismo formulario, con el texto inglés: etiquetas, asunto con «(English)» y estados.
test.describe('en inglés', () => {
  const en = formText.en;

  const fillEn = async (page: Page): Promise<void> => {
    await page.getByLabel(en.name).fill('Test');
    await page.getByLabel(en.email).fill('test@example.com');
    await page.getByLabel(en.message).fill('Hello');
  };

  test.describe('sin JS', () => {
    test.use({ javaScriptEnabled: false });

    test('envía por POST con el asunto inglés', async ({ page }) => {
      let body = '';
      await page.route(FORM_ACTION, async (route) => {
        body = route.request().postData() ?? '';
        await route.fulfill({ status: 200, contentType: 'text/html', body: '<p>ok</p>' });
      });
      await page.goto('/en/#contact');
      await expect(page.getByLabel(en.name)).toHaveAttribute('placeholder', en.namePlaceholder);
      await expect(page.getByLabel(en.email)).toHaveAttribute('placeholder', en.emailPlaceholder);
      await expect(page.getByLabel(en.message)).toHaveAttribute(
        'placeholder',
        en.messagePlaceholder,
      );
      await fillEn(page);
      const form = page.locator('form');
      await Promise.all([page.waitForURL(FORM_ACTION), form.getByRole('button').click()]);
      expect(new URLSearchParams(body).get('_subject')).toBe(en.subject);
      expect(en.subject).toContain('(English)');
    });
  });

  test.describe('con JS', () => {
    test.beforeEach(async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
    });

    test('«Sending…», luego «Message sent»', async ({ page }) => {
      let release: () => void = () => {};
      const held = new Promise<void>((resolve) => {
        release = resolve;
      });
      await page.route('https://formspree.io/**', async (route) => {
        await held;
        await route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
      });
      await page.goto('/en/#contact');
      await expect(page.locator('html')).toHaveAttribute('data-script', 'main');
      await fillEn(page);
      const form = page.locator('form');
      const button = form.getByRole('button');
      await expect(button).toHaveText(en.submit);
      await button.click();
      await expect(button).toHaveText(en.sending);
      release();
      await expect(form.getByRole('status')).toHaveText(en.sent);
    });

    test('Formspree contesta 500: el error en inglés, con el correo enlazado', async ({ page }) => {
      await answer(page, 500, []);
      await page.goto('/en/#contact');
      await fillEn(page);
      const form = page.locator('form');
      await form.getByRole('button').click();
      const alert = form.getByRole('alert');
      await expect(alert).toHaveText(en.failed);
      await expect(alert.getByRole('link', { name: EMAIL })).toHaveAttribute(
        'href',
        `mailto:${EMAIL}`,
      );
    });
  });
});
