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
export function createThunkMiddleware(extraArgument) {
	return ({ dispatch, getState }) =>
		next =>
		action => {
			if (typeof action === 'function') {
				return action(dispatch, getState, extraArgument)
			}

			return next(action)
		}
}
