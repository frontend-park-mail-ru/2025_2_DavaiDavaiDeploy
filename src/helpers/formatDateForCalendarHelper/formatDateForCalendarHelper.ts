export const formatDateForCalendar = (
	datetime: string | undefined,
): { day: string; month: string } => {
	if (!datetime) {
		return { day: 'скоро', month: '' };
	}

	const date = new Date(datetime);

	const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
		day: 'numeric',
		month: 'long',
	});

	const partsList = dateFormatter.formatToParts(date);

	const day = partsList.find((p) => p.type === 'day')?.value ?? '';
	const month = partsList.find((p) => p.type === 'month')?.value ?? '';

	return { day, month };
};
