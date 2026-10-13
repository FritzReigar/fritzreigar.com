// Idiomas — el español vive en el HTML (idioma por defecto) y el inglés
// en este diccionario. Los elementos traducibles llevan data-i18n="clave";
// los placeholders de formulario, data-i18n-ph="clave"; los textos alternativos
// de imagen, data-i18n-alt="clave".
//
// Los enlaces al CV llevan data-cv y no clave: se les cambia el href al PDF
// del idioma activo, porque hay un CV por idioma.
// El idioma se puede forzar por URL con ?lang=en (enlace compartible).

const EN = {
  'meta-title': "Fritz Reigar — Web & product developer",
  'meta-description': "Fritz Reigar — Web and product developer based in Valencia, Spain. Snugport founder, end-to-end websites and online shops for local businesses, and AI model QA. Available hybrid in Valencia or fully remote.",

  'skip-link': 'Skip to content',

  'nav-experiencia': 'Experience',
  'nav-proyectos': 'Projects',
  'nav-stack': 'Stack',
  'nav-servicios': 'Services',
  'nav-contacto': 'Contact',
  'header-cv': 'CV',

  'hero-meta-perfil': 'Profile',
  'hero-meta-disponibilidad': 'Availability',
  'hero-meta-contacto': 'Contact',
  'hero-chip': 'Open to offers · Valencia or remote',
  'hero-role': "Web & product developer · Snugport founder · Websites for small businesses · AI model QA",
  'hero-intro': "I build and run Snugport, a SaaS for freelancers on sale: the production version is vanilla JavaScript with no dependencies, and the dashboard is mid-migration to React, TypeScript and Tailwind, with unit, E2E and mutation tests. I build websites and online shops end to end for local businesses and evaluate AI models for Lionbridge and DataAnnotation. I work with AI-assisted development, automated tests and CI.",
  'hero-cta-cv': 'Download CV',
  'hero-cta-contact': 'Get in touch',

  'sec-experiencia': 'Experience',
  'exp-3-date': 'Jan 2026 — Present',
  'exp-3-org': "DataAnnotation Tech · Self-employed, remote",
  'exp-3-b1': "Design of adversarial test cases to surface failures and vulnerabilities in language models.",
  'exp-3-b2': 'Evaluation rubrics to measure the quality and alignment of model responses.',
  'exp-3-b3': "Asynchronous remote work on the quality and safety of model responses.",
  'exp-3-tags': 'Adversarial prompting · LLM evaluation · RLHF',
  'exp-2-date': 'Jul 2025 — Present',
  'exp-2-org': "Lionbridge Technologies · Self-employed, remote",
  'exp-2-b1': "Evaluation of AI-generated outputs, checking logic, accuracy and factual consistency.",
  'exp-2-b2': "More than 1,000 outputs evaluated and documented across multiple AI projects.",
  'exp-2-b3': 'Defect reports and test cases against strict quality criteria, through internal project management tooling.',
  'exp-2-b4': "Video game testing across several platforms with Lionbridge Games; collaboration in English with international teams.",
  'exp-2-tags': "Functional QA · Test cases · Technical documentation",
  'exp-5-date': 'Dec 2024 — Oct 2025',
  'exp-5-org': 'Selectra Sur SL · Valencia, Spain',
  'exp-6-date': "Sep 2018 — Jun 2026",
  'exp-6-role': "Private tutor in maths, physics and programming",
  'exp-6-org': 'Self-employed · Valencia, Spain',
  'exp-1-date': 'Apr 2026 — Present',
  'exp-1-role': "Freelance web developer",
  'exp-1-org': "Estudio Reigar · Self-employed, Valencia, Spain",
  'exp-1-b1': "Websites, online shops and Google listings for local businesses, end to end: development, domain, hosting, DNS, SSL and business email.",
  'exp-1-b2': "Limpiezas Artemisa: 13-page static site on Cloudflare Pages with local SEO, security headers (CSP, HSTS) and mobile Lighthouse above 90, delivered in September 2026; monthly management of its Google Business Profile.",
  'exp-1-b3': "Missphone: maintenance and fixes for its WooCommerce shop, inherited from another developer: catalogue, payment gateway and shipping.",
  'exp-1-tags': "HTML/CSS/JS · WordPress · WooCommerce · Cloudflare · DNS · Local SEO",
  'exp-4-role': 'IT support assistant · Internship',
  'exp-4-org': 'Valencia City Council — Local Police',
  'exp-4-b1': "Tier 1 technical support and IT infrastructure maintenance in a government environment.",
  'exp-4-b2': 'Data analysis, technical documentation and process control.',
  'exp-4-tags': 'IT support · Hardware · Networking',

  'sec-proyectos': 'Projects',
  // Textos alternativos de las capturas de proyecto
  'prj-3-alt': 'snugport.app home page: the live hour tracker next to the produced, unpaid and waiting amounts',
  'prj-4-alt': 'The Galaxian engine mid-game: the enemy formation with one diving, and the player ship firing',
  'prj-2-alt': 'limpiezasartemisa.com home page: the headline, the quote and WhatsApp buttons and the card with the 5.0 Google rating',
  'prj-3-label': "Own product · On sale",
  'prj-3-d': "Control room for freelancers: hour tracker with rates, projects, client pipeline, finances, deadlines and checklists. The production version, in vanilla JavaScript with no dependencies, is an installable PWA that works offline. Ongoing migration of the dashboard to React 19 + TypeScript + Tailwind 4, alongside production: 600+ unit tests (Vitest), 300+ E2E tests (Playwright) and mutation testing.",
  'prj-3-d2': "On sale by subscription through Stripe. Backend on Supabase (Postgres, Auth and Edge Functions in TypeScript): the paywall lives in Postgres RLS policies, not in the client. Accessibility audited (AA contrast, focus trap, prefers-reduced-motion), 4 themes, bilingual ES/EN interface and 80 currencies.",
  'prj-visit-app': 'Try the app ↗',
  'prj-6-label': "Cross-module class project · Discontinued",
  'prj-6-d': "Spanish-language guide site for Dragon Quest Smash/Grow, built with Hugo and deployed via CI/CD on Cloudflare Pages.",
  'prj-done-label': 'Personal · Completed',
  'prj-4-d': 'Native recreation of the arcade classic Galaxian without a commercial engine: custom game loop, entity management with static arrays, state machine for enemy AI and hand-written AABB collisions.',
  'prj-1-label': 'Client · In progress',
  'prj-1-d': 'Maintenance and bug fixing on an inherited WooCommerce store for a phone business: catalog, payments and shipping.',
  'prj-7-label': "Own website · In production",
  'prj-7-d': "Studio website in Astro + TypeScript, bilingual ES/EN. GitHub Actions CI runs E2E tests (Playwright), accessibility (axe) and Lighthouse before publishing.",
  'prj-2-label': 'Client · Delivered Sep 2026 · Under maintenance',
  'prj-2-d': '13-page corporate website for a cleaning company in Valencia: home, six service pages built for local search, blog, contact and legal pages. Static and dependency-free, with a contact form served by a Pages Function and Resend, WhatsApp, structured data (LocalBusiness, Service, BreadcrumbList, BlogPosting), a strict CSP and not a single cookie. Mobile Lighthouse: performance 94–98, accessibility 100 and SEO 100 on every indexable page.',
  'prj-2-d2': 'Infrastructure in the client’s name: domain and email stay at OVH untouched, with www as a CNAME to Cloudflare Pages, a 301 from the bare domain with its own certificate, and a Search Console property. Google Business Profile: initial audit with a performance baseline, rewritten description, completed service list, service area extended to the 20-municipality cap and posts linking back to the site. Monthly maintenance of the profile and the blog.',
  'prj-link': 'View repository ↗',
  'prj-visit': 'Visit website ↗',
  'prj-more': 'All the code on GitHub ↗',

  'sec-stack': 'Stack & education',
  'stk-1-t': 'Languages',
  'stk-2-t': "Infrastructure & tooling",
  'stk-2-d': "Git & GitHub · Docker · Linux (Bash) · Cloudflare Pages · Supabase · Stripe · GitHub Actions · CI/CD · AI-assisted development (Claude Code)",
  'stk-3-t': 'AI & quality',
  'stk-3-d': "LLM evaluation · AI auditing · RLHF · Adversarial prompting · Test case design · Defect reporting · Vitest · Playwright (E2E) · Mutation testing · Accessibility auditing (axe)",
  'stk-4-t': "Frontend",
  'stk-4-d': "React · Tailwind CSS · Astro · Vite · shadcn/Radix · PWA · Accessibility (WCAG AA)",
  'stk-5-t': 'Web',
  'stk-5-d': "WordPress · WooCommerce · Local SEO · Google Business Profile · DNS · Hosting",

  'edu-title': 'Education',
  'edu-1-name': "Higher National Diploma in Multiplatform Application Development (DAM)",
  'edu-1-meta': "IES El Grao, Valencia",
  'edu-3-name': 'Specialisation in Video Game Design and Development',
  'edu-3-meta': 'ESAT, Valencia',
  'edu-2-name': 'Spoken languages',
  'edu-2-meta': 'Spanish (native) · Valencian (C1) · English (C1) · German (A2)',

  'sec-servicios': 'Web services for businesses',
  'sec-servicios-intro': 'Alongside development, I work as a freelancer with small businesses that need their online presence solved end to end.',
  'svc-1-t': 'Websites & online stores',
  'svc-1-d': 'Design and build with WordPress and WooCommerce: catalog, payments, shipping and training so you can run your store yourself.',
  'svc-2-t': 'Local online presence',
  'svc-2-d': 'Google Business Profile setup and management, local SEO and reviews so your customers can find you.',
  'svc-3-t': 'Domains, hosting & email',
  'svc-3-d': 'Domain registration, hosting, DNS, SSL and business email. The technical side, handled.',
  'svc-4-t': 'Custom development',
  'svc-4-d': "Custom integrations and automations with TypeScript and Python when an off-the-shelf website isn't enough.",

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
const CV_ES = 'assets/cv/fritz-reigar-cv.pdf';
const CV_EN = 'assets/cv/fritz-reigar-cv-en.pdf';
const langBtn = document.getElementById('lang-toggle');
const metaDesc = document.querySelector('meta[name="description"]');

// Textos en español capturados del propio HTML al cargar
const ES = { 'meta-title': document.title, 'meta-description': metaDesc.content };
const ES_PH = {};
const ES_ALT = {};

document.querySelectorAll('[data-i18n]').forEach((el) => {
  const key = el.dataset.i18n;
  if (!(key in ES)) ES[key] = el.textContent;
});
document.querySelectorAll('[data-i18n-ph]').forEach((el) => {
  ES_PH[el.dataset.i18nPh] = el.placeholder;
});
document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
  ES_ALT[el.dataset.i18nAlt] = el.alt;
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
  document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
    const key = el.dataset.i18nAlt;
    el.alt = lang === 'en' ? (EN[key] ?? ES_ALT[key]) : ES_ALT[key];
  });

  // Cada idioma tiene su propio PDF; el nombre del archivo descargado también.
  document.querySelectorAll('[data-cv]').forEach((el) => {
    el.href = lang === 'en' ? CV_EN : CV_ES;
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
