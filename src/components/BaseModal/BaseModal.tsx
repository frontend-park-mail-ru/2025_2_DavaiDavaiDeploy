import { withModal } from '@/modules/modals/withModal';
import type { WithModalProps } from '@/modules/modals/withModalProps';
import { Flex } from '@/uikit/index';
import { Component, createPortal } from '@robocotik/react';
import clsx from '../../modules/clsx';
import style from './BaseModal.module.scss';

export interface BaseModalProps {
	id: number;
}

interface BaseModalCurrentProps {
	closeOnOverlayClick?: boolean;
}

export class BaseModalComponent extends Component<
	WithModalProps & BaseModalCurrentProps
> {
	render() {
		const { closeOnOverlayClick = true } = this.props;
		return createPortal(
			<Flex
				className={clsx(style.modalWrapper, {
					[style.closing]: this.props.modal.isClosing,
				})}
				onClick={closeOnOverlayClick ? this.props.modal.hide : undefined}
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
