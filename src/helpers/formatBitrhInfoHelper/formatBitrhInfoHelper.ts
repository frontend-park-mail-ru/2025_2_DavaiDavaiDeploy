import { formatAge } from './formatAge';
import { Months } from './month';

export const formatBirthInfo = (
	birth_date: string | undefined,
	age?: number | undefined,
	zodiac_sign?: string | undefined,
): string | null => {
	if (!birth_date) {
		return null;
	}

	const date = new Date(birth_date);
	const day = date.getUTCDate();
	const month = Months[date.getUTCMonth()];
	const year = date.getUTCFullYear();

	const parts = [`${day} ${month}, ${year}`];

	if (zodiac_sign) {
		parts.push(zodiac_sign);
	}

	if (age !== undefined) {
		parts.push(formatAge(age));
	}

	return parts.join(' • ');
};
