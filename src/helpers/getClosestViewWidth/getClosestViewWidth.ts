import {
	DESKTOP_MIN_WIDTH,
	MOBILE_MIN_WIDTH,
	SMALL_MOBILE_MAX_WIDTH,
	SMALL_TABLET_MIN_WIDTH,
	TABLET_MIN_WIDTH,
	WIDE_SCREEN_WIDTH,
} from '../../consts/adaptivity';

export const getClosestViewWidth = (width: number): number => {
	if (width > WIDE_SCREEN_WIDTH) {
		return WIDE_SCREEN_WIDTH;
	}

	if (width > DESKTOP_MIN_WIDTH) {
		return DESKTOP_MIN_WIDTH;
	}

	if (width > TABLET_MIN_WIDTH) {
		return TABLET_MIN_WIDTH;
	}

	if (width > SMALL_TABLET_MIN_WIDTH) {
		return SMALL_TABLET_MIN_WIDTH;
	}

	if (width > MOBILE_MIN_WIDTH) {
		return MOBILE_MIN_WIDTH;
	}

	return SMALL_MOBILE_MAX_WIDTH;
};
