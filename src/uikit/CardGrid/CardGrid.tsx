import { Component } from '@robocotik/react';
import clsx from '../clsx';
import { Flex } from '../Flex/Flex';
import styles from './CardGrid.module.scss';

interface CardGridProps {
	getRootRef?: any;
	className?: string;
	[key: string]: any;
}

export class CardGrid extends Component<CardGridProps> {
	render() {
		const { getRootRef, className, children, ...rest } = this.props;

		return (
			<Flex
				getRootRef={getRootRef}
				className={clsx(styles.wrapper, className)}
				direction="column"
				{...rest}
			>
				<div className={styles.grid}>{children}</div>
			</Flex>
		);
	}
}
