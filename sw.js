/* global self caches:true */
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('enfo-world-news')
      .then(cache =>
        cache.addAll([
          '/',
          '/index.html',
          '/css/normalize.css',
          '/css/main.css',
        ]),
      ),
  );
});

self.addEventListener('fetch', (event) => {
  console.log(event.request.url);
  event.respondWith(
    caches
      .match(event.request)
      .then(response => response || fetch(event.request)),
  );
});
