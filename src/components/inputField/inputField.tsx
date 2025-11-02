import { validateLogin } from '@/helpers/validateLogin/validateLogin.ts';
import clsx from '@/modules/clsx/index.ts';
import { Component } from '@robocotik/react';
import styles from './inputField.module.scss';
interface InputFieldProps {
	label?: string;
	defaultValue?: string;
	value?: string;
	placeholder?: string;
	preIconSrc?: string;
	onChange: (value: string) => void;
}

interface InputFieldState {
	errorMessage: string;
}

export class InputField extends Component<InputFieldProps, InputFieldState> {
	state = {
		errorMessage: '',
	};

	onChange = (e: Event) => {
		this.props.onChange((e.target as HTMLInputElement).value);
		const { message } = validateLogin((e.target as HTMLInputElement).value);
		this.setState({ errorMessage: message });
	};

	render() {
		const { label, defaultValue, value, preIconSrc, placeholder } = this.props;

		return (
			<div className={styles.inputContainer}>
				{label && <label className={styles.inputLabel}>{label}</label>}
				<div
					className={clsx(styles.inputWrapper, {
						[styles.errorBorder]: this.state.errorMessage.length > 0,
						[styles.accentBorder]: this.state.errorMessage.length === 0,
					})}
				>
					{preIconSrc && (
						<img src={preIconSrc} alt="icon" className={styles.inputIcon} />
					)}
					<input
						className={styles.inputField}
						type={'text'}
						value={value}
						placeholder={placeholder}
						defaultValue={defaultValue}
						onInput={(e) => this.onChange(e)}
					/>
				</div>

				<p className={styles.errorMessage}>{this.state.errorMessage}</p>
			</div>
		);
	}
}
