import { TECH_SUP_URL } from '@/consts/urls.ts';
import { Component, createPortal } from '@robocotik/react';
import { withModal } from '../../modules/modals/withModal.tsx';
import type { WithModalProps } from '../../modules/modals/withModalProps.ts';
import style from './techSupModal.module.scss';

export class TechSupModalComponent extends Component<WithModalProps, {}> {
	render() {
		return createPortal(
			<div
				className={style.modalWrapper}
				onClick={() => {
					this.props.modal.hide();
				}}
			>
				<div
					className={style.modalContent}
					onClick={(e) => e.stopPropagation()}
				>
					<iframe
						className={style.iframe}
						title="Tech Support"
						src={TECH_SUP_URL}
					></iframe>
				</div>
			</div>,
			document.body,
		);
	}
}

export const TechSupModal = withModal(TechSupModalComponent);
