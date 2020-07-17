var CACHE_NAME = 'delivery-card-v01-01';
var urlsToCache = [
	'/delivery-01/',
	'/delivery-01/index.html',
	'/delivery-01/offline.html',
	'/delivery-01/404.html',
	'/delivery-01/favicon/android-chrome-512x512.png',
	'/delivery-01/css/all.css',
	'/delivery-01/webfonts/fa-brands-400.eot',
	'/delivery-01/webfonts/fa-brands-400.svg',
	'/delivery-01/webfonts/fa-brands-400.ttf',
	'/delivery-01/webfonts/fa-brands-400.woff',
	'/delivery-01/webfonts/fa-brands-400.woff2',
	'/delivery-01/webfonts/fa-regular-400.eot',
	'/delivery-01/webfonts/fa-regular-400.svg',
	'/delivery-01/webfonts/fa-regular-400.ttf',
	'/delivery-01/webfonts/fa-regular-400.woff',
	'/delivery-01/webfonts/fa-regular-400.woff2',
	'/delivery-01/webfonts/fa-solid-900.eot',
	'/delivery-01/webfonts/fa-solid-900.svg',
	'/delivery-01/webfonts/fa-solid-900.ttf',
	'/delivery-01/webfonts/fa-solid-900.woff',
	'/delivery-01/webfonts/fa-solid-900.woff2',
	'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js',
	'https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css',
	'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
	'/delivery-01/imgs/mauricio-jun-sobre-picture-mobile.png',
	'/delivery-01/imgs/mauricio-jun-cartao-digital-puro-1024x1024-v01-01.png',
	'/delivery-01/imgs/portfolio-01.png',
	'/delivery-01/imgs/portfolio-02.png',
	'/delivery-01/imgs/portfolio-03.png',
	'/delivery-01/imgs/logo-mauricio-jun-cartao-digital-horiz-v01-01.png',
	'/delivery-01/imgs/dcard-cartao-digital-background-line-v01-01.png',
	'/delivery-01/imgs/dcard-cartao-digital-molde-cabecalho-v01-01.png',
	'/delivery-01/imgs/mauricio-jun-dcard-dia-dos-pais-01.jpg',
	'/delivery-01/imgs/mauricio-jun-dcard-dia-dos-pais-02.jpg',
	'/delivery-01/imgs/mauricio-jun-dcard-dia-dos-pais-03.jpg'
];
self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
});
self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.filter(function(cacheName) {
					// Return true if you want to remove this cache,
					// but remember that caches are shared across
					// the whole origin
				}).map(function(cacheName) {
					return caches.delete(cacheName);
				})
			);
		})
	);
});
/* FETCH */
self.addEventListener('fetch', function(event) {
	event.respondWith(
	// Try the cache
		caches.match(event.request).then(function(response) {
			//console.log('response 01 = ' + response);
			if (response) {
				return response;
			}
			return fetch(event.request).then(function(response) {
				//console.log('response.status = ' + response.status);
				if (response.status === 404) {
					return caches.match('/delivery-01/404.html');
				}
				//console.log('response 02 = ' + response);
				return response
			});
		}).catch(function() {
			// If both fail, show a generic fallback:
			//console.log('offline event = ' + event);
			return caches.match('/delivery-01/offline.html');
		})
	);
});