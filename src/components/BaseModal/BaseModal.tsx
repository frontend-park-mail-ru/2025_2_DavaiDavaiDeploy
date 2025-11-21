import { withModal } from '@/modules/modals/withModal';
import type { WithModalProps } from '@/modules/modals/withModalProps';
import { Flex } from '@/uikit/index';
import { Component, createPortal } from '@robocotik/react';
import clsx from '../../modules/clsx';
import style from './BaseModal.module.scss';

export interface BaseModalProps {
	id: number;
}

interface BaseModalState {
	isClosing: boolean;
}

export class BaseModalComponent extends Component<
	WithModalProps,
	BaseModalState
> {
	state = {
		isClosing: false,
	};

	handleHide = () => {
		this.setState({ isClosing: true });

		setTimeout(() => {
			this.props.modal.hide();
			this.setState({ isClosing: false });
		}, 300);
	};

	render() {
		const { isClosing } = this.state;

		return createPortal(
			<Flex
				className={clsx({ [style.closing]: isClosing }, style.modalWrapper)}
				onClick={this.handleHide}
				align="center"
				justify="center"
			>
				<div
					className={style.modalContent}
					onClick={(e) => e.stopPropagation()}
				>
					{this.props.children}
				</div>
			</Flex>,
			document.body,
		);
	}
}

export const BaseModal = withModal(BaseModalComponent);
