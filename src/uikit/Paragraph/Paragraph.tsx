import clsx from '@/modules/clsx';
import { Component } from '@robocotik/react';
import styles from './Paragraph.module.scss';

interface ParagraphProps {
	level?: '7' | '8' | '9';
	align?: 'center' | 'left';
	color?: 'dark' | 'base' | 'light' | 'accent' | 'blue' | 'error';
	weight?: 'regular' | 'bold';
	className?: string;
	onClick?: (event: MouseEvent) => void;
	getRootRef?: any;
}

export class Paragraph extends Component<ParagraphProps> {
	render() {
		const {
			level,
			align,
			color,
			weight,
			className,
			onClick,
			children,
			getRootRef,
		} = this.props;

		return (
			<p
				onClick={onClick}
				ref={getRootRef}
				className={clsx(
					styles.paragraph,
					{
						[styles.level7]: level === '7',
						[styles.level8]: level === '8',
						[styles.level9]: level === '9',
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
