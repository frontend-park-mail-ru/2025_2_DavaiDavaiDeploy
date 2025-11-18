import clsx from '@/modules/clsx';
import { Component } from '@robocotik/react';
import styles from './tooltip.module.scss';

interface TooltipProps {
	text: string;
	placement?: 'top' | 'bottom' | 'left' | 'right';
}

interface TooltipState {
	visible: boolean;
}

export class Tooltip extends Component<TooltipProps, TooltipState> {
	state = {
		visible: false,
	};

	render() {
		const { placement = 'right', children, text } = this.props;
		const { visible } = this.state;

		return (
			<div
				onMouseEnter={() => this.setState({ visible: true })}
				onMouseLeave={() => this.setState({ visible: false })}
				className={styles.tooltipWrapper}
			>
				<div
					className={clsx(styles.tooltip, {
						[styles.visible]: visible,
						[styles.notVisible]: !visible,
						[styles.placementTop]: placement === 'top',
						[styles.placementBottom]: placement === 'bottom',
						[styles.placementLeft]: placement === 'left',
						[styles.placementRight]: placement === 'right',
					})}
				>
					{text}
				</div>
				{children}
			</div>
		);
	}
}
