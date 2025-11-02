import { ERROR_CODES } from '@/consts/errorCodes.ts';
/**
 * Возвращает сообщение об ошибке на основе кода ошибки регистрации.
 * @param {number} code - Код ошибки регистрации.
 * @returns {string} Сообщение об ошибке.
 */

export function registrationCodeToErrorHelper(code: number): string {
	switch (code) {
		case ERROR_CODES.BAD_REQUEST:
			return 'Неверный логин или пароль';
		case ERROR_CODES.CONFLICT:
			return 'Пользователь с таким именем уже зарегистрирован';
		case ERROR_CODES.INTERNAL_ERROR:
			return 'Внутренняя ошибка сервера';
		default:
			return 'Неизвестная ошибка';
	}
}
