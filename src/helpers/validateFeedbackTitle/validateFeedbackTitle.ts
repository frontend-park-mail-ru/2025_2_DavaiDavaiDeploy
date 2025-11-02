import type { ValidationResult } from '../types/validationResult';

export function validateFeedbackTitle(value: string): ValidationResult {
	if (!value || value.trim() === '') {
		return { isValid: false, message: 'Введите заголовок' };
	}

	return { isValid: true, message: '' };
}
