export const formatMoney = (amount: number | undefined): string | null => {
	if (amount === undefined) {
		return null;
	}

	return `$${amount.toLocaleString('ru-RU')}`;
};
