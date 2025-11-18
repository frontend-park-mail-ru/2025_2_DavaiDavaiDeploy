import clsx from '@/modules/clsx';
import { Component } from '@robocotik/react';
import styles from './Subhead.module.scss';

interface SubheadProps {
	level?: '7' | '8' | '9' | '10' | '11';
	align?: 'center' | 'left';
	color?: 'dark' | 'base' | 'light' | 'accent' | 'blue' | 'error';
	weight?: 'regular' | 'bold';
	opacity?: '100' | '80' | '70' | '60' | '50' | '30';
	className?: string;
	onClick?: (event: MouseEvent) => void;
	getRootRef?: any;
}

export class Subhead extends Component<SubheadProps> {
	render() {
		const {
			level,
			align,
			color,
			weight,
			opacity,
			className,
			onClick,
			children,
			getRootRef,
		} = this.props;

		return (
			<h3
				onClick={onClick}
				ref={getRootRef}
				className={clsx(
					styles.subhead,
					{
						[styles.level7]: level === '7',
						[styles.level8]: level === '8',
						[styles.level9]: level === '9',
						[styles.level10]: level === '10',
						[styles.level11]: level === '11',
						[styles.alignCenter]: align === 'center',
						[styles.alignLeft]: align === 'left',
						[styles.colorDark]: color === 'dark',
						[styles.colorAccent]: color === 'accent',
						[styles.colorBlue]: color === 'blue',
						[styles.colorBase]: color === 'base',
						[styles.colorLight]: color === 'light',
						[styles.colorError]: color === 'error',
						[styles.weightRegular]: weight === 'regular',
						[styles.weightBold]: weight === 'bold',
						[styles.opacity100]: opacity === '100',
						[styles.opacity80]: opacity === '80',
						[styles.opacity70]: opacity === '70',
						[styles.opacity60]: opacity === '60',
						[styles.opacity50]: opacity === '50',
						[styles.opacity30]: opacity === '30',
					},
					className,
				)}
			>
				{children}
			</h3>
		);
	}
}
