import clsx from '@/modules/clsx';
import { Component } from '@robocotik/react';
import { Headline } from '../headline/headline';
import { Subhead } from '../subhead/subhead';
import styles from './textarea.module.scss';

interface TextareaProps {
	status?: 'default' | 'error';
	top?: string;
	bottom?: string;
	placeholder?: string;
	defaultValue?: string;
	value?: string;
	className?: string;
	onChange: (value: string) => void;
}

export class Textarea extends Component<TextareaProps> {
	onChange = (e: Event) => {
		this.props.onChange((e.target as HTMLInputElement).value);
	};

	render() {
		const {
			value,
			defaultValue = '',
			status,
			placeholder,
			className,
			children,
			top,
			bottom,
		} = this.props;

		return (
			<div className={styles.inputContainer}>
				{top && (
					<Headline size="s" className={styles.label}>
						{top}
					</Headline>
				)}

				<textarea
					placeholder={placeholder}
					defaultValue={defaultValue}
					value={value}
					onInput={this.onChange}
					className={clsx(
						styles.textarea,
						{
							[styles.error]: status === 'error',
						},
						className,
					)}
				>
					{children}
				</textarea>

				<Subhead
					className={styles.bottom}
					size="2xs"
					color={status === 'error' ? 'error' : 'blue'}
				>
					{bottom}
				</Subhead>
			</div>
		);
	}
}
