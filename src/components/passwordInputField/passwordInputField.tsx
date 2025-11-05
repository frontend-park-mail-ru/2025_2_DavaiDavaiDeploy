import eyeHideSvg from '@/assets/img/eye_close.svg';
import eyeShowSvg from '@/assets/img/eye_open.svg';
import lock from '@/assets/img/lock.svg';
import clsx from '@/modules/clsx/index.ts';
import { Component } from '@robocotik/react';
import styles from './passwordInputField.module.scss';

interface PasswordInputFieldProps {
	label?: string;
	defaultValue?: string;
	value?: string;
	placeholder?: string;
	onChange: (value: string) => void;
	errorMessage: string;
	inputFieldClass?: string;
	inputLabelClass?: string;
	inputWrapperClass?: string;
	accentBorderClass?: string;
	errorBorderClass?: string;
}

interface PasswordInputFieldState {
	showPassword: boolean;
}

export class PasswordInputField extends Component<
	PasswordInputFieldProps,
	PasswordInputFieldState
> {
	state: PasswordInputFieldState = {
		showPassword: false,
	};

	togglePasswordVisibility = () => {
		this.setState({ showPassword: !this.state.showPassword });
	};

	onChange = (e: Event) => {
		this.props.onChange((e.target as HTMLInputElement).value);
	};

	render() {
		const { label, defaultValue, value, placeholder, errorMessage } =
			this.props;

		return (
			<div className={styles.inputContainer}>
				{label && (
					<label
						htmlFor={`passwordField-${label}`}
						className={clsx(
							styles.inputLabel,
							this.props.inputLabelClass ?? '',
						)}
					>
						{label}
					</label>
				)}
				<div
					className={clsx(
						styles.inputWrapper,
						this.props.inputWrapperClass ?? '',
						{
							[this.props.errorBorderClass ?? styles.errorBorder]:
								errorMessage.length > 0,
							[this.props.accentBorderClass ?? styles.accentBorder]:
								errorMessage.length === 0,
						},
					)}
				>
					<img src={lock} alt="icon" className={styles.inputIconLeft} />
					<input
						id={`passwordField-${label}`}
						className={clsx(
							styles.inputField,
							this.props.inputFieldClass ?? '',
						)}
						type={this.state.showPassword ? 'text' : 'password'}
						placeholder={placeholder}
						defaultValue={defaultValue}
						value={value}
						onInput={this.onChange}
					/>
					<button
						onClick={this.togglePasswordVisibility}
						className={clsx(styles.inputEye, this.props.inputFieldClass ?? '')}
					>
						<img
							src={this.state.showPassword ? eyeHideSvg : eyeShowSvg}
							alt="icon"
							className={styles.inputIconRight}
						/>
					</button>
				</div>
				<p className={styles.errorMessage}>{errorMessage}</p>
			</div>
		);
	}
}
