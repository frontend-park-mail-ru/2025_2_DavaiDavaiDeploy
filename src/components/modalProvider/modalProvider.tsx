import { Component, createContext } from '@robocotik/react';

export interface ModalContextValue {
	handleCloseModal: VoidFunction;
	handleOpenModal: VoidFunction;
	toggleVisibility: VoidFunction;
	showModal: boolean;
}

interface ModalProviderState {
	showModal: boolean;
}

export const ModalContext = createContext<ModalContextValue>({
	handleCloseModal: () => {},
	handleOpenModal: () => {},
	toggleVisibility: () => {},
	showModal: false,
});

export class ModalProvider extends Component<
	{},
	ModalProviderState,
	ModalContextValue
> {
	state = {
		showModal: false,
	};

	handleOpenModal = () => {
		this.setState({ showModal: true });
	};

	handleCloseModal = () => {
		this.setState({ showModal: false });
	};

	toggleVisibility = () => {
		this.setState({ showModal: !this.state.showModal });
	};

	render() {
		return (
			<ModalContext.Provider
				value={{
					handleCloseModal: this.handleCloseModal,
					handleOpenModal: this.handleOpenModal,
					toggleVisibility: this.toggleVisibility,
					showModal: this.state.showModal,
				}}
			>
				{this.props.children}
			</ModalContext.Provider>
		);
	}
}
