const themeToggle = document.getElementById("theme-toggle");
const docEl = document.documentElement;

/**
 * Obtém o tema inicial baseado no localStorage ou na preferência do SO
 */
const getInitialTheme = () => {
  const saved = localStorage.getItem("theme");
  if (saved) return saved;

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

/**
 * Aplica o tema e atualiza os estados necessários (DOM e Acessibilidade)
 */
const applyTheme = (theme) => {
  docEl.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  // Atualiza o label para leitores de tela (A11y)
  const nextThemeLabel = theme === "dark" ? "claro" : "escuro";
  themeToggle?.setAttribute("aria-label", `Alternar para modo ${nextThemeLabel}`);
};

// Inicialização
applyTheme(getInitialTheme());

// Event Listener com verificação de existência (Defensive Programming)
themeToggle?.addEventListener("click", () => {
  const currentTheme = docEl.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  applyTheme(newTheme);
});