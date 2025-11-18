import clsx from '@/modules/clsx';
import { Component } from '@robocotik/react';
import styles from './button.module.scss';

interface ButtonProps {
	mode: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
	disabled?: boolean;
	size?: 'l' | 'm' | 's' | 'xs';
	borderRadius?: 'lg' | 'l';
	after?: any;
	before?: any;
	className?: string;
	onClick?: (event: MouseEvent) => void;
	onMouseLeave?: any;
	onMouseEnter?: any;
	children?: any;
}

export class Button extends Component<ButtonProps> {
	render() {
		const {
			mode,
			size = 's',
			borderRadius = 'l',
			after,
			before,
			className,
			onClick,
			onMouseLeave,
			onMouseEnter,
			children,
		} = this.props;

		return (
			<button
				onClick={onClick}
				onMouseLeave={onMouseLeave}
				onMouseEnter={onMouseEnter}
				className={clsx(
					styles.button,
					{
						[styles.sizeL]: size === 'l',
						[styles.sizeM]: size === 'm',
						[styles.sizeS]: size === 's',
						[styles.sizeXS]: size === 'xs',
						[styles.primary]: mode === 'primary',
						[styles.secondary]: mode === 'secondary',
						[styles.tertiary]: mode === 'tertiary',
						[styles.quaternary]: mode === 'quaternary',
						[styles.borderRadiusLG]: borderRadius === 'lg',
						[styles.borderRadiusL]: borderRadius === 'l',
					},
					className,
				)}
			>
				{before && <span className={styles.before}>{before}</span>}
				{children}
				{after && <span className={styles.after}>{after}</span>}
			</button>
		);
	}
}
