import Close from '@/assets/close.svg?react';
import { withModal } from '@/modules/modals/withModal';
import type { WithModalProps } from '@/modules/modals/withModalProps';
import { Component, createPortal } from '@robocotik/react';
import clsx from 'ddd-clsx';
import { Flex } from 'ddd-ui-kit';
import style from './BaseModal.module.scss';

export interface BaseModalProps {
	id: number;
}

interface BaseModalCurrentProps {
	closeOnOverlayClick?: boolean;
	hasClose?: boolean;
	dismissButtonMode?: 'inside' | 'outside';
	closeClassName?: string;
	closeOnEsc?: boolean;
}

export class BaseModalComponent extends Component<
	WithModalProps & BaseModalCurrentProps
> {
	handleKeyDown = (event: KeyboardEvent) => {
		const { closeOnEsc = true } = this.props;

		if (closeOnEsc && event.key === 'Escape') {
			this.props.modal.hide();
		}
	};

	onMount() {
		document.addEventListener('keydown', this.handleKeyDown);
	}

	onUnmount() {
		document.removeEventListener('keydown', this.handleKeyDown);
	}

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
				<div className={style.wrapperChildren}>
					{hasClose && (
						<Close
							className={clsx(
								style.close,
								{
									[style.closeInner]: dismissButtonMode === 'inside',
									[style.closeOutside]: dismissButtonMode === 'outside',
								},
								this.props.closeClassName,
							)}
							onClick={this.props.modal.hide}
						/>
					)}
					<div
						className={style.modalContent}
						onClick={(e) => e.stopPropagation()}
					>
						{this.props.children}
					</div>
				</div>
			</Flex>,
			document.body,
		);
	}
}

export const BaseModal = withModal(BaseModalComponent);
