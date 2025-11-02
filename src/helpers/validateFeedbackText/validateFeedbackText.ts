import type { ValidationResult } from '../types/validationResult';

export function validateFeedbackText(value: string): ValidationResult {
	if (!value || value.trim() === '') {
		return { isValid: false, message: 'Введите текст отзыва' };
	}

	const wordCount = value.trim().split(/\s+/).length;

	if (wordCount < 4) {
		return { isValid: false, message: 'Пожалуйста, дайте нам больше деталей' };
	}

	return { isValid: true, message: '' };
}
