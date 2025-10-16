/**
 * Комбинирует несколько редьюсеров в один.
 *
 * @param {Object.<string, Function>} reducersMap - Объект, где ключи — имена состояний, а значения — соответствующие редьюсеры.
 * @returns {Function} Комбинированный редьюсер.
 */
export function combineReducers(reducersMap) {
	return function combinationReducer(state = {}, action) {
		const nextState = {}
		Object.entries(reducersMap).forEach(([key, reducer]) => {
			nextState[key] = reducer(state[key], action)
		})
		return nextState
	}
}
