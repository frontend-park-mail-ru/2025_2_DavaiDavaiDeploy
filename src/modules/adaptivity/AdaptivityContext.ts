import { createContext } from '@/modules/react';

export interface AdaptivityContextValue {
	isWideDesktop: boolean;
	isDesktop: boolean;
	isTablet: boolean;
	isSmallTablet: boolean;
	isSmallMobile: boolean;
	isMobile: boolean;
	viewWidth: number;
}

export const AdaptivityContext = createContext<AdaptivityContextValue>({
	isWideDesktop: false,
	isDesktop: false,
	isTablet: false,
	isSmallTablet: false,
	isSmallMobile: false,
	isMobile: false,
	viewWidth: 0,
});
