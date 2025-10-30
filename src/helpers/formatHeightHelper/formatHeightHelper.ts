export const formatHeight = (height: number | undefined): string | null => {
	if (height === undefined) {
		return null;
	}

	return (height / 100).toFixed(2) + ' м';
};
