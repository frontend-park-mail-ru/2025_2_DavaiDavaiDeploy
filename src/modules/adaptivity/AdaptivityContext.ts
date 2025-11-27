import { createContext } from '@robocotik/react';

export interface AdaptivityContextValue {
	isDesktop: boolean;
}

export const AdaptivityContext = createContext<AdaptivityContextValue>({
	isDesktop: false,
});
