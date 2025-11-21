import { Title } from '@/uikit/index';
import { Component } from '@robocotik/react';
import { withModal } from '../../modules/modals/withModal.tsx';
import type { WithModalProps } from '../../modules/modals/withModalProps.ts';
import type { BaseModalProps } from '../BaseModal/BaseModal';
import style from './testModal.module.scss';

export class TestModalComponent extends Component<
	WithModalProps & BaseModalProps
> {
	render() {
		return (
			<div className={style.modalLogout}>
				<div className={style.modalHeader}>
					<Title className={style.modalTitle} level="5" />
					<Title className={style.modalTitle} level="5" />
				</div>
				ЭТО ТЕСТ МОДАЛКА
			</div>
		);
	}
}

export const TestModal = withModal(TestModalComponent);
