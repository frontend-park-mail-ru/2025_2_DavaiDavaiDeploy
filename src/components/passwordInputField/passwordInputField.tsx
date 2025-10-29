import { Component } from '@robocotik/react';
import styles from './passwordInputField.module.scss';
import eye_close from '@/assets/img/eye_close.svg';
import eye_open from '@/assets/img/eye_open.svg';
import lock from '@/assets/img/lock.svg';

interface PasswordInputFieldProps {
	label?: string;
	defaultValue?: string;
	value?: string;
	placeholder?: string;
	onChange: (value: string) => void;
}

export class PasswordInputField extends Component<PasswordInputFieldProps> {
	state = {
		isPasswordVisible: false,
	};

	handleVisibilityClicked = () => {
		this.setState({ isPasswordVisible: !this.state.isPasswordVisible });
	};

	render() {
		const { label, defaultValue, value, onChange, placeholder } = this.props;

		return (
			<div className={styles.input__container}>
				{label && <label className={styles.input__label}>{label}</label>}
				<div className={styles.input__wrapper}>
					<img src={lock} alt="icon" className={styles.input__icon} />
					<input
						className={styles.input__field}
						type={this.state.isPasswordVisible ? 'text' : 'password'}
						value={value}
						placeholder={placeholder}
						defaultValue={defaultValue}
						onChange={(e) => onChange((e.target as HTMLInputElement).value)}
					/>
					<button
						onClick={this.handleVisibilityClicked}
						className={styles.input__eye}
					>
						<img
							src={this.state.isPasswordVisible ? eye_close : eye_open}
							alt="icon"
							className={styles.input__icon}
						/>
					</button>
				</div>
			</div>
		);
	}
}
