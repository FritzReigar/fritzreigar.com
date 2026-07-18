// Menú hamburguesa en móvil — abre/cierra la navegación del header.
// En escritorio el botón está oculto por CSS y este código no interviene.

const navBtn = document.getElementById('nav-toggle');
const siteHeader = document.querySelector('.site-header');

function cerrarMenu() {
  siteHeader.classList.remove('nav-open');
  navBtn.setAttribute('aria-expanded', 'false');
  navBtn.textContent = '☰';
}

navBtn.addEventListener('click', () => {
  const abierto = siteHeader.classList.toggle('nav-open');
  navBtn.setAttribute('aria-expanded', String(abierto));
  navBtn.textContent = abierto ? '✕' : '☰';
});

// Cierra al elegir una sección (navegación por anclas) o con Escape
document.querySelectorAll('.site-nav a').forEach((a) => a.addEventListener('click', cerrarMenu));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') cerrarMenu();
});
