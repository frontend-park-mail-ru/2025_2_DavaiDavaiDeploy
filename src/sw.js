const CACHE = 'network-first-v1';
const TIMEOUT = 400;

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE).then((cache) => {
			return cache.addAll(['/', '/index.html']);
		}),
	);

	self.skipWaiting();
});

self.addEventListener('activate', (event) => {
	event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
	const url = new URL(event.request.url);

	if (
		url.pathname.match(/\.(png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf|eot|mp4)$/)
	) {
		event.respondWith(
			Promise.race([
				fetch(event.request).then((response) => {
					if (response && response.ok) {
						const responseToCache = response.clone();
						caches.open(CACHE).then((cache) => {
							cache.put(event.request, responseToCache);
						});
					}

					return response;
				}),

				new Promise((resolve, reject) => {
					setTimeout(() => {
						caches.match(event.request).then((cached) => {
							if (cached) {
								resolve(cached);
							} else {
								reject();
							}
						});
					}, TIMEOUT);
				}),
			]).catch((error) => {
				return caches.match(event.request).then((cached) => {
					if (cached) {
						return cached;
					}

					throw error;
				});
			}),
		);
	}
});
