import { Component } from '@robocotik/react';
import { Flex } from '../Flex/Flex';
import styles from './OTPInput.module.scss';

interface OTPInputProps {
	length: number;
	onFinish: (otp: string) => void;
	getRootRef?: any;
}

interface OTPInputState {
	values: string[];
}

export class OTPInput extends Component<OTPInputProps, OTPInputState> {
	state: OTPInputState = {
		values: [],
	};

	onMount() {
		const firstInput = document.querySelector(
			`[data-index="0"]`,
		) as HTMLInputElement | null;

		if (firstInput) {
			firstInput.focus();
		}
	}

	handleInput = (event: Event): void => {
		const target = event.currentTarget as HTMLInputElement;
		const index = Number(target.dataset.index);

		if (isNaN(index)) {
			return;
		}

		const newValues = [...this.state.values];
		newValues[index] = target.value;

		if (newValues.every((v) => v !== '')) {
			this.props.onFinish(newValues.join(''));
		}

		this.setState({ values: newValues });

		if (target.value && target.nextElementSibling) {
			(target.nextElementSibling as HTMLInputElement).focus();
		}
	};

	handleKeyDown = (event: KeyboardEvent): void => {
		const target = event.currentTarget as HTMLInputElement;
		const index = Number(target.dataset.index);

		if (event.key === 'Backspace' && index > 0 && !target.value) {
			const prevInput = target.previousElementSibling as HTMLInputElement;

			if (prevInput) {
				prevInput.focus();
			}
		}
	};

	render() {
		const { length = 6, getRootRef } = this.props;
		const { values } = this.state;

		if (values.length === 0) {
			this.state.values = Array(length).fill('');
		}

		return (
			<Flex className={styles.inputWrapper} getRootRef={getRootRef}>
				{Array.from({ length }, (_, i) => (
					<input
						type="text"
						maxLength={1}
						className={styles.input}
						data-index={i}
						value={values[i]}
						onInput={this.handleInput}
						onKeyDown={this.handleKeyDown}
					/>
				))}
			</Flex>
		);
	}
}
