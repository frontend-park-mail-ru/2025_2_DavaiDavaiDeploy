import { Toast } from '@/components/toast/toast';
import type { ToastType } from '@/consts/toasts';

import { Flex } from '@/uikit/index';
import { Component } from '@robocotik/react';
import { withAdaptivity } from '../../modules/adaptivity/withAdaptivity';
import type { WithAdaptivityProps } from '../../modules/adaptivity/withAdaptivityProps';
import { compose } from '../../modules/redux';
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

interface ToastContainerState {
	toasts: ToastItem[];
}

export let AppToast: typeof ToastContainer = null;

class ToastContainerComponent extends Component<
	WithAdaptivityProps,
	ToastContainerState
> {
	state: ToastContainerState = {
		toasts: [],
	};

	constructor(props: WithAdaptivityProps) {
		super(props, null);
		AppToast = this;
	}

	success = (message: string) => {
		this.createToast(message, 'success');
	};

	error = (message: string) => {
		this.createToast(message, 'error');
	};

	info = (message: string) => {
		this.createToast(message, 'info');
	};

	createToast = (message: string, type: 'success' | 'error' | 'info') => {
		const newToast: ToastItem = {
			id: Date.now(),
			type,
			message,
			isActive: true,
		};

		newToast.timer = setTimeout(() => {
			this.removeToast(newToast.id);
		}, ACTIVE_TIME);

		const maxToastNumber = this.props.adaptivity.isTablet ? 4 : 2;

		this.setState((prevState) => {
			const updatedToasts = [...prevState.toasts];

			if (updatedToasts.length + 1 > maxToastNumber) {
				const id = updatedToasts.length - maxToastNumber;
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
			<Flex className={styles.toasts} direction="column" align="center">
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
			</Flex>
		);
	}
}

export const ToastContainer = compose(withAdaptivity)(ToastContainerComponent);
