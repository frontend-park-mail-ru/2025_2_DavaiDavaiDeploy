import { TechSupModal } from '@/components/techSupModal/techSupModal.tsx';
import { Component } from '@robocotik/react';
import { LoginModal } from '../../components/LoginModal/LoginModal.tsx';
import { TestModal } from '../../components/testModal/testModal.tsx';
import { MODALS } from './modals.ts';
import { ModalContext, type ModalContextValue } from './modalsContext.ts';

export class ModalRoot extends Component<{}, {}, ModalContextValue> {
	static readonly contextType = ModalContext;
	render() {
		if (this.context.activeModal && document.querySelector('html') !== null) {
			document.querySelector('html').style.overflow = 'hidden';
		} else {
			document.querySelector('html').style.overflow = 'visible';
		}

		switch (this.context.activeModal) {
			case MODALS.LOGIN_MODAL:
				return <LoginModal />;
			case MODALS.TEST_MODAL:
				return <TestModal />;
			case MODALS.TECH_SUP_MODAL:
				return <TechSupModal />;
			default:
				return <></>;
		}
	}
}
