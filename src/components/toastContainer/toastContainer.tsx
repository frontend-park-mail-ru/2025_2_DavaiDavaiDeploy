import { MIDDLE_SCREEN_WIDTH } from '@/consts/devices';
import type { ToastType } from '@/consts/toasts';
import { debounce } from '@/helpers/debounceHelper/debounceHelper';
import { Component } from '@robocotik/react';
import { Flex, Toast } from 'ddd-ui-kit';
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
const DEBOUNCE_DELAY = 100;

let maxToastNumber = window && window.innerWidth < MIDDLE_SCREEN_WIDTH ? 2 : 4;

interface ToastContainerState {
	toasts: ToastItem[];
	debounceResizeHandler: (ev?: Event | undefined) => void;
}

export let AppToast: ToastContainer = null as unknown as ToastContainer;

export class ToastContainer extends Component<{}, ToastContainerState> {
	state: ToastContainerState = {
		toasts: [],
		debounceResizeHandler: () => {},
	};

	constructor() {
		super({}, null);
		AppToast = this;
	}

	onMount() {
		const debounceResizeHandler = debounce(this.handleResize, DEBOUNCE_DELAY);

		this.setState({ debounceResizeHandler });

		window.addEventListener('resize', debounceResizeHandler);

		this.handleResize();
	}

	onUnmount() {
		if (this.state.debounceResizeHandler) {
			window.removeEventListener('resize', this.state.debounceResizeHandler);
		}
	}

	handleResize() {
		maxToastNumber = window && window.innerWidth < MIDDLE_SCREEN_WIDTH ? 2 : 4;
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
