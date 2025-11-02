/**
 * Возвращает сообщение об ошибке на основе кода ошибки регистрации.
 * @param {number} code - Код ошибки регистрации.
 * @returns {string} Сообщение об ошибке.
 */

export function registrationCodeToErrorHelper(code: number): string {
	switch (code) {
		case 400:
			return 'Неверный логин или пароль';
		case 409:
			return 'Пользователь с таким именем уже существует';
		case 500:
			return 'Внутренняя ошибка сервера';
		default:
			return 'Неизвестная ошибка';
	}
}
