import type { Action } from '@/modules/redux/types/actions';
import type { MiddlewareAPI } from '@/modules/redux/types/middleware';
import type { ThunkAction } from './action';

export type ThunkMiddleware = (
	api: MiddlewareAPI,
) => (next: (action: Action) => any) => (action: Action | ThunkAction) => any;
