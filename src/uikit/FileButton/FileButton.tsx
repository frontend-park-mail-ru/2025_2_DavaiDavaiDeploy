import { Component } from '@robocotik/react';
import { Button } from '../button/button';
import styles from './FileButton.module.scss';

interface FileButtonProps {
	accept: string;
	onChange: (event: Event) => void;
	onClick: (event: MouseEvent) => void;
	className?: string;
	getRootRef?: any;
}

export class FileButton extends Component<FileButtonProps> {
	render() {
		const { onChange, onClick, accept, getRootRef } = this.props;

		return (
			<div className={styles.wrapper}>
				<Button
					mode="primary"
					level="10"
					borderRadius="l"
					className={styles.btn}
					onClick={onClick}
				>
					Изменить фото
				</Button>
				<input
					className={styles.input}
					ref={getRootRef}
					type="file"
					accept={accept}
					onChange={onChange}
				/>
			</div>
		);
	}
}
