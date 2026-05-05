import { initAppShell, initHomeContent } from './content-loader.js';

// Inicializa comportamentos globais da interface (tema, footer e navegacao).
initAppShell();
// Inicializa o carregamento de conteudo dinamico da pagina Home.
initHomeContent();

// Registra o service worker apenas em ambientes HTTP/HTTPS.
if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js', { updateViaCache: 'none' })
      .then((registration) => registration.update())
      .catch(() => {
        // Falha no registro nao deve interromper a aplicacao.
      });
  });
}