import clsx from '@/modules/clsx';
import { Component } from '@robocotik/react';
import styles from './title.module.scss';

interface SubheadProps {
	text: string;
	size?: 'm' | 's' | 'xs';
	align?: 'center' | 'left';
	color?: 'dark' | 'base' | 'light' | 'accent' | 'blue';
	weight?: 'regular' | 'bold';
	opacity?: '100' | '70' | '60' | '50' | '30';
	className?: string;
}

export class Subhead extends Component<SubheadProps> {
	render() {
		const { size, align, color, weight, text, opacity, className } = this.props;

		return (
			<h2
				className={clsx(
					styles.subhead,
					{
						[styles.sizeM]: size === 'm',
						[styles.sizeS]: size === 's',
						[styles.sizeXS]: size === 'xs',
						[styles.alignCenter]: align === 'center',
						[styles.alignLeft]: align === 'left',
						[styles.colorDark]: color === 'dark',
						[styles.colorAccent]: color === 'accent',
						[styles.colorBlue]: color === 'blue',
						[styles.colorBase]: color === 'base',
						[styles.colorLight]: color === 'light',
						[styles.weightRegular]: weight === 'regular',
						[styles.weightBold]: weight === 'bold',
						[styles.opacity100]: opacity === '100',
						[styles.opacity70]: opacity === '70',
						[styles.opacity60]: opacity === '60',
						[styles.opacity50]: opacity === '50',
						[styles.opacity30]: opacity === '30',
					},
					className,
				)}
			>
				{text}
			</h2>
		);
	}
}
