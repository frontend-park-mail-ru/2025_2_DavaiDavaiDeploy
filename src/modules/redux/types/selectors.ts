import type { State } from './store';

export type Selector = (state: State) => any;
