export const formatHeight = (height: number | undefined): string | null => {
	if (!height) {
		return null;
	}

	return (height / 100).toFixed(2) + ' м';
};
