import { createContext } from '@lib/index';

interface RouterContextValue {
  path: string;
  navigate: (to: string) => void;
  [key: string]: any;
}

export const RouterContext = createContext<RouterContextValue>({path: '/', navigate: (_to: string) => {} });

