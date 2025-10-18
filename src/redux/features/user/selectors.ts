import type { State } from '@/modules/redux/ReduxTypes'

/**
 * Селектор для получения данных пользователя из состояния.
 * @param {State} state - Состояние Redux store.
 * @returns {Array} Массив пользователей.
 */
export const selectUser = (state: State) => state.user.users

/**
 * Селектор для получения ошибки пользователя из состояния.
 * @param {State} state - Состояние Redux store.
 * @returns {string | null} Сообщение об ошибке или null.
 */
export const selectUserError = (state: State) => state.user.users.error

/**
 * Селектор для получения общей ошибки пользователя из состояния.
 * @param {State} state - Состояние Redux store.
 * @returns {string | null} Сообщение об ошибке или null.
 */
export const selectError = (state: State) => state.user.error
