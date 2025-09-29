/**
 * Валидирует значение логина по нескольким критериям.
 *
 * @param {string} value - Введённый логин.
 * @returns {{ isValid: boolean, message: string }} Результат валидации и сообщение об ошибке.
 */
export function validateLogin(value) {
	if (!value || value.trim() === '') {
		return { isValid: false, message: 'Логин обязателен' }
	}
	if (value.length < 6) {
		return { isValid: false, message: 'Логин должен быть не менее 6 символов' }
	}
	if (value.length > 20) {
		return { isValid: false, message: 'Логин должен быть не более 20 символов' }
	}
	if (!/^[a-zA-Z0-9]+$/.test(value)) {
		return {
			isValid: false,
			message: 'Логин может содержать только латинские буквы и цифры',
		}
	}
	return { isValid: true, message: '' }
}
