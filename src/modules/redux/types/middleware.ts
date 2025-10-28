import type { Dispatch } from './actions';
import type { State } from './store';

/**
 * API для middleware.
 */
export type MiddlewareAPI = {
	dispatch: Dispatch;
	getState: () => State;
};

/**
 * Middleware для Redux.
 */
export type Middleware = (middlewareAPI: MiddlewareAPI) => any;
