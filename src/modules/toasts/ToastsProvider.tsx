import { Component } from '@robocotik/react';
import { ToastsContext } from './toastsContext.ts';
import type { ToastItem } from './types/toast.ts';

const MAX_TOAST_NUMBER = 4;
const ACTIVE_TIME = 8000;

interface ToastsProviderState {
	toasts: ToastItem[];
}

export class ToastsProvider extends Component<{}, ToastsProviderState> {
	state: ToastsProviderState = {
		toasts: [],
	};

	removeToast = (id: number) => {
		this.setState((prevState) => ({
			toasts: prevState.toasts.map((t) =>
				t.id === id ? { ...t, isActive: false } : t,
			),
		}));
	};

	createToast = (message: string, type: 'success' | 'error') => {
		const newToast: ToastItem = {
			id: Date.now(),
			type,
			message,
			isActive: true,
		};

		newToast.timer = setTimeout(() => {
			this.removeToast(newToast.id);
		}, ACTIVE_TIME);

		this.setState((prevState) => {
			const updatedToasts = [...prevState.toasts];

			if (updatedToasts.length + 1 > MAX_TOAST_NUMBER) {
				const id = updatedToasts.length - MAX_TOAST_NUMBER;
				updatedToasts[id] = { ...updatedToasts[id], isActive: false };
				clearTimeout(updatedToasts[id].timer);
			}

			return { toasts: [...updatedToasts, newToast] };
		});
	};

	success = (message: string) => {
		this.createToast(message, 'success');
	};

	error = (message: string) => {
		this.createToast(message, 'error');
	};

	render() {
		return (
			<ToastsContext.Provider
				value={{
					toasts: this.state.toasts,
					success: this.success,
					error: this.error,
				}}
			>
				{this.props.children}
			</ToastsContext.Provider>
		);
	}
}
