import { Component } from '@robocotik/react';
import { GenreSliderItem } from '../genreSliderItem/genreSliderItem';
import styles from './genreSlider.module.scss';
import ArrowLeft from '@/assets/img/arrowLeft.svg';
import ArrowRight from '@/assets/img/arrowRight.svg';
import { connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import actions from '@/redux/features/genre/actions';
import { selectGenres } from '@/redux/features/genre/selectors';
import type { Map } from '@/types/map';
import type { ModelsGenre } from '@/types/models';

interface GenreSliderProps {
	genres: ModelsGenre[];
	getGenres: VoidFunction;
}

interface GenreSliderState {
	curGenre: number;
	prevGenre: number;
	isAnimating: boolean;
	slideCapacity: number;
	autoSlider: any;
	inactivityTimer: any;
}

class GenreSliderComponent extends Component<
	GenreSliderProps,
	GenreSliderState
> {
	state: GenreSliderState = {
		curGenre: 0,
		prevGenre: 0,
		isAnimating: false,
		slideCapacity: 8,
		autoSlider: null,
		inactivityTimer: null,
	};

	onMount(): void {
		this.props.getGenres();
	}

	onNextBthClick = () => {
		const genresCount = this.props.genres.length;
		this.setState({
			prevGenre: this.state.curGenre,
			curGenre: (this.state.curGenre + this.state.slideCapacity) % genresCount,
		});
	};

	onPrevBthClick = () => {
		const genresCount = this.props.genres.length;
		this.setState({
			prevGenre: this.state.curGenre,
			curGenre:
				this.state.curGenre - this.state.slideCapacity < 0
					? this.state.curGenre - this.state.slideCapacity + genresCount
					: this.state.curGenre - this.state.slideCapacity,
		});
	};

	getVisibleGenres() {
		const genresCount = this.props.genres.length;
		return Array.from({ length: this.state.slideCapacity }, (_, i) => {
			const idx = (this.state.curGenre + i) % genresCount;
			return this.props.genres[idx];
		});
	}

	render() {
		if (this.props.genres.length === 0) {
			return <div>Loading...</div>;
		}

		return (
			<section className={styles.genreSlider}>
				<h2 className={styles.title}>Жанры</h2>
				<div className={styles.container}>
					<div className={styles.slider}>
						{this.getVisibleGenres().map((genre) => {
							return <GenreSliderItem genre={genre} />;
						})}
					</div>

					<button className={styles.prevBtn} onClick={this.onPrevBthClick}>
						<img
							src={ArrowLeft}
							alt="Еще жанры"
							className={styles.prevBtnIcon}
						/>
					</button>
					<button className={styles.nextBtn} onClick={this.onNextBthClick}>
						<img
							src={ArrowRight}
							alt="Еще жанры"
							className={styles.nextBtnIcon}
						/>
					</button>
				</div>
			</section>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	genres: selectGenres(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	getGenres: () => dispatch(actions.getGenresAction()),
});

export const GenreSlider = connect(
	mapStateToProps,
	mapDispatchToProps,
)(GenreSliderComponent);
