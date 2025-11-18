import { Component } from '@robocotik/react';
import { Flex } from '../flex/flex';
import styles from './cardGrid.module.scss';

export class CardGrid extends Component<{}> {
	render() {
		return (
			<Flex className={styles.wrapper} direction="column">
				<div className={styles.grid}>{this.props.children}</div>
			</Flex>
		);
	}
}
