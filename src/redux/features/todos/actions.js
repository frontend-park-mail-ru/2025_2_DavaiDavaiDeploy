import HTTPClient from '../../../modules/HTTPClient/index.js'
import types from './types.js'

const setTodosLoadingAction = () => {
	return {
		type: types.TODOS_FETCH_START,
	}
}

const returnTodosAction = data => {
	return {
		type: types.TODOS_FETCH_SUCCESS,
		payload: { todos: data },
	}
}

const returnTodosErrorAction = error => {
	return {
		type: types.TODOS_FETCH_FAILURE,
		payload: { todos: [], error: error },
	}
}

export const fetchTodos = (url, limit) => async dispatch => {
	dispatch(setTodosLoadingAction())
	try {
		const response = await HTTPClient.get(url, { params: { limit: limit } })
		dispatch(returnTodosAction(response.data.todos))
	} catch (error) {
		dispatch(returnTodosErrorAction(error.message || 'Error'))
	}
}

export default {
	fetchTodos,
	setTodosLoadingAction,
	returnTodosAction,
	returnTodosErrorAction,
}
