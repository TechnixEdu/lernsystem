// Service Worker: legt die Seiten beim ersten Aufruf im Cache ab, danach laufen sie ohne Internet.
// Bei jeder Aenderung an den Seiten CACHE hochzaehlen, sonst bleibt auf den Handys die alte Fassung.
const CACHE = 'challenge-lernsystem-v3';
const FILES = ['./', 'tresor.html', 'hilfe.html', 'kontrolle.html'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
