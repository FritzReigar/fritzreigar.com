// El único script de la web (decisión 9 de plan/README.md), externo y con su tope en
// lighthouse.budgets.json. Cierra el menú del móvil (plan/spec-visual.md § 2.2, MobileMenu); en la
// 2.4 mejorará el formulario (envío por fetch a Formspree y sus tres estados).

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
