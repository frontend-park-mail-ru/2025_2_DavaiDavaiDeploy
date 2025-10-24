import { applyMiddleware } from '../modules/redux/applyMiddleware';
import { createStore } from '../modules/redux/createStore';
import { reducer } from './features';
import { middlewares } from './middlewares';

/**
 * Начальное состояние приложения.
 * @type {Object}
 */
const initialState = {};

/**
 * Создаёт store с применёнными middleware.
 * @type {Function}
 */
const createStoreWithMiddleware = applyMiddleware(middlewares)(createStore);

/**
 * Главный Redux store приложения.
 * @type {Object}
 */
export const store = createStoreWithMiddleware(reducer, initialState);
