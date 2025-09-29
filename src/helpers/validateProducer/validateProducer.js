/**
 * Универсальный валидатор, который делегирует проверку внешней функции.
 *
 * @param {*} value - Значение для валидации.
 * @param {Function | null} validator - Функция-валидатор. Может принимать один или два аргумента.
 * @param {*} [extraValue=null] - Дополнительное значение, если валидатор требует два параметра.
 * @returns {{ isValid: boolean, message: string }} Результат валидации.
 */
export function validateProducer(value, validator, extraValue = null) {
	if (!validator) {
		return { isValid: true, message: '' }
	}

	if (extraValue !== null) {
		return validator(value, extraValue)
	}
	return validator(value)
}
