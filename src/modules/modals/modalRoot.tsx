import { Component } from '@robocotik/react';
import { LoginModal } from '../../components/LoginModal/LoginModal.tsx';
import { TestModal } from '../../components/testModal/testModal.tsx';
import { MODALS } from './modals.ts';
import { ModalContext, type ModalContextValue } from './modalsContext.ts';

export class ModalRoot extends Component<{}, {}, ModalContextValue> {
	static readonly contextType = ModalContext;
	render() {
		switch (this.context.activeModal) {
			case MODALS.LOGIN_MODAL:
				return <LoginModal {...this.context.activeModalProps} />;
			case MODALS.TEST_MODAL:
				return <TestModal {...this.context.activeModalProps} />;
			default:
				return <></>;
		}
	}
}
