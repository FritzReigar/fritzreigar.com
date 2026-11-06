// El texto de la portada (plan/contenido.md § 1 y § 6), en datos (decisión F1 de plan/fase-2.md):
// la página lo pinta y no escribe nada. Las tarjetas de Missphone, Artemisa, Snugtone y Snugport
// no están aquí: salen de la colección `cases` (src/content.config.ts). Galaxian sí, porque no
// tiene ficha. Las capturas se nombran por su clave de src/data/shots.ts. El inglés entra en la
// 2.9, con el texto de plan/contenido-en.md.
import { EMAIL, profiles } from './ui';
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

export const home: { es: HomeText; en?: HomeText } = { es };
