export function ValidateLogin(value) {
	if (!value || value.trim() === '') {
		return { isValid: false, message: 'Логин обязателен' }
	}
	if (value.length < 3) {
		return { isValid: false, message: 'Логин должен быть не менее 3 символов' }
	}
	if (value.length > 20) {
		return { isValid: false, message: 'Логин должен быть не более 20 символов' }
	}
	if (!/^[a-zA-Z0-9_]+$/.test(value)) {
		return {
			isValid: false,
			message: 'Логин может содержать только буквы, цифры и подчеркивание',
		}
	}
	return { isValid: true, message: '' }
}
