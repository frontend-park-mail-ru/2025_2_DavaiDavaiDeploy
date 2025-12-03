import { Component } from '@robocotik/react';
import clsx from '../clsx';
import styles from './IconButton.module.scss';

interface IconButtonProps {
	mode: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
	className?: string;
	onClick?: (event: MouseEvent) => void;
	onMouseLeave?: any;
	onMouseEnter?: any;
	children?: any;
	getRootRef?: any;
	[key: string]: any;
}

export class IconButton extends Component<IconButtonProps> {
	render() {
		const {
			mode,
			className,
			onClick,
			onMouseLeave,
			onMouseEnter,
			children,
			getRootRef,
			...rest
		} = this.props;

		return (
			<button
				ref={getRootRef}
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
				{...rest}
			>
				{children}
			</button>
		);
	}
}
