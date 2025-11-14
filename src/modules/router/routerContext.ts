import { createContext } from '@robocotik/react';
import type { RouterContextValue } from './types/routerContext.ts';

export const RouterContext = createContext<RouterContextValue>({
	path: '/',
	navigate: (_to: string | number) => {},
	params: {},
});
