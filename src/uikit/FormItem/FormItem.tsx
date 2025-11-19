import clsx from '@/modules/clsx';
import { Component } from '@robocotik/react';
import { Flex } from '../Flex/Flex';
import { Headline } from '../Headline/Headline';
import { Subhead } from '../Subhead/Subhead';
import styles from './FormItem.module.scss';

interface FormItemProps {
	mode: 'primary' | 'secondary' | 'tertiary';
	type?: 'text' | 'password';
	status?: 'default' | 'error';
	top?: string;
	bottom?: string;
	placeholder?: string;
	before?: any;
	after?: any;
	defaultValue?: string;
	value?: string;
	className?: string;
	onChange: (value: string) => void;
	getRootRef?: any;
}

export class FormItem extends Component<FormItemProps> {
	onChange = (e: Event) => {
		this.props.onChange((e.target as HTMLInputElement).value);
	};

	render() {
		const {
			mode,
			value,
			defaultValue = '',
			after,
			before,
			type = 'text',
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
				className={styles.inputContainer}
				getRootRef={getRootRef}
				direction="column"
				align="start"
			>
				{top && (
					<Headline level="9" className={styles.label}>
						{top}
					</Headline>
				)}
				<Flex
					align="center"
					justify="start"
					className={clsx(
						styles.inputWrapper,
						{
							[styles.error]: status === 'error',
							[styles.primary]: mode === 'primary',
							[styles.secondary]: mode === 'secondary',
							[styles.tertiary]: mode === 'tertiary',
						},
						className,
					)}
				>
					{before && <span className={styles.before}>{before}</span>}
					<input
						type={type}
						placeholder={placeholder}
						defaultValue={defaultValue}
						value={value}
						onInput={this.onChange}
						className={clsx(
							styles.input,
							{
								[styles.inputWithIcon]: before,
								[styles.tertiaryInput]: mode === 'tertiary',
								[styles.errorTertiaryInput]:
									status === 'error' && mode === 'tertiary',
							},
							className,
						)}
					>
						{children}
					</input>
					{after && <span className={styles.after}>{after}</span>}
				</Flex>
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
