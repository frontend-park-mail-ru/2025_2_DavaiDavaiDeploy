export interface Ref<T = unknown> {
	current: T | null;
}

export function createRef<T = unknown>(initialValue: T | null = null): Ref<T> {
	return {
		current: initialValue,
	};
}
