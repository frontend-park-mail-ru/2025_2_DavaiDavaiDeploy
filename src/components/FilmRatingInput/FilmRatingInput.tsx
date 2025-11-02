import Star from '@/assets/img/Star.svg';
import { getRatingType } from '@/helpers/ratingTypeHelper/ratingTypeHelper';
import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import actions from '@/redux/features/film/actions';
import { selectUserRating } from '@/redux/features/film/selectors.ts';
import type { Map } from '@/types/map';
import { Component } from '@robocotik/react';
import type { WithRouterProps } from '../../modules/router/types/withRouterProps.ts';
import { withRouter } from '../../modules/router/withRouter.tsx';
import styles from './FilmRatingInput.module.scss';

interface FilmRatingInputProps {
	userRating: number | null;
	createRating: (rating: number, id: string) => void;
}

class FilmRatingInputComponent extends Component<
	FilmRatingInputProps & WithRouterProps
> {
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
		return (
			<div className={styles.ratingInput}>
				<img
					src={Star}
					className={styles.starIcon}
					onClick={this.leaveRating}
					data-number={1}
				/>
				{Array.from({ length: 10 }, (_, i) => {
					const number = i + 1;
					return (
						<p
							data-number={number}
							className={`${styles['ratingNumber-' + getRatingType(number)]} ${
								this.props.userRating === number
									? styles[`cur-${getRatingType(number)}`]
									: ''
							}`}
							onClick={this.leaveRating}
						>
							{number}
						</p>
					);
				})}
				<img
					src={Star}
					className={styles.starIcon}
					onClick={this.leaveRating}
					data-number={10}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	userRating: selectUserRating(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	createRating: (rating: number, id: string) =>
		dispatch(actions.leaveRatingAction(rating, id)),
});

export const FilmRatingInput = compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
)(FilmRatingInputComponent);
