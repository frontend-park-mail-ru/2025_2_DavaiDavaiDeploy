import type { Action } from '../types/actions';
import type { Reducer } from '../types/reducers';
import type { State, Store } from '../types/store';

/**
 * Создаёт простой Redux-подобный store.
 */
export const createStore = (reducer: Reducer): Store => {
	let state: State = reducer({}, { type: '__INIT__' });
	let subscribes: ((key: any) => void)[] = [];

	const getState = () => state;

	const dispatch = (action: Action) => {
		state = reducer(state, action);
		subscribes.forEach((listener) => listener(action));
	};

	const subscribe = (listener: (key: any) => void) => {
		subscribes.push(listener);

		return () => {
			subscribes = subscribes.filter((l) => l !== listener);
		};
	};

	return { getState, dispatch, subscribe };
};
