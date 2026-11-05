// Las cadenas fijas de la web en los dos idiomas: las del marco (cabecera, menú, pie, salto),
// las de las fichas que no son de ninguna en concreto, las del formulario y el aviso de las
// páginas inglesas que aún no tienen texto. El texto de cada página vive en datos: la portada en
// home.ts y las fichas en la colección `cases` (decisión F1 de plan/fase-2.md). El idioma lo da la
// carpeta: src/pages/en/ es inglés (i18n de astro.config.mjs), y se lee con
// langOf(Astro.currentLocale).

export type Lang = 'es' | 'en';

/** El idioma de la página que se está pintando: el de su carpeta. */
export const langOf = (locale: string | undefined): Lang => (locale === 'en' ? 'en' : 'es');

// Las secciones de la portada a las que lleva la cabecera, y la que marca cada ficha con
// aria-current (plan/spec-visual.md § 2.2, SiteHeader).
export type NavSection = 'work' | 'projects' | 'how' | 'career' | 'contact';

export const navSections: readonly NavSection[] = ['work', 'projects', 'how', 'career', 'contact'];

export interface UiText {
  langName: string;
  skipLink: string;
  homeLabel: string;
  navLabel: string;
  // El botón del menú del móvil (MobileMenu).
  menuLabel: string;
  nav: Record<NavSection, string>;
  // El id de cada sección en la portada de ese idioma: el fragmento de la URL, que se ve.
  sectionIds: Record<NavSection, string>;
  footer: {
    copyright: string;
    cv: string;
  };
  cvHref: string;
  // La sección que abre el rótulo de cada ficha, enlazada a la portada (CaseHero).
  caseSection: Record<'work' | 'projects', string>;
  // El pie de cada captura de una pareja (BeforeAfter).
  beforeAfter: { before: string; after: string };
}

export const EMAIL = 'contact@fritzreigar.com';

export const FORM_ACTION = 'https://formspree.io/f/xojkdwog';

export const profiles = {
  github: 'https://github.com/FritzReigar',
  linkedin: 'https://www.linkedin.com/in/fritz-reif-garcia/',
  x: 'https://x.com/FritzReigar',
} as const;

export const ui: Record<Lang, UiText> = {
  es: {
    langName: 'Español',
    skipLink: 'Saltar al contenido',
    homeLabel: 'Fritz Reigar',
    navLabel: 'Principal',
    menuLabel: 'Menú',
    nav: {
      work: 'Trabajo',
      projects: 'Proyectos',
      how: 'Cómo trabajo',
      career: 'Trayectoria',
      contact: 'Contacto',
    },
    sectionIds: {
      work: 'trabajo',
      projects: 'proyectos',
      how: 'como-trabajo',
      career: 'trayectoria',
      contact: 'contacto',
    },
    footer: {
      copyright: '© 2026 Fritz Reigar · Valencia',
      cv: 'CV',
    },
    cvHref: '/assets/cv/fritz-reigar-cv.pdf',
    caseSection: { work: 'Trabajo', projects: 'Proyecto' },
    beforeAfter: { before: 'Antes', after: 'Después' },
  },
  en: {
    langName: 'English',
    skipLink: 'Skip to content',
    homeLabel: 'Fritz Reigar',
    navLabel: 'Main',
    menuLabel: 'Menu',
    nav: {
      work: 'Work',
      projects: 'Projects',
      how: 'How I work',
      career: 'Career',
      contact: 'Contact',
    },
    sectionIds: {
      work: 'work',
      projects: 'projects',
      how: 'how-i-work',
      career: 'career',
      contact: 'contact',
    },
    footer: {
      copyright: '© 2026 Fritz Reigar · Valencia',
      cv: 'CV',
    },
    cvHref: '/assets/cv/fritz-reigar-cv-en.pdf',
    caseSection: { work: 'Work', projects: 'Project' },
    beforeAfter: { before: 'Before', after: 'After' },
  },
};

// El aviso de una página en inglés cuyo texto aún no existe (en.live en false, routes.ts). Se
// dirige a quien no lee español, así que va en inglés y el enlace lleva a la española.
export const notYetText = {
  text: 'This page is not available in English yet.',
  link: 'Read it in Spanish',
} as const;

// El formulario de Contacto (plan/contenido.md § 1.7). Sin JS, POST normal a Formspree; los tres
// estados (enviando, enviado, error) los pintará main.ts en la fase 2. El inglés, con el texto
// inglés de la fase 2.
export const formText = {
  name: 'Nombre',
  namePlaceholder: 'Tu nombre o empresa',
  email: 'Email',
  emailPlaceholder: 'tu@email.com',
  message: 'Mensaje',
  messagePlaceholder: 'Cuéntame qué necesitas…',
  submit: 'Enviar',
  subject: 'Nuevo mensaje desde fritzreigar.com',
  sending: 'Enviando…',
  sent: 'Mensaje enviado. Te contesto pronto.',
  failed: 'No se ha podido enviar. Prueba otra vez o escríbeme a contact@fritzreigar.com.',
} as const;
