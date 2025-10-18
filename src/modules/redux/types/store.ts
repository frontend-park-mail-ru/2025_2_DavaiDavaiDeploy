import type { Action } from './actions'
import type { Reducer } from './reducers'
/**
 * Состояние Redux store.
 */
export type State = Record<string, any>

/**
 * Интерфейс Redux store.
 */
export type Store = {
	getState: () => State
	dispatch: (action: Action) => void
	subscribe: (listener: () => void) => () => void
}

export type StoreEnhancer = (
	createStore: (reducer: Reducer, initialState: State) => Store,
) => (reducer: Reducer, initialState: State) => Store
