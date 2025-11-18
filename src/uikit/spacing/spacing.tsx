import clsx from '@/modules/clsx';
import { Component } from '@robocotik/react';
import styles from './spacing.module.scss';

interface SpacingProps {
	size?: 'l' | 'm' | 's';
}

export class Spacing extends Component<SpacingProps> {
	render() {
		const { size = 'm' } = this.props;

		return (
			<div
				className={clsx({
					[styles.sizeL]: size === 'l',
					[styles.sizeM]: size === 'm',
					[styles.sizeS]: size === 's',
				})}
			></div>
		);
	}
}
