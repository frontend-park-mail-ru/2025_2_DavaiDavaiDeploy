type DebouncedFunction<T extends (...args: any[]) => void> = (
	...args: Parameters<T>
) => void;

type Debounce = <T extends (...args: any[]) => void>(
	func: T,
	delay: number,
) => DebouncedFunction<T>;

export const debounce: Debounce = (func, delay) => {
	let timeoutId: ReturnType<typeof setTimeout> | undefined;

	return (...args) => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		timeoutId = setTimeout(() => {
			func(...args);
		}, delay);
	};
};
