import { ERROR_CODES } from '@/consts/errorCodes.ts';

/**
 * Возвращает сообщение об ошибке на основе кода ошибки авторизации.
 * @param {number} code - Код ошибки авторизации.
 * @returns {string} Сообщение об ошибке.
 */

export function authorizationCodeToErrorHelper(code: number): string {
	switch (code) {
		case ERROR_CODES.BAD_REQUEST:
			return 'Неверный логин или пароль';
		case ERROR_CODES.INTERNAL_ERROR:
			return 'Внутренняя ошибка сервера';
		default:
			return 'Неизвестная ошибка';
	}
}
