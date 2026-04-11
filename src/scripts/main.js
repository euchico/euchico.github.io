import { initAppShell } from 'global.js';

initAppShell();

if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch(() => {
      // Falha de registro não deve quebrar a aplicação.
    });
  });
}