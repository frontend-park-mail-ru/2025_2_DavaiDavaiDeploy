import type { ObjectsDiffResult, PlainObject } from '../types';

export function objectsDiff(
	oldObj: PlainObject,
	newObj: PlainObject,
): ObjectsDiffResult {
	const oldKeys = Object.keys(oldObj);
	const newKeys = Object.keys(newObj);
	const added: string[] = [];
	const updated: string[] = [];

	for (const key of newKeys) {
		if (!(key in oldObj)) {
			added.push(key);
		} else if (oldObj[key] !== newObj[key]) {
			updated.push(key);
		}
	}

	return {
		added,
		removed: oldKeys.filter((key) => !(key in newObj)),
		updated,
	};
}

export function hasOwnProperty<T extends object>(
	obj: T,
	prop: string | number | symbol,
): prop is keyof T {
	return Object.prototype.hasOwnProperty.call(obj, prop);
}
