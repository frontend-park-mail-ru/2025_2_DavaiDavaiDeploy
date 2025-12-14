import Error from '@/assets/error.svg';
import Info from '@/assets/info.svg';
import Success from '@/assets/success.svg';
import type { ToastType } from '@/consts/toasts';
import { Component } from '@robocotik/react';
import clsx from 'ddd-clsx';
import { Flex, Headline } from 'ddd-ui-kit';
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
			<Flex
				direction="row"
				align="center"
				id={`toast-${id}`}
				className={clsx(styles.toast, { [styles.hide]: !this.props.isActive })}
			>
				{this.renderIcon()}
				<Headline className={styles.title} level="7">
					{message}
				</Headline>
			</Flex>
		);
	}
}
