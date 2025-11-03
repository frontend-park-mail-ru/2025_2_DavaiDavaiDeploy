export const mergeUnique = <T extends { id: string | number }>(
	oldItems: T[] | null,
	newItems: T[],
): T[] => {
	if (!oldItems) {
		return newItems;
	}

	const result = [...oldItems];
	const ids = new Set(oldItems.map((item) => item.id));

	for (const item of newItems) {
		if (!ids.has(item.id)) {
			ids.add(item.id);
			result.push(item);
		}
	}

	return result;
};
