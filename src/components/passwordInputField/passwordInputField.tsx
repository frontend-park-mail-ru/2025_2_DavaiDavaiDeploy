import eyeHideSvg from '@/assets/eye_close.svg';
import eyeShowSvg from '@/assets/eye_open.svg';
import lock from '@/assets/lock.svg';
import { Component } from '@robocotik/react';
import { FormItem, IconButton } from 'ddd-ui-kit';
import styles from './passwordInputField.module.scss';

interface PasswordInputFieldProps {
	label?: string;
	mode: 'primary' | 'secondary' | 'tertiary';
	defaultValue?: string;
	value?: string;
	placeholder?: string;
	onChange: (value: string) => void;
	errorMessage: string;
	name?: string;
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

	render() {
		const {
			onChange,
			label,
			defaultValue,
			value,
			placeholder,
			errorMessage,
			mode,
			name,
		} = this.props;

		return (
			<FormItem
				mode={mode}
				top={label}
				name={name}
				type={this.state.showPassword ? 'text' : 'password'}
				placeholder={placeholder}
				defaultValue={defaultValue}
				value={value}
				onChange={onChange}
				bottom={errorMessage}
				status={errorMessage.length > 0 ? 'error' : 'default'}
				before={<img src={lock} alt="icon" className={styles.inputIconLeft} />}
				after={
					<IconButton
						mode="tertiary"
						onClick={this.togglePasswordVisibility}
						className={styles.inputEye}
					>
						<img
							src={this.state.showPassword ? eyeHideSvg : eyeShowSvg}
							alt="icon"
							className={styles.inputIconRight}
						/>
					</IconButton>
				}
			/>
		);
	}
}
