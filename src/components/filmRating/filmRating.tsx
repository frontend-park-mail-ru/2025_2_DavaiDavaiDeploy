import Star from '@/assets/img/Star.svg';
import { formatRatingNumber } from '@/helpers/formatRatingNumberHelper/formatRatingNumberHelper';
import { formatRating } from '@/helpers/ratingFormatHelper/ratingFormatHelper';
import { getRatingType } from '@/helpers/ratingTypeHelper/ratingTypeHelper';
import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import actions from '@/redux/features/film/actions';
import type { Map } from '@/types/map';
import type { ModelsFilmPage } from '@/types/models';
import { Component } from '@robocotik/react';
import type { WithRouterProps } from '../../modules/router/types/withRouterProps.ts';
import { withRouter } from '../../modules/router/withRouter.tsx';
import styles from './filmRating.module.scss';

interface FilmRatingProps {
	film: ModelsFilmPage;
	createRating: (rating: number, id: string) => void;
}

class FilmRatingComponent extends Component<FilmRatingProps & WithRouterProps> {
	leaveRating = (event: MouseEvent): void => {
		const target = event.currentTarget as HTMLElement | null;
		const number = target?.getAttribute('data-number');

		if (!number) {
			return;
		}

		const rating = parseInt(number, 10);
		this.props.createRating(rating, this.props.router.params.id);
	};

	render() {
		const { rating, number_of_ratings } = this.props.film;
		const formattedRating = formatRating(rating);
		const ratingNumber = formatRatingNumber(number_of_ratings);
		const ratingType = getRatingType(rating);

		return (
			<div className={styles.content}>
				<div className={styles.rating}>
					{formattedRating && (
						<h2 className={styles[`title-${ratingType}`]}>{formattedRating}</h2>
					)}
					{ratingNumber && <p className={styles.subtitle}>{ratingNumber}</p>}
					<button className={styles.rateBtn}>
						<img src={Star} className={styles.star} />
						<p className={styles.btnText}>Оценить фильм</p>
						<div className={styles.rateMenu}>
							<img src={Star} className={styles.starIcon} />
							{Array.from({ length: 10 }, (_, i) => {
								const number = i + 1;
								return (
									<p
										data-number={number}
										className={styles[`ratingNumber-${getRatingType(number)}`]}
										onClick={this.leaveRating}
									>
										{number}
									</p>
								);
							})}
							<img src={Star} className={styles.starIcon} />
						</div>
					</button>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	createRating: (rating: number, id: string) =>
		dispatch(actions.leaveRatingAction(rating, id)),
});

export const FilmRating = compose(
	withRouter,
	connect(undefined, mapDispatchToProps),
)(FilmRatingComponent);
