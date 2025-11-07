/**
 * Преобразует продолжительность в минутах в строку формата "Xч Ym".
 */
export const formatDuration = (minutes: number | undefined): string | null => {
	if (!minutes) {
		return null;
	}

	const hours = Math.floor(minutes / 60);
	const mins = minutes % 60;
	return `${hours}ч ${mins}м`;
};
