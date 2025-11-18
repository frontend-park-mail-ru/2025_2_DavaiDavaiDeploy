import { Component } from '@robocotik/react';
import styles from './cardGrid.module.scss';

export class CardGrid extends Component<{}> {
	render() {
		return (
			<div className={styles.wrapper}>
				<div className={styles.grid}>{this.props.children}</div>
			</div>
		);
	}
}
