// Las cadenas fijas de la web en los dos idiomas: las del marco (cabecera, menú, pie, salto),
// las de las fichas que no son de ninguna en concreto, las del 404 y las del formulario. El texto de cada página vive en datos: la portada en
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
  // El 404 (NotFoundPage): el title, el título, la entradilla y los tres botones.
  notFound: {
    pageTitle: string;
    title: string;
    lede: string;
    home: string;
    work: string;
    projects: string;
  };
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
    notFound: {
      pageTitle: 'Página no encontrada · Fritz Reigar',
      title: 'Esta página no existe',
      lede: 'O ha cambiado de sitio. Lo que buscabas seguramente está en la portada.',
      home: 'Volver al inicio',
      work: 'Ver el trabajo',
      projects: 'Ver los proyectos',
    },
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
    notFound: {
      pageTitle: 'Page not found · Fritz Reigar',
      title: "This page doesn't exist",
      lede: 'Or it has moved. What you were looking for is probably on the home page.',
      home: 'Back to home',
      work: 'See the work',
      projects: 'See the projects',
    },
  },
};

// El formulario de Contacto (plan/contenido.md § 1.7 y plan/contenido-en.md § 1.7). Sin JS, POST
// normal a Formspree; con JS, main.ts pinta los tres estados (enviando, enviado, error) con estos
// textos, que ContactForm deja en el HTML. El asunto inglés lleva «(English)» para saber, desde la
// bandeja, en qué idioma contestar.
export interface FormText {
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
  subject: string;
  sending: string;
  sent: string;
  failed: string;
}

export const formText: Record<Lang, FormText> = {
  es: {
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
  },
  en: {
    name: 'Name',
    namePlaceholder: 'Your name or company',
    email: 'Email',
    emailPlaceholder: 'you@email.com',
    message: 'Message',
    messagePlaceholder: 'Tell me what you need…',
    submit: 'Send',
    subject: 'New message from fritzreigar.com (English)',
    sending: 'Sending…',
    sent: "Message sent. I'll get back to you soon.",
    failed: "Your message couldn't be sent. Try again or email me at contact@fritzreigar.com.",
  },
};
