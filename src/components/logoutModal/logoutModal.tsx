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
		const { Actions } = this.props;
		return (
			<ModalLayout Actions={Actions}>
				<ModalContext.Consumer>
					{({ handleCloseModal }: ModalContextValue) => (
						<div className={style.modalLogout}>
							<div>
								<h1>Уже уходите?</h1>
								<h1>Мы будем скучать!</h1>
							</div>
							<button onClick={this.props.onExit}>
								<Exit />
								Выйти
							</button>
							<button onClick={handleCloseModal}>Вернуться на сайт</button>s
						</div>
					)}
				</ModalContext.Consumer>
			</ModalLayout>
		);
	}
}
