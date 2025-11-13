import { Toast } from '@/components/toast/toast';
import { MIDDLE_SCREEN_WIDTH } from '@/consts/devices';
import type { ToastType } from '@/consts/toasts';
import { Component } from '@robocotik/react';
import styles from './toastContainer.module.scss';

interface ToastItem {
	id: number;
	type: ToastType;
	message: string;
	isActive: boolean;
	timer?: ReturnType<typeof setTimeout>;
}

const REMOVE_DELAY = 1000;
const ACTIVE_TIME = 4000;
const MAX_TOAST_NUMBER =
	window && window.innerWidth < MIDDLE_SCREEN_WIDTH ? 2 : 4;

interface ToastContainerState {
	toasts: ToastItem[];
}

export let AppToast: ToastContainer | undefined = undefined;

export class ToastContainer extends Component<{}, ToastContainerState> {
	state: ToastContainerState = {
		toasts: [],
	};

	constructor() {
		super({}, null);
		AppToast = this;
	}

	success = (message: string) => {
		this.createToast(message, 'success');
	};

	error = (message: string) => {
		this.createToast(message, 'error');
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

	removeToast = (id: number) => {
		this.setState((prevState) => ({
			toasts: prevState.toasts.map((t) =>
				t.id === id ? { ...t, isActive: false } : t,
			),
		}));
	};

	removeToastById = (id: number) => {
		setTimeout(() => {
			document.querySelector(`#toast-${id}`)?.remove();
		}, REMOVE_DELAY);
	};

	render() {
		const { toasts } = this.state;

		return (
			<div className={styles.toasts}>
				{toasts.map((toast: ToastItem) => {
					if (!toast.isActive) {
						this.removeToastById(toast.id);
					}

					return (
						<Toast
							id={toast.id}
							type={toast.type}
							message={toast.message}
							isActive={toast.isActive}
						/>
					);
				})}
			</div>
		);
	}
}
