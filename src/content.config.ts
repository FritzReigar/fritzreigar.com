// Las cuatro fichas (decisión F1 de plan/fase-2.md): un JSON por idioma y el mismo slug, en
// src/content/cases/es/<slug>.json y, cuando su gemela esté viva, en src/content/cases/en/. El
// slug es el último trozo de su ruta española (routes.ts: /trabajo/missphone → missphone), y
// e2e/datos.spec.ts lo comprueba. Cada entrada lleva su tarjeta de la portada, la cabecera y la
// vitrina de su ficha, sus metadatos y las piezas del cuerpo, todas opcionales: la plantilla
// CaseBody (tanda 2.5) pinta las presentes en un orden fijo, no en el del JSON. Las capturas se
// nombran por su clave de src/data/shots.ts: una clave que no está allí tumba el build. El patrón
// es el del estudio (~/Projects/propios/estudio-reigar/web/src/content.config.ts).
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { richSchema } from './data/rich';
import { shotKeys } from './data/shots';

const shot = z.enum(shotKeys);

const link = z.strictObject({ text: z.string(), href: z.url() });

const titled = { title: z.string() };

// Las piezas del cuerpo, con el nombre del componente que las pinta (plan/spec-visual.md § 2.2,
// Fichas). El texto con un `code`, una negrita o un enlace dentro va en Rich (src/data/rich.ts).
const pullQuote = z.strictObject({ label: z.string(), text: z.string() });

const prose = z.strictObject({
  ...titled,
  intro: richSchema,
  items: z.array(richSchema).min(1).optional(),
  outro: richSchema.optional(),
});

const beforeAfter = z.strictObject({
  ...titled,
  note: z.string(),
  pairs: z
    .array(
      z.strictObject({
        ...titled,
        before: z.strictObject({ text: z.string(), shot }),
        after: z.strictObject({ text: z.string(), shot }),
        // La pareja del móvil: dos columnas estrechas y sin flecha.
        tall: z.boolean().optional(),
      }),
    )
    .min(1),
});

const featureRows = z.strictObject({
  title: z.string().optional(),
  items: z
    .array(
      z.strictObject({
        title: z.string().optional(),
        text: richSchema,
        shot: shot.optional(),
      }),
    )
    .min(1),
});

const figureList = z.strictObject({
  ...titled,
  note: richSchema.optional(),
  items: z
    .array(
      z.strictObject({
        num: z.string(),
        unit: z.string().optional(),
        text: richSchema,
      }),
    )
    .min(1),
});

const phaseList = z.strictObject({
  ...titled,
  items: z.array(z.strictObject({ ...titled, text: z.string() })).min(1),
  today: z.string().optional(),
});

const layerStack = z.strictObject({
  ...titled,
  lede: z.string(),
  layers: z
    .array(z.strictObject({ name: z.string(), text: z.string(), core: z.boolean().optional() }))
    .min(1)
    .optional(),
});

const caseClosing = z.strictObject({
  columns: z
    .array(
      z.strictObject({
        ...titled,
        text: richSchema.optional(),
        stack: z.array(z.string()).min(1).optional(),
        action: link.optional(),
      }),
    )
    .min(1),
});

const cases = defineCollection({
  loader: glob({ pattern: '*/*.json', base: './src/content/cases' }),
  schema: z.strictObject({
    section: z.enum(['work', 'projects']),
    // El sitio en su sección de la portada: la 1 es la grande (WorkFeature, ProjectFeature).
    order: z.number().int().positive(),
    // El rótulo de la cabecera de la ficha, sin la sección: «Trabajo» o «Proyecto» los pone la
    // página, enlazados (ui.ts, caseSection).
    kicker: z.string(),
    title: z.string(),
    lede: z.string(),
    primary: link,
    secondary: link.optional(),
    // La tarjeta de la portada. Snugtone lleva tres capturas (ProjectFeature); las demás, una.
    card: z.strictObject({
      label: z.string(),
      summary: z.string(),
      shots: z.array(shot).min(1).max(3),
    }),
    showcase: z.strictObject({
      desktop: shot,
      phone: shot.optional(),
      caption: z.string().optional(),
    }),
    meta: z.strictObject({
      title: z.string(),
      description: z.string(),
    }),
    body: z.strictObject({
      pullQuote: pullQuote.optional(),
      prose: prose.optional(),
      beforeAfter: beforeAfter.optional(),
      featureRows: featureRows.optional(),
      figureList: figureList.optional(),
      phaseList: phaseList.optional(),
      layerStack: layerStack.optional(),
      caseClosing: caseClosing.optional(),
    }),
  }),
});

export const collections = { cases };
