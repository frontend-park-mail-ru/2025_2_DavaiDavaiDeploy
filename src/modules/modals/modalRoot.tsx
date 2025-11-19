import { Component } from '@/modules/react';
import { LoginModal } from '../../components/LoginModal/LoginModal.tsx';
import { TestModal } from '../../components/testModal/testModal.tsx';
import { MODALS } from './modals.ts';
import { withModal } from './withModal';
import type { WithModalProps } from './withModalProps';

class ModalRootComponent extends Component<WithModalProps> {
	render() {
		switch (this.props.modal.activeModal) {
			case MODALS.LOGIN_MODAL:
				return <LoginModal {...this.props.modal.activeModalProps} />;
			case MODALS.TEST_MODAL:
				return <TestModal {...this.props.modal.activeModalProps} />;
			default:
				return <></>;
		}
	}
}

export const ModalRoot = withModal(ModalRootComponent);
