import clsx from '@/modules/clsx/index.ts';
import { Component } from '@robocotik/react';
import styles from './inputField.module.scss';
interface InputFieldProps {
	label?: string;
	defaultValue?: string;
	value?: string;
	placeholder?: string;
	preIconSrc?: string;
	errorMessage: string;
	onChange: (value: string) => void;
}

export class InputField extends Component<InputFieldProps> {
	onChange = (e: Event) => {
		this.props.onChange((e.target as HTMLInputElement).value);
	};

	render() {
		const { label, defaultValue, value, preIconSrc, placeholder } = this.props;

		return (
			<div className={styles.inputContainer}>
				{label && (
					<label htmlFor={`inputField-${label}`} className={styles.inputLabel}>
						{label}
					</label>
				)}
				<div
					className={clsx(styles.inputWrapper, {
						[styles.errorBorder]: this.props.errorMessage.length > 0,
						[styles.accentBorder]: this.props.errorMessage.length === 0,
					})}
				>
					{preIconSrc && (
						<img src={preIconSrc} alt="icon" className={styles.inputIcon} />
					)}
					<input
						id={`inputField-${label}`}
						className={styles.inputField}
						type={'text'}
						value={value}
						placeholder={placeholder}
						defaultValue={defaultValue}
						onInput={(e) => this.onChange(e)}
					/>
				</div>

				<p className={styles.errorMessage}>{this.props.errorMessage}</p>
			</div>
		);
	}
}
