import Exit from '@/assets/img/exit.svg?react';
import { Button, Flex, Title } from '@/uikit/index';
import { Component, createPortal } from '@robocotik/react';
import { withModal } from '../../modules/modals/withModal';
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
			<Flex
				className={style.modalWrapper}
				onClick={this.props.modal.hide}
				align="center"
				justify="center"
			>
				<div
					className={style.modalContent}
					onClick={(e) => e.stopPropagation()}
				>
					<Flex
						className={style.modalLogout}
						direction="column"
						justify="between"
						align="center"
					>
						<Flex
							className={style.modalHeader}
							align="center"
							direction="column"
						>
							<Title className={style.modalTitle} level="5">
								Уже уходите?
							</Title>
							<Title className={style.modalTitle} level="5">
								Мы будем скучать!
							</Title>
						</Flex>
						<Flex
							className={style.modalActions}
							align="center"
							direction="column"
						>
							<Button
								mode="secondary"
								size="m"
								before={<Exit />}
								onClick={this.handleLogout}
								className={style.exitButton}
							>
								Выйти
							</Button>
							<Button
								mode="primary"
								size="m"
								borderRadius="l"
								onClick={this.props.modal.hide}
								className={style.turnBackButton}
							>
								Вернуться на сайт
							</Button>
						</Flex>
					</Flex>
				</div>
			</Flex>,
			document.body,
		);
	}
}

export const LoginModal = withModal(LoginModalComponent);
