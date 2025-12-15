import Play from '@/assets/play.svg?react';
import { getImageURL } from '@/helpers/getCDNImageHelper/getCDNImageHelper';
import { Component } from '@robocotik/react';
import clsx from 'ddd-clsx';
import { Image } from 'ddd-ui-kit';
import { MODALS } from '../../modules/modals/modals';
import { withModal } from '../../modules/modals/withModal';
import type { WithModalProps } from '../../modules/modals/withModalProps';
import styles from './Trailer.module.scss';

interface TrailerComponentProps {
	className?: string;
	src?: string;
	videoSrc: string;
}

export class TrailerComponent extends Component<
	WithModalProps & TrailerComponentProps
> {
	handleTrailerClick = () => {
		this.props.modal.open(MODALS.TRAILER_MODAL, {
			videoSrc: getImageURL(this.props.videoSrc),
		});
	};

	render() {
		const { src, className, ...props } = this.props;

		return (
			<div className={styles.previewContainer}>
				<Image
					src={getImageURL(src ?? '')}
					onClick={this.handleTrailerClick}
					alt="Film Preview"
					className={clsx(styles.trailerPreview, className)}
					{...props}
				/>
				<div className={styles.play}>
					<Play className={styles.playIcon} />
				</div>
				<div className={styles.subText}>
					<p>Трейлер</p>
				</div>
			</div>
		);
	}
}

export const Trailer = withModal(TrailerComponent);
