const CACHE = 'ddfilms-static-v1';
const TIMEOUT = 400;

// Список всех статических файлов для precache
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

	if (url.pathname.startsWith('/api')) {
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
					});
				}),
		);

		return;
	}

	// ✅ Обрабатываем навигацию (переходы по страницам, перезагрузка)
	if (event.request.mode === 'navigate') {
		event.respondWith(
			fetch(event.request)
				.then((response) => {
					// Успешно получили из сети - кэшируем
					const responseToCache = response.clone();
					caches.open(CACHE).then((cache) => {
						cache.put(event.request, responseToCache);
					});

					return response;
				})
				.catch(() => {
					return caches.match('/index.html');
				}),
		);

		return;
	}

	// ✅ Обрабатываем JS и CSS файлы
	if (url.pathname.match(/\.(js|css)$/)) {
		event.respondWith(
			caches.match(event.request).then((cached) => {
				if (cached) {
					// Возвращаем из кэша, обновляем в фоне
					fetch(event.request)
						.then((response) => {
							if (response && response.ok) {
								caches.open(CACHE).then((cache) => {
									cache.put(event.request, response);
								});
							}
						})
						.catch(() => {
							// Игнорируем ошибки фоновой загрузки
						});

					return cached;
				}

				// Нет в кэше - идём в сеть
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

	// ✅ Обрабатываем статические ресурсы (изображения, шрифты, видео)
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
