import clsx from '@/modules/clsx';
import { Component } from '@/modules/react';
import { Flex } from '../Flex/Flex';
import { Headline } from '../Headline/Headline';
import { Subhead } from '../Subhead/Subhead';
import styles from './Textarea.module.scss';

interface TextareaProps {
	status?: 'default' | 'error';
	top?: string;
	bottom?: string;
	placeholder?: string;
	defaultValue?: string;
	value?: string;
	className?: string;
	onChange: (value: string) => void;
	getRootRef?: any;
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
			getRootRef,
		} = this.props;

		return (
			<Flex
				getRootRef={getRootRef}
				className={styles.inputContainer}
				direction="column"
				align="start"
			>
				{top && (
					<Headline level="9" className={styles.label}>
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
					level="11"
					color={status === 'error' ? 'error' : 'blue'}
				>
					{bottom}
				</Subhead>
			</Flex>
		);
	}
}
