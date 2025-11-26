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
 * Селектор для получения ошибки пользователя из состояния, кроме 401.
 */
export const selectUserErrorNot401: Selector = (state: State): string | null =>
	state.user.error === 'user is not authorized' ? null : state.user.error;

/**
 * Селектор для получения состояния загрузки пользователя из состояния.
 */
export const selectUserLoading: Selector = (state: State): boolean =>
	state.user.loading;

export const selectIsAuthentificated: Selector = (state: State): boolean =>
	state.user.user !== null;

export const selectPasswordChangeError: Selector = (
	state: State,
): string | null => state.user.passwordChangeError;

export const selectAvatarChangeError: Selector = (
	state: State,
): string | null => state.user.avatarChangeError;

export const selectNewPasswordLoading: Selector = (state: State): boolean =>
	state.user.newPasswordLoading;

export const selectNewAvatarLoading: Selector = (state: State): boolean => {
	return state.user.newAvatarLoading;
};

export const selectIsTwoFactorEnabled: Selector = (state: State): boolean =>
	state.user.user?.has_2fa;

export const selectIsTwoFactorLoading: Selector = (state: State): boolean =>
	state.user.user?.twoFactorLoading;

export const selectOTPQRCode: Selector = (state: State): string | null =>
	state.user.user.qrCode;
