import { Component } from '@/modules/react';
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
			</ModalContext.Provider>
		);
	}
}
