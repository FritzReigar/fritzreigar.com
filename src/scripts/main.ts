// El único script de la web (decisión 9 de plan/README.md), externo y con su tope en
// lighthouse.budgets.json. Cierra el menú del móvil y mejora el formulario de Contacto
// (plan/spec-visual.md § 2.1 y § 2.2, MobileMenu y ContactForm).

// Marca que ha cargado: las pruebas comprueban así que la CSP lo deja correr.
document.documentElement.dataset.script = 'main';

// El menú es un <details>: sin JS se abre y se cierra solo con «Menú». Con JS, además, se cierra
// al pulsar un enlace, al pulsar fuera y con Escape, que devuelve el foco a «Menú».
const menus = [...document.querySelectorAll<HTMLDetailsElement>('details[data-menu]')];

for (const menu of menus) {
  menu.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('nav a')) menu.open = false;
  });
}

document.addEventListener('click', (event) => {
  for (const menu of menus) {
    if (menu.open && !(event.target instanceof Node && menu.contains(event.target))) {
      menu.open = false;
    }
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  for (const menu of menus) {
    if (!menu.open) continue;
    menu.open = false;
    menu.querySelector('summary')?.focus();
  }
});

// El formulario de Contacto (ContactForm.astro; decisión 10 de plan/README.md). Sin JS es un POST
// normal a Formspree. Con JS se manda por fetch al mismo action pidiendo JSON, y se pintan sus
// estados: enviando («Enviando…» en el botón, con aria-disabled y sin apagarlo, que perdería el
// foco), enviado (la línea con role="status" y el formulario vacío) o error (la línea con
// role="alert" y el correo enlazado; lo escrito se queda). El texto de cada línea sale de su
// <template>. La validación es la del navegador: el submit solo llega con los campos bien.
const contactForm = document.querySelector<HTMLFormElement>('form[data-contact-form]');

if (contactForm) {
  const button = contactForm.querySelector<HTMLButtonElement>('button[type="submit"]');
  const lines = {
    sent: contactForm.querySelector<HTMLElement>('p[data-form-sent]'),
    failed: contactForm.querySelector<HTMLElement>('p[data-form-failed]'),
  };
  const templates = {
    sent: contactForm.querySelector<HTMLTemplateElement>('template[data-form-sent]'),
    failed: contactForm.querySelector<HTMLTemplateElement>('template[data-form-failed]'),
  };
  const submitLabel = button?.textContent ?? '';
  let busy = false;

  const show = (state: 'sent' | 'failed' | null): void => {
    for (const key of ['sent', 'failed'] as const) {
      const content = key === state ? templates[key]?.content.cloneNode(true) : null;
      lines[key]?.replaceChildren(...(content ? [content] : []));
    }
  };

  const setBusy = (isBusy: boolean): void => {
    busy = isBusy;
    if (!button) return;
    button.textContent = isBusy ? (contactForm.dataset.sending ?? submitLabel) : submitLabel;
    if (isBusy) button.setAttribute('aria-disabled', 'true');
    else button.removeAttribute('aria-disabled');
  };

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    show(null);
    let state: 'sent' | 'failed' = 'failed';
    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' },
      });
      if (response.ok) state = 'sent';
    } catch {
      // Sin red o bloqueado: se queda en error, que dice que el mensaje no ha llegado.
    }
    setBusy(false);
    if (state === 'sent') contactForm.reset();
    show(state);
  });
}
