import { Component, createPortal } from '@/modules/react';
import { Title } from '@/uikit/index';
import { withModal } from '../../modules/modals/withModal.tsx';
import type { WithModalProps } from '../../modules/modals/withModalProps.ts';
import style from './testModal.module.scss';

export class TestModalComponent extends Component<WithModalProps, {}> {
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
					<div className={style.modalLogout}>
						<div className={style.modalHeader}>
							<Title className={style.modalTitle} level="5" />
							<Title className={style.modalTitle} level="5" />
						</div>
						ЭТО ТЕСТ МОДАЛКА
					</div>
				</div>
			</div>,
			document.body,
		);
	}
}

export const TestModal = withModal(TestModalComponent);
