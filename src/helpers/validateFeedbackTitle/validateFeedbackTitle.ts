import type { ValidationResult } from '../types/validationResult';

const MIN_SYMBOL_COUNT = 5;
const MAX_SYMBOL_COUNT = 10;

export function validateFeedbackTitle(value: string): ValidationResult {
	if (!value || value.trim() === '') {
		return { isValid: false, message: 'Введите заголовок' };
	}

	const trimmedValue = value.trim();

	if (trimmedValue.length < MIN_SYMBOL_COUNT) {
		return {
			isValid: false,
			message: 'Минимум 5 символов в заголовке',
		};
	}

	if (trimmedValue.length > MAX_SYMBOL_COUNT) {
		return {
			isValid: false,
			message: 'Сократите заголовок — максимум 40 символов.',
		};
	}

	return { isValid: true, message: '' };
}
