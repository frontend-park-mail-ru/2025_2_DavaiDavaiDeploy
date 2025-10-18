import type { Action } from './actions'
/**
 * Состояние Redux store.
 * @typedef {Object} State
 */
export type State = Record<string, any>

/**
 * Интерфейс Redux store.
 * @typedef {Object} Store
 */
export type Store = {
	getState: () => State
	dispatch: (action: Action) => void
	subscribe: (listener: () => void) => () => void
}
