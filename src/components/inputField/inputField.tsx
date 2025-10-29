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

export class InputField extends Component<InputFieldProps> {
	render() {
		const { label, defaultValue, value, onChange, preIconSrc, placeholder } =
			this.props;

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
						onChange={(e) => onChange((e.target as HTMLInputElement).value)}
					/>
				</div>
			</div>
		);
	}
}
