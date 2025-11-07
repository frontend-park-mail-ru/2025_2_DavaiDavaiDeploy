import type { Action, Dispatch } from '@/modules/redux/types/actions';
import type { State } from '@/modules/redux/types/store';
import type { ThunkMiddleware } from '../types/middleware';

/**
 * Создаёт middleware для поддержки Redux-thunk с возможностью передачи дополнительного аргумента.
 *
 * Позволяет `action` быть функцией вместо объекта. Если `action` — функция, она будет вызвана с аргументами:
 * `dispatch`, `getState` и `extraArgument`.
 *
 * @example
 * const thunk = createThunkMiddleware({ api });
 * const store = createStore(reducer, applyMiddleware(thunk));
 *
 * // Пример использования:
 * const fetchData = () => (dispatch, getState, { api }) => {
 *   api.get('/data').then(response => {
 *     dispatch({ type: 'SET_DATA', payload: response });
 *   });
 * };
 */
export function createThunkMiddleware(
	extraArgument?: undefined,
): ThunkMiddleware {
	return ({
			dispatch,
			getState,
		}: {
			dispatch: Dispatch;
			getState: () => State;
		}) =>
		(next: (action: Action) => any) =>
		(action: Action) => {
			if (typeof action === 'function') {
				return action(dispatch, getState, extraArgument);
			}

			return next(action);
		};
}
