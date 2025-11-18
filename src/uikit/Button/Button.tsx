import clsx from '@/modules/clsx';
import { Component } from '@robocotik/react';
import styles from './Button.module.scss';

interface ButtonProps {
	mode: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
	disabled?: boolean;
	level?: '7' | '8' | '9' | '10';
	borderRadius?: 'lg' | 'l';
	after?: any;
	before?: any;
	className?: string;
	onClick?: (event: MouseEvent) => void;
	onMouseLeave?: any;
	onMouseEnter?: any;
	children?: any;
	getRootRef?: any;
}

export class Button extends Component<ButtonProps> {
	render() {
		const {
			mode,
			level = '9',
			borderRadius = 'l',
			after,
			before,
			className,
			onClick,
			onMouseLeave,
			onMouseEnter,
			children,
			getRootRef,
		} = this.props;

		return (
			<button
				onClick={onClick}
				onMouseLeave={onMouseLeave}
				onMouseEnter={onMouseEnter}
				ref={getRootRef}
				className={clsx(
					styles.button,
					{
						[styles.level7]: level === '7',
						[styles.level8]: level === '8',
						[styles.level9]: level === '9',
						[styles.level10]: level === '10',
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
