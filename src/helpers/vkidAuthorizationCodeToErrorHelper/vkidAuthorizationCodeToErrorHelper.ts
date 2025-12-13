import { ERROR_CODES } from '@/consts/errorCodes.ts';

/**
 * Возвращает сообщение об ошибке на основе кода ошибки авторизации.
 * @param {number} code - Код ошибки авторизации.
 * @returns {string} Сообщение об ошибке.
 */

export function vkidAuthorizationCodeToErrorHelper(code: number): string {
	switch (code) {
		case ERROR_CODES.BAD_REQUEST:
			return 'Пользователь с таким логином уже существует';
		case ERROR_CODES.INTERNAL_ERROR:
			return 'Внутренняя ошибка сервера';
		case ERROR_CODES.PRECONDITION_FAILED:
			return ERROR_CODES.PRECONDITION_FAILED.toString();
		default:
			return 'Неизвестная ошибка';
	}
}
