import type { ValidationResult } from '../types/validationResult';

export function validateFeedbackTitle(value: string): ValidationResult {
	if (!value || value.trim() === '') {
		return { isValid: false, message: 'Введите заголовок' };
	}

	const trimmedValue = value.trim();

	if (trimmedValue.length < 5) {
		return {
			isValid: false,
			message: 'Минимум 5 символов в заголовке',
		};
	}

	if (trimmedValue.length > 40) {
		return {
			isValid: false,
			message: 'Сократите заголовок — максимум 40 символов.',
		};
	}

	return { isValid: true, message: '' };
}
