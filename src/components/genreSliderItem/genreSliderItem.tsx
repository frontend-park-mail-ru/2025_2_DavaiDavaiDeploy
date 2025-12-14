import { getImageURL } from '@/helpers/getCDNImageHelper/getCDNImageHelper';
import { Link } from '@/modules/router/link';
import type { ModelsGenre } from '@/types/models';
import { Component } from '@robocotik/react';
import { Image } from 'ddd-ui-kit';
import styles from './genreSliderItem.module.scss';

interface GenreSliderItemProps {
	genre: ModelsGenre;
}

export class GenreSliderItem extends Component<GenreSliderItemProps> {
	render() {
		const { id, title, icon } = this.props.genre;
		return (
			<Link href={`/genres/${id}`}>
				<Image className={styles.image} alt={title} src={getImageURL(icon)} />
			</Link>
		);
	}
}
