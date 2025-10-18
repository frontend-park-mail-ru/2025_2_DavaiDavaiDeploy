import type { ValidationResult } from '../types/validationResult'

/**
 * Универсальный валидатор, который делегирует проверку внешней функции.
 */
export function validateProducer(
	value: any,
	validator: Function | null,
	extraValue = null,
): ValidationResult {
	if (!validator) {
		return { isValid: true, message: '' }
	}

	if (extraValue !== null) {
		return validator(value, extraValue)
	}
	return validator(value)
}
