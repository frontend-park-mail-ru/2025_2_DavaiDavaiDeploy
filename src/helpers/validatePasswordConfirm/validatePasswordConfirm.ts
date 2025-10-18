/**
 * Проверяет совпадение пароля и подтверждения пароля.
 */
export function validatePasswordConfirm(
	passwordValue: string,
	confirmValue: string,
): {
	isValid: boolean
	message: string
} {
	if (passwordValue !== confirmValue) {
		return { isValid: false, message: 'Пароли не совпадают' }
	}
	return { isValid: true, message: '' }
}
