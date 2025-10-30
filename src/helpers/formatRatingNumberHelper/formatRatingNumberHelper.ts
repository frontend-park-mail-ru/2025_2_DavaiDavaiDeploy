export const formatRatingNumber = (
	number_of_ratings: number | undefined,
): string | null => {
	if (!number_of_ratings) {
		return null;
	}

	const lastDigit = number_of_ratings % 10;
	const lastTwoDigits = number_of_ratings % 100;

	if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
		return `${number_of_ratings.toLocaleString('ru-RU')} оценок`;
	}

	switch (lastDigit) {
		case 1:
			return `${number_of_ratings.toLocaleString('ru-RU')} оценка`;
		case 2:
		case 3:
		case 4:
			return `${number_of_ratings.toLocaleString('ru-RU')} оценки`;
		default:
			return `${number_of_ratings.toLocaleString('ru-RU')} оценок`;
	}
};
