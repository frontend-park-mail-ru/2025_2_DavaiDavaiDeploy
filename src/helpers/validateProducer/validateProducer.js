export function validateProducer(value, validator, extraValue = null) {
	if (!validator) {
		return { isValid: true, message: '' }
	}

	if (extraValue !== null) {
		return validator(value, extraValue)
	}
	return validator(value)
}
