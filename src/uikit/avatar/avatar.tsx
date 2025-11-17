import clsx from '@/modules/clsx';
import { Component } from '@robocotik/react';
import styles from './avatar.module.scss';

interface AvatarProps {
	src: string;
	alt?: string;
	size?: 'xl' | 'l' | 'm' | 's' | 'xs';
	className?: string;
}

export class Avatar extends Component<AvatarProps> {
	render() {
		const { className, src, children, alt, size } = this.props;

		return (
			<img
				src={src}
				alt={alt}
				className={clsx(
					styles.avatar,
					{
						[styles.sizeXL]: size === 'xl',
						[styles.sizeL]: size === 'l',
						[styles.sizeM]: size === 'm',
						[styles.sizeS]: size === 's',
						[styles.sizeXS]: size === 'xs',
					},
					className,
				)}
			>
				{children}
			</img>
		);
	}
}
