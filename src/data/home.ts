// El texto de la portada (plan/contenido.md § 1 y § 6), en datos (decisión F1 de plan/fase-2.md):
// la página lo pinta y no escribe nada. Las tarjetas de Missphone, Artemisa, Snugtone y Snugport
// no están aquí: salen de la colección `cases` (src/content.config.ts). Galaxian sí, porque no
// tiene ficha. Las capturas se nombran por su clave de src/data/shots.ts. El inglés es el de
// plan/contenido-en.md, tal cual.
import { EMAIL, type Lang, profiles } from './ui';
import type { Rich } from './rich';
import type { ShotKey } from './shots';

export interface Link {
  text: string;
  href: string;
}

export interface HomeText {
  meta: {
    title: string;
    description: string;
    og: { title: string; description: string };
  };
  jsonLd: Record<string, unknown>;
  hero: {
    name: string;
    avatarAlt: string;
    lede: string;
    status: string;
    studio: Link;
    // El enlace a Contacto, en esta misma página (ui.ts, sectionIds.contact).
    contact: string;
  };
  studio: {
    title: string;
    text: string;
    link: Link;
    shots: { desktop: ShotKey; mobile: ShotKey };
  };
  work: {
    title: string;
    // El enlace de cada tarjeta de la colección a su ficha.
    cardLink: string;
  };
  // Las dos bandas de capturas que van tras Trabajo (ShotBands, plan/spec-visual.md § 6.3), en
  // el orden del lienzo; van con alt="".
  bands: readonly [readonly ShotKey[], readonly ShotKey[]];
  projects: {
    title: string;
    cardLink: string;
    // Galaxian (ProjectMini): pequeño, sin ficha y con el enlace a su repositorio.
    mini: { title: string; label: string; text: string; link: Link; shot: ShotKey };
    more: Link;
  };
  how: {
    title: string;
    items: readonly { title: string; text: Rich }[];
  };
  career: {
    title: string;
    headers: { dates: string; role: string; place: string };
    rows: readonly { dates: string; role: string; place: string }[];
    education: { title: string; items: readonly string[] };
    languages: { title: string; text: string };
    cv: string;
  };
  contact: {
    title: string;
    lede: Rich;
    // Delante del correo enlazado.
    direct: string;
    cv: string;
  };
}

