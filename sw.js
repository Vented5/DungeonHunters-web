//install event- cache files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('pwa-cache').then((cache) => { ///manda a llamar al cache o a todo lo ue se almacene en el disco duro de nuestros disposistivos
      return cache.addAll([ //ruta de los archivos que queremos almacenar en el cache
        'index.html',
        './src/styles/index.css',
        'script.js',
        './src/assets/dungeongame192x192.png',
        './src/assets/dungeongame512x512.png',
      ]);
    })
  );
  
  console.log('Service Worker Installed');
});
//fetch event - serve cached files if available
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});