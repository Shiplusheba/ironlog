const CACHE = 'ironlog-v3';
const ASSETS = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting(); // activate immediately, don't wait for old tabs to close
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim(); // take control of all open pages immediately
});

self.addEventListener('fetch', e => {
  if (e.request.url.includes('accounts.google.com') ||
      e.request.url.includes('googleapis.com') ||
      e.request.url.includes('fonts.googleapis.com') ||
      e.request.url.includes('oauth')) {
    return; // never cache auth or font requests
  }
  // Network-first for HTML so updates are always picked up
  if (e.request.destination === 'document') {
    e.respondWith(
      fetch(e.request)
        .then(res => { const c = res.clone(); caches.open(CACHE).then(cache => cache.put(e.request, c)); return res; })
        .catch(() => caches.match(e.request))
    );
    return;
  }
  // Cache-first for everything else
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
