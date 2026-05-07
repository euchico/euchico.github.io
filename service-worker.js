// Nome e versao do cache estatico principal da aplicacao.
const CACHE_NAME = 'euchico-cache-v2';

// Lista de recursos essenciais para navegacao offline basica.
const ASSETS = [
  '/',
  '/index.html',
  '/src/styles/normalize.css',
  '/src/styles/variables.css',
  '/src/styles/main.css',
  '/src/scripts/main.js',
  '/src/scripts/content-loader.js',
  '/data/projects.json',
  '/data/experience.json',
  '/data/education.json',
  '/favicon.ico'
];

// Precache dos arquivos essenciais durante a instalacao.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Limpa caches antigos e assume controle imediato das abas abertas.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys
        .filter((key) => key !== CACHE_NAME)
        .map((key) => caches.delete(key))
    ))
  );
  self.clients.claim();
});

// Salva respostas validas no cache para reutilizacao futura.
function saveToCache(request, response) {
  if (!response || response.status !== 200 || response.type === 'opaque') {
    return response;
  }

  const copy = response.clone();
  caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
  return response;
}

// Estrategia de fetch:
// - dados e textos principais: network-first com fallback em cache;
// - demais recursos: cache-first com fallback em network.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  const isDataRequest = url.pathname.startsWith('/data/');
  const isCoreTextAsset =
    event.request.mode === 'navigate' ||
    url.pathname.endsWith('.html') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css');

  if (isDataRequest || isCoreTextAsset) {
    event.respondWith(
      fetch(event.request)
        .then((response) => saveToCache(event.request, response))
        .catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => saveToCache(event.request, response));
    })
  );
});