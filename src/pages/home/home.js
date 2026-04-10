import { fetchJson, sortByOrder } from '../../scripts/utils.js';

/**
 * Mapa para tradução e estilo das categorias de projetos.
 */
const PROJECT_TYPES = {
  personal: { label: 'Pessoal', className: 'tag-pessoal' },
  challenge: { label: 'Desafio', className: 'tag-desafio' },
  study: { label: 'Estudo', className: 'tag-estudo' },
  professional: { label: 'Profissional', className: 'tag-profissional' },
  experiment: { label: 'Experimento', className: 'tag-experimento' }
};

/**
 * Pequena fábrica de elementos para manter renderização consistente.
 */
const UI = {
  createTag(text, className = '') {
    const span = document.createElement('span');
    span.className = `item-tag ${className}`.trim();
    span.textContent = text;
    return span;
  },

  createName(title, subtitle = '') {
    const span = document.createElement('span');
    span.className = 'item-name';
    span.textContent = title;
    if (subtitle) {
      const em = document.createElement('em');
      em.textContent = subtitle;
      span.appendChild(em);
    }
    return span;
  },

  createRow(data, isLink = false) {
    const li = document.createElement('li');
    const wrapper = document.createElement(isLink ? 'a' : 'div');

    wrapper.className = `item-row${isLink ? '' : ' static-row'}`;
    if (isLink) {
      wrapper.href = data.link;
      wrapper.target = '_blank';
      wrapper.rel = 'noopener noreferrer';
    }

    wrapper.appendChild(this.createName(data.title, data.subtitle));
    wrapper.appendChild(this.createTag(data.tag, data.tagClass));

    li.appendChild(wrapper);
    return li;
  }
};

/**
 * Renderiza listas em containers por id com fallback de vazio.
 */
function renderList(containerId, items, rowMapper, emptyMsg) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';

  if (!items || items.length === 0) {
    const li = document.createElement('li');
    li.className = 'item-empty';
    li.textContent = emptyMsg;
    container.appendChild(li);
    return;
  }

  const fragment = document.createDocumentFragment();
  sortByOrder(items).forEach((item) => {
    fragment.appendChild(rowMapper(item));
  });

  container.appendChild(fragment);
}

function handleProjects(projects) {
  renderList(
    'projects-featured',
    projects.filter((project) => project.featured),
    (project) => UI.createRow({
      title: project.name,
      link: project.link,
      tag: PROJECT_TYPES[project.type]?.label || project.type,
      tagClass: PROJECT_TYPES[project.type]?.className || ''
    }, true),
    'Nenhum projeto em destaque.'
  );

  renderList(
    'projects-all',
    projects,
    (project) => UI.createRow({
      title: project.name,
      link: project.link,
      tag: PROJECT_TYPES[project.type]?.label || project.type,
      tagClass: PROJECT_TYPES[project.type]?.className || ''
    }, true),
    'Nenhum projeto disponível.'
  );
}

/**
 * Carrega dados JSON e monta conteúdo da Home.
 */
export async function initHomePage() {
  try {
    const [projects, experience, education] = await Promise.all([
      fetchJson('/data/projects.json'),
      fetchJson('/data/experience.json'),
      fetchJson('/data/education.json')
    ]);

    handleProjects(projects);

    const genericMapper = (item) => UI.createRow({
      title: item.title,
      subtitle: `em ${item.organization}`,
      tag: item.period
    }, false);

    renderList('experience-list', experience, genericMapper, 'Em breve.');
    renderList('education-list', education, genericMapper, 'Em breve.');
  } catch (error) {
    console.error(error);
    ['projects-featured', 'projects-all', 'experience-list', 'education-list'].forEach((id) => {
      renderList(id, [], null, 'Erro ao carregar dados.');
    });
  }
}
