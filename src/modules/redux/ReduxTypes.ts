/**
 * Действие Redux - объект с типом и полезной нагрузкой или функция (thunk).
 * @typedef {Object|Function} Action
 */
export type Action = { type: string; payload?: any } | Function

/**
 * Функция для диспетчеризации действий.
 * @typedef {Function} Dispatch
 */
export type Dispatch = (action: Action) => any

/**
 * Состояние Redux store.
 * @typedef {Object} State
 */
export type State = Record<string, any>

/**
 * Редьюсер для обработки действий и изменения состояния.
 * @typedef {Function} Reducer
 */
export type Reducer = (state: State, action: Action) => State

/**
 * API для middleware.
 * @typedef {Object} MiddlewareAPI
 */
type MiddlewareAPI = {
	dispatch: Dispatch
	getState: () => State
}

/**
 * Middleware для Redux.
 * @typedef {Function} Middleware
 */
export type Middleware = (middlewareAPI: MiddlewareAPI) => any

/**
 * Интерфейс Redux store.
 * @typedef {Object} Store
 */
export type Store = {
	getState: () => State
	dispatch: (action: Action) => void
	subscribe: (listener: () => void) => () => void
}
