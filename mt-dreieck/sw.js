// Service Worker: legt die Seiten beim ersten Aufruf im Cache ab, danach laufen sie ohne Internet.
// Der Cache-Name enthaelt die Pruefsumme der Seiten, neue Fassungen werden dadurch automatisch geladen.
const CACHE = 'ls-mt-dreieck-2c1d96a882';
const FILES = ['./', 'badges.js', 'kontrolle.html'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
