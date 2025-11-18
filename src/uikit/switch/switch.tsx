import clsx from '@/modules/clsx';
import { Component } from '@robocotik/react';
import styles from './switch.module.scss';

interface SwitchProps {
	checked?: boolean;
	onClick?: (checked: boolean) => void;
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

		return (
			<div onClick={this.onClick} className={styles.switch}>
				<div
					className={clsx(styles.circle, {
						[styles.on]: checked,
						[styles.off]: !checked,
					})}
				></div>
			</div>
		);
	}
}
