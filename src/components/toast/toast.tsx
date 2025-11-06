import Error from '@/assets/img/error.svg';
import Success from '@/assets/img/success.svg';
import clsx from '@/modules/clsx';
import { Component } from '@robocotik/react';
import styles from './toast.module.scss';

interface ToastProps {
	type: 'error' | 'success';
	message: string;
	isActive: boolean;
}

export class Toast extends Component<ToastProps> {
	render() {
		const { message, type } = this.props;

		return (
			<div
				className={clsx(styles.toast, { [styles.hide]: !this.props.isActive })}
			>
				{type === 'success' ? (
					<img src={Success} className={styles.icon} />
				) : (
					<img src={Error} className={styles.icon} />
				)}
				<h1 className={styles.title}>{message}</h1>
			</div>
		);
	}
}
