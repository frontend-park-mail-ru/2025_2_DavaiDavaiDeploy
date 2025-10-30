import { getImageSRC } from '@/helpers/getCDNImageHelper/getCDNImageHelper';
import type { ModelsFilmPage } from '@/types/models';
import { Component } from '@robocotik/react';
import styles from './filmGallery.module.scss';

interface FilmGalleryProps {
	film: ModelsFilmPage | null;
}

export class FilmGallery extends Component<FilmGalleryProps> {
	render() {
		if (!this.props.film) {
			return <div>Loading...</div>;
		}

		const image1 = getImageSRC(
			'topFilms',
			'3f4a5b6c-7d8e-9f0a-1b2c-3d4e5f6a7b8c',
			'jpg',
		);

		return (
			<div className={styles.content}>
				{image1 && <h1 className={styles.title}>Фотогалерея фильма</h1>}
				{image1 && <img className={styles.image} src={image1} />}
				{image1 && <img className={styles.image} src={image1} />}
				{image1 && <img className={styles.image} src={image1} />}
			</div>
		);
	}
}
