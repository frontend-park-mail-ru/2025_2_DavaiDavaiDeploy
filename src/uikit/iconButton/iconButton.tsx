import clsx from '@/modules/clsx';
import { Component } from '@robocotik/react';
import styles from './iconButton.module.scss';

interface IconButtonProps {
	mode: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
	disabled?: boolean;
	className?: string;
	onClick?: (event: MouseEvent) => void;
	onMouseLeave?: any;
	onMouseEnter?: any;
	children?: any;
}

export class IconButton extends Component<IconButtonProps> {
	render() {
		const { mode, className, onClick, onMouseLeave, onMouseEnter, children } =
			this.props;

		return (
			<button
				onClick={onClick}
				onMouseLeave={onMouseLeave}
				onMouseEnter={onMouseEnter}
				className={clsx(
					styles.button,
					{
						[styles.primary]: mode === 'primary',
						[styles.secondary]: mode === 'secondary',
						[styles.tertiary]: mode === 'tertiary',
						[styles.quaternary]: mode === 'quaternary',
					},
					className,
				)}
			>
				{children}
			</button>
		);
	}
}
