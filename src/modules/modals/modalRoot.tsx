import { Component } from '@/modules/react';
import { LoginModal } from '../../components/LoginModal/LoginModal.tsx';
import { TestModal } from '../../components/testModal/testModal.tsx';
import { MODALS } from './modals.ts';

type Props = {
	activeModal: number | null;
	activeModalProps: object | null;
};

export class ModalRoot extends Component<Props> {
	render() {
		console.log('ModalRoot.render', this.props);
		switch (this.props.activeModal) {
			case MODALS.LOGIN_MODAL:
				return <LoginModal {...this.props.activeModalProps} />;
			case MODALS.TEST_MODAL:
				return <TestModal {...this.props.activeModalProps} />;
			default:
				return <></>;
		}
	}
}
