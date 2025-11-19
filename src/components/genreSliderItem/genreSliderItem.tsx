import { Link } from '@/modules/router/link';
import type { ModelsGenre } from '@/types/models';
import { Image } from '@/uikit/index';
import { Component } from '@robocotik/react';
import styles from './genreSliderItem.module.scss';

interface GenreSliderItemProps {
	genre: ModelsGenre;
}

export class GenreSliderItem extends Component<GenreSliderItemProps> {
	render() {
		const { id, title, icon } = this.props.genre;
		return (
			<Link href={`/genres/${id}`}>
				<Image className={styles.image} alt={title} src={icon} />
			</Link>
		);
	}
}
