import type { Middleware } from '../../redux/types/middleware';
import { createThunkMiddleware } from '../createThunkMiddleware';

/**
 * Готовый к использованию thunk middleware.
 * @type {Function}
 */
const thunk: Middleware = createThunkMiddleware();

export default thunk;
