// Marca como noindex cualquier subdominio de Cloudflare Pages (la previa de la rama astro, las
// vistas previas de rama y los despliegues sueltos), para que el contenido no se indexe dos
// veces. El dominio propio no se toca. Con endsWith da igual cómo se llame el proyecto o la rama
// (el de ~/Projects/propios/estudio-reigar/web, que generaliza el de Artemisa).

export async function onRequest(context) {
  const host = context.request.headers.get('host') || '';
  if (!host.endsWith('.pages.dev')) return context.next();

  const response = await context.next();
  const copy = new Response(response.body, response);
  copy.headers.set('X-Robots-Tag', 'noindex');
  return copy;
}
