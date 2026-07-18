// Idiomas — el español vive en el HTML (idioma por defecto) y el inglés
// en este diccionario. Los elementos traducibles llevan data-i18n="clave";
// los placeholders de formulario, data-i18n-ph="clave".

const EN = {
  'meta-title': 'Fritz Reigar — Developer & web services',
  'meta-description': 'Fritz Reigar — Backend developer and web services in Valencia, Spain. Websites and online stores with WordPress/WooCommerce, local online presence, domains and hosting, Java and C++ development, AI QA.',

  'skip-link': 'Skip to content',

  'nav-servicios': 'Services',
  'nav-experiencia': 'Experience',
  'nav-proyectos': 'Projects',
  'nav-contacto': 'Contact',

  'hero-chip': 'Available for new projects',
  'hero-role': 'Backend developer · Websites & ecommerce for businesses · AI QA',
  'hero-intro': 'I build backend systems with Java and C++, evaluate AI models for Lionbridge and DataAnnotation, and create websites, online stores and digital presence for small businesses. Freelancer based in Valencia, Spain, DAM student.',
  'hero-cta-contact': 'Get in touch',
  'hero-cta-projects': 'See projects',

  'sec-servicios': 'Services',
  'svc-1-t': 'Websites & online stores',
  'svc-1-d': 'Design and build with WordPress and WooCommerce: catalog, payments, shipping and training so you can run your store yourself.',
  'svc-2-t': 'Local online presence',
  'svc-2-d': 'Google Business Profile setup and management, local SEO and reviews so your customers can find you.',
  'svc-3-t': 'Domains, hosting & email',
  'svc-3-d': 'Domain registration, hosting, DNS, SSL and business email. The technical side, handled.',
  'svc-4-t': 'Custom development',
  'svc-4-d': "APIs, integrations and automations with Java and Python when an off-the-shelf website isn't enough.",

  'sec-experiencia': 'Experience',
  'exp-1-date': '2026 — Present',
  'exp-1-role': 'Freelance web technician',
  'exp-1-org': 'Self-employed · Valencia, Spain',
  'exp-1-b1': 'Missphone online store with WordPress and WooCommerce.',
  'exp-1-b2': 'Limpiezas Artemisa website and Google Business Profile management.',
  'exp-1-b3': 'Domains, hosting, DNS and business email for clients.',
  'exp-2-date': 'Jul 2025 — Present',
  'exp-2-b1': 'Auditing and evaluation of LLM outputs: logic, accuracy and factual consistency.',
  'exp-2-b2': 'Over 1,000 model outputs reviewed across several AI projects.',
  'exp-2-b3': 'Bug reporting, technical documentation and game testing with Lionbridge Games.',
  'exp-3-date': 'Jan 2026 — Present',
  'exp-3-b1': 'Adversarial prompting to find failure modes and vulnerabilities in LLMs.',
  'exp-3-b2': 'Evaluation rubrics for response quality and alignment.',
  'exp-4-role': 'IT support technician',
  'exp-4-org': 'Valencia City Council — Local Police',
  'exp-4-b1': 'Level 1 technical support and IT infrastructure maintenance.',

  'sec-proyectos': 'Projects',
  'prj-1-label': 'Client · In progress',
  'prj-1-d': 'Online store with WordPress and WooCommerce: product catalog, payments and shipping for a phone business.',
  'prj-2-label': 'Client · In progress',
  'prj-2-d': 'Corporate website and Google Business Profile management for a cleaning services company.',
  'prj-3-label': 'Own product · In development',
  'prj-3-d': 'Operations hub for freelancers and small businesses: time and rate tracking, projects, client pipeline and deadlines. Local-first: your data lives in your browser.',
  'prj-done-label': 'Personal · Completed',
  'prj-4-d': 'Native recreation of the arcade classic Galaxian without a commercial engine: custom game loop, state machine for enemy AI and hand-coded AABB collisions.',
  'prj-5-d': 'Physics-based third-person character controller, orbital camera and hitbox combat prototype.',
  'prj-6-label': 'DAM capstone · Prototype',
  'prj-6-d': 'The first Spanish-language site about Dragon Quest Smash/Grow: guides, tier lists and news. Built with Hugo, CI/CD on Cloudflare Pages and a CDN with custom cache rules. Real traffic since launch.',
  'prj-link': 'View repository ↗',
  'prj-visit': 'Visit website ↗',

  'stk-1-t': 'Code',
  'stk-3-t': 'Tools',
  'stk-4-t': 'Languages',
  'stk-4-d': 'Spanish (native) · English (C1) · Valencian (C1) · German (A2)',

  'sec-contacto': 'Contact',
  'contact-intro': "Got a project or a proposal? Write me and I'll get back to you soon.",
  'contact-email': 'Or directly at',
  'form-email-ph': 'you@email.com',
  'form-msg-label': 'Message',
  'form-msg-ph': 'Tell me what you need…',
  'form-send': 'Send',
};

const LANG_KEY = 'fritzreigar-lang';
const langBtn = document.getElementById('lang-toggle');
const metaDesc = document.querySelector('meta[name="description"]');

// Textos en español capturados del propio HTML al cargar
const ES = { 'meta-title': document.title, 'meta-description': metaDesc.content };
const ES_PH = {};

document.querySelectorAll('[data-i18n]').forEach((el) => {
  const key = el.dataset.i18n;
  if (!(key in ES)) ES[key] = el.textContent;
});
document.querySelectorAll('[data-i18n-ph]').forEach((el) => {
  ES_PH[el.dataset.i18nPh] = el.placeholder;
});

function aplicarIdioma(lang) {
  const dict = lang === 'en' ? EN : ES;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = dict[el.dataset.i18n] ?? ES[el.dataset.i18n];
  });
  document.querySelectorAll('[data-i18n-ph]').forEach((el) => {
    const key = el.dataset.i18nPh;
    el.placeholder = lang === 'en' ? (EN[key] ?? ES_PH[key]) : ES_PH[key];
  });

  document.documentElement.lang = lang;
  document.title = dict['meta-title'];
  metaDesc.content = dict['meta-description'];

  // El botón muestra el idioma al que se cambiará
  langBtn.textContent = lang === 'en' ? 'ES' : 'EN';
  langBtn.setAttribute('aria-label', lang === 'en' ? 'Cambiar a español' : 'Switch to English');

  localStorage.setItem(LANG_KEY, lang);
}

langBtn.addEventListener('click', () => {
  aplicarIdioma(document.documentElement.lang === 'en' ? 'es' : 'en');
});

// Primera visita: idioma del navegador; después, el que se haya elegido
const guardado = localStorage.getItem(LANG_KEY);
const inicial = guardado ?? (navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en');
if (inicial === 'en') aplicarIdioma('en');
