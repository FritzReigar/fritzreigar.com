import { defineConfig, devices } from '@playwright/test';

// Copia del estudio (~/Projects/propios/estudio-reigar/web/playwright.config.ts). Playwright mide
// el BUILD servido como en producción: `wrangler pages dev dist` usa el mismo asset-server que
// Pages (URLs limpias, 308, 404.html por cercanía, la CSP de _headers y functions/ en workerd).
// `npm run e2e` no construye: lo hace antes quien lo llama (`npm run red`).
const BASE_URL = 'http://127.0.0.1:8788';

export default defineConfig({
  testDir: './e2e',
  // Primero 390 x 844 con táctil y después 1440 x 900: el orden solo se cumple con un
  // trabajador y sin paralelismo.
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [['list']],
  use: {
    baseURL: BASE_URL,
    trace: 'retain-on-failure',
    locale: 'es-ES',
  },
  projects: [
    {
      name: 'movil',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
    {
      name: 'escritorio',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
  ],
  webServer: {
    command:
      'npx wrangler pages dev dist --ip 127.0.0.1 --port 8788 --compatibility-date 2026-11-01',
    url: `${BASE_URL}/`,
    // Sin reutilizar: un servidor dejado por una pasada anterior serviría un dist/ viejo y el
    // verde no querría decir nada.
    reuseExistingServer: false,
    timeout: 60_000,
    env: { WRANGLER_SEND_METRICS: 'false' },
  },
});
