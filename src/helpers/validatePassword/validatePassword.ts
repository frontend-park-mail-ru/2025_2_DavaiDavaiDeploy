import type { ValidationResult } from '../types/validationResult';

/**
 * Валидирует значение пароля по длине и допустимым символам.
 */
export function validatePassword(value: string): ValidationResult {
	if (!value || value.trim() === '') {
		return { isValid: false, message: 'Пароль обязателен' };
	}

	if (value.length < 6) {
		return {
			isValid: false,
			message: 'Пароль должен быть не менее 6 символов',
		};
	}

	if (value.length > 20) {
		return {
			isValid: false,
			message: 'Пароль должен быть не более 20 символов',
		};
	}

	if (!/^[a-zA-Z0-9-]+$/.test(value)) {
		return {
			isValid: false,
			message: 'Пароль может содержать только латинские буквы, цифры и дефис',
		};
	}

	return { isValid: true, message: '' };
}
