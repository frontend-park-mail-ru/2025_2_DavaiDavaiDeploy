const CACHE_STATIC = 'ddfilms-static-v1';
const CACHE_DYNAMIC = 'ddfilms-dynamic-v1';

const STATIC_ASSETS = [
	'/',
	'/index.html',
	'/assets/index.js',
	'/assets/index.css',
	'https://cdn.ddfilms-static.ru/assets/logo.svg',
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
	// STATIC: HTML, CSS, изображения (jpg, png, svg, ico, webp)
	// DYNAMIC: API запросы и JS файлы
	const isStaticResource =
		event.request.mode === 'navigate' ||
		/\.(html|css|jpg|jpeg|png|svg|ico|webp|gif)$/i.test(requestUrl.pathname);

	const cacheName = isStaticResource ? CACHE_STATIC : CACHE_DYNAMIC;

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

					// ✅ Для навигации возвращаем index.html
					if (event.request.mode === 'navigate') {
						return caches.match('/index.html');
					}

					// ✅ Определяем правильный Content-Type по расширению файла
					const extension = requestUrl.pathname.split('.').pop().toLowerCase();
					const mimeTypes = {
						svg: 'image/svg+xml',
						png: 'image/png',
						jpg: 'image/jpeg',
						jpeg: 'image/jpeg',
						gif: 'image/gif',
						webp: 'image/webp',
						ico: 'image/x-icon',
						css: 'text/css',
						js: 'application/javascript',
						json: 'application/json',
						html: 'text/html',
					};

					const contentType = mimeTypes[extension] || 'text/plain';

					// ✅ Возвращаем 503 с правильным Content-Type
					return new Response(null, {
						status: 503,
						statusText: 'Service Unavailable',
						headers: {
							'Content-Type': contentType,
						},
					});
				});
			}),
	);
});
