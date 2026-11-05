// El texto con piezas dentro de una frase: un `code`, una negrita o un enlace (decisión F1 de
// plan/fase-2.md: sin HTML en los datos ni HTML inyectado). Una frase sin piezas es un string; con
// piezas, una lista de trozos que el componente Rich pinta seguidos, sin añadir espacios: el
// espacio va dentro de los trozos de texto. Ejemplo: ['en Snugtone, 640 pruebas y ',
// { code: 'cargo clippy' }, ' sin un aviso.'].
import { z } from 'astro/zod';

export const inlineSchema = z.union([
  z.string(),
  z.object({ code: z.string() }).strict(),
  z.object({ strong: z.string() }).strict(),
  z.object({ link: z.string(), href: z.string() }).strict(),
]);

export const richSchema = z.union([z.string(), z.array(inlineSchema).min(1)]);

export type Inline = z.infer<typeof inlineSchema>;
export type Rich = z.infer<typeof richSchema>;
