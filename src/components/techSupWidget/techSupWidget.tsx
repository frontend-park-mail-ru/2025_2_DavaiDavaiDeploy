import { withModal } from '@/modules/modals/withModal';
import type { WithModalProps } from '@/modules/modals/withModalProps';
import { Component } from '@robocotik/react';
import styles from './techSupWidget.module.scss';

export class TechSupWidgetComponent extends Component<WithModalProps> {
	handleClick = () => {
		this.props.modal.open(3);
	};

	render() {
		return (
			<div className={styles.content} onClick={this.handleClick}>
				<p className={styles.title}>?</p>
			</div>
		);
	}
}

export const TechSupWidget = withModal(TechSupWidgetComponent);
