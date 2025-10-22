import {createContext} from '@lib/index';
import type {RouterContextValue} from './types/routerContext.ts';

export const RouterContext = createContext<RouterContextValue>({
  path: '/',
  navigate: (_to: string) => {},
  params: {}
});
