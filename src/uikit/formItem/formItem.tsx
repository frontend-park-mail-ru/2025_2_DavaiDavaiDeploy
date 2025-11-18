import clsx from '@/modules/clsx';
import { Component } from '@robocotik/react';
import { Headline } from '../headline/headline';
import { Subhead } from '../subhead/subhead';
import styles from './formItem.module.scss';

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
		} = this.props;

		return (
			<div className={styles.inputContainer}>
				{top && (
					<Headline size="s" className={styles.label}>
						{top}
					</Headline>
				)}
				<div
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
				</div>
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
