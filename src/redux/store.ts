import { applyMiddleware } from '../modules/redux/applyMiddleware/index';
import { createStore } from '../modules/redux/createStore/index';
import { reducer } from './features/index';
import { middlewares } from './middlewares/index';

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
