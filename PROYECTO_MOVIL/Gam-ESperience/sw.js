const CACHE_NAME = "Juego_Buscaminas";

self.addEventListener('install', event => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        cache.addAll([
            './',
            '../Games_pages/mines_index.html',
            '../JAVASCRIPT/script_mines.js',
            '../CSS/style_mines.css',
        ]);
    })());
});

self.addEventListener('fetch', event => {
    event.respondWith((async () => { 
        const cache = await caches.open(CACHE_NAME); //mod
        const cachedResponse = await cache.match(event.request);

        if (cachedResponse) {
            return cachedResponse;
        } else {
            try {
                const fetchResponse = await fetch(event.request);
                cache.put(event.request, fetchResponse.clone());
                return fetchResponse;
            } catch (e) {
                //Hubo problemas de red de datos.
                return cache.match('../Games_pages/mines_index.html');
            }
        }
    })());
});