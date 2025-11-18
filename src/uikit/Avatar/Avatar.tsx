import clsx from '@/modules/clsx';
import { Component } from '@robocotik/react';
import { Image } from '../Image/Image';
import styles from './Avatar.module.scss';

interface AvatarProps {
	src?: string;
	alt?: string;
	level?: '6' | '7' | '8' | '9' | '10';
	className?: string;
	getRootRef?: any;
}

export class Avatar extends Component<AvatarProps> {
	render() {
		const { className, src, children, alt, level, getRootRef } = this.props;

		return (
			<Image
				src={src}
				alt={alt}
				getRootRef={getRootRef}
				className={clsx(
					styles.avatar,
					{
						[styles.level6]: level === '6',
						[styles.level7]: level === '7',
						[styles.level8]: level === '8',
						[styles.level9]: level === '9',
						[styles.level10]: level === '10',
					},
					className,
				)}
			>
				{children}
			</Image>
		);
	}
}
