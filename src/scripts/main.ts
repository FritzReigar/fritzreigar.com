// El único script de la web (decisión 9 de plan/README.md), externo y con su tope en
// lighthouse.budgets.json. Casi vacío en la tanda 1.5: en la fase 2 mejora el formulario (envío
// por fetch a Formspree y sus tres estados) y cierra el menú del móvil (plan/spec-visual.md § 2.1).
// Mientras, solo marca que ha cargado, para que las pruebas comprueben que la CSP lo deja correr.
document.documentElement.dataset.script = 'main';
