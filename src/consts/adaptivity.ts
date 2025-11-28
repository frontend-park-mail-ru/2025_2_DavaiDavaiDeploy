import type { AdaptivityState } from '../modules/adaptivity/AdaptivityProvider';

export const WIDE_SCREEN_WIDTH = 1400;

export const DESKTOP_MIN_WIDTH = 1280;

export const TABLET_MIN_WIDTH = 1024;

export const SMALL_TABLET_MIN_WIDTH = 768;

export const MOBILE_MIN_WIDTH = 420;

export const SMALL_MOBILE_MAX_WIDTH = 420;

export type AdaptivityKey = Exclude<keyof AdaptivityState, 'viewWidth'>;

export const ADAPTIVITIES: Record<AdaptivityKey, number> = {
	isWideDesktop: WIDE_SCREEN_WIDTH,
	isDesktop: DESKTOP_MIN_WIDTH,
	isTablet: TABLET_MIN_WIDTH,
	isSmallTablet: SMALL_TABLET_MIN_WIDTH,
	isMobile: MOBILE_MIN_WIDTH,
	isSmallMobile: SMALL_MOBILE_MAX_WIDTH,
};
