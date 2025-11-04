const CACHE_STATIC = 'ddfilms-static-v1';
const CACHE_DYNAMIC = 'ddfilms-dynamic-v1';

const STATIC_ASSETS = [
	'/',
	'/index.html',
	'/assets/index.js',
	'/assets/index.css',
	'/assets/logo.svg',
	'/assets/apple-touch-icon.png',
	'/assets/favicon-16x16.png',
	'/assets/favicon-32x32.png',
];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_STATIC).then((cache) => {
			return cache.addAll(STATIC_ASSETS).catch((error) => {
				throw new Error(error);
			});
		}),
	);

	self.skipWaiting();
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		Promise.all([
			self.clients.claim(),
			caches.keys().then((keys) =>
				Promise.all(
					keys.map((key) => {
						if (key !== CACHE_STATIC && key !== CACHE_DYNAMIC) {
							return caches.delete(key);
						}
					}),
				),
			),
		]),
	);
});

self.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') {
		return;
	}

	const requestUrl = new URL(event.request.url);

	// Определяем какой кеш использовать
	const isLocalResource = requestUrl.origin === self.location.origin;
	const cacheName = isLocalResource ? CACHE_STATIC : CACHE_DYNAMIC;

	event.respondWith(
		fetch(event.request)
			.then((response) => {
				if (response && response.ok) {
					const responseToCache = response.clone();
					caches.open(cacheName).then((cache) => {
						cache.put(event.request, responseToCache);
					});
				}

				return response;
			})
			.catch(() => {
				// Ищем в обоих кешах
				return caches.match(event.request).then((cached) => {
					if (cached) {
						return cached;
					}

					if (event.request.mode === 'navigate') {
						return caches.match('/index.html');
					}

					return new Response('Offline - resource not available', {
						status: 503,
						statusText: 'Service Unavailable',
					});
				});
			}),
	);
});
