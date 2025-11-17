import clsx from '@/modules/clsx';
import { Component } from '@robocotik/react';
import styles from './title.module.scss';

interface ParagraphProps {
	text: string;
	size?: 'l' | 'm' | 's';
	align?: 'center' | 'left';
	color?: 'dark' | 'base' | 'light' | 'accent' | 'blue';
	weight?: 'regular' | 'bold';
	className?: string;
}

export class Paragraph extends Component<ParagraphProps> {
	render() {
		const { size, align, color, weight, text, className } = this.props;

		return (
			<h2
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
