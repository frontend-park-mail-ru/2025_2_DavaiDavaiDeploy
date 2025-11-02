import Star from '@/assets/img/Star.svg';
import { formatRatingNumber } from '@/helpers/formatRatingNumberHelper/formatRatingNumberHelper';
import { formatRating } from '@/helpers/ratingFormatHelper/ratingFormatHelper';
import { getRatingType } from '@/helpers/ratingTypeHelper/ratingTypeHelper';
import { compose, connect } from '@/modules/redux';
import type { State } from '@/modules/redux/types/store.ts';
import { selectUserRating } from '@/redux/features/film/selectors.ts';
import type { Map } from '@/types/map';
import type { ModelsFilmPage } from '@/types/models';
import { Component } from '@robocotik/react';
import type { WithRouterProps } from '../../modules/router/types/withRouterProps.ts';
import { withRouter } from '../../modules/router/withRouter.tsx';
import { FilmRatingInput } from '../FilmRatingInput/FilmRatingInput.tsx';
import styles from './filmRating.module.scss';

interface FilmRatingProps {
	film: ModelsFilmPage;
	userRating: number | null;
}

interface FilmRatingState {
	isMenuActive: boolean;
}

class FilmRatingComponent extends Component<
	FilmRatingProps & WithRouterProps,
	FilmRatingState
> {
	state: FilmRatingState = {
		isMenuActive: false,
	};

	handleRatingLeave = (event: MouseEvent): void => {
		event.stopPropagation();
		this.setState({ isMenuActive: false });
	};

	handleMouseLeave = () => {
		this.setState({ isMenuActive: false });
	};

	handleMouseEnter = () => {
		this.setState({ isMenuActive: true });
	};

	render() {
		const { rating, number_of_ratings } = this.props.film;
		const formattedRating = formatRating(rating);
		const ratingNumber = formatRatingNumber(number_of_ratings);
		const ratingType = getRatingType(rating);
		const userRatingType = getRatingType(this.props.userRating);

		return (
			<div className={styles.content}>
				<div className={styles.rating}>
					{formattedRating && (
						<h2 className={styles[`title-${ratingType}`]}>{formattedRating}</h2>
					)}
					{ratingNumber && <p className={styles.subtitle}>{ratingNumber}</p>}
					<button
						className={styles.rateBtn}
						onMouseLeave={this.handleMouseLeave}
						onMouseEnter={this.handleMouseEnter}
						onClick={this.handleMouseEnter}
					>
						<img src={Star} className={styles.star} />
						{!this.props.userRating && (
							<p className={styles.btnText}>Оценить фильм</p>
						)}
						{this.props.userRating && (
							<span className={styles.userRating}>
								<p className={styles.btnText}>Изменить</p>
								<div className={styles[`rating-${userRatingType}`]}>
									<img src={Star} className={styles.userStarIcon} />
									<h3 className={styles.userRatingTitle}>
										{this.props.userRating}
									</h3>
								</div>
							</span>
						)}
						<div
							className={`${styles.rateMenu} ${this.state.isMenuActive ? styles.active : ''}`}
							onClick={this.handleRatingLeave}
						>
							<FilmRatingInput userRating={this.props.userRating} />
						</div>
					</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	userRating: selectUserRating(state),
});

export const FilmRating = compose(
	withRouter,
	connect(mapStateToProps),
)(FilmRatingComponent);
