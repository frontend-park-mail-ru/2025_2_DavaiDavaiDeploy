import { getImageSRC } from '@/helpers/getCDNImageHelper/getCDNImageHelper';
import { Link } from '@/modules/router/link';
import type { ModelsGenre } from '@/types/models';
import { Component } from '@react';
import styles from './genreSliderItem.module.scss';

interface GenreSliderItemProps {
	genre: ModelsGenre;
}

export class GenreSliderItem extends Component<GenreSliderItemProps> {
	render() {
		const { id, title } = this.props.genre;
		const imageSrc = getImageSRC('genres', id, 'svg');
		return (
			<Link href={`/genre/${id}`}>
				<img className={styles.image} alt={title} src={imageSrc} />{' '}
			</Link>
		);
	}
}
