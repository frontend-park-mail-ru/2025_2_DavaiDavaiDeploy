import { createContext } from '@robocotik/react';

export interface AdaptivityContextValue {
	isDesktop: boolean;
	isTablet: boolean;
	isSmallTablet: boolean;
	isSmallMobile: boolean;
	isMobile: boolean;
}

export const AdaptivityContext = createContext<AdaptivityContextValue>({
	isDesktop: false,
	isTablet: false,
	isSmallTablet: false,
	isSmallMobile: false,
	isMobile: false,
});
