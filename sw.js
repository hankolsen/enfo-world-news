/* global self caches:true */
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('enfo-world-news_v2')
      .then(cache =>
        cache.addAll([
          '/',
          '/index.html',
          '/img/logo.png',
          '/css/main.css',
          '/js/articles.service.js',
          '/js/article.renderer.js',
          '/js/main.js',
        ]),
      ),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then(response => response || fetch(event.request)),
  );
});
