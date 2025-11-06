import { Component } from '@robocotik/react';
import { ToastsContext } from './toastsContext.ts';
import type { ToastItem } from './types/toast.ts';

const MAX_TOAST_NUMBER = 5;

interface ToastsProviderState {
	toasts: ToastItem[];
}

export class ToastsProvider extends Component<{}, ToastsProviderState> {
	state = {
		toasts: [],
	};

	createToast = (message: string, type: 'success' | 'error') => {
		const { toasts } = this.state;

		if (toasts.length >= MAX_TOAST_NUMBER) {
			toasts.shift();
		}

		const newToast: ToastItem = {
			type,
			message,
			isActive: true,
		};

		newToast.timer = setTimeout(() => {
			this.setState((prev) => ({
				toasts: prev.toasts.filter((t) => t !== newToast),
			}));
		}, 8000);

		this.setState({ toasts: [...toasts, newToast] });
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
