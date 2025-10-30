import { formatAge } from './formatAge';

export const formatBirthInfo = (
	birth_date: string | undefined,
	age?: number | undefined,
	zodiac_sign?: string | undefined,
): string | null => {
	if (!birth_date) {
		return null;
	}

	const date = new Date(birth_date);

	const formatter = new Intl.DateTimeFormat('ru-RU', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});

	const partsList = formatter.formatToParts(date);

	const day = partsList.find((p) => p.type === 'day')?.value ?? '';
	const month = partsList.find((p) => p.type === 'month')?.value ?? '';
	const year = partsList.find((p) => p.type === 'year')?.value ?? '';

	const formattedDate = `${day} ${month}, ${year}`;

	const parts: string[] = [formattedDate];

	if (zodiac_sign) {
		parts.push(zodiac_sign);
	}

	if (age !== undefined) {
		parts.push(formatAge(age));
	}

	return parts.join(' • ');
};
