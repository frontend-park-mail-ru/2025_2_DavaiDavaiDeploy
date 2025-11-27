import { ERROR_CODES } from '@/consts/errorCodes.ts';

/**
 * Возвращает сообщение об ошибке на основе кода ошибки смены аватарки.
 * @param {number} code - Код ошибки авторизации.
 * @returns {string} Сообщение об ошибке.
 */

export function avatarChangeCodeToErrorHelper(code: number): string {
	switch (code) {
		case ERROR_CODES.BAD_REQUEST:
			return 'Похоже, файл с изображением поврежден';
		case ERROR_CODES.INTERNAL_ERROR:
			return 'Внутренняя ошибка сервера';
		default:
			return 'Неизвестная ошибка';
	}
}
