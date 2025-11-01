/**
 * Получает полный URL изображения с CDN
 * @param imagePath - относительный путь к изображению (например, "/avatars/user.jpg")
 * @returns полный URL изображения
 */
export function getCDNImageUrl(imagePath: string | undefined | null): string {
	if (!imagePath) {
		return '';
	}

	const CDN_ADDRESS =
		import.meta.env.VITE_CDN_ADDRESS || 'https://cdn.ddfilms-static.ru';

	// Если путь уже содержит полный URL, возвращаем как есть
	if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
		return imagePath;
	}

	// Убираем начальный слеш если есть, чтобы избежать двойного слеша
	const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;

	return `${CDN_ADDRESS}${cleanPath}`;
}
