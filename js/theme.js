// Theme Toggle — Fritz Reif Portfolio
// Guarda la preferencia en localStorage para que persista entre visitas

const btn = document.getElementById('theme-toggle');
const STORAGE_KEY = 'fritzreigar-theme';

// Aplica el tema guardado al cargar la página
if (localStorage.getItem(STORAGE_KEY) === 'light') {
  document.body.classList.add('light');
  btn.textContent = '[ DARK_MODE ]';
}

// Toggle al hacer click
btn.addEventListener('click', () => {
  document.body.classList.toggle('light');

  const isLight = document.body.classList.contains('light');
  btn.textContent = isLight ? '[ DARK_MODE ]' : '[ LIGHT_MODE ]';
  localStorage.setItem(STORAGE_KEY, isLight ? 'light' : 'dark');
});