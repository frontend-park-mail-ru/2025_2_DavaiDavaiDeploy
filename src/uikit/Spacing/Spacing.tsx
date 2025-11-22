import clsx from '@/modules/clsx';
import { Component } from '@robocotik/react';
import styles from './Spacing.module.scss';

interface SpacingProps {
	level?: '7' | '8' | '9';
	getRootRef?: any;
	className?: string;
}

export class Spacing extends Component<SpacingProps> {
	render() {
		const { level = '8', getRootRef, className } = this.props;

		return (
			<div
				ref={getRootRef}
				className={clsx(
					{
						[styles.level7]: level === '7',
						[styles.level8]: level === '8',
						[styles.level9]: level === '9',
					},
					className,
				)}
			></div>
		);
	}
}
