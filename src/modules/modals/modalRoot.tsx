import { Component } from '@/modules/react';
import { withModal } from './withModal';
import type { WithModalProps } from './withModalProps';

class ModalRootComponent extends Component<WithModalProps> {
	render() {
		if (!this.props.modal.activeModal || !this.props.children) {
			return <></>;
		}

		if (
			this.props.children instanceof Function ||
			typeof this.props.children === 'string'
		) {
			return <></>;
		}

		if (!Array.isArray(this.props.children)) {
			return this.props.children;
		}

		const activeModalComponent = this.props.children.find((child) => {
			return child.props?.id === this.props.modal.activeModal;
		});

		if (activeModalComponent) {
			return {
				...activeModalComponent,
				props: {
					...activeModalComponent.props,
					...this.props.modal.activeModalProps,
				},
			};
		}

		return <></>;
	}
}

export const ModalRoot = withModal(ModalRootComponent);
