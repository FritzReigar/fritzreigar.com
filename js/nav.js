// Navegación del header: menú hamburguesa en móvil y marcado de la sección
// visible mientras se hace scroll. En escritorio el botón está oculto por CSS.

const navBtn = document.getElementById('nav-toggle');
const siteHeader = document.querySelector('.site-header');
const navLinks = Array.from(document.querySelectorAll('.site-nav a'));

function cerrarMenu(devolverFoco = false) {
  if (!siteHeader.classList.contains('nav-open')) return;
  siteHeader.classList.remove('nav-open');
  navBtn.setAttribute('aria-expanded', 'false');
  navBtn.textContent = '☰';
  if (devolverFoco) navBtn.focus();
}

navBtn.addEventListener('click', () => {
  const abierto = siteHeader.classList.toggle('nav-open');
  navBtn.setAttribute('aria-expanded', String(abierto));
  navBtn.textContent = abierto ? '✕' : '☰';
});

// Cierra al elegir una sección, al tocar fuera del header o con Escape
navLinks.forEach((a) => a.addEventListener('click', () => cerrarMenu()));
document.addEventListener('click', (e) => {
  if (!siteHeader.contains(e.target)) cerrarMenu();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') cerrarMenu(true);
});

// ── Sección activa ────────────────────────────────────────────────
// Marca en el nav la sección que ocupa la franja superior de la ventana.
const secciones = navLinks
  .map((a) => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window && secciones.length) {
  const visibles = new Set();

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => (e.isIntersecting ? visibles.add(e.target.id) : visibles.delete(e.target.id)));
      // De las secciones en pantalla gana la que aparece antes en el documento
      const activa = secciones.find((s) => visibles.has(s.id));
      navLinks.forEach((a) => {
        a.classList.toggle('is-active', Boolean(activa) && a.getAttribute('href') === `#${activa.id}`);
      });
    },
    { rootMargin: '-60px 0px -65% 0px' }
  );

  secciones.forEach((s) => observador.observe(s));
}
