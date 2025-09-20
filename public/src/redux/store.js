import { middlewares } from './middlewares/index.js'
import { reducer } from './reducers/index.js'

function applyMiddleware(middlewares) {
	return function createStoreWithMiddleware(createStore) {
		return (reducer, initialState) => {
			const store = createStore(reducer, initialState)

			const middlewareAPI = {
				getState: store.getState,
				dispatch: action => store.dispatch(action),
			}
			const chain = middlewares.map(middleware => middleware(middlewareAPI))
			const enhancedDispatch = compose(...chain)(store.dispatch)

			return {
				...store,
				dispatch: enhancedDispatch,
			}
		}
	}
}

function compose(...funcs) {
	if (funcs.length === 0) {
		return arg => arg
	}
	if (funcs.length === 1) {
		return funcs[0]
	}
	return funcs.reduce(
		(a, b) =>
			(...args) =>
				a(b(...args)),
	)
}

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

const createStoreWithMiddleware = applyMiddleware(middlewares)(createStore)
export const store = createStoreWithMiddleware(reducer, initialState)
