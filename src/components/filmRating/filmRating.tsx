import { Component } from '@robocotik/react';
import styles from './filmRating.module.scss';
import Star from '@/assets/img/Star.svg';
import { formatRatingNumber } from '@/helpers/formatRatingNumberHelper/formatRatingNumberHelper';
import { formatRating } from '@/helpers/ratingFormatHelper/ratingFormatHelper';
import { getRatingType } from '@/helpers/ratingTypeHelper/ratingTypeHelper';
import type { ModelsFilmPage } from '@/types/models';

interface FilmRatingProps {
	film: ModelsFilmPage;
}

export class FilmRating extends Component<FilmRatingProps> {
	render() {
		const { rating, number_of_ratings } = this.props.film;
		const formattedRating = formatRating(rating);
		const ratingNumber = formatRatingNumber(number_of_ratings);
		const ratingType = getRatingType(rating);

		return (
			<div className={styles.content}>
				<div className={styles.rating}>
					<h2 className={styles[`title-${ratingType}`]}>{formattedRating}</h2>
					<p className={styles.subtitle}>{ratingNumber}</p>
					<button className={styles.rateBtn}>
						<p className={styles.btnText}>Оценить фильм</p>
						<div className={styles.rateMenu}>
							<img src={Star} className={styles.starIcon} />
							{Array.from({ length: 10 }, (_, i) => {
								const number = i + 1;
								return (
									<p
										key={number}
										data-number={number}
										className={styles[`ratingNumber-${getRatingType(number)}`]}
									>
										{number}
									</p>
								);
							})}
							<img src={Star} className={styles.starIcon} />
						</div>
					</button>
				</div>

				<div className={styles.smallRating}>
					<button className={styles.rateBtn}>
						<img src={Star} className={styles.starIcon} />
						<p className={styles.btnText}>Оценить</p>
					</button>
				</div>
			</div>
		);
	}
}
