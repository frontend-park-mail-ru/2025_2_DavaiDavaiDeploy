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
	event.waitUntil(
		Promise.all([
			self.clients.claim(),
			caches.keys().then((keys) =>
				Promise.all(
					keys.map((key) => {
						if (key !== CACHE) {
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

	const url = new URL(event.request.url);

	if (
		url.pathname.match(/\.(png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf|eot|mp4)$/)
	) {
		event.respondWith(
			Promise.race([
				fromNetwork(event.request),
				fromNetworkWithTimeout(event.request),
			]).catch(() => {
				return fromCache(event.request);
			}),
		);
	}
});

function fromNetwork(request) {
	return fetch(request).then((response) => {
		if (response && response.ok) {
			const responseToCache = response.clone();
			caches.open(CACHE).then((cache) => {
				cache.put(request, responseToCache);
			});
		}

		return response;
	});
}

function fromNetworkWithTimeout(request) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			caches.match(request).then((cached) => {
				if (cached) {
					resolve(cached);
				} else {
					reject(new Error('No cache available'));
				}
			});
		}, TIMEOUT);
	});
}

function fromCache(request) {
	return caches.match(request).then((cached) => {
		if (cached) {
			return cached;
		}

		throw new Error('Resource not found in cache');
	});
}
