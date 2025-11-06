import { createContext } from '@robocotik/react';
import type { ToastsContextValue } from './types/toastsContext.ts';

export const ToastsContext = createContext<ToastsContextValue>({
	success: (_message: string) => {},
	error: (_message: string) => {},
	toasts: [],
});
