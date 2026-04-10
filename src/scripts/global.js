import { markActiveNav } from '../components/header/header.js';
import { updateFooterYear } from '../components/footer/footer.js';

/**
 * Obtém o tema inicial baseado no localStorage ou na preferência do sistema.
 */
function getInitialTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Aplica o tema no documento e atualiza a dica de acessibilidade do botão.
 */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    const nextThemeLabel = theme === 'dark' ? 'claro' : 'escuro';
    toggle.setAttribute('aria-label', `Alternar para modo ${nextThemeLabel}`);
  }
}

/**
 * Inicializa interação do botão de alternância de tema.
 */
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

/**
 * Inicialização global da interface.
 */
export function initAppShell() {
  markActiveNav();
  updateFooterYear();
  initThemeToggle();
}
