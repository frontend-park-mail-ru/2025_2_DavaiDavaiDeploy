import type { ValidationResult } from '../types/validationResult';
import { validatePassword } from '../validatePassword/validatePassword';

/**
 * Проверяет новый пароль и его не совпадение со старым.
 */
export function validateNewPassword(
	newPasswordValue: string,
	passwordValue: string,
): ValidationResult {
	if (newPasswordValue === passwordValue) {
		return { isValid: false, message: 'Новый пароль совпадает со старым' };
	}

	return validatePassword(newPasswordValue);
}
