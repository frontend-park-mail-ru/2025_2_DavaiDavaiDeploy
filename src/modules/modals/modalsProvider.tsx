import { Component } from '@/modules/react';
import {
	LoginModal,
	type LoginModalProps,
} from '../../components/LoginModal/LoginModal';
import {
	OTPModal,
	type OTPModalProps,
} from '../../components/OTPModal/OTPModal';
import { TestModal } from '../../components/testModal/testModal';
import { ModalRoot } from './modalRoot';
import { MODALS } from './modals';
import { ModalContext } from './modalsContext.ts';

const CLOSE_DURATION = 300;

export class ModalsProvider extends Component {
	state = {
		activeModal: null,
		activeModalProps: null,
		isClosing: false,
	};

	open = (id: number, props: object) => {
		this.setState({ activeModal: id, activeModalProps: props });
	};
	hide = () => {
		this.setState({ isClosing: true });

		setTimeout(() => {
			this.setState({
				activeModal: null,
				activeModalProps: null,
				isClosing: false,
			});
		}, CLOSE_DURATION);
	};

	render() {
		return (
			<ModalContext.Provider
				value={{
					activeModal: this.state.activeModal,
					open: this.open,
					hide: this.hide,
					activeModalProps: this.state.activeModalProps,
					isClosing: this.state.isClosing,
				}}
			>
				{this.props.children}
				<ModalRoot>
					<LoginModal
						id={MODALS.LOGIN_MODAL}
						{...((this.state.activeModalProps || {}) as LoginModalProps)}
					/>
					<TestModal
						id={MODALS.TEST_MODAL}
						{...(this.state.activeModalProps || {})}
					/>
					<OTPModal
						id={MODALS.OTP_MODAL}
						{...((this.state.activeModalProps || {}) as OTPModalProps)}
					/>
				</ModalRoot>
			</ModalContext.Provider>
		);
	}
}
