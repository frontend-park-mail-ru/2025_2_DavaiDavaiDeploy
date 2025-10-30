export const formatMoney = (amount: number | undefined): string | null => {
	if (!amount) {
		return null;
	}

	return `$${amount.toLocaleString('ru-RU')}`;
};
