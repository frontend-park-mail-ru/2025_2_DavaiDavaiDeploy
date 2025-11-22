import { Button, Flex, Title } from '@/uikit/index';
import { Component } from '@robocotik/react';
import { withModal } from '../../modules/modals/withModal';
import type { WithModalProps } from '../../modules/modals/withModalProps';
import { BaseModal, type BaseModalProps } from '../BaseModal/BaseModal';
import style from './OTPModal.module.scss';

export class OTPModalComponent extends Component<
	BaseModalProps & WithModalProps
> {
	render() {
		return (
			<BaseModal>
				<Flex
					className={style.modalLogout}
					direction="column"
					justify="between"
					align="center"
				>
					<Flex className={style.modalHeader} align="center" direction="column">
						<Title className={style.modalTitle} level="5">
							Обязательно сохраните QR-код
						</Title>
						<Title className={style.modalTitle} level="5">
							Он потребуется Вам при всех дальнейших входах в аккаунт
						</Title>
					</Flex>
					<Flex
						className={style.modalActions}
						align="center"
						direction="column"
					>
						<Button
							mode="primary"
							size="m"
							borderRadius="l"
							onClick={this.props.modal.hide}
							className={style.turnBackButton}
						>
							Я сохранил QR код
						</Button>
					</Flex>
				</Flex>
			</BaseModal>
		);
	}
}

export const OTPModal = withModal(OTPModalComponent);
