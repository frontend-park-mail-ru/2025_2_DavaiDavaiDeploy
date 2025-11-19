import clsx from '@/modules/clsx';
import { Component } from '@robocotik/react';
import styles from './Flex.module.scss';

interface FlexProps {
	direction?: 'column' | 'row';
	align?: 'start' | 'center' | 'end' | 'top';
	justify?: 'start' | 'center' | 'end' | 'between' | 'around';
	id?: string;
	onClick?: (event: MouseEvent) => void;
	className?: string;
	getRootRef?: any;
}

export class Flex extends Component<FlexProps> {
	render() {
		const {
			onClick,
			getRootRef,
			className,
			align,
			justify,
			children,
			direction,
			id,
		} = this.props;

		return (
			<div
				id={id}
				onClick={onClick}
				ref={getRootRef}
				className={clsx(
					styles.flex,
					{
						[styles.directionRow]: direction === 'row',
						[styles.directionColumn]: direction === 'column',
						[styles.alignStart]: align === 'start',
						[styles.alignCenter]: align === 'center',
						[styles.alignEnd]: align === 'end',
						[styles.alignTop]: align === 'top',
						[styles.justifyStart]: justify === 'start',
						[styles.justifyCenter]: justify === 'center',
						[styles.justifyEnd]: justify === 'end',
						[styles.justifyBetween]: justify === 'between',
						[styles.justifyAround]: justify === 'around',
					},
					className,
				)}
			>
				{children}
			</div>
		);
	}
}
