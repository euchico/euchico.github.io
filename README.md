# Francisco de Paula

![estado](https://img.shields.io/badge/estado-Em_Andamento-yellow)
![assistência](https://img.shields.io/badge/assistência-IA-blueviolet)
[![licença](https://img.shields.io/badge/licença-MIT-blue.svg)](./LICENSE)

Portfólio pessoal desenvolvido com HTML, CSS e JavaScript, publicado via GitHub Pages.

O objetivo do projeto é apresentar meus estudos em programação, projetos pessoais e trajetória profissional como desenvolvedor Full Stack.

🔗 Visualização: https://euchico.github.io

---

## 📑 Conteúdo

- Pré-Visualização
- Características
- Arquitetura
- Como Rodar
- Próximos Passos
- Contato
- Contribuição
- Licença

---

## 📸 Pré-Visualização
<p align="center">
  <img src="assets/images/screenshot-preview.jpg" alt="Screenshot do Portfólio" width="600px">
</p>

## 🛠️ Características
- HTML5, CSS3, Vanilla JavaScript e GitHub Pages
- Estrutura semântica focada em SEO e acessibilidade
- Layout minimalista com foco em tipografia e leitura
- Tema escuro/claro com alternância
- Conteúdo dinâmico via JSON
- Construído com apoio de IA

## 🧱 Arquitetura
O conteúdo do site é gerenciado de forma desacoplada da estrutura HTML.

- `assets/data/projects.json`
- `assets/data/experience.json`
- `assets/data/education.json`

Esses arquivos são carregados via JavaScript (`content-loader.js`) e renderizados dinamicamente no DOM.

Isso permite:
- Manutenção simplificada;
- Adição de conteúdo sem alterar HTML;
- Organização clara entre estrutura e dados.

## 🚀 Como Rodar (Localmente)

```bash
# 1. Clone o repositório
git clone https://github.com/euchico/euchico.github.io.git

# 2. Acesse a pasta
cd euchico.github.io

# 3. Inicie um servidor local (recomendado)
# VSCode:
# Live Server extension
Acesse: http://localhost:8000

⚠️ Observação: abrir diretamente o arquivo index.html pode não funcionar corretamente devido ao uso de fetch().
```

## ▶️ Próximos Passos
- [ ] Criar favicon
- [ ] Atualizar pré-visualização
- [ ] Corrigir desempenho no pagespeed
- [ ] Atualizar currículo
- [ ] Criar versão em inglês

## 📧 Contato
### Principal
* **Site:** [euchico.github.io](https://euchico.github.io)
* **Email:** [eu.francisco@outlook.com](mailto:eu.francisco@outlook.com)
### Redes
* **LinkedIn:** [/in/euchico](https://www.linkedin.com/in/euchico)
* **Twitter/X:** [@euchicoprog](https://twitter.com/euchicoprog)
* **Instagram:** [@euchicodev](https://www.instagram.com/euchicodev)

## 🤝 Contribuição
Contribuições são sempre bem-vindas! <br>
Se encontrar algum problema ou tiver sugestões, abra uma [Issue](../../issues).

## ⚖️ Licença
Licença MIT (c) 2026 - [Francisco de Paula](https://github.com/euchico/). <br>
Consulte a seção [LICENSE](LICENSE) para mais detalhes.
