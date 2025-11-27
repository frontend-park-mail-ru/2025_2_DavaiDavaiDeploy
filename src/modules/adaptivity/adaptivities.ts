import {
	DESKTOP_MIN_WIDTH,
	MOBILE_MIN_WIDTH,
	SMALL_MOBILE_MAX_WIDTH,
	SMALL_TABLET_MIN_WIDTH,
	TABLET_MIN_WIDTH,
	WIDE_SCREEN_WIDTH,
} from '@/consts/adaptivity';

export const SmallMobileScreen = window.matchMedia(
	`all and (max-width: ${SMALL_MOBILE_MAX_WIDTH}px)`,
);

export const MobileScreen = window.matchMedia(
	`all and (min-width: ${MOBILE_MIN_WIDTH}px)`,
);

export const SmallTabletScreen = window.matchMedia(
	`all and (min-width: ${SMALL_TABLET_MIN_WIDTH}px)`,
);

export const TabletScreen = window.matchMedia(
	`all and (min-width: ${TABLET_MIN_WIDTH}px)`,
);

export const DesktopScreen = window.matchMedia(
	`all and (min-width: ${DESKTOP_MIN_WIDTH}px)`,
);

export const WideDesktopScreen = window.matchMedia(
	`all and (min-width: ${WIDE_SCREEN_WIDTH}px)`,
);
