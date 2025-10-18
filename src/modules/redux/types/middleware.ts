import type { Dispatch } from './actions'
import type { State } from './store'
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
