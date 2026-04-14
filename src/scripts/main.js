import { initAppShell } from './global.js';
import { initHomeContent } from './content-loader.js';

initAppShell();
initHomeContent();

if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js', { updateViaCache: 'none' })
      .then((registration) => registration.update())
      .catch(() => {
        // Registro do service worker não deve quebrar a aplicação.
      });
  });
}
