/**
 * CONFIGURAÇÕES E MAPAS
 */
const PROJECT_TYPES = {
  personal: { label: "Pessoal", className: "tag-pessoal" },
  challenge: { label: "Desafio", className: "tag-desafio" },
  study: { label: "Estudo", className: "tag-estudo" },
  professional: { label: "Profissional", className: "tag-profissional" },
  experiment: { label: "Experimento", className: "tag-experimento" }
};

/**
 * UTILITÁRIOS DE CARREGAMENTO E DADOS
 */
async function fetchJson(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error();
    return await response.json();
  } catch {
    throw new Error(`Falha ao carregar: ${path}`);
  }
}

const sortByOrder = (items) => [...items].sort((a, b) => a.order - b.order);

/**
 * FÁBRICA DE COMPONENTES (DOM)
 */
const UI = {
  createTag(text, className = "") {
    const span = document.createElement("span");
    span.className = `item-tag ${className}`.trim();
    span.textContent = text;
    return span;
  },

  createName(title, subtitle = "") {
    const span = document.createElement("span");
    span.className = "item-name";
    span.textContent = title;
    if (subtitle) {
      const em = document.createElement("em");
      em.textContent = subtitle;
      span.appendChild(em);
    }
    return span;
  },

  createRow(data, isLink = false) {
    const li = document.createElement("li");
    const wrapper = document.createElement(isLink ? "a" : "div");
    
    wrapper.className = "item-row" + (isLink ? "" : " static-row");
    if (isLink) {
      wrapper.href = data.link;
      wrapper.target = "_blank";
      wrapper.rel = "noopener noreferrer";
    }

    wrapper.appendChild(this.createName(data.title, data.subtitle));
    wrapper.appendChild(this.createTag(data.tag, data.tagClass));

    if (isLink) {
      const sr = document.createElement("span");
      sr.className = "sr-only";
      sr.textContent = " (abre em nova aba)";
      wrapper.appendChild(sr);
    }

    li.appendChild(wrapper);
    return li;
  }
};

/**
 * MOTOR DE RENDERIZAÇÃO GENÉRICO
 */
function renderList(containerId, items, rowMapper, emptyMsg) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";
  
  if (!items || items.length === 0) {
    const li = document.createElement("li");
    li.className = "item-empty";
    li.textContent = emptyMsg;
    container.appendChild(li);
    return;
  }

  const fragment = document.createDocumentFragment();
  sortByOrder(items).forEach(item => {
    fragment.appendChild(rowMapper(item));
  });
  
  container.appendChild(fragment);
}

/**
 * ORQUESTRAÇÃO DE CONTEÚDO
 */
function handleProjects(projects) {
  // Renderiza Destaques
  renderList(
    "projects-featured",
    projects.filter(p => p.featured),
    (p) => UI.createRow({
      title: p.name,
      link: p.link,
      tag: PROJECT_TYPES[p.type]?.label || p.type,
      tagClass: PROJECT_TYPES[p.type]?.className || ""
    }, true),
    "Nenhum projeto em destaque."
  );

  // Renderiza Todos
  renderList(
    "projects-all",
    projects,
    (p) => UI.createRow({
      title: p.name,
      link: p.link,
      tag: PROJECT_TYPES[p.type]?.label || p.type,
      tagClass: PROJECT_TYPES[p.type]?.className || ""
    }, true),
    "Nenhum projeto disponível."
  );
}

async function loadContent() {
  try {
    const [projects, experience, education] = await Promise.all([
      fetchJson("assets/data/projects.json"),
      fetchJson("assets/data/experience.json"),
      fetchJson("assets/data/education.json")
    ]);

    handleProjects(projects);

    const genericMapper = (item) => UI.createRow({
      title: item.title,
      subtitle: `em ${item.organization}`,
      tag: item.period
    }, false);

    renderList("experience-list", experience, genericMapper, "Em breve.");
    renderList("education-list", education, genericMapper, "Em breve.");

  } catch (error) {
    console.error(error);
    ["projects-featured", "projects-all", "experience-list", "education-list"].forEach(id => {
      renderList(id, [], null, "Erro ao carregar dados.");
    });
  }
}

document.addEventListener("DOMContentLoaded", loadContent);