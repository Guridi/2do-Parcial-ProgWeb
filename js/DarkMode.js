// js/DarkMode.js
(() => {
  const STORAGE_KEY = 'theme';          // single source of truth
  const html = document.documentElement;
  const toggleBtn = document.getElementById('theme-switch');

  // 1. Establecer el modo según preferencia previa o sistema
  const preferred = localStorage.getItem(STORAGE_KEY) ||
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  if (preferred === 'dark') html.classList.add('dark');

  // 2. Listener
  toggleBtn.addEventListener('click', () => {
    html.classList.toggle('dark');
    const current = html.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem(STORAGE_KEY, current);

    // 3. Cambiar icono (luna ↔ sol)
    const [moon, sun] = toggleBtn.querySelectorAll('svg');
    moon.classList.toggle('d-none', current === 'light');
    sun.classList.toggle('d-none',  current === 'dark');
  });

  // 4. Estado inicial de iconos
  if (preferred === 'dark') {
    toggleBtn.querySelectorAll('svg')[0].classList.add('d-none'); // ocultar luna
  } else {
    toggleBtn.querySelectorAll('svg')[1].classList.add('d-none'); // ocultar sol
  }
})();
