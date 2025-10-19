import type { ValidationResult } from '../types/validationResult';

/**
 * Проверяет совпадение пароля и подтверждения пароля.
 */
export function validatePasswordConfirm(
	passwordValue: string,
	confirmValue: string,
): ValidationResult {
	if (passwordValue !== confirmValue) {
		return { isValid: false, message: 'Пароли не совпадают' };
	}
	return { isValid: true, message: '' };
}
