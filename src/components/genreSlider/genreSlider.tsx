import { getImageSRC } from '@/helpers/getCDNImageHelper/getCDNImageHelper.js';
import { connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import actions from '@/redux/features/genre/actions';
import { selectGenres } from '@/redux/features/genre/selectors';
import type { Map } from '@/types/map';
import type { ModelsGenre } from '@/types/models';
import { Component } from '@react';
import styles from './genreSlider.module.scss';

interface GenreSliderProps {
	genres: ModelsGenre[];
	getGenres: () => void;
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
	onMount(): void {
		this.props.getGenres();
		this.state = {
			curGenre: 0,
			prevGenre: 0,
			isAnimating: false,
			slideCapacity: 8,
			autoSlider: null,
			inactivityTimer: null,
		};
	}

	onNextBthClick = () => {
		const genresCount = this.props.genres.length;
		this.setState({ prevGenre: this.state.curGenre });
		this.setState({
			curGenre: (this.state.curGenre + this.state.slideCapacity) % genresCount,
		});
	};

	onPrevBthClick = () => {
		const genresCount = this.props.genres.length;
		this.setState({ prevGenre: this.state.curGenre });
		this.setState({
			curGenre:
				this.state.curGenre - this.state.slideCapacity < 0
					? this.state.curGenre - this.state.slideCapacity + genresCount
					: this.state.curGenre - this.state.slideCapacity,
		});
	};

	render() {
		if (this.props.genres.length === 0) {
			return <div>Loading...</div>;
		}
		console.log('render');

		return (
			<section className={styles.genreSlider}>
				<h2 className={styles.title}>Жанры</h2>
				<div className={styles.container}>
					<div className={styles.slider}>
						{[...Array(this.state.slideCapacity)].map((_, i) => {
							const genresCount = this.props.genres.length;
							const idx = (this.state.curGenre + i) % genresCount;
							const genre = this.props.genres[idx];

							return (
								<img
									key={genre.id}
									className={styles.image}
									alt={genre.title}
									src={`${getImageSRC('genres', genre.id, 'png')}`}
								/>
							);
						})}
					</div>

					<button className={styles.prevBtn} onClick={this.onPrevBthClick}>
						<img
							src="./src/assets/img/arrow.svg"
							alt="Еще жанры"
							className={styles.prevBtnIcon}
						/>
					</button>
					<button className={styles.nextBtn} onClick={this.onNextBthClick}>
						<img
							src="./src/assets/img/arrow.svg"
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
