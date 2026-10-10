import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = new URL('../../', import.meta.url);
const htmlUrl = new URL('index.html', root);
const readJson = (name) => JSON.parse(readFileSync(new URL(`data/${name}.json`, root), 'utf8'));
const sortByOrder = (items) => [...items].sort((a, b) => a.order - b.order);
const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[char]);

const typeLabels = {
  pessoal: 'Pessoal', desafio: 'Desafio', estudo: 'Estudo',
  profissional: 'Profissional', experimento: 'Experimento'
};
const statusLabels = { em_andamento: 'Em andamento', finalizado: 'Finalizado' };
const knownTypes = new Set(Object.keys(typeLabels));
const knownStatuses = new Set(Object.keys(statusLabels));

function projectRow(project) {
  const type = String(project.type ?? '').trim().toLowerCase();
  const status = String(project.status ?? '').trim().toLowerCase();
  const typeClass = knownTypes.has(type) ? ` tag-${type}` : '';
  const statusClass = knownStatuses.has(status) ? ` status-${status.replaceAll('_', '-')}` : '';
  const link = project.link || '#';

  return [
    '          <li>',
    `            <a class="item-row" href="${escapeHtml(link)}" target="_blank" rel="noopener noreferrer">`,
    `              <span class="item-name">${escapeHtml(project.name || 'Projeto sem nome')}<span class="sr-only"> (abre em nova aba)</span></span>`,
    '              <span class="item-metadata">',
    `                <span class="item-tag${typeClass}">${escapeHtml(typeLabels[type] || 'Projeto')}</span>`,
    `                <span class="item-tag item-status${statusClass}">${escapeHtml(statusLabels[status] || 'Status não definido')}</span>`,
    '              </span>',
    '            </a>',
    '          </li>'
  ].join('\n');
}

function timelineRow(entry) {
  const organization = entry.organization ? `<em>${escapeHtml(entry.organization)}</em>` : '';
  return [
    '          <li>',
    '            <div class="item-row static-row">',
    `              <span class="item-name">${escapeHtml(entry.title || 'Sem título')}${organization}</span>`,
    `              <span class="item-tag">${escapeHtml(entry.period || '')}</span>`,
    '            </div>',
    '          </li>'
  ].join('\n');
}

function renderSection(html, id, rows) {
  const start = `<!-- INÍCIO DO CONTEÚDO GERADO: ${id} -->`;
  const end = `<!-- FIM DO CONTEÚDO GERADO: ${id} -->`;
  const from = html.indexOf(start);
  const to = html.indexOf(end);
  if (from < 0 || to < from || html.indexOf(start, from + start.length) >= 0) {
    throw new Error(`Marcadores inválidos para ${id}`);
  }
  return `${html.slice(0, from + start.length)}\n${rows.join('\n')}\n          ${html.slice(to)}`;
}

const projects = sortByOrder(readJson('projects'));
const experience = sortByOrder(readJson('experience'));
const education = sortByOrder(readJson('education'));
let html = readFileSync(htmlUrl, 'utf8');
html = renderSection(html, 'projects-featured', projects.filter((item) => item.featured).map(projectRow));
html = renderSection(html, 'projects-all', projects.map(projectRow));
html = renderSection(html, 'experience-list', experience.map(timelineRow));
html = renderSection(html, 'education-list', education.map(timelineRow));
writeFileSync(htmlUrl, html);
console.log(`Conteúdo inicial atualizado em ${fileURLToPath(htmlUrl)}`);
