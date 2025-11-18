import { Component } from '@robocotik/react';
import { Flex } from '../flex/flex';
import styles from './cardGrid.module.scss';

interface CardGridProps {
	getRootRef?: any;
}

export class CardGrid extends Component<CardGridProps> {
	render() {
		const { getRootRef } = this.props;

		return (
			<Flex
				getRootRef={getRootRef}
				className={styles.wrapper}
				direction="column"
			>
				<div className={styles.grid}>{this.props.children}</div>
			</Flex>
		);
	}
}
