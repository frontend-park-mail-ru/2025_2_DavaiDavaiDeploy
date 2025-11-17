import Exit from '@/assets/img/exit.svg?react';
import { Title } from '@/uikit/title/title';
import { Component, createPortal } from '@robocotik/react';
import style from './LoginModal.module.scss';

export class LoginModal extends Component {
	render() {
		return createPortal(
			<div className={style.modalWrapper}>
				<div
					className={style.modalContent}
					onClick={(e) => e.stopPropagation()}
				>
					<div className={style.modalLogout}>
						<div className={style.modalHeader}>
							<Title
								className={style.modalTitle}
								text="Уже уходите?"
								size="2xl"
							/>
							<Title
								className={style.modalTitle}
								text="Мы будем скучать!"
								size="2xl"
							/>
						</div>
						<div className={style.modalActions}>
							<button className={style.exitButton}>
								<Exit />
							</button>
							<button className={style.turnBackButton}>
								Вернуться на сайт
							</button>
						</div>
					</div>
				</div>
			</div>,
			document.body,
		);
	}
}
