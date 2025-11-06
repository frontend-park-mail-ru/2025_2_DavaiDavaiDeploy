import { compose } from '@/modules/redux';
import type { ToastItem } from '@/modules/toasts/types/toast';
import type { WithToastsProps } from '@/modules/toasts/withToastasProps';
import { withToasts } from '@/modules/toasts/withToasts';
import { Component } from '@robocotik/react';
import { Toast } from '../toast/toast';
import styles from './toastContainer.module.scss';

const REMOVE_DELAY = 1000;

class ToastContainerComponent extends Component<WithToastsProps> {
	removeToastById = (id: number) => {
		setTimeout(() => {
			document.querySelector(`#toast-${id}`)?.remove();
		}, REMOVE_DELAY);
	};

	render() {
		const { toasts } = this.props.toast;

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

export const ToastContainer = compose(withToasts)(ToastContainerComponent);