const es: HomeText = {
  meta: {
    title: 'Fritz Reigar · Desarrollador web freelance en Valencia',
    description:
      'Soy Fritz Reigar, desarrollador web freelance en Valencia. Hago webs para negocios con Estudio Reigar y, en mis ratos, apps propias como Snugtone.',
    og: {
      title: 'Fritz Reigar',
      description:
        'Desarrollador web freelance en Valencia: webs para negocios con Estudio Reigar y apps propias en abierto.',
    },
  },
  // plan/contenido.md § 6.3. Los @id cruzados son los del estudio.
  jsonLd: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': 'https://fritzreigar.com/#page',
        url: 'https://fritzreigar.com/',
        name: 'Fritz Reigar · Desarrollador web freelance en Valencia',
        inLanguage: 'es-ES',
        mainEntity: { '@id': 'https://fritzreigar.com/#fritz' },
      },
      {
        '@type': 'Person',
        '@id': 'https://fritzreigar.com/#fritz',
        name: 'Fritz Reigar',
        url: 'https://fritzreigar.com/',
        image: 'https://fritzreigar.com/assets/img/fritz-reigar-avatar.png',
        jobTitle: 'Desarrollador web',
        description:
          'Desarrollador web freelance en Valencia. Hace webs para negocios con Estudio Reigar y apps propias como Snugtone.',
        email: `mailto:${EMAIL}`,
        address: { '@type': 'PostalAddress', addressLocality: 'Valencia', addressCountry: 'ES' },
        worksFor: { '@id': 'https://estudioreigar.com/#estudio' },
        alumniOf: [
          { '@type': 'EducationalOrganization', name: 'IES El Grao', address: 'Valencia, España' },
          {
            '@type': 'EducationalOrganization',
            name: 'ESAT — Escuela Superior de Arte y Tecnología',
            address: 'Valencia, España',
          },
        ],
        knowsLanguage: [
          { '@type': 'Language', name: 'Español', alternateName: 'es' },
          { '@type': 'Language', name: 'Valenciano', alternateName: 'ca' },
          { '@type': 'Language', name: 'Inglés', alternateName: 'en' },
          { '@type': 'Language', name: 'Alemán', alternateName: 'de' },
        ],
        knowsAbout: [
          'Desarrollo web',
          'TypeScript',
          'JavaScript',
          'Astro',
          'React',
          'Tailwind CSS',
          'Rust',
          'Tauri',
          'Accesibilidad web (WCAG AA)',
          'Playwright',
          'Vitest',
          'Cloudflare Pages',
          'Supabase',
          'PostgreSQL',
          'Stripe',
          'WordPress',
          'WooCommerce',
          'SEO local',
          'Google Business Profile',
          'Evaluación de modelos de IA',
        ],
        sameAs: [profiles.github, profiles.linkedin, profiles.x],
      },
      {
        '@type': 'ProfessionalService',
        '@id': 'https://estudioreigar.com/#estudio',
        name: 'Estudio Reigar',
        url: 'https://estudioreigar.com/',
        founder: { '@id': 'https://fritzreigar.com/#fritz' },
      },
    ],
  },
  hero: {
    name: 'Fritz Reigar',
    avatarAlt:
      'Dibujo de Fritz Reigar: retrato de línea, con barba y camiseta azul, sobre fondo celeste.',
    lede: 'Desarrollador web freelance en Valencia. Me encanta la tecnología y vivo de ella: hago webs para negocios con Estudio Reigar y, en mis ratos, apps propias que publico en abierto.',
    status: 'Acepto proyectos',
    studio: { text: 'Estudio Reigar ↗', href: 'https://estudioreigar.com/' },
    contact: 'Escríbeme',
  },
  studio: {
    title: 'Estudio Reigar',
    text: "Estudio Reigar es mi taller: webs, tiendas online y fichas de Google para negocios pequeños. Detrás no hay un equipo: quien te contesta y quien escribe la web soy yo. Las webs las escribo a mano, sin plantillas y a la medida de cada negocio, y las entrego con su nota de velocidad medida y todo a nombre del cliente. En persona en Valencia y l'Horta; al resto de España, a distancia.",
    link: { text: 'Ver estudioreigar.com ↗', href: 'https://estudioreigar.com/' },
    shots: { desktop: 'estudio-reigar-desktop', mobile: 'estudio-reigar-mobile' },
  },
  work: {
    title: 'Trabajo',
    cardLink: 'Ver el caso →',
  },
  bands: [
    [
      'missphone-after-categories',
      'snugport-desktop',
      'limpiezas-artemisa-desktop',
      'snugtone-musicbrainz',
      'missphone-after-cases-page',
      'estudio-reigar-desktop',
    ],
    [
      'snugtone-library',
      'missphone-after-home-lower',
      'galaxian',
      'snugtone-equalizer',
      'missphone-after-home-desktop',
      'snugtone-search',
    ],
  ],
  projects: {
    title: 'Proyectos',
    cardLink: 'Ver el proyecto →',
    mini: {
      title: 'CPP-Galaxian-Engine',
      label: 'C++ · 2023',
      text: 'Un arcade en C++ sin motor comercial: game loop propio, entidades en arrays estáticos, una máquina de estados para la IA enemiga y colisiones AABB escritas a mano.',
      link: {
        text: 'Ver el repositorio ↗',
        href: 'https://github.com/FritzReigar/CPP-Galaxian-Engine',
      },
      shot: 'galaxian',
    },
    more: { text: 'Todo el código público, en GitHub ↗', href: profiles.github },
  },
  how: {
    title: 'Cómo trabajo',
    items: [
      {
        title: 'A mano y sin plantillas.',
        text: 'HTML, CSS y TypeScript escritos para cada caso, y Astro cuando la web tiene varias páginas. Poco JavaScript y nada que no se use.',
      },
      {
        title: 'Pruebas y CI que frenan el despliegue.',
        text: [
          'En la web del estudio, Playwright, axe y Lighthouse pasan antes de publicar; en Snugport, Vitest, Playwright y mutantes; en Snugtone, 640 pruebas y ',
          { code: 'cargo clippy' },
          ' sin un aviso.',
        ],
      },
      {
        title: 'Lighthouse medido, no prometido.',
        text: 'Cada entrega sale con su nota en el móvil, medida y enseñada.',
      },
      {
        title: 'Con IA, y con red.',
        text: 'Desarrollo asistido por IA (Claude Code), con la regla de ver cada prueba nueva en rojo antes de creerse el verde.',
      },
    ],
  },
  career: {
    title: 'Trayectoria',
    headers: { dates: 'Fechas', role: 'Puesto', place: 'Dónde' },
    // docs/cv/cv-es.html § «Experiencia profesional», en su orden: web y CV no se contradicen. Sin
    // las clases particulares, que el CV sí lleva (Fritz, 2026-11-06).
    rows: [
      {
        dates: 'Abr 2026 — hoy',
        role: 'Desarrollador web freelance',
        place: 'Estudio Reigar · Autónomo, Valencia',
      },
      {
        dates: 'Ene 2026 — hoy',
        role: 'AI Red-Teaming & Prompt Engineer',
        place: 'DataAnnotation Tech · Autónomo, remoto',
      },
      {
        dates: 'Jul 2025 — hoy',
        role: 'AI QA Analyst / Project Tester',
        place: 'Lionbridge Technologies · Autónomo, remoto',
      },
      {
        dates: 'Dic 2024 — Oct 2025',
        role: 'Energy Consultant & Account Manager',
        place: 'Selectra Sur SL · Valencia',
      },
      {
        dates: '2019',
        role: 'Asistente técnico informático · Prácticas',
        place: 'Ayuntamiento de Valencia — Policía Local',
      },
    ],
    education: {
      title: 'Formación',
      items: [
        'Técnico Superior en Desarrollo de Aplicaciones Multiplataforma (DAM) — IES El Grao, Valencia',
        'Especialización en Diseño y Desarrollo de Videojuegos — ESAT, Valencia',
      ],
    },
    languages: {
      title: 'Idiomas',
      text: 'Español (nativo) · Valenciano (C1) · Inglés (C1) · Alemán (A2)',
    },
    cv: 'CV en PDF ↓',
  },
  contact: {
    title: 'Contacto',
    lede: [
      '¿Un proyecto, una web que has heredado o una pregunta técnica? Escríbeme: te contesto yo, normalmente en menos de 24 horas. Si es para la web de tu negocio, en ',
      { link: 'estudioreigar.com', href: 'https://estudioreigar.com/' },
      ' tienes cómo trabajo y qué cuesta.',
    ],
    direct: 'O directamente a ',
    cv: 'CV en PDF ↓',
  },
};

