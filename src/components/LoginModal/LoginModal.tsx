import Exit from '@/assets/img/exit.svg?react';
import { Button } from '@/uikit/button/button';
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
							<Title className={style.modalTitle} size="2xl">
								Уже уходите?
							</Title>
							<Title className={style.modalTitle} size="2xl">
								Мы будем скучать!
							</Title>
						</div>
						<div className={style.modalActions}>
							<Button
								mode="secondary"
								size="m"
								before={<Exit />}
								className={style.exitButton}
							>
								Выйти
							</Button>
							<Button
								mode="primary"
								size="m"
								borderRadius="l"
								className={style.turnBackButton}
							>
								Вернуться на сайт
							</Button>
						</div>
					</div>
				</div>
			</div>,
			document.body,
		);
	}
}
