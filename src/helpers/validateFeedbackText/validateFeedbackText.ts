import type { ValidationResult } from '../types/validationResult';

const MAX_SYMBOL_COUNT = 30;

export function validateFeedbackText(value: string): ValidationResult {
	if (!value || value.trim() === '') {
		return {
			isValid: false,
			message: 'Пожалуйста, дайте нам больше деталей — от 30 символов',
		};
	}

	const trimmedValue = value.trim();

	if (trimmedValue.length < MAX_SYMBOL_COUNT) {
		return {
			isValid: false,
			message: 'Пожалуйста, дайте нам больше деталей — от 30 символов',
		};
	}

	return { isValid: true, message: '' };
}
