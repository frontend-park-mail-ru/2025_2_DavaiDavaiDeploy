import Close from '@/assets/close.svg?react';
import Exit from '@/assets/exit.svg?react';
import { Component } from '@robocotik/react';
import { Button, Flex, Title } from 'ddd-ui-kit';
import { withModal } from '../../modules/modals/withModal';
import type { WithModalProps } from '../../modules/modals/withModalProps';
import { BaseModal, type BaseModalProps } from '../BaseModal/BaseModal';
import style from './LoginModal.module.scss';

export interface LoginModalProps {
	onLogout: VoidFunction;
}

export class LoginModalComponent extends Component<
	BaseModalProps & LoginModalProps & WithModalProps
> {
	handleLogout = () => {
		this.props.onLogout();
		this.props.modal.hide();
	};
	render() {
		return (
			<BaseModal hasClose={false}>
				<Flex
					className={style.modalLogout}
					direction="column"
					justify="between"
					align="center"
				>
					<div className={style.closeButton} onClick={this.props.modal.hide}>
						<Close />
					</div>
					<Flex className={style.modalHeader} align="center" direction="column">
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
			</BaseModal>
		);
	}
}

export const LoginModal = withModal(LoginModalComponent);
