import { STATIC_URL } from '@/consts/urls.ts';

/**
 * Получает полный URL изображения с CDN
 * @param imagePath - относительный путь к изображению (например, "/avatars/user.jpg")
 * @returns полный URL изображения
 */
export function getStaticURL(imagePath: string | undefined | null): string {
	if (!imagePath) {
		return '';
	}

	return `${STATIC_URL}${imagePath}`;
}
