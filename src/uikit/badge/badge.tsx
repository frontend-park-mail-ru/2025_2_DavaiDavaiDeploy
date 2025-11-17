import clsx from '@/modules/clsx';
import { Component } from '@robocotik/react';
import styles from './badge.module.scss';

interface BadgeProps {
	mode: 'low' | 'high' | 'medium';
	className?: string;
}

export class Badge extends Component<BadgeProps> {
	render() {
		const { className, mode, children } = this.props;

		return (
			<h1
				className={clsx(
					styles.badge,
					{
						[styles.low]: mode === 'low',
						[styles.medium]: mode === 'medium',
						[styles.high]: mode === 'high',
					},
					className,
				)}
			>
				{children}
			</h1>
		);
	}
}
