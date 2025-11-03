import type { ValidationResult } from '../types/validationResult';

export function validateFeedbackText(value: string): ValidationResult {
	if (!value || value.trim() === '') {
		return {
			isValid: false,
			message: 'Пожалуйста, дайте нам больше деталей — от 30 символов',
		};
	}

	const trimmedValue = value.trim();

	if (trimmedValue.length < 30) {
		return {
			isValid: false,
			message: 'Пожалуйста, дайте нам больше деталей — от 30 символов',
		};
	}

	return { isValid: true, message: '' };
}
