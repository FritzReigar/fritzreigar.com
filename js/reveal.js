// Aparición suave de los bloques al entrar en pantalla.
// La clase .js-reveal en <html> es la que activa el estado oculto en CSS:
// sin JavaScript, o sin IntersectionObserver, el contenido se ve tal cual.

const soportado = 'IntersectionObserver' in window;
const movimientoReducido = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (soportado && !movimientoReducido) {
  // Solo los bloques de primer nivel: si se animaran también las tarjetas,
  // el transform del reveal pisaría el de :hover.
  const bloques = document.querySelectorAll('.section:not(.hero) > .container > *');

  document.documentElement.classList.add('js-reveal');
  bloques.forEach((el) => el.classList.add('reveal'));

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-visible');
        observador.unobserve(e.target);
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
  );

  bloques.forEach((el) => observador.observe(el));

  // Red de seguridad: si algo fallara, el contenido se muestra igualmente
  setTimeout(() => document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight) el.classList.add('is-visible');
  }), 1200);
}
