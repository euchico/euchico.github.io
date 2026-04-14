const CACHE_NAME = 'site-cache-v3';
const ASSETS = [
  '/',
  '/index.html',
  '/src/styles/main.css',
  '/src/scripts/main.js',
  '/src/scripts/global.js',
  '/src/scripts/utils.js',
  '/src/scripts/content-loader.js',
  '/src/components/header/header.js',
  '/src/components/footer/footer.js',
  '/data/projects.json',
  '/data/experience.json',
  '/data/education.json',
  '/favicon.ico'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

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

function saveToCache(request, response) {
  if (!response || response.status !== 200 || response.type === 'opaque') {
    return response;
  }

  const copy = response.clone();
  caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
  return response;
}

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

