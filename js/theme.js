// Toggle de tema — claro por defecto, oscuro con la clase .dark en <html>.
// El estado inicial lo aplica el script inline del <head> (evita parpadeo);
// aquí solo se conecta el botón y se persiste la preferencia.

const themeBtn = document.getElementById('theme-toggle');
const THEME_KEY = 'fritzreigar-theme';

themeBtn.addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
});
