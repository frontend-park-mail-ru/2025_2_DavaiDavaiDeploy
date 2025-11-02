import type { Selector } from '@/modules/redux/types/selectors';
import type { State } from '@/modules/redux/types/store';
import type { ModelsUser } from '@/types/models';

/**
 * Селектор для получения данных пользователя из состояния.
 */
export const selectUser: Selector = (state: State): ModelsUser | null =>
	state.user.user;

/**
 * Селектор для получения ошибки пользователя из состояния.
 */
export const selectUserError: Selector = (state: State): string | null =>
	state.user.error;

/**
 * Селектор для получения состояния загрузки пользователя из состояния.
 */
export const selectUserLoading: Selector = (state: State): boolean =>
	state.user.loading;
