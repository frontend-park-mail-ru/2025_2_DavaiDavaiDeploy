const CACHE = 'ddfilms-v1';

const STATIC_ASSETS = ['/', '/index.html', '/assets/'];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE).then((cache) => {
			return cache.addAll(STATIC_ASSETS);
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
				return caches.match(event.request).then((cached) => {
					if (cached) {
						return cached;
					}

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
