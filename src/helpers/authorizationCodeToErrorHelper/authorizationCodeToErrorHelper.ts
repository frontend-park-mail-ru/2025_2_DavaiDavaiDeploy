/**
 * Возвращает сообщение об ошибке на основе кода ошибки авторизации.
 * @param {number} code - Код ошибки авторизации.
 * @returns {string} Сообщение об ошибке.
 */

export function authorizationCodeToErrorHelper(code: number): string {
	switch (code) {
		case 400:
			return 'Неверный логин или пароль';
		case 500:
			return 'Внутренняя ошибка сервера';
		default:
			return 'Неизвестная ошибка';
	}
}
