export function combineReducers(reducersMap) {
	return function combinationReducer(state = {}, action) {
		const nextState = {}
		Object.entries(reducersMap).forEach(([key, reducer]) => {
			nextState[key] = reducer(state[key], action)
		})
		return nextState
	}
}
