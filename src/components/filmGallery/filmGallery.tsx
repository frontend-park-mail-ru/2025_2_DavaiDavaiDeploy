import { Component } from '@react';
import styles from './filmGallery.module.scss';
import type { ModelsFilmPage } from '@/types/models';

interface FilmGalleryProps {
	film: ModelsFilmPage;
}

export class FilmGallery extends Component<FilmGalleryProps> {
	render() {
		if (Object.keys(this.props.film).length === 0) {
			return <div>Loading...</div>;
		}

		const { image1, image2, image3 } = this.props.film;

		return (
			<div className={styles.content}>
				{(image1 || image2 || image3) && (
					<h1 className={styles.title}>Фотогалерея фильма</h1>
				)}
				{image1 && <img className={styles.image} src={image1} />}
				{image2 && <img className={styles.image} src={image1} />}
				{image3 && <img className={styles.image} src={image1} />}
			</div>
		);
	}
}
