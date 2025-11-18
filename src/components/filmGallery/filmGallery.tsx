import { getImageURL } from '@/helpers/getCDNImageHelper/getCDNImageHelper';
import type { ModelsFilmPage } from '@/types/models';
import { Flex } from '@/uikit/flex/flex';
import { Title } from '@/uikit/title/title';
import { Component } from '@robocotik/react';
import styles from './filmGallery.module.scss';

interface FilmGalleryProps {
	film: ModelsFilmPage | null;
}

export class FilmGallery extends Component<FilmGalleryProps> {
	render() {
		if (!this.props.film) {
			return <div></div>;
		}

		const image1 = getImageURL('posters/pic44.jpg');

		return (
			<Flex className={styles.content} direction="column">
				{image1 && (
					<Title className={styles.title} size="3xl" weight="bold" color="dark">
						Фотогалерея фильма
					</Title>
				)}
				{image1 && <img className={styles.image} src={image1} />}
				{image1 && <img className={styles.image} src={image1} />}
				{image1 && <img className={styles.image} src={image1} />}
			</Flex>
		);
	}
}
