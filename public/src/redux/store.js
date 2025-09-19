import { reducer } from './reducers/index.js'

const createStore = reducer => {
	let state = reducer(undefined, { type: '__INIT__' })
	let subscribes = []
	const getState = () => state
	const dispatch = action => {
		state = reducer(state, action)
		subscribes.forEach(listener => listener())
	}
	const subscribe = listener => {
		subscribes.push(listener)
	}
	return { getState, dispatch, subscribe }
}

const initialState = {}

export const store = createStore(reducer, initialState)
