import Star from '@/assets/img/Star.svg';
import { formatRatingNumber } from '@/helpers/formatRatingNumberHelper/formatRatingNumberHelper';
import { formatRating } from '@/helpers/ratingFormatHelper/ratingFormatHelper';
import { getRatingType } from '@/helpers/ratingTypeHelper/ratingTypeHelper';
import { compose, connect } from '@/modules/redux';
import type { State } from '@/modules/redux/types/store.ts';
import { Link } from '@/modules/router/link.tsx';
import { selectUserRating } from '@/redux/features/film/selectors.ts';
import { selectUser } from '@/redux/features/user/selectors.ts';
import type { Map } from '@/types/map';
import type { ModelsFilmPage, ModelsUser } from '@/types/models';
import { Component } from '@robocotik/react';
import type { WithRouterProps } from '../../modules/router/types/withRouterProps.ts';
import { withRouter } from '../../modules/router/withRouter.tsx';
import { FilmRatingInput } from '../FilmRatingInput/FilmRatingInput.tsx';
import styles from './filmRating.module.scss';

interface FilmRatingProps {
	film: ModelsFilmPage;
	userRating: number | null;
	user: ModelsUser | null;
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

		const buttonContent = (
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
				{this.props.user && this.props.userRating && (
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

				{this.props.user && (
					<div
						className={`${styles.rateMenu} ${this.state.isMenuActive ? styles.active : ''}`}
						onClick={this.handleRatingLeave}
					>
						<FilmRatingInput isDark={false} />
					</div>
				)}
			</button>
		);

		return (
			<div className={styles.content}>
				<div className={styles.rating}>
					{formattedRating && (
						<h2 className={styles[`title-${ratingType}`]}>{formattedRating}</h2>
					)}
					{ratingNumber && <p className={styles.subtitle}>{ratingNumber}</p>}
					{!this.props.user ? (
						<Link href="/login">{buttonContent}</Link>
					) : (
						buttonContent
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	userRating: selectUserRating(state),
	user: selectUser(state),
});

export const FilmRating = compose(
	withRouter,
	connect(mapStateToProps),
)(FilmRatingComponent);
