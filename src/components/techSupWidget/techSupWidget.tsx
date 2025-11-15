import message from '@/assets/img/message.svg';
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

	onMount() {
		window.addEventListener('message', (event) => {
			if (event.origin !== APP_URL_WITH_SCHEMA) {
				return;
			}

			switch (event.data.type) {
				case 'close':
					this.props.modal.hide();
					return;

				case 'success':
					this.props.modal.hide();
					AppToast.success(event.data.text);
					return;

				case 'error':
					AppToast.error(event.data.text);
			}
		});
	}

	render() {
		return (
			<div className={styles.content} onClick={this.handleClick}>
				<img src={message} className={styles.title}></img>
			</div>
		);
	}
}

export const TechSupWidget = withModal(TechSupWidgetComponent);