// plan/contenido-en.md § 1 y § 6. Los enlaces al estudio van a su inglés.
const en: HomeText = {
  meta: {
    title: 'Fritz Reigar · Freelance web developer in Valencia, Spain',
    description:
      "I'm Fritz Reigar, a freelance web developer in Valencia, Spain. I build websites for businesses with Estudio Reigar and, in my spare time, my own apps, like Snugtone.",
    og: {
      title: 'Fritz Reigar',
      description:
        'Freelance web developer in Valencia, Spain: websites for businesses with Estudio Reigar and my own apps, shared publicly.',
    },
  },
  // plan/contenido-en.md § 6.3: cambian la página y los textos; los @id de la persona y del
  // estudio son los mismos en los dos idiomas.
  jsonLd: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': 'https://fritzreigar.com/en/#page',
        url: 'https://fritzreigar.com/en/',
        name: 'Fritz Reigar · Freelance web developer in Valencia, Spain',
        inLanguage: 'en',
        mainEntity: { '@id': 'https://fritzreigar.com/#fritz' },
      },
      {
        '@type': 'Person',
        '@id': 'https://fritzreigar.com/#fritz',
        name: 'Fritz Reigar',
        url: 'https://fritzreigar.com/',
        image: 'https://fritzreigar.com/assets/img/fritz-reigar-avatar.png',
        jobTitle: 'Web developer',
        description:
          'Freelance web developer in Valencia, Spain. He builds websites for businesses with Estudio Reigar and his own apps, like Snugtone.',
        email: `mailto:${EMAIL}`,
        address: { '@type': 'PostalAddress', addressLocality: 'Valencia', addressCountry: 'ES' },
        worksFor: { '@id': 'https://estudioreigar.com/#estudio' },
        alumniOf: [
          { '@type': 'EducationalOrganization', name: 'IES El Grao', address: 'Valencia, Spain' },
          {
            '@type': 'EducationalOrganization',
            name: 'ESAT — Escuela Superior de Arte y Tecnología',
            address: 'Valencia, Spain',
          },
        ],
        knowsLanguage: [
          { '@type': 'Language', name: 'Spanish', alternateName: 'es' },
          { '@type': 'Language', name: 'Valencian', alternateName: 'ca' },
          { '@type': 'Language', name: 'English', alternateName: 'en' },
          { '@type': 'Language', name: 'German', alternateName: 'de' },
        ],
        knowsAbout: [
          'Web development',
          'TypeScript',
          'JavaScript',
          'Astro',
          'React',
          'Tailwind CSS',
          'Rust',
          'Tauri',
          'Web accessibility (WCAG AA)',
          'Playwright',
          'Vitest',
          'Cloudflare Pages',
          'Supabase',
          'PostgreSQL',
          'Stripe',
          'WordPress',
          'WooCommerce',
          'Local SEO',
          'Google Business Profile',
          'AI model evaluation',
        ],
        sameAs: [profiles.github, profiles.linkedin, profiles.x],
      },
      {
        '@type': 'ProfessionalService',
        '@id': 'https://estudioreigar.com/#estudio',
        name: 'Estudio Reigar',
        url: 'https://estudioreigar.com/',
        founder: { '@id': 'https://fritzreigar.com/#fritz' },
      },
    ],
  },
  hero: {
    name: 'Fritz Reigar',
    avatarAlt:
      'Line drawing of Fritz Reigar, with a beard and a blue T-shirt, on a light blue background.',
    lede: 'Freelance web developer in Valencia, Spain. I love technology and make a living from it: I build websites for businesses with Estudio Reigar and, in my spare time, my own apps, which I share publicly.',
    status: 'Taking on projects',
    studio: { text: 'Estudio Reigar ↗', href: 'https://estudioreigar.com/en/' },
    contact: 'Get in touch',
  },
  studio: {
    title: 'Estudio Reigar',
    text: "Estudio Reigar is my workshop: websites, online stores and Google Business Profiles for small businesses. There's no team behind it: I answer the messages and I write the websites, by hand, with no templates and tailored to each business. I deliver them with their speed score measured and everything in the client's name. In person in Valencia and the towns around it (l'Horta); anywhere else in Spain, remotely.",
    link: { text: 'Visit estudioreigar.com ↗', href: 'https://estudioreigar.com/en/' },
    shots: es.studio.shots,
  },
  work: {
    title: 'Work',
    cardLink: 'See the case study →',
  },
  bands: es.bands,
  projects: {
    title: 'Projects',
    cardLink: 'See the project →',
    mini: {
      title: 'CPP-Galaxian-Engine',
      label: 'C++ · 2023',
      text: 'An arcade game in C++ with no commercial engine: its own game loop, entities in static arrays, a state machine for the enemy AI and hand-written AABB collisions.',
      link: {
        text: 'See the repository ↗',
        href: 'https://github.com/FritzReigar/CPP-Galaxian-Engine',
      },
      shot: 'galaxian',
    },
    more: { text: 'All my public code, on GitHub ↗', href: profiles.github },
  },
  how: {
    title: 'How I work',
    items: [
      {
        title: 'By hand, with no templates.',
        text: 'HTML, CSS and TypeScript written for each project, and Astro when the website has several pages. Minimal JavaScript, and nothing that goes unused.',
      },
      {
        title: 'Tests and CI that gate every deploy.',
        text: [
          'On the Estudio Reigar website, Playwright, axe and Lighthouse have to pass before anything goes live; in Snugport, Vitest, Playwright and mutation testing; in Snugtone, 640 tests and ',
          { code: 'cargo clippy' },
          ' without a single warning.',
        ],
      },
      {
        title: 'Lighthouse measured, not promised.',
        text: 'Every project I deliver comes with its mobile score, measured and shared.',
      },
      {
        title: 'With AI, and with a safety net.',
        text: 'AI-assisted development (Claude Code), with one rule: watch every new test fail before trusting a pass.',
      },
    ],
  },
  career: {
    title: 'Career',
    headers: { dates: 'Dates', role: 'Role', place: 'Where' },
    // Puestos, fechas y organizaciones de docs/cv/cv-en.html, como en español.
    rows: [
      {
        dates: 'Apr 2026 — Present',
        role: 'Freelance web developer',
        place: 'Estudio Reigar · Self-employed, Valencia',
      },
      {
        dates: 'Jan 2026 — Present',
        role: 'AI Red-Teaming & Prompt Engineer',
        place: 'DataAnnotation Tech · Self-employed, remote',
      },
      {
        dates: 'Jul 2025 — Present',
        role: 'AI QA Analyst / Project Tester',
        place: 'Lionbridge Technologies · Self-employed, remote',
      },
      {
        dates: 'Dec 2024 — Oct 2025',
        role: 'Energy Consultant & Account Manager',
        place: 'Selectra Sur SL · Valencia',
      },
      {
        dates: '2019',
        role: 'IT Support Technician · Internship',
        place: 'Valencia City Council — Local Police',
      },
    ],
    education: {
      title: 'Education',
      items: [
        "Multiplatform Application Development (DAM), Spain's two-year higher vocational program in software — IES El Grao, Valencia",
        'Specialization in Video Game Design and Development — ESAT, Valencia',
      ],
    },
    languages: {
      title: 'Languages',
      text: 'Spanish (native) · Valencian (C1) · English (C1) · German (A2)',
    },
    cv: 'CV (PDF) ↓',
  },
  contact: {
    title: 'Contact',
    lede: [
      "A project, a website you've inherited, or a technical question? Write to me: I answer personally, usually within 24 hours. If it's about your business's website, ",
      { link: 'estudioreigar.com', href: 'https://estudioreigar.com/en/' },
      ' explains how I work and what it costs.',
    ],
    direct: 'Or email me directly at ',
    cv: 'CV (PDF) ↓',
  },
};

export const home: Record<Lang, HomeText> = { es, en };
