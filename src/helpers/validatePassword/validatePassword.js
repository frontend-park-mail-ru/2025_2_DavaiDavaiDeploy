export function ValidatePassword(value) {
	if (!value || value.trim() === '') {
		return { isValid: false, message: 'Пароль обязателен' }
	}
	if (value.length < 6) {
		return { isValid: false, message: 'Пароль должен быть не менее 6 символов' }
	}
	if (value.length > 30) {
		return {
			isValid: false,
			message: 'Пароль должен быть не более 30 символов',
		}
	}
	if (!/(?=.*[a-z])(?=.*[A-Z])/.test(value)) {
		return {
			isValid: false,
			message: 'Пароль должен содержать заглавные и строчные буквы',
		}
	}
	if (!/(?=.*\d)/.test(value)) {
		return {
			isValid: false,
			message: 'Пароль должен содержать хотя бы одну цифру',
		}
	}
	return { isValid: true, message: '' }
}
