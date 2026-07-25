// Idiomas — el español vive en el HTML (idioma por defecto) y el inglés
// en este diccionario. Los elementos traducibles llevan data-i18n="clave";
// los placeholders de formulario, data-i18n-ph="clave".
// El idioma se puede forzar por URL con ?lang=en (enlace compartible).

const EN = {
  'meta-title': 'Fritz Reigar — Backend developer & AI QA',
  'meta-description': 'Fritz Reigar — Backend developer (Java, C++, Spring Boot) and AI model QA, based in Valencia, Spain. Open to offers. Also web services for small businesses: WordPress/WooCommerce, domains and hosting.',

  'skip-link': 'Skip to content',

  'nav-experiencia': 'Experience',
  'nav-proyectos': 'Projects',
  'nav-stack': 'Stack',
  'nav-servicios': 'Services',
  'nav-contacto': 'Contact',
  'header-cv': 'CV',

  'hero-chip': 'Open to offers · Valencia or remote',
  'hero-role': 'Backend developer · AI model QA',
  'hero-intro': 'I build backend systems with Java, Spring Boot and C++, and evaluate language models for Lionbridge and DataAnnotation: response auditing, red teaming and quality rubrics. I am building Snugport, a SaaS for freelancers written in vanilla JavaScript without a single dependency. Software development student in Valencia, Spain; on the side I run websites and online stores for small businesses.',
  'hero-cta-cv': 'Download CV',
  'hero-cta-contact': 'Get in touch',

  'sec-experiencia': 'Experience',
  'exp-3-date': 'Jan 2026 — Present',
  'exp-3-org': 'DataAnnotation Tech · Remote',
  'exp-3-b1': 'Adversarial test case design to identify failure modes and vulnerabilities in language models.',
  'exp-3-b2': 'Evaluation rubrics to measure the quality and alignment of model responses.',
  'exp-3-b3': 'Asynchronous work on AI safety and alignment projects.',
  'exp-3-tags': 'Adversarial prompting · LLM evaluation · RLHF',
  'exp-2-date': 'Jul 2025 — Present',
  'exp-2-org': 'Lionbridge Technologies · Remote',
  'exp-2-b1': 'Evaluation of AI model outputs, verifying reasoning logic, accuracy and consistency.',
  'exp-2-b2': 'Over 1,000 outputs evaluated and documented across multiple AI projects.',
  'exp-2-b3': 'Defect reports and test cases against strict quality criteria, through internal project management tooling.',
  'exp-2-b4': 'Game testing across several platforms with Lionbridge Games, collaborating in English with international teams.',
  'exp-2-tags': 'Functional QA · Test cases · Technical writing',
  'exp-5-date': 'Dec 2024 — Oct 2025',
  'exp-5-org': 'Selectra Sur SL · Valencia, Spain',
  'exp-5-b1': 'Client portfolio management and incident resolution in a high-volume environment, working to targets.',
  'exp-5-tags': 'Client-facing · Incident handling',
  'exp-6-date': 'Sep 2018 — Present',
  'exp-6-role': 'Private tutor',
  'exp-6-org': 'Self-employed · Valencia, Spain',
  'exp-6-b1': 'One-to-one lessons in maths, physics and programming; currently teaching programming fundamentals to a software student.',
  'exp-6-tags': 'Technical teaching · Programming fundamentals',
  'exp-1-date': '2026 — Present',
  'exp-1-role': 'Freelance developer & web technician',
  'exp-1-org': 'Self-employed · Valencia, Spain',
  'exp-1-b1': 'Missphone online store with WordPress and WooCommerce: catalog, payment gateway and shipping.',
  'exp-1-b2': 'Limpiezas Artemisa website and Google Business Profile management for local lead generation.',
  'exp-1-b3': 'End-to-end client infrastructure: domains, hosting, DNS, SSL and business email.',
  'exp-1-tags': 'WordPress · WooCommerce · DNS · Local SEO',
  'exp-4-role': 'IT support assistant · Internship',
  'exp-4-org': 'Valencia City Council — Local Police',
  'exp-4-b1': 'Level 1 technical support and IT infrastructure maintenance in a government environment.',
  'exp-4-b2': 'Data analysis, technical documentation and process control.',
  'exp-4-tags': 'IT support · Hardware · Networking',

  'sec-proyectos': 'Projects',
  'prj-3-label': 'Own product · Deployed',
  'prj-3-d': 'Operations hub for freelancers: time tracking with hourly rates, projects, client pipeline, deadlines and operational checklists, all in a single page that runs with no install and no connection. Written entirely in vanilla JavaScript: zero dependencies, zero build step, ~8,200 lines of my own code and 10 product sections.',
  'prj-3-d2': 'Optional cross-device sync runs on Supabase (Postgres, Auth and Edge Functions) talking to its REST API without the official client, and the subscription wall lives in the database RLS policies rather than the browser: the server decides. The wall is on writing, never on reading, so nobody’s data is held hostage. Mac ↔ Windows round-trip validated live.',
  'prj-visit-app': 'Try the app ↗',
  'prj-6-label': 'Own project · In production',
  'prj-6-d': 'The first Spanish-language site about Dragon Quest Smash/Grow: guides, tier lists and news. Around 1,500 unique visitors and 35,000 requests a month. Static site built with Hugo, deployed through CI/CD on Cloudflare Pages and served by a CDN with custom cache rules.',
  'prj-done-label': 'Personal · Completed',
  'prj-4-d': 'Native recreation of the arcade classic Galaxian without a commercial engine: custom game loop, entity management with static arrays, state machine for enemy AI and hand-written AABB collisions.',
  'prj-5-d': 'Third-person character controller in Unity: Rigidbody physics, orbital camera, ground detection and a hitbox/hurtbox system for combat.',
  'prj-1-label': 'Client · In progress',
  'prj-1-d': 'Online store with WordPress and WooCommerce: product catalog, payments and shipping for a phone business.',
  'prj-2-label': 'Client · In progress',
  'prj-2-d': 'Corporate website and Google Business Profile management for a cleaning services company.',
  'prj-link': 'View repository ↗',
  'prj-visit': 'Visit website ↗',
  'prj-more': 'All the code on GitHub ↗',

  'sec-stack': 'Stack & education',
  'stk-1-t': 'Languages',
  'stk-2-t': 'Infrastructure',
  'stk-3-t': 'AI & quality',
  'stk-3-d': 'LLM evaluation · AI auditing · RLHF · Adversarial prompting · Test cases · Unit testing',
  'stk-5-t': 'Web',

  'edu-title': 'Education',
  'edu-1-name': 'Higher Technician in Cross-platform Application Development (DAM)',
  'edu-1-meta': 'IES El Grao, Valencia · In progress',
  'edu-3-name': 'Specialisation in Video Game Design and Development',
  'edu-3-meta': 'ESAT, Valencia',
  'edu-2-name': 'Spoken languages',
  'edu-2-meta': 'Spanish (native) · Valencian (C1) · English (C1) · German (B1)',

  'sec-servicios': 'Web services for businesses',
  'sec-servicios-intro': 'Alongside development, I work as a freelancer with small businesses that need their online presence solved end to end.',
  'svc-1-t': 'Websites & online stores',
  'svc-1-d': 'Design and build with WordPress and WooCommerce: catalog, payments, shipping and training so you can run your store yourself.',
  'svc-2-t': 'Local online presence',
  'svc-2-d': 'Google Business Profile setup and management, local SEO and reviews so your customers can find you.',
  'svc-3-t': 'Domains, hosting & email',
  'svc-3-d': 'Domain registration, hosting, DNS, SSL and business email. The technical side, handled.',
  'svc-4-t': 'Custom development',
  'svc-4-d': "APIs, integrations and automations with Java and Python when an off-the-shelf website isn't enough.",

  'sec-contacto': 'Contact',
  'contact-intro': 'An offer, a project or a technical question? Write me and I reply within 24 hours.',
  'contact-email': 'Or directly at',
  'form-name-label': 'Name',
  'form-name-ph': 'Your name or company',
  'form-email-ph': 'you@email.com',
  'form-msg-label': 'Message',
  'form-msg-ph': 'Tell me what you need…',
  'form-send': 'Send',

  'footer-cv': 'CV',
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

function aplicarIdioma(lang, actualizarUrl = true) {
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

  // ?lang=en queda en la barra de direcciones para poder compartir el enlace
  // en inglés; en español se limpia y la URL vuelve a la canónica.
  if (actualizarUrl) {
    const url = new URL(location.href);
    if (lang === 'en') url.searchParams.set('lang', 'en');
    else url.searchParams.delete('lang');
    history.replaceState(null, '', url.pathname + url.search + url.hash);
  }

  localStorage.setItem(LANG_KEY, lang);
}

langBtn.addEventListener('click', () => {
  aplicarIdioma(document.documentElement.lang === 'en' ? 'es' : 'en');
});

// Prioridad: parámetro ?lang= > preferencia guardada > idioma del navegador
const porUrl = new URLSearchParams(location.search).get('lang');
const guardado = localStorage.getItem(LANG_KEY);
const inicial =
  (porUrl === 'en' || porUrl === 'es' ? porUrl : null) ??
  guardado ??
  (navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en');
if (inicial === 'en') aplicarIdioma('en', false);
