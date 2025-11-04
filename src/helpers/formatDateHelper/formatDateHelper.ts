export const formatDatetime = (datetime: string | undefined): string | null => {
	if (!datetime) {
		return null;
	}

	const date = new Date(datetime);

	const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});

	const partsList = dateFormatter.formatToParts(date);

	const day = partsList.find((p) => p.type === 'day')?.value ?? '';
	const month = partsList.find((p) => p.type === 'month')?.value ?? '';
	const year = partsList.find((p) => p.type === 'year')?.value ?? '';

	const formattedDate = `${day} ${month} ${year}`;

	const timeFormatter = new Intl.DateTimeFormat('ru-RU', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	});

	const formattedTime = timeFormatter.format(date);

	return `${formattedDate} в ${formattedTime}`;
};

export const formatSmallDatetime = (
	datetime: string | undefined,
): string | null => {
	if (!datetime) {
		return null;
	}

	const date = new Date(datetime);

	const day = String(date.getDate()).padStart(1, '0');
	const month = String(date.getMonth() + 1).padStart(1, '0');
	const year = String(date.getFullYear()).slice(-2);

	return `${day}.${month}.${year}`;
};
