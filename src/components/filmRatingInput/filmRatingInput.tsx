import Star from '@/assets/img/Star.svg?react';
import { RATING_COUNT } from '@/consts/rating.ts';
import { getRatingType } from '@/helpers/ratingTypeHelper/ratingTypeHelper';
import clsx from '@/modules/clsx/index.ts';
import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import actions from '@/redux/features/film/actions';
import { selectUserRating } from '@/redux/features/film/selectors.ts';
import type { Map } from '@/types/map';
import { Title } from '@/uikit/title/title.tsx';
import { Component } from '@robocotik/react';
import type { WithRouterProps } from '../../modules/router/types/withRouterProps.ts';
import { withRouter } from '../../modules/router/withRouter.tsx';
import styles from './filmRatingInput.module.scss';

interface FilmRatingInputProps {
	userRating: number | null;
	createRating: (rating: number, id: string) => void;
	isDark: boolean;
}

class FilmRatingInputComponent extends Component<
	FilmRatingInputProps & WithRouterProps
> {
	leaveRating = (event: MouseEvent): void => {
		const target = event.currentTarget as HTMLElement | null;
		const number = target?.getAttribute('data');

		if (!number) {
			return;
		}

		const rating = parseInt(number, RATING_COUNT);
		this.props.createRating(rating, this.props.router.params.id);
	};

	render() {
		return (
			<div className={styles.ratingInput}>
				<div onClick={this.leaveRating} data={1} className={styles.starWrap}>
					<Star
						className={clsx({
							[styles.darkLeftStarIcon]: this.props.isDark,
							[styles.leftStarIcon]: !this.props.isDark,
						})}
					/>
				</div>
				{Array.from({ length: RATING_COUNT }, (_, i) => {
					const number = i + 1;
					return (
						<Title
							text={number}
							className={clsx(styles['ratingNumber-' + getRatingType(number)], {
								[styles[`cur-${getRatingType(number)}`]]:
									this.props.userRating === number,
								[styles.dark]: this.props.isDark,
							})}
							onClick={this.leaveRating}
							data={number}
							size="2xl"
						/>
					);
				})}
				<div
					onClick={this.leaveRating}
					data={RATING_COUNT}
					className={styles.starWrap}
				>
					<Star
						className={clsx({
							[styles.darkRightStarIcon]: this.props.isDark,
							[styles.rightStarIcon]: !this.props.isDark,
						})}
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	userRating: selectUserRating(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	createRating: (rating: number, id: string) =>
		dispatch(actions.createRatingAction(rating, id)),
});

export const FilmRatingInput = compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
)(FilmRatingInputComponent);
