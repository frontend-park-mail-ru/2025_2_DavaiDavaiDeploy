import { Component } from '@robocotik/react';
import { Button, Flex, Subhead, Title } from 'ddd-ui-kit';
import { withModal } from '../../modules/modals/withModal';
import type { WithModalProps } from '../../modules/modals/withModalProps';
import { BaseModal, type BaseModalProps } from '../BaseModal/BaseModal';
import { AppToast } from '../toastContainer/toastContainer';
import style from './OTPModal.module.scss';

export interface OTPModalProps {
	qrCode: string;
}

export class OTPModalComponent extends Component<
	BaseModalProps & WithModalProps & OTPModalProps
> {
	handleClose = () => {
		this.props.modal.hide();

		if (this.props.qrCode) {
			URL.revokeObjectURL(this.props.qrCode);
		}

		AppToast.success('2FA успешно подключена');
	};
	render() {
		return (
			<BaseModal
				closeOnOverlayClick={false}
				closeOnEsc={false}
				hasClose={false}
			>
				<Flex
					className={style.modalLogout}
					direction="column"
					justify="around"
					align="center"
				>
					<Flex className={style.modalHeader} align="center" direction="column">
						<Title className={style.modalTitle} level="5">
							Отсканируйте QR-код в приложении-аутентификаторе
						</Title>
						<Subhead
							className={style.subTitle}
							level="11"
							color={'light'}
							align="center"
						>
							Код потребуется Вам при всех дальнейших входах в аккаунт
						</Subhead>
					</Flex>
					<Flex
						className={style.modalActions}
						align="center"
						direction="column"
					>
						<img src={this.props.qrCode || ''} alt="QR Code for OTP" />
						<Button
							mode="primary"
							size="m"
							borderRadius="l"
							onClick={this.handleClose}
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
