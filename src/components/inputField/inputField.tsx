import { Component } from '@robocotik/react';
import styles from './inputField.module.scss';
import { validateLogin } from '@/helpers/validateLogin/validateLogin.ts';

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
		this.state.errorMessage = message;
	};

	render() {
		const { label, defaultValue, value, preIconSrc, placeholder } = this.props;

		return (
			<div className={styles.input__container}>
				{label && <label className={styles.input__label}>{label}</label>}
				<div className={styles.input__wrapper}>
					{preIconSrc && (
						<img src={preIconSrc} alt="icon" className={styles.input__icon} />
					)}
					<input
						className={styles.input__field}
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
