import Close from '@/assets/close.svg?react';
import { Button, Flex, Headline, Title } from '@/uikit/index';
import { Component } from '@robocotik/react';
import { withModal } from '../../modules/modals/withModal';
import type { WithModalProps } from '../../modules/modals/withModalProps';
import { BaseModal, type BaseModalProps } from '../BaseModal/BaseModal';
import style from './favoritesModal.module.scss';

export interface FavoritesModalProps {
	onDelete: VoidFunction;
}

export class FavoritesModalComponent extends Component<
	BaseModalProps & FavoritesModalProps & WithModalProps
> {
	handleDelete = () => {
		this.props.onDelete();
		this.props.modal.hide();
	};

	render() {
		return (
			<BaseModal>
				<Flex
					className={style.modalFav}
					direction="column"
					justify="between"
					align="center"
				>
					<div className={style.closeButton} onClick={this.props.modal.hide}>
						<Close />
					</div>
					<Flex className={style.modalHeader} align="center" direction="column">
						<Title className={style.modalTitle} level="5" align="center">
							Удалить фильм из избранного?
						</Title>
						<Headline
							className={style.modalTitle}
							level="8"
							color="light"
							align="center"
						>
							При желании вы легко сможете добавить его снова
						</Headline>
					</Flex>
					<Flex
						className={style.modalActions}
						align="center"
						direction="column"
					>
						<Button
							mode="primary"
							size="m"
							borderRadius="l"
							onClick={this.handleDelete}
							className={style.turnBackButton}
						>
							Удалить
						</Button>
						<Button
							mode="secondary"
							size="m"
							onClick={this.props.modal.hide}
							className={style.exitButton}
						>
							Отмена
						</Button>
					</Flex>
				</Flex>
			</BaseModal>
		);
	}
}

export const FavoritesModal = withModal(FavoritesModalComponent);
