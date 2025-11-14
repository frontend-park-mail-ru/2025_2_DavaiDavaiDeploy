import { Component, createPortal } from '@robocotik/react';
import style from './testModal.module.scss';

export class TestModal extends Component {
	render() {
		return createPortal(
			<div className={style.modalWrapper}>
				<div
					className={style.modalContent}
					onClick={(e) => e.stopPropagation()}
				>
					<div className={style.modalLogout}>
						<div className={style.modalHeader}>
							<h1 className={style.modalTitle}>Уже уходите?</h1>
							<h1 className={style.modalTitle}>Мы будем скучать!</h1>
						</div>
						ЭТО ТЕСТ МОДАЛКА
					</div>
				</div>
			</div>,
			document.body,
		);
	}
}
