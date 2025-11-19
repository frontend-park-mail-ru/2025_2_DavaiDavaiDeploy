import Exit from '@/assets/img/exit.svg?react';
import { withModal } from '@/modules/modals/withModal';
import { Component, createPortal } from '@robocotik/react';
import type { WithModalProps } from '../../modules/modals/withModalProps';
import style from './LoginModal.module.scss';

interface LoginModalProps {
	onLogout: VoidFunction;
	[key: string]: any;
}

export class LoginModalComponent extends Component<
	LoginModalProps & WithModalProps
> {
	handleLogout = () => {
		this.props.onLogout();
		this.props.modal.hide();
	};

	render() {
		return createPortal(
			<div className={style.modalWrapper} onClick={this.props.modal.hide}>
				<div
					className={style.modalContent}
					onClick={(e) => {
						e.stopPropagation();
					}}
				>
					<div className={style.modalLogout}>
						<div className={style.modalHeader}>
							<h1 className={style.modalTitle}>Уже уходите?</h1>
							<h1 className={style.modalTitle}>Мы будем скучать!</h1>
						</div>
						<div className={style.modalActions}>
							<button onClick={this.handleLogout} className={style.exitButton}>
								<Exit />
							</button>
							<button
								onClick={this.props.modal.hide}
								className={style.turnBackButton}
							>
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

export const LoginModal = withModal(LoginModalComponent);
