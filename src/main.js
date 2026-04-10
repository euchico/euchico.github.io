import { initAppShell } from './scripts/global.js';
import { initHomePage } from './pages/home/home.js';
import { initContatoPage } from './pages/contato/contato.js';
import { initSobrePage } from './pages/sobre/sobre.js';

const pageInitializers = {
  home: initHomePage,
  contato: initContatoPage,
  sobre: initSobrePage
};

initAppShell();

const page = document.body.dataset.page;
const initPage = pageInitializers[page];
if (initPage) {
  initPage();
}

if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Falha de registro não deve quebrar a aplicação.
    });
  });
}
