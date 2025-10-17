import type { Action, Reducer, State, Store } from '../ReduxTypes'

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
export const createStore = (reducer: Reducer): Store => {
	let state: State = reducer({}, { type: '__INIT__' })
	let subscribes: (() => void)[] = []

	const getState = () => state

	const dispatch = (action: Action) => {
		state = reducer(state, action)
		subscribes.forEach(listener => listener())
	}

	const subscribe = (listener: () => void) => {
		subscribes.push(listener)

		return () => {
			subscribes = subscribes.filter(l => l !== listener)
		}
	}

	return { getState, dispatch, subscribe }
}
