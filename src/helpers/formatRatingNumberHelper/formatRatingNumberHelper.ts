export const formatRatingNumber = (number_of_ratings: number): string => {
	const lastDigit = number_of_ratings % 10;
	const lastTwoDigits = number_of_ratings % 100;

	if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
		return `${number_of_ratings} оценок`;
	}

	switch (lastDigit) {
		case 1:
			return `${number_of_ratings} оценка`;
		case 2:
		case 3:
		case 4:
			return `${number_of_ratings} оценки`;
		default:
			return `${number_of_ratings} оценок`;
	}
};
