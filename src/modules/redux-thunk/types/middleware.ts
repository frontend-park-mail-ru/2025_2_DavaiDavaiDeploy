import type { ThunkAction } from './action';
import type { Action } from '@/modules/redux/types/actions';
import type { MiddlewareAPI } from '@/modules/redux/types/middleware';

export type ThunkMiddleware = (
	api: MiddlewareAPI,
) => (next: (action: Action) => any) => (action: Action | ThunkAction) => any;
