import { compose } from '../compose/index'
import type { Action } from '../types/actions'
import type { Middleware } from '../types/middleware'
import type { Reducer } from '../types/reducers'
import type { State, Store } from '../types/store'

/**
 * Применяет middleware к Redux-подобному store.
 *
 * @param middlewares - Массив middleware-функций.
 * @returns Фабрика создания store с middleware.
 */
export function applyMiddleware(middlewares: Middleware[]) {
	return function createStoreWithMiddleware(
		createStore: (reducer: Reducer, initialState: State) => Store,
	) {
		return (reducer: Reducer, initialState: State): Store => {
			const store = createStore(reducer, initialState)

			const middlewareAPI = {
				getState: store.getState,
				dispatch: (action: Action) => store.dispatch(action),
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
