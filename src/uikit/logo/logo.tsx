import LogoSVG from '@/assets/img/logo.svg?react';
import clsx from '@/modules/clsx';
import { Component } from '@robocotik/react';
import styles from './logo.module.scss';
interface LogoProps {
	size?: 'l' | 'm';
	className?: string;
}

export class Logo extends Component<LogoProps> {
	render() {
		const { className, size } = this.props;

		return (
			<LogoSVG
				className={clsx(
					styles.logo,
					{
						[styles.sizeL]: size === 'l',
						[styles.sizeM]: size === 'm',
					},
					className,
				)}
			/>
		);
	}
}
