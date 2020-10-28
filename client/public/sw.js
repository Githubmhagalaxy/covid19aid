var CACHE_NAME = 'covid-helper-v1';
var urlsToCache = [
    '/',
    '/login',
    '/signup',
    '/Statistics',
    '/FoodCamps',
    '/Hospitals',
    '/About',
    '/logo192.png',
    '/logo512.png',
    '/manifest.json',
    '/favicon.ico',
    '/robots.txt'
];

// Install a service worker
self.addEventListener('install', event => {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Cache and return requests
self.addEventListener('fetch', event => {
    if (!(event.request.url.indexOf('http') === 0)) return;
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                    // Cache hit - return response
                    if (response) {
                        return response;
                    }
                    return fetch(event.request);
                }
            )
    );
});

// Update a service worker
self.addEventListener('activate', event => {
    var cacheWhitelist = ['covid-helper-v1'];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});