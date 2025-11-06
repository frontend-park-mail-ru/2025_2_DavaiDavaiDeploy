import Error from '@/assets/img/error.svg';
import Info from '@/assets/img/info.svg';
import Success from '@/assets/img/success.svg';
import clsx from '@/modules/clsx';
import type { ToastType } from '@/modules/toasts/types/toast';
import { Component } from '@robocotik/react';
import styles from './toast.module.scss';

interface ToastProps {
	type: ToastType;
	message: string;
	isActive: boolean;
	id: number;
}

export class Toast extends Component<ToastProps> {
	renderIcon() {
		if (this.props.type === 'success') {
			return <img src={Success} className={styles.icon} />;
		} else if (this.props.type === 'error') {
			return <img src={Error} className={styles.icon} />;
		}

		return <img src={Info} className={styles.icon} />;
	}

	render() {
		const { id, message } = this.props;
		return (
			<div
				id={`toast-${id}`}
				className={clsx(styles.toast, { [styles.hide]: !this.props.isActive })}
			>
				{this.renderIcon()}
				<h1 className={styles.title}>{message}</h1>
			</div>
		);
	}
}
