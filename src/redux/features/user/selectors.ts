import type { ModelsUser } from '@/modules/HTTPClient/types/api';
import type { Selector } from '@/modules/redux/types/selectors';
import type { State } from '@/modules/redux/types/store';

/**
 * Селектор для получения данных пользователя из состояния.
 */
export const selectUser: Selector = (state: State): ModelsUser[] =>
	state.user.users;

/**
 * Селектор для получения ошибки пользователя из состояния.
 */
export const selectUserError: Selector = (state: State): string =>
	state.user.users.error;

/**
 * Селектор для получения общей ошибки пользователя из состояния.
 */
export const selectError: Selector = (state: State): string => state.user.error;
