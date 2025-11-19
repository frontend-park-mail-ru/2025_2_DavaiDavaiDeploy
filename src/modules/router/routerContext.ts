import { createContext } from '@/modules/react';
import type { RouterContextValue } from './types/routerContext.ts';

export const RouterContext = createContext<RouterContextValue>({
	path: '/',
	navigate: (_to: string | number) => {},
	params: {},
});
