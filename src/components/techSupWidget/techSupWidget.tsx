import { APP_URL_WITH_SCHEMA } from '@/consts/urls';
import { withModal } from '@/modules/modals/withModal';
import type { WithModalProps } from '@/modules/modals/withModalProps';
import { Component } from '@robocotik/react';
import { AppToast } from '../toastContainer/toastContainer';
import styles from './techSupWidget.module.scss';

export class TechSupWidgetComponent extends Component<WithModalProps> {
	handleClick = () => {
		this.props.modal.open(3);
	};

	onMount(): void | Promise<void> {
		window.addEventListener('message', (event) => {
			if (event.origin !== APP_URL_WITH_SCHEMA) {
				return;
			}

			if (event.data.type === 'success') {
				this.props.modal.hide();
				AppToast.success('Обращение успешно отправлено!');
			} else {
				AppToast.error('Что-то пошло не так');
			}
		});
	}

	onUnmount(): void | Promise<void> {
		window.removeEventListener('message', (event) => {
			if (event.data.type === 'success') {
				this.props.modal.hide();
				AppToast.success('Обращение успешно отправлено!');
			} else {
				AppToast.error('Что-то пошло не так');
			}
		});
	}

	render() {
		return (
			<div className={styles.content} onClick={this.handleClick}>
				<p className={styles.title}>?</p>
			</div>
		);
	}
}

export const TechSupWidget = withModal(TechSupWidgetComponent);
