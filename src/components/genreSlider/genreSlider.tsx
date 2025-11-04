import ArrowLeft from '@/assets/img/arrowLeft.svg';
import ArrowRight from '@/assets/img/arrowRight.svg';
import { WIDE_SCREEN_WIDTH } from '@/consts/devices';
import { debounce } from '@/helpers/debounceHelper/debounceHelper';
import { connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import actions from '@/redux/features/genre/actions';
import { selectGenres } from '@/redux/features/genre/selectors';
import type { Map } from '@/types/map';
import type { ModelsGenre } from '@/types/models';
import { Component } from '@robocotik/react';
import { GenreSliderItem } from '../genreSliderItem/genreSliderItem';
import styles from './genreSlider.module.scss';

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
	debounceResizeHandler: (ev?: Event | undefined) => void;
}

const THROTTLE_DELAY = 100;
const INITIAL_RESIZE_DELAY = 300;

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
		debounceResizeHandler: () => {},
	};

	onMount() {
		this.props.getGenres();

		this.state.debounceResizeHandler = debounce(
			this.handleResize,
			THROTTLE_DELAY,
		);

		window.addEventListener('resize', this.state.debounceResizeHandler);

		setTimeout(() => {
			this.handleResize();
		}, INITIAL_RESIZE_DELAY);
	}

	onUnmount() {
		window.removeEventListener('resize', this.state.debounceResizeHandler);
	}

	handleResize = () => {
		const width = window.innerWidth;
		let slideCapacity = 8;

		if (width < WIDE_SCREEN_WIDTH) {
			slideCapacity = 4;
		}

		this.setState({
			slideCapacity,
		});
	};

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
