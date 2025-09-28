export function validatePasswordConfirm(passwordValue, confirmValue) {
	if (passwordValue !== confirmValue) {
		return { isValid: false, message: 'Пароли не совпадают' }
	}
	return { isValid: true, message: '' }
}
