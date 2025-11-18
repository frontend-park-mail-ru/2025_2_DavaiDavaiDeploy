import clsx from '@/modules/clsx';
import { Component } from '@robocotik/react';
import styles from './subhead.module.scss';

interface SubheadProps {
	size?: 'l' | 'm' | 's' | 'xs' | '2xs';
	align?: 'center' | 'left';
	color?: 'dark' | 'base' | 'light' | 'accent' | 'blue' | 'error';
	weight?: 'regular' | 'bold';
	opacity?: '100' | '80' | '70' | '60' | '50' | '30';
	className?: string;
	onClick?: (event: MouseEvent) => void;
	data?: any;
}

export class Subhead extends Component<SubheadProps> {
	render() {
		const {
			size,
			align,
			color,
			weight,
			opacity,
			className,
			onClick,
			data,
			children,
		} = this.props;

		return (
			<h3
				onClick={onClick}
				data={data}
				className={clsx(
					styles.subhead,
					{
						[styles.sizeL]: size === 'l',
						[styles.sizeM]: size === 'm',
						[styles.sizeS]: size === 's',
						[styles.sizeXS]: size === 'xs',
						[styles.size2XS]: size === '2xs',
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
