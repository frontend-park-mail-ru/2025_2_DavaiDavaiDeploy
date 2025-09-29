/**
 * Проверяет совпадение пароля и подтверждения пароля.
 *
 * @param {string} passwordValue - Основной пароль.
 * @param {string} confirmValue - Повторный ввод пароля.
 * @returns {{ isValid: boolean, message: string }} Результат валидации и сообщение об ошибке.
 */
export function validatePasswordConfirm(passwordValue, confirmValue) {
	if (passwordValue !== confirmValue) {
		return { isValid: false, message: 'Пароли не совпадают' }
	}
	return { isValid: true, message: '' }
}
