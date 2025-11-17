import clsx from '@/modules/clsx';
import { Component } from '@robocotik/react';
import styles from './headline.module.scss';

interface HeadlineProps {
	text: string | number;
	size?: 'l' | 'm' | 's';
	align?: 'center' | 'left';
	color?: 'dark' | 'base' | 'light' | 'accent' | 'blue' | 'error';
	weight?: 'regular' | 'bold';
	className?: string;
	onClick?: (event: MouseEvent) => void;
	data?: any;
}

export class Headline extends Component<HeadlineProps> {
	render() {
		const { size, align, color, weight, text, className, onClick, data } =
			this.props;

		return (
			<h2
				onClick={onClick}
				data={data}
				className={clsx(
					styles.headline,
					{
						[styles.sizeL]: size === 'l',
						[styles.sizeM]: size === 'm',
						[styles.sizeS]: size === 's',
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
					},
					className,
				)}
			>
				{text}
			</h2>
		);
	}
}
