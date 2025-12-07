import Close from '@/assets/close.svg?react';
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
	hasClose?: boolean;
	dismissButtonMode?: 'inside' | 'outside';
	closeClassName?: string;
}

export class BaseModalComponent extends Component<
	WithModalProps & BaseModalCurrentProps
> {
	render() {
		const {
			closeOnOverlayClick = true,
			hasClose = true,
			dismissButtonMode = 'inside',
		} = this.props;

		return createPortal(
			<Flex
				className={clsx(style.modalWrapper, {
					[style.closing]: this.props.modal.isClosing,
				})}
				onClick={closeOnOverlayClick ? this.props.modal.hide : undefined}
				align="center"
				justify="center"
			>
				{hasClose && dismissButtonMode === 'outside' && (
					<Close
						className={clsx(style.close, this.props.closeClassName)}
						onClick={this.props.modal.hide}
					/>
				)}
				<div
					className={style.modalContent}
					onClick={(e) => e.stopPropagation()}
				>
					{hasClose && dismissButtonMode === 'inside' && (
						<Close
							className={clsx(style.close, this.props.closeClassName)}
							onClick={this.props.modal.hide}
						/>
					)}
					{this.props.children}
				</div>
			</Flex>,
			document.body,
		);
	}
}

export const BaseModal = withModal(BaseModalComponent);
