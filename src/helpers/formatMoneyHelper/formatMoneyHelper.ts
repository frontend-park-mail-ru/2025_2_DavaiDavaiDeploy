export const formatMoney = (amount: number): string => {
	return `$${amount.toLocaleString('ru-RU')}`;
};
