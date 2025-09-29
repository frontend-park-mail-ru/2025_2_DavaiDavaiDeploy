/**
 * Создаёт простой Redux-подобный store.
 *
 * @param {Function} reducer - Редьюсер для управления состоянием.
 * @returns {{
 *   getState: Function,
 *   dispatch: Function,
 *   subscribe: Function
 * }} Интерфейс хранилища состояния.
 */
export const createStore = reducer => {
	let state = reducer(undefined, { type: '__INIT__' })
	let subscribes = []

	const getState = () => state

	const dispatch = action => {
		state = reducer(state, action)
		subscribes.forEach(listener => listener())
	}

	const subscribe = listener => {
		subscribes.push(listener)

		return () => {
			subscribes = subscribes.filter(l => l !== listener)
		}
	}

	return { getState, dispatch, subscribe }
}
