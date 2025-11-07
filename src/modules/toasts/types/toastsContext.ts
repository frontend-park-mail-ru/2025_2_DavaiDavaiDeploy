import type { ToastItem } from './toast';

export interface ToastsContextValue {
	success: (message: string) => void;
	error: (message: string) => void;
	toasts: ToastItem[];
}
