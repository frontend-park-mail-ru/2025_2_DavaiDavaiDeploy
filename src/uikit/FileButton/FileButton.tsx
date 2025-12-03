import { Component, createRef } from '@robocotik/react';
import { Button } from '../Button/Button';
import clsx from '../clsx';
import styles from './FileButton.module.scss';

interface FileButtonProps {
	accept: string;
	onChange: (event: Event) => void;
	className?: string;
	getRootRef?: any;
	[key: string]: any;
}

export class FileButton extends Component<FileButtonProps> {
	fileInputRef = createRef<HTMLElement>();

	handleFileUpload = async () => {
		this.fileInputRef?.current?.click();
	};

	render() {
		const { onChange, accept, className, getRootRef, ...rest } = this.props;

		return (
			<div
				className={clsx(styles.wrapper, className)}
				ref={getRootRef}
				{...rest}
			>
				<Button
					mode="primary"
					size="xs"
					borderRadius="l"
					className={styles.btn}
					onClick={this.handleFileUpload}
				>
					Изменить фото
				</Button>
				<input
					className={styles.input}
					ref={this.fileInputRef}
					type="file"
					accept={accept}
					onChange={onChange}
				/>
			</div>
		);
	}
}
