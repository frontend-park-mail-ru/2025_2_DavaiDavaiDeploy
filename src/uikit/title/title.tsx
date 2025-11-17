import clsx from '@/modules/clsx';
import { Component } from '@robocotik/react';
import styles from './title.module.scss';

interface TitleProps {
	text: string | number;
	size?: '6xl' | '5xl' | '4xl' | '3xl' | '2xl' | 'xl';
	align?: 'center' | 'left';
	color?: 'dark' | 'base' | 'light' | 'accent' | 'blue' | 'error';
	weight?: 'regular' | 'bold';
	className?: string;
	onClick?: (event: MouseEvent) => void;
	data?: any;
}

export class Title extends Component<TitleProps> {
	render() {
		const { size, align, color, weight, text, className, onClick, data } =
			this.props;

		return (
			<h1
				onClick={onClick}
				data={data}
				className={clsx(
					styles.title,
					{
						[styles.size6xl]: size === '6xl',
						[styles.size5xl]: size === '5xl',
						[styles.size4xl]: size === '4xl',
						[styles.size3xl]: size === '3xl',
						[styles.size2xl]: size === '2xl',
						[styles.sizexl]: size === 'xl',
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
			</h1>
		);
	}
}
