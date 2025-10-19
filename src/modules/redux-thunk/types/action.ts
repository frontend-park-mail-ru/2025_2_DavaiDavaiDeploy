import type { MiddlewareAPI } from '@/modules/redux/types/middleware';

export type ThunkAction = (
	dispatch: MiddlewareAPI['dispatch'],
	getState: MiddlewareAPI['getState'],
	extraArgument: undefined,
) => any;
