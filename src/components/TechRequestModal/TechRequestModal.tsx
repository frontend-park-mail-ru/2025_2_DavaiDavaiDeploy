import { Component, createPortal } from '@robocotik/react';
import clsx from '../../modules/clsx/index.ts';
import { withModal } from '../../modules/modals/withModal.tsx';
import type { WithModalProps } from '../../modules/modals/withModalProps.ts';
import style from './TechRequestModal.module.css';

interface TechRequestModalProps {
	id: number;
	status: boolean;
	title: string;
	description: string;
}

export class TechRequestModalComponent extends Component<
	TechRequestModalProps & WithModalProps,
	{}
> {
	render() {
		return createPortal(
			<div
				className={style.modalWrapper}
				onClick={() => {
					this.props.modal.hide();
				}}
			>
				<div
					className={style.modalContent}
					onClick={(e) => e.stopPropagation()}
				>
					<div className={style.innerContainer}>
						<h1 className={clsx(style.row, style.textCenter, style.title)}>
							Заявка #{this.props.id}
						</h1>
						<div className={clsx(style.row, style.textLeft)}>
							<p className={clsx(style.topic)}>Статус:</p>
							<p
								className={clsx({
									[style.green]: this.props.status,
									[style.yellow]: !this.props.status,
								})}
							>
								{this.props.status ? 'Выполнено' : 'В процессе'}
							</p>
						</div>

						<div className={clsx(style.row, style.textLeft)}>
							<p className={style.topic}>Тема:</p>
							<p className={style.titleContent}>{this.props.title}</p>
						</div>
						<div className={clsx(style.row, style.textLeft)}>
							<p className={style.topic}>Описание:</p>
							<p className={style.descriptionContent}>
								{this.props.description}
							</p>
						</div>
					</div>
				</div>
			</div>,
			document.body,
		);
	}
}

export const TechRequestModal = withModal(TechRequestModalComponent);
