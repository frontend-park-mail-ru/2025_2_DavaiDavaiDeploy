// validators.js

// Валидатор логина
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

// Валидатор пароля
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

// Валидатор подтверждения пароля
export function ValidatePasswordConfirm(passwordValue, confirmValue) {
	if (passwordValue !== confirmValue) {
		return { isValid: false, message: 'Пароли не совпадают' }
	}
	return { isValid: true, message: '' }
}
