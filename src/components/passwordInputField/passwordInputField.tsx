import eye_close from '@/assets/img/eye_close.svg';
import eye_open from '@/assets/img/eye_open.svg';
import lock from '@/assets/img/lock.svg';
import type { ValidationResult } from '@/helpers/types/validationResult.ts';
import clsx from '@/modules/clsx/index.ts';
import { Component } from '@robocotik/react';
import styles from './passwordInputField.module.scss';

interface PasswordInputFieldProps {
	label?: string;
	defaultValue?: string;
	value?: string;
	placeholder?: string;
	onChange: (value: string) => void;
	validateFn: () => ValidationResult;
}

interface PasswordInputFieldState {
	isPasswordVisible: boolean;
	errorMessage: string;
}

export class PasswordInputField extends Component<
	PasswordInputFieldProps,
	PasswordInputFieldState
> {
	state = {
		isPasswordVisible: false,
		errorMessage: '',
	};

	handleVisibilityClicked = () => {
		this.setState({ isPasswordVisible: !this.state.isPasswordVisible });
	};

	handleInputChange = (e: Event) => {
		this.props.onChange((e.target as HTMLInputElement).value);
		const { message } = this.props.validateFn();
		this.setState({ errorMessage: message });
	};

	render() {
		const { label, defaultValue, value, placeholder } = this.props;

		return (
			<div className={styles.inputContainer}>
				{label && <label className={styles.inputLabel}>{label}</label>}
				<div
					className={clsx(styles.inputWrapper, {
						[styles.errorBorder]: this.state.errorMessage.length > 0,
						[styles.accentBorder]: this.state.errorMessage.length === 0,
					})}
				>
					<img src={lock} alt="icon" className={styles.inputIcon} />
					<input
						className={styles.inputField}
						type={this.state.isPasswordVisible ? 'text' : 'password'}
						value={value}
						placeholder={placeholder}
						defaultValue={defaultValue}
						onInput={this.handleInputChange}
					/>
					<button
						onClick={this.handleVisibilityClicked}
						className={styles.inputEye}
					>
						<img
							src={this.state.isPasswordVisible ? eye_close : eye_open}
							alt="icon"
							className={styles.inputIcon}
						/>
					</button>
				</div>
				<p className={styles.errorMessage}>{this.state.errorMessage}</p>
			</div>
		);
	}
}
