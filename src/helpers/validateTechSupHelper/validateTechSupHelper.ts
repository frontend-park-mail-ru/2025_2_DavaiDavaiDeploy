import type { ValidationResult } from '../types/validationResult';

const MIN_SYMBOL_COUNT = 30;
const MAX_SYMBOL_COUNT = 1000;

export function validateTechSup(value: string, type: string): ValidationResult {
	if (!value || value.trim() === '') {
		return {
			isValid: false,
			message: 'Пожалуйста, заполните поле',
		};
	}

	const trimmedValue = value.trim();

	switch (type) {
		case 'name': {
			const nameRegex = /^[A-Za-zА-Яа-яЁё\s-]{2,50}$/;

			if (!nameRegex.test(trimmedValue)) {
				return {
					isValid: false,
					message:
						'Имя должно содержать только буквы и быть длиной от 2 до 50 символов',
				};
			}

			return { isValid: true, message: '' };
		}

		case 'description': {
			if (trimmedValue.length < MIN_SYMBOL_COUNT) {
				return {
					isValid: false,
					message: 'Пожалуйста, дайте нам больше деталей — от 30 символов',
				};
			}

			if (trimmedValue.length > MAX_SYMBOL_COUNT) {
				return {
					isValid: false,
					message: 'Пожалуйста, сократите отзыв — до 1000 символов',
				};
			}

			return { isValid: true, message: '' };
		}

		case 'phone': {
			const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;

			if (!phoneRegex.test(trimmedValue)) {
				return {
					isValid: false,
					message: 'Пожалуйста, введите корректный номер телефона',
				};
			}

			return { isValid: true, message: '' };
		}
	}

	return { isValid: true, message: '' };
}
