import { withModal } from '@/modules/modals/withModal';
import type { WithModalProps } from '@/modules/modals/withModalProps';
import { Flex } from '@/uikit/index';
import { Component, createPortal } from '@robocotik/react';
import clsx from '../../modules/clsx';
import style from './BaseModal.module.scss';

export interface BaseModalProps {
	id: number;
}

export class BaseModalComponent extends Component<WithModalProps> {
	render() {
		return createPortal(
			<Flex
				className={clsx(style.modalWrapper, {
					[style.closing]: this.props.modal.isClosing,
				})}
				onClick={this.props.modal.hide}
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
