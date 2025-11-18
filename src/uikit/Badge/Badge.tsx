import clsx from '@/modules/clsx';
import { Component } from '@robocotik/react';
import styles from './Badge.module.scss';

interface BadgeProps {
	mode: 'low' | 'high' | 'medium';
	className?: string;
	getRootRef?: any;
}

export class Badge extends Component<BadgeProps> {
	render() {
		const { className, mode, children, getRootRef } = this.props;

		return (
			<span
				ref={getRootRef}
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
			</span>
		);
	}
}
