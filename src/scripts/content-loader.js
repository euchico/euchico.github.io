// Camada utilitária simples para consumo de JSON do CMS local.
async function fetchJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Falha ao carregar: ${path}`);
  }
  return response.json();
}

// Ordena itens por campo "order", preservando imutabilidade.
function sortByOrder(items = []) {
  return [...items].sort((a, b) => a.order - b.order);
}

// Atualiza o ano exibido no rodapé.
function updateFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) {
    el.textContent = new Date().getFullYear().toString();
  }
}

// Marca link ativo da navegação quando existir menu com ".topbar-link".
function markActiveNav() {
  const path = window.location.pathname;

  document.querySelectorAll('.topbar-link').forEach((link) => {
    const href = link.getAttribute('href') || '';
    const normalizedHref = href.replace(/^\//, '');

    const isHomeHref = href.endsWith('/index.html');
    const isHomePath = path === '/' || path.endsWith('/index.html');
    const isCurrent = path.endsWith(normalizedHref) || (isHomeHref && isHomePath);

    if (isCurrent) {
      link.setAttribute('aria-current', 'page');
    }
  });
}

// Define tema inicial por storage, com fallback para preferência do sistema.
function getInitialTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Aplica tema e ajusta descrição acessível do botão.
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    const nextThemeLabel = theme === 'dark' ? 'claro' : 'escuro';
    toggle.setAttribute('aria-label', `Alternar para modo ${nextThemeLabel}`);
  }
}

// Inicializa interação de alternância de tema.
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

// Inicialização base da interface (tema, footer e navegação).
export function initAppShell() {
  markActiveNav();
  updateFooterYear();
  initThemeToggle();
}

// Configuração dos caminhos de dados do CMS.
const PROJECTS_PATH = '/data/projects.json';
const EXPERIENCE_PATH = '/data/experience.json';
const EDUCATION_PATH = '/data/education.json';

const TYPE_LABELS = {
  pessoal: 'Pessoal',
  desafio: 'Desafio',
  estudo: 'Estudo',
  profissional: 'Profissional',
  experimento: 'Experimento'
};

const TYPE_CLASSES = {
  pessoal: 'tag-pessoal',
  desafio: 'tag-desafio',
  estudo: 'tag-estudo',
  profissional: 'tag-profissional',
  experimento: 'tag-experimento'
};

function asList(container, rows, emptyMessage) {
  if (!container) return;

  container.innerHTML = '';
  if (!rows.length) {
    const item = document.createElement('li');
    item.className = 'item-empty';
    item.textContent = emptyMessage;
    container.appendChild(item);
    return;
  }

  rows.forEach((row) => container.appendChild(row));
}

function normalizeType(type) {
  return String(type || '').trim().toLowerCase();
}

// Renderiza um item de projeto com link e tag de categoria.
function projectRow(project) {
  const li = document.createElement('li');
  const anchor = document.createElement('a');
  anchor.className = 'item-row';
  anchor.href = project.link || '#';
  anchor.target = '_blank';
  anchor.rel = 'noopener noreferrer';

  const name = document.createElement('span');
  name.className = 'item-name';
  name.textContent = project.name || 'Projeto sem nome';

  const typeKey = normalizeType(project.type);
  const tag = document.createElement('span');
  tag.className = `item-tag ${TYPE_CLASSES[typeKey] || ''}`.trim();
  tag.textContent = TYPE_LABELS[typeKey] || 'Projeto';

  anchor.appendChild(name);
  anchor.appendChild(tag);
  li.appendChild(anchor);
  return li;
}

// Renderiza item de linha do tempo (experiência/educação).
function timelineRow(entry) {
  const li = document.createElement('li');
  const row = document.createElement('div');
  row.className = 'item-row static-row';

  const name = document.createElement('span');
  name.className = 'item-name';
  name.textContent = entry.title || 'Sem título';

  if (entry.organization) {
    const org = document.createElement('em');
    org.textContent = entry.organization;
    name.appendChild(org);
  }

  const period = document.createElement('span');
  period.className = 'item-tag';
  period.textContent = entry.period || '';

  row.appendChild(name);
  row.appendChild(period);
  li.appendChild(row);
  return li;
}

// Carrega e renderiza projetos (destaques e lista completa).
async function loadProjects() {
  const featuredEl = document.getElementById('projects-featured');
  const allEl = document.getElementById('projects-all');

  const projects = sortByOrder(await fetchJson(PROJECTS_PATH));
  const featured = projects.filter((p) => Boolean(p.featured));

  asList(featuredEl, featured.map(projectRow), 'Nenhum projeto encontrado.');
  asList(allEl, projects.map(projectRow), 'Nenhum projeto encontrado.');
}

// Carrega e renderiza listas cronológicas genéricas.
async function loadTimeline(path, elementId, emptyMessage) {
  const target = document.getElementById(elementId);
  const entries = sortByOrder(await fetchJson(path));
  asList(target, entries.map(timelineRow), emptyMessage);
}

// Inicialização de conteúdo da Home baseado em JSON.
export async function initHomeContent() {
  if (!document.body || document.body.dataset.page !== 'home') return;

  await Promise.allSettled([
    loadProjects(),
    loadTimeline(EXPERIENCE_PATH, 'experience-list', 'Nenhuma experiência cadastrada.'),
    loadTimeline(EDUCATION_PATH, 'education-list', 'Nenhuma formação cadastrada.')
  ]);
}
