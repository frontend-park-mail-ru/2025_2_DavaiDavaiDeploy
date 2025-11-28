import {
	DESKTOP_MIN_WIDTH,
	MOBILE_MIN_WIDTH,
	SMALL_MOBILE_MAX_WIDTH,
	SMALL_TABLET_MIN_WIDTH,
	TABLET_MIN_WIDTH,
	WIDE_SCREEN_WIDTH,
} from '../../consts/adaptivity';
import type { AdaptivityState } from '../../modules/adaptivity/AdaptivityProvider';

export const getClosestViewWidth = (state: AdaptivityState): number => {
	if (state.isWideDesktop) {
		return WIDE_SCREEN_WIDTH;
	}

	if (state.isDesktop) {
		return DESKTOP_MIN_WIDTH;
	}

	if (state.isTablet) {
		return TABLET_MIN_WIDTH;
	}

	if (state.isSmallTablet) {
		return SMALL_TABLET_MIN_WIDTH;
	}

	if (state.isMobile) {
		return MOBILE_MIN_WIDTH;
	}

	return SMALL_MOBILE_MAX_WIDTH;
};
