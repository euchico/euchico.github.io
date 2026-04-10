# Francisco de Paula

Portfólio pessoal com estrutura modular em HTML, CSS e JavaScript.

## Estrutura de Pastas

```text
meu-projeto/
├── public/
│   ├── index.html
│   └── favicon.ico
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
├── data/
│   ├── projects.json
│   ├── experience.json
│   └── education.json
├── src/
│   ├── components/
│   │   ├── header/
│   │   ├── footer/
│   │   └── button/
│   ├── pages/
│   │   ├── home/
│   │   ├── contato/
│   │   └── sobre/
│   ├── styles/
│   │   ├── global.css
│   │   ├── variables.css
│   │   └── utilities.css
│   ├── scripts/
│   │   ├── global.js
│   │   └── utils.js
│   └── main.js
└── README.md
```

## Como executar

Use um servidor local para evitar problemas com `fetch`.

```bash
npx serve .
```

Depois acesse:

- Home: `/public/index.html`
- Sobre: `/src/pages/sobre/index.html`
- Contato: `/src/pages/contato/index.html`
