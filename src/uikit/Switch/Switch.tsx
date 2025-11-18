import clsx from '@/modules/clsx';
import { Component } from '@robocotik/react';
import { Flex } from '../Flex/Flex';
import styles from './Switch.module.scss';

interface SwitchProps {
	checked?: boolean;
	onClick?: (checked: boolean) => void;
	getRootRef?: any;
}

interface SwitchState {
	checked: boolean;
}

export class Switch extends Component<SwitchProps, SwitchState> {
	state: SwitchState = {
		checked: this.props.checked ?? false,
	};

	onClick = () => {
		const newChecked = !this.state.checked;
		this.setState({ checked: newChecked });

		if (this.props.onClick) {
			this.props.onClick(newChecked);
		}
	};

	render() {
		const { checked } = this.state;
		const { getRootRef } = this.props;

		return (
			<Flex
				getRootRef={getRootRef}
				onClick={this.onClick}
				className={styles.switch}
			>
				<div
					className={clsx(styles.circle, {
						[styles.on]: checked,
						[styles.off]: !checked,
					})}
				></div>
			</Flex>
		);
	}
}
