let cacheName = 'notes-son-v.2.10.0';
let filesToCache = [
    './',
    'index.html',
    'css/style.css',
    'css/colors.css',
    'css/colors.css.map',
    'js/array.observe.polyfill.js',
    'js/object.observe.polyfill.js',
    'js/scripts.js',
    'service-worker.js', 
    ''
];

self.addEventListener('install', function(e) {
    console.log('[Service Worker] Installed');
    e.waitUntil(
        caches.open(cacheName).then(function(cache){
            console.log('[Service Worker] Chaching Data');
            return cache.addAll(filesToCache);
        })
    );
})

self.addEventListener('activate', function(e){
   console.log('[Service Worker] Activate');
    e.waitUntil(
        caches.keys().then(function (keyList){
            return Promise.all(keyList.map(function(key){
                if (key != cacheName){
                    console.log('[Service Worker] Removing Old Cache');
                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener('fetch', function(e){
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
        caches.match(e.request).then(function(response){
            return response || fetch(e.request);
        })
    );
})