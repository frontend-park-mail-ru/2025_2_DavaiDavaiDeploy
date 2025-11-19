import LogoSVG from '@/assets/img/logo.svg?react';
import clsx from '@/modules/clsx';
import { Component } from '@robocotik/react';
import styles from './Logo.module.scss';

interface LogoProps {
	level?: '7' | '8';
	className?: string;
	getRootRef?: any;
}

export class Logo extends Component<LogoProps> {
	render() {
		const { className, level, getRootRef } = this.props;

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
			/>
		);
	}
}
