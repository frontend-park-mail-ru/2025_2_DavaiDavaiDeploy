import type { Action } from '@/modules/redux/types/actions'
import type { State } from '@/modules/redux/types/store'
/**
 * Создаёт middleware для поддержки Redux-thunk с возможностью передачи дополнительного аргумента.
 *
 * Позволяет `action` быть функцией вместо объекта. Если `action` — функция, она будет вызвана с аргументами:
 * `dispatch`, `getState` и `extraArgument`.
 *
 * @param {*} extraArgument - Дополнительный аргумент, передаваемый в thunk-функции.
 * @returns {Function} Redux middleware.
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
export function createThunkMiddleware(extraArgument?: any) {
	return ({
			dispatch,
			getState,
		}: {
			dispatch: (action: Action) => void
			getState: () => State
		}) =>
		(next: (action: Action) => any) =>
		(action: Action) => {
			if (typeof action === 'function') {
				return action(dispatch, getState, extraArgument)
			}

			return next(action)
		}
}
