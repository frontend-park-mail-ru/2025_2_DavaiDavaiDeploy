import clsx from '@/modules/clsx';
import { Component } from '@robocotik/react';
import styles from './separator.module.scss';

interface SeparatorProps {
	mode: 'primary' | 'secondary';
	className?: string;
}

export class Separator extends Component<SeparatorProps> {
	render() {
		const { className, mode } = this.props;

		return (
			<hr
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
