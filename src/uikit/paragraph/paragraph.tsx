import clsx from '@/modules/clsx';
import { Component } from '@robocotik/react';
import styles from './paragraph.module.scss';

interface ParagraphProps {
	size?: 'l' | 'm' | 's';
	align?: 'center' | 'left';
	color?: 'dark' | 'base' | 'light' | 'accent' | 'blue' | 'error';
	weight?: 'regular' | 'bold';
	className?: string;
	onClick?: (event: MouseEvent) => void;
	data?: any;
}

export class Paragraph extends Component<ParagraphProps> {
	render() {
		const { size, align, color, weight, className, onClick, data, children } =
			this.props;

		return (
			<p
				onClick={onClick}
				data={data}
				className={clsx(
					styles.paragraph,
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
				{children}
			</p>
		);
	}
}
