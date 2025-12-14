import { Component } from '@robocotik/react';
import { Flex } from 'ddd-ui-kit';
import { withModal } from '../../modules/modals/withModal';
import type { WithModalProps } from '../../modules/modals/withModalProps';
import { BaseModal, type BaseModalProps } from '../BaseModal/BaseModal';
import style from './TrailerModal.module.scss';

export interface TrailerModalProps {
	videoSrc: string;
}

export class TrailerModalComponent extends Component<
	BaseModalProps & WithModalProps & TrailerModalProps
> {
	render() {
		return (
			<BaseModal dismissButtonMode="outside">
				<Flex
					className={style.modalTrailer}
					direction="column"
					justify="center"
					align="center"
				>
					<video
						autoplay
						preload:auto
						controls
						className={style.trailer}
						src={this.props.videoSrc}
					/>
				</Flex>
			</BaseModal>
		);
	}
}

export const TrailerModal = withModal(TrailerModalComponent);
