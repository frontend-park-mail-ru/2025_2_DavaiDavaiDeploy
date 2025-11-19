import clsx from '@/modules/clsx';
import { Component } from '@robocotik/react';
import styles from './Separator.module.scss';

interface SeparatorProps {
	mode: 'primary' | 'secondary';
	className?: string;
	getRootRef?: any;
}

export class Separator extends Component<SeparatorProps> {
	render() {
		const { className, mode, getRootRef } = this.props;

		return (
			<hr
				ref={getRootRef}
				className={clsx(
					styles.separator,
					{
						[styles.primary]: mode === 'primary',
						[styles.secondary]: mode === 'secondary',
					},
					className,
				)}
			/>
		);
	}
}
