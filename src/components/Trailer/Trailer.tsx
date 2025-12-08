import Play from '@/assets/play.svg?react';
import { Image } from '@/uikit';
import { Component } from '@robocotik/react';
import clsx from '../../modules/clsx';
import { MODALS } from '../../modules/modals/modals';
import { withModal } from '../../modules/modals/withModal';
import type { WithModalProps } from '../../modules/modals/withModalProps';
import styles from './Trailer.module.scss';
interface TrailerComponentProps {
	className?: string;
	src?: string;
}

export class TrailerComponent extends Component<
	WithModalProps & TrailerComponentProps
> {
	handleTrailerClick = () => {
		this.props.modal.open(MODALS.TRAILER_MODAL, {
			videoSrc:
				'https://strm.yandex.ru/vh-kp-converted/vod-content/466bbc2d5c93cfb7a330ba5e4ba2a8ca/16093197x1742379548xe51ec9d4-97da-4777-8b4d-1d7a5c405409/hls-v3/ysign1=4d48b6fb0687275998aa4e47cccc0ada8a5999e04ceb8a7ce12092ec3a9a464f,abcID=1358,pfx,sfx,ts=693916d9/video_sdr_avc_576p_2300_audio_eng_aac_2_192.m3u8?packager=1&source_index=0&vpuid=g4ae0xaiqb&chunks=1&vsid=8a210edc776da1f674b7c12be48aa90b0168e7e65880xWEBx3443x1765122476&t=1765122476723',
		});
	};

	render() {
		const { src, className, ...props } = this.props;
		return (
			<div className={styles.previewContainer}>
				<Image
					src={src ?? ''}
					onClick={this.handleTrailerClick}
					alt="Film Preview"
					className={clsx(styles.trailerPreview, className)}
					{...props}
				/>
				<div className={styles.play}>
					<Play />
				</div>
				<div className={styles.subText}>
					<p>Трейлер</p>
				</div>
			</div>
		);
	}
}

export const Trailer = withModal(TrailerComponent);
