import { Component } from '@robocotik/react';
import { LoginModal } from '../../components/LoginModal/LoginModal';
import { TestModal } from '../../components/testModal/testModal';
import { ModalRoot } from './modalRoot';
import { MODALS } from './modals';
import { ModalContext } from './modalsContext.ts';

export class ModalsProvider extends Component {
	state = {
		activeModal: null,
		activeModalProps: null,
	};

	open = (id: number, props: object) => {
		this.setState({ activeModal: id, activeModalProps: props });
	};
	hide = () => {
		this.setState({ activeModal: null, activeModalProps: null });
	};
	render() {
		return (
			<ModalContext.Provider
				value={{
					activeModal: this.state.activeModal,
					open: this.open,
					hide: this.hide,
					activeModalProps: this.state.activeModalProps,
				}}
			>
				{this.props.children}
				<ModalRoot>
					<LoginModal id={MODALS.LOGIN_MODAL} />
					<TestModal id={MODALS.TEST_MODAL} />
				</ModalRoot>
			</ModalContext.Provider>
		);
	}
}
