import type { ArrayDiffOperation, ArrayDiffResult } from '../types';
import { ARRAY_DIFF_OP } from '../types';

export function withoutNulls<T>(arr: (T | null | undefined)[]): T[] {
	return arr.filter((item): item is T => item != null);
}

export function arraysDiff<T>(
	oldArray: T[],
	newArray: T[],
): ArrayDiffResult<T> {
	return {
		added: newArray.filter((newItem) => !oldArray.includes(newItem)),
		removed: oldArray.filter((oldItem) => !newArray.includes(oldItem)),
	};
}

export class ArrayWithOriginalIndices<T> {
	#array: T[] = [];
	#originalIndices: number[] = [];
	#equalsFn: (a: T, b: T) => boolean;

	constructor(array: T[], equalsFn: (a: T, b: T) => boolean) {
		this.#array = [...array];
		this.#originalIndices = array.map((_, i) => i);
		this.#equalsFn = equalsFn;
	}

	isAddition(item: T, fromIdx: number): boolean {
		return this.findIndexFrom(item, fromIdx) === -1;
	}

	isNoop(index: number, newArray: T[]): boolean {
		if (index >= this.length) {
			return false;
		}
		const item = this.#array[index];
		const newItem = newArray[index];
		return this.#equalsFn(item, newItem);
	}

	isRemoval(index: number, newArray: T[]): boolean {
		if (index >= this.length) {
			return false;
		}
		const item = this.#array[index];
		const indexInNewArray = newArray.findIndex((newItem) =>
			this.#equalsFn(item, newItem),
		);
		return indexInNewArray === -1;
	}

	findIndexFrom(item: T, fromIndex: number): number {
		for (let i = fromIndex; i < this.length; i++) {
			if (this.#equalsFn(item, this.#array[i])) {
				return i;
			}
		}
		return -1;
	}

	originalIndexAt(index: number): number {
		return this.#originalIndices[index];
	}

	noopItem(index: number): ArrayDiffOperation<T> {
		return {
			op: ARRAY_DIFF_OP.NOOP,
			originalIndex: this.originalIndexAt(index),
			index,
			item: this.#array[index],
		};
	}

	removeItemsAfter(index: number): ArrayDiffOperation<T>[] {
		const operations: ArrayDiffOperation<T>[] = [];
		while (this.length > index) {
			operations.push(this.removeItem(index));
		}
		return operations;
	}

	removeItem(index: number): ArrayDiffOperation<T> {
		const operation: ArrayDiffOperation<T> = {
			op: ARRAY_DIFF_OP.REMOVE,
			index,
			item: this.#array[index],
		};
		this.#array.splice(index, 1);
		this.#originalIndices.splice(index, 1);
		return operation;
	}

	addItem(item: T, index: number): ArrayDiffOperation<T> {
		const operation: ArrayDiffOperation<T> = {
			op: ARRAY_DIFF_OP.ADD,
			index,
			item,
		};
		this.#array.splice(index, 0, item);
		this.#originalIndices.splice(index, 0, -1);
		return operation;
	}

	moveItem(item: T, toIndex: number): ArrayDiffOperation<T> {
		const fromIndex = this.findIndexFrom(item, toIndex);
		const operation: ArrayDiffOperation<T> = {
			op: ARRAY_DIFF_OP.MOVE,
			originalIndex: this.originalIndexAt(fromIndex),
			from: fromIndex,
			index: toIndex,
			item: this.#array[fromIndex],
		};
		const [_item] = this.#array.splice(fromIndex, 1);
		this.#array.splice(toIndex, 0, _item);
		const [originalIndex] = this.#originalIndices.splice(fromIndex, 1);
		this.#originalIndices.splice(toIndex, 0, originalIndex);
		return operation;
	}

	get length(): number {
		return this.#array.length;
	}
}

export function arraysDiffSequence<T>(
	oldArray: T[],
	newArray: T[],
	equalsFn: (a: T, b: T) => boolean = (a, b) => a === b,
): ArrayDiffOperation<T>[] {
	const sequence: ArrayDiffOperation<T>[] = [];
	const array = new ArrayWithOriginalIndices(oldArray, equalsFn);

	for (let index = 0; index < newArray.length; index++) {
		if (array.isRemoval(index, newArray)) {
			sequence.push(array.removeItem(index));
			index--;
			continue;
		}

		if (array.isNoop(index, newArray)) {
			sequence.push(array.noopItem(index));
			continue;
		}

		const item = newArray[index];

		if (array.isAddition(item, index)) {
			sequence.push(array.addItem(item, index));
			continue;
		}

		sequence.push(array.moveItem(item, index));
	}

	sequence.push(...array.removeItemsAfter(newArray.length));
	return sequence;
}
