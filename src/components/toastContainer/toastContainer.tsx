import { compose } from '@/modules/redux';
import type { ToastItem } from '@/modules/toasts/types/toast';
import type { WithToastsProps } from '@/modules/toasts/withToastasProps';
import { withToasts } from '@/modules/toasts/withToasts';
import { Component } from '@robocotik/react';
import { Toast } from '../toast/toast';
import styles from './toastContainer.module.scss';

class ToastContainerComponent extends Component<WithToastsProps> {
	render() {
		const { toasts } = this.props.toast;

		return (
			<div className={styles.toasts}>
				{toasts.map((toast: ToastItem) => (
					<Toast
						key={toast.id}
						type={toast.type}
						message={toast.message}
						isActive={toast.isActive}
					/>
				))}
			</div>
		);
	}
}

export const ToastContainer = compose(withToasts)(ToastContainerComponent);
