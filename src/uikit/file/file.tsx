import { Component } from '@robocotik/react';
import { Button } from '../button/button';
import styles from './file.module.scss';

interface FileProps {
	accept: string;
	ref: any;
	onChange: (event: Event) => void;
	onClick: (event: MouseEvent) => void;
	className?: string;
}

export class File extends Component<FileProps> {
	render() {
		const { onChange, onClick, accept, ref } = this.props;

		return (
			<div className={styles.wrapper}>
				<Button
					mode="primary"
					size="xs"
					borderRadius="l"
					className={styles.btn}
					onClick={onClick}
				>
					Изменить фото
				</Button>
				<input
					className={styles.input}
					ref={ref}
					type="file"
					accept={accept}
					onChange={onChange}
				/>
			</div>
		);
	}
}
