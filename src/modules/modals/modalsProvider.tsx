import { Component } from '@robocotik/react';
import { ModalContext } from './modalsContext.ts';

export class ModalsProvider extends Component {
	state = {
		activeModal: null,
	};

	open = (id: number) => {
		this.setState({ activeModal: id });
	};
	hide = () => {
		this.setState({ activeModal: null });
	};
	render() {
		return (
			<ModalContext.Provider
				value={{
					activeModal: this.state.activeModal,
					open: this.open,
					hide: this.hide,
				}}
			>
				{this.props.children}
			</ModalContext.Provider>
		);
	}
}
