import { compose } from '../compose/index.js'

/**
 * Применяет middleware к Redux-подобному store.
 *
 * @param {Function[]} middlewares - Массив middleware-функций.
 * @returns {Function} Фабрика создания store с middleware.
 */
export function applyMiddleware(middlewares) {
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
