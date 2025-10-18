import type { Action } from '../types/actions'
import type { Reducer } from '../types/reducers'
import type { State } from '../types/store'

/**
 * Комбинирует несколько редьюсеров в один.
 *
 * @param {Object.<string, Function>} reducersMap - Объект, где ключи — имена состояний, а значения — соответствующие редьюсеры.
 * @returns {Function} Комбинированный редьюсер.
 */
export function combineReducers(reducersMap: Record<string, Reducer>) {
	return function combinationReducer(state: State = {}, action: Action) {
		const nextState: State = {}
		Object.entries(reducersMap).forEach(([key, reducer]) => {
			nextState[key] = reducer(state[key], action)
		})
		return nextState
	}
}
