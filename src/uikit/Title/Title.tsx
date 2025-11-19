import clsx from '@/modules/clsx';
import { Component } from '@robocotik/react';
import styles from './Title.module.scss';

interface TitleProps {
	level?: '1' | '2' | '3' | '4' | '5' | '6';
	align?: 'center' | 'left';
	color?: 'dark' | 'base' | 'light' | 'accent' | 'blue' | 'error';
	weight?: 'regular' | 'bold';
	className?: string;
	onClick?: (event: MouseEvent) => void;
	getRootRef?: any;
}

export class Title extends Component<TitleProps> {
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
			<h1
				onClick={onClick}
				ref={getRootRef}
				className={clsx(
					styles.title,
					{
						[styles.level1]: level === '1',
						[styles.level2]: level === '2',
						[styles.level3]: level === '3',
						[styles.level4]: level === '4',
						[styles.level5]: level === '5',
						[styles.level6]: level === '6',
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
			</h1>
		);
	}
}
