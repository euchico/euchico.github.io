import { markActiveNav } from '../components/header/header.js';
import { updateFooterYear } from '../components/footer/footer.js';

function getInitialTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    const nextThemeLabel = theme === 'dark' ? 'claro' : 'escuro';
    toggle.setAttribute('aria-label', `Alternar para modo ${nextThemeLabel}`);
  }
}

function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  applyTheme(getInitialTheme());

  toggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  });
}

export function initAppShell() {
  markActiveNav();
  updateFooterYear();
  initThemeToggle();
}
