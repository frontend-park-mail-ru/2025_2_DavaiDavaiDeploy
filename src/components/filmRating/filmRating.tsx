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
import { Button, Flex, Paragraph, Subhead, Title } from '@/uikit/index';
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
			<div className={styles.wrapper}>
				<Button
					className={styles.rateBtn}
					onMouseLeave={this.handleMouseLeave}
					onMouseEnter={this.handleMouseEnter}
					onClick={this.handleMouseEnter}
					mode="quaternary"
					borderRadius="l"
				>
					{!this.props.userRating && (
						<Paragraph className={styles.btnText} level="8" align="center">
							Оценить фильм
						</Paragraph>
					)}
					{this.props.isAuthentificated && this.props.userRating && (
						<Flex
							className={styles.userRating}
							direction="row"
							justify="between"
							align="center"
						>
							<Paragraph className={styles.btnText} level="8">
								Изменить
							</Paragraph>

							<Flex
								direction="row"
								className={styles[`rating-${userRatingType}`]}
								align="center"
							>
								<Star className={styles.userStarIcon} />
								<Paragraph className={styles.userRatingTitle} level="8">
									{this.props.userRating.toString()}
								</Paragraph>
							</Flex>
						</Flex>
					)}

					{this.props.isAuthentificated && (
						<Flex
							direction="row"
							align="center"
							className={clsx(styles.rateMenu, {
								[styles.active]: this.state.isMenuActive,
							})}
							onClick={this.handleRatingLeave}
						>
							<FilmRatingInput isDark={false} />
						</Flex>
					)}
				</Button>

				{this.props.isAuthentificated && (
					<Button mode="tertiary" className={styles.smallRateBtn}>
						<FilmRatingInput isDark={false} />
					</Button>
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
			<Flex className={styles.content} direction="row">
				<Flex
					className={styles.rating}
					direction="column"
					align="center"
					justify="center"
				>
					{formattedRating && (
						<Title className={styles[`title-${ratingType}`]} level="2">
							{formattedRating}
						</Title>
					)}
					{ratingNumber && (
						<Subhead
							className={styles.subtitle}
							level="10"
							color="light"
							opacity="60"
						>
							{ratingNumber}
						</Subhead>
					)}

					{this.renderButton()}
				</Flex>
			</Flex>
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
