import Exit from '@/assets/img/exit.svg?react';
import { Component } from '@robocotik/react';
import { ModalLayout } from '../modalLayout/modalLayout.tsx';
import {
	ModalContext,
	type ModalContextValue,
} from '../modalProvider/modalProvider.tsx';
import style from './logoutModal.module.scss';

interface LogoutModalProps {
	Actions: Component;
	onExit: (e: Event) => void;
}

export class LogoutModal extends Component<LogoutModalProps> {
	render() {
		return (
			<ModalLayout Actions={this.props.Actions}>
				<ModalContext.Consumer>
					{({ handleCloseModal }: ModalContextValue) => {
						return (
							<div className={style.modalLogout}>
								<div className={style.modalHeader}>
									<h1 className={style.modalTitle}>Уже уходите?</h1>
									<h1 className={style.modalTitle}>Мы будем скучать!</h1>
								</div>
								<div className={style.modalActions}>
									<button
										className={style.exitButton}
										onClick={this.props.onExit}
									>
										<Exit />
										Выйти
									</button>
									<button
										className={style.turnBackButton}
										onClick={handleCloseModal}
									>
										Вернуться на сайт
									</button>
								</div>
							</div>
						);
					}}
				</ModalContext.Consumer>
			</ModalLayout>
		);
	}
}
