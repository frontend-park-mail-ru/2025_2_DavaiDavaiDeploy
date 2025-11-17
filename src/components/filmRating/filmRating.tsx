import Star from '@/assets/img/Star.svg?react';
import { formatRatingNumber } from '@/helpers/formatRatingNumberHelper/formatRatingNumberHelper';
import { formatRating } from '@/helpers/ratingFormatHelper/ratingFormatHelper';
import { getRatingType } from '@/helpers/ratingTypeHelper/ratingTypeHelper';
import clsx from '@/modules/clsx/index.ts';
import { compose, connect } from '@/modules/redux';
import type { State } from '@/modules/redux/types/store.ts';
import { Link } from '@/modules/router/link.tsx';
import { selectUserRating } from '@/redux/features/film/selectors.ts';
import { selectIsAuthentificated } from '@/redux/features/user/selectors.ts';
import type { Map } from '@/types/map';
import type { ModelsFilmPage } from '@/types/models';
import { Title } from '@/uikit/title/title.tsx';
import { Component } from '@robocotik/react';
import type { WithRouterProps } from '../../modules/router/types/withRouterProps.ts';
import { withRouter } from '../../modules/router/withRouter.tsx';
import { FilmRatingInput } from '../filmRatingInput/filmRatingInput.tsx';
import styles from './filmRating.module.scss';

interface FilmRatingProps {
	film: ModelsFilmPage;
	userRating: number | null;
	isAuthentificated: boolean;
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

	renderButtonContent = () => {
		const userRatingType = getRatingType(this.props.userRating);

		return (
			<div>
				<button
					className={styles.rateBtn}
					onMouseLeave={this.handleMouseLeave}
					onMouseEnter={this.handleMouseEnter}
					onClick={this.handleMouseEnter}
				>
					{!this.props.userRating && (
						<p className={styles.btnText}>Оценить фильм</p>
					)}
					{this.props.isAuthentificated && this.props.userRating && (
						<span className={styles.userRating}>
							<p className={styles.btnText}>Изменить</p>
							<div className={styles[`rating-${userRatingType}`]}>
								<Star className={styles.userStarIcon} />
								<h3 className={styles.userRatingTitle}>
									{this.props.userRating}
								</h3>
							</div>
						</span>
					)}

					{this.props.isAuthentificated && (
						<div
							className={clsx(styles.rateMenu, {
								[styles.active]: this.state.isMenuActive,
							})}
							onClick={this.handleRatingLeave}
						>
							<FilmRatingInput isDark={false} />
						</div>
					)}
				</button>

				{this.props.isAuthentificated && (
					<button className={styles.smallRateBtn}>
						{this.props.isAuthentificated && <FilmRatingInput isDark={false} />}
					</button>
				)}
			</div>
		);
	};

	renderButton = () => {
		if (!this.props.isAuthentificated) {
			return <Link href="/login">{this.renderButtonContent()}</Link>;
		}

		return this.renderButtonContent();
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
						<Title
							className={styles[`title-${ratingType}`]}
							text={formattedRating}
							size="5xl"
						/>
					)}
					{ratingNumber && <p className={styles.subtitle}>{ratingNumber}</p>}
					{this.renderButton()}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	userRating: selectUserRating(state),
	isAuthentificated: selectIsAuthentificated(state),
});

export const FilmRating = compose(
	withRouter,
	connect(mapStateToProps),
)(FilmRatingComponent);
