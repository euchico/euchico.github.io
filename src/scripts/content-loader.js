import { fetchJson, sortByOrder } from './utils.js';

const PROJECTS_PATH = '/data/projects.json';
const EXPERIENCE_PATH = '/data/experience.json';
const EDUCATION_PATH = '/data/education.json';

const TYPE_LABELS = {
  personal: 'Pessoal',
  pessoal: 'Pessoal',
  challenge: 'Desafio',
  desafio: 'Desafio',
  study: 'Estudo',
  estudo: 'Estudo',
  professional: 'Profissional',
  profissional: 'Profissional',
  experiment: 'Experimento',
  experimento: 'Experimento'
};

const TYPE_CLASSES = {
  personal: 'tag-pessoal',
  pessoal: 'tag-pessoal',
  challenge: 'tag-desafio',
  desafio: 'tag-desafio',
  study: 'tag-estudo',
  estudo: 'tag-estudo',
  professional: 'tag-profissional',
  profissional: 'tag-profissional',
  experiment: 'tag-experimento',
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

async function loadProjects() {
  const featuredEl = document.getElementById('projects-featured');
  const allEl = document.getElementById('projects-all');

  const projects = sortByOrder(await fetchJson(PROJECTS_PATH));
  const featured = projects.filter((p) => Boolean(p.featured));

  asList(featuredEl, featured.map(projectRow), 'Nenhum projeto em destaque no momento.');
  asList(allEl, projects.map(projectRow), 'Nenhum projeto encontrado.');
}

async function loadTimeline(path, elementId, emptyMessage) {
  const target = document.getElementById(elementId);
  const entries = sortByOrder(await fetchJson(path));
  asList(target, entries.map(timelineRow), emptyMessage);
}

export async function initHomeContent() {
  if (!document.body || document.body.dataset.page !== 'home') return;

  await Promise.allSettled([
    loadProjects(),
    loadTimeline(EXPERIENCE_PATH, 'experience-list', 'Nenhuma experiência cadastrada.'),
    loadTimeline(EDUCATION_PATH, 'education-list', 'Nenhuma formação cadastrada.')
  ]);
}
