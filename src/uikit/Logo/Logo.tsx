import LogoSVG from '@/assets/logo.svg?react';
import clsx from '@/modules/clsx';
import { Component } from '@robocotik/react';
import styles from './Logo.module.scss';

interface LogoProps {
	level?: '7' | '8';
	className?: string;
	getRootRef?: any;
	[key: string]: any;
}

export class Logo extends Component<LogoProps> {
	render() {
		const { className, level, getRootRef, ...rest } = this.props;

		return (
			<LogoSVG
				ref={getRootRef}
				className={clsx(
					styles.logo,
					{
						[styles.level7]: level === '7',
						[styles.level8]: level === '8',
					},
					className,
				)}
				{...rest}
			/>
		);
	}
}
