import Exit from '@/assets/img/exit.svg?react';
import { Component, createPortal } from '@robocotik/react';
import style from './LoginModal.module.scss';

type Props = {
	value: number;
};

export class LoginModal extends Component<Props> {
	render() {
		if (this.props.value > 5) {
			return <></>;
		}

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
						<div className={style.modalActions}>
							<button className={style.exitButton}>
								<Exit />
								{this.props.value}
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
