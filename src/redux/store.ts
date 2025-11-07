import { applyMiddleware } from '@/modules/redux/applyMiddleware';
import { createStore } from '@/modules/redux/createStore';
import { reducer } from './features';
import { middlewares } from './middlewares';

/**
 * Начальное состояние приложения.
 */
const initialState = {};

/**
 * Создаёт store с применёнными middleware.
 */
const createStoreWithMiddleware = applyMiddleware(middlewares)(createStore);

/**
 * Главный Redux store приложения.
 */
export const store = createStoreWithMiddleware(reducer, initialState);
