import { Component } from '@robocotik/react';
import clsx from '../clsx';
import styles from './Spacing.module.scss';

interface SpacingProps {
	level?: '7' | '8' | '9' | '10';
	getRootRef?: any;
	className?: string;
	[key: string]: any;
}

export class Spacing extends Component<SpacingProps> {
	render() {
		const { level = '8', getRootRef, className, ...rest } = this.props;

		return (
			<div
				ref={getRootRef}
				className={clsx(
					{
						[styles.level7]: level === '7',
						[styles.level8]: level === '8',
						[styles.level9]: level === '9',
						[styles.level10]: level === '10',
					},
					className,
				)}
				{...rest}
			></div>
		);
	}
}
