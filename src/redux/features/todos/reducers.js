import types from './types.js'

const initialState = {
	loading: false,
	error: null,
	todos: [],
}

const todosReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.TODOS_FETCH_START:
			return { ...state, loading: true, error: null }
		case types.TODOS_FETCH_SUCCESS:
			return { ...state, loading: false, todos: action.payload.todos }
		case types.TODOS_FETCH_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error,
				todos: [],
			}
		default:
			return state
	}
}

export default todosReducer
