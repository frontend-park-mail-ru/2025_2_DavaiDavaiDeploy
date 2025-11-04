const CACHE = 'ddfilms-v1';

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
		caches.open(CACHE).then((cache) => {
			return cache.addAll(STATIC_ASSETS).catch((error) => {
				throw new Error('[SW] Failed to cache some assets:', error);
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
						return caches.delete(key);
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

	// Для изображений и шрифтов - Cache First
	if (['image', 'font'].includes(event.request.destination)) {
		event.respondWith(
			caches.match(event.request).then((cached) => {
				if (cached) {
					return cached;
				}

				return fetch(event.request).then((response) => {
					if (response && response.ok) {
						const responseToCache = response.clone();
						caches.open(CACHE).then((cache) => {
							cache.put(event.request, responseToCache);
						});
					}

					return response;
				});
			}),
		);

		return;
	}

	// Для остальных - Network First
	event.respondWith(
		fetch(event.request)
			.then((response) => {
				if (response && response.ok) {
					const responseToCache = response.clone();
					caches.open(CACHE).then((cache) => {
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

					// Для навигации возвращаем index.html
					if (event.request.mode === 'navigate') {
						return caches.match('/index.html');
					}

					return new Response(null, {
						status: 503,
						statusText: 'Service Unavailable',
						headers: { 'Content-Type': 'text/plain' },
					});
				});
			}),
	);
});
