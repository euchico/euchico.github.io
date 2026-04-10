const CACHE_NAME = 'site-cache-v1';
const ASSETS = [
  '/index.html',
  '/src/pages/home/index.html',
  '/src/pages/sobre/index.html',
  '/src/pages/contato/index.html',
  '/src/styles/app.css',
  '/src/main.js',
  '/src/scripts/global.js',
  '/src/scripts/utils.js',
  '/src/components/header/header.js',
  '/src/components/footer/footer.js',
  '/src/pages/home/home.js',
  '/src/pages/sobre/sobre.js',
  '/src/pages/contato/contato.js',
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
      keys.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
        return Promise.resolve();
      })
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === 'opaque') {
          return networkResponse;
        }

        const copy = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return networkResponse;
      });
    })
  );
});


