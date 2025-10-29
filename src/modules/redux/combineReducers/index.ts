import type { Action } from '../types/actions';
import type { Reducer } from '../types/reducers';
import type { State } from '../types/store';

/**
 * Комбинирует несколько редьюсеров в один.
 */
export function combineReducers(reducersMap: Record<string, Reducer>): Reducer {
	return function combinationReducer(state: State = {}, action: Action) {
		const nextState: State = {};
		Object.entries(reducersMap).forEach(([key, reducer]) => {
			nextState[key] = reducer(state[key], action);
		});

		return nextState;
	};
}
