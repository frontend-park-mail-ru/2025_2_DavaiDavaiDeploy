import { Component } from '@robocotik/react';
import { LoginModal } from '../../components/LoginModal/LoginModal.tsx';
import { TestModal } from '../../components/testModal/testModal.tsx';
import { MODALS } from './modals.ts';
import { withModal } from './withModal.tsx';
import type { WithModalProps } from './withModalProps.ts';

class ModalRootComponent extends Component<WithModalProps> {
	render() {
		switch (this.props.modal.activeModal) {
			case MODALS.LOGIN_MODAL:
				return <LoginModal />;
			case MODALS.TEST_MODAL:
				return <TestModal />;
			default:
				return <></>;
		}
	}
}

export const ModalRoot = withModal(ModalRootComponent);
