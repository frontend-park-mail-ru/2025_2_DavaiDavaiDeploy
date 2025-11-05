import ArrowLeft from '@/assets/img/arrowLeft.svg';
import ArrowRight from '@/assets/img/arrowRight.svg';
import { WIDE_SCREEN_WIDTH } from '@/consts/devices';
import { debounce } from '@/helpers/debounceHelper/debounceHelper';
import { createPeriodFunction } from '@/helpers/periodStartHelper/periodStartHelper';
import clsx from '@/modules/clsx';
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
	slideCapacity: number;
	isAnimating: boolean;
	phase: 'out' | 'in' | null;
	direction: 'left' | 'right' | null;
	debounceResizeHandler: (ev?: Event | undefined) => void;
	autoSlider: null | {
		start: VoidFunction;
		isWorking: () => boolean;
		stop: VoidFunction;
	};
	inactivityTimer: NodeJS.Timeout | null;
}

const THROTTLE_DELAY = 100;
const ANIMATION_DURATION = 350;
const AUTO_SLIDE_DURATION = 7000;
const AUTO_SLIDE_RESTART_DURATION = 30000;

class GenreSliderComponent extends Component<
	GenreSliderProps,
	GenreSliderState
> {
	state: GenreSliderState = {
		curGenre: 0,
		slideCapacity: 8,
		isAnimating: false,
		phase: null,
		direction: null,
		debounceResizeHandler: () => {},
		autoSlider: null,
		inactivityTimer: null,
	};

	onMount() {
		this.props.getGenres();

		this.state.debounceResizeHandler = debounce(
			this.handleResize,
			THROTTLE_DELAY,
		);

		window.addEventListener('resize', this.state.debounceResizeHandler);
		this.handleResize();

		if (this.state.autoSlider && this.state.autoSlider.isWorking()) {
			this.state.autoSlider.stop();
		}

		if (this.state.autoSlider) {
			this.state.autoSlider.stop();
		}

		this.state.autoSlider = createPeriodFunction(
			this.onNextBtnClick,
			AUTO_SLIDE_DURATION,
		);

		this.state.autoSlider.start();
	}

	onUnmount() {
		window.removeEventListener('resize', this.state.debounceResizeHandler);
		this.state.autoSlider?.stop();
	}

	handleResize = () => {
		const width = window.innerWidth;
		this.setState({
			slideCapacity: width < WIDE_SCREEN_WIDTH ? 4 : 8,
		});
	};

	animate(direction: 'left' | 'right', nextIndex: number) {
		if (this.state.isAnimating) {
			return;
		}

		this.setState({ isAnimating: true, phase: 'out', direction });

		setTimeout(() => {
			this.setState({ curGenre: nextIndex, phase: 'in' });
		}, ANIMATION_DURATION);

		setTimeout(() => {
			this.setState({ isAnimating: false, phase: null, direction: null });
		}, ANIMATION_DURATION * 2);
	}

	onNextBtnClick = () => {
		const { genres } = this.props;

		if (!genres.length || this.state.isAnimating) {
			return;
		}

		const nextIndex =
			(this.state.curGenre + this.state.slideCapacity) % genres.length;

		this.animate('left', nextIndex);
	};

	onPrevBtnClick = () => {
		const { genres } = this.props;

		if (!genres.length || this.state.isAnimating) {
			return;
		}

		const nextIndex =
			this.state.curGenre - this.state.slideCapacity < 0
				? genres.length + (this.state.curGenre - this.state.slideCapacity)
				: this.state.curGenre - this.state.slideCapacity;

		this.animate('right', nextIndex);
	};

	onSliderClick = () => {
		this.state.autoSlider?.stop();

		if (this.state.inactivityTimer) {
			clearTimeout(this.state.inactivityTimer);
		}

		this.state.inactivityTimer = setTimeout(() => {
			if (!this.state.autoSlider?.isWorking()) {
				this.state.autoSlider?.start();
			}
		}, AUTO_SLIDE_RESTART_DURATION);
	};

	getVisibleGenres() {
		const { genres } = this.props;
		const { curGenre, slideCapacity } = this.state;

		if (!genres.length) {
			return [];
		}

		return Array.from({ length: slideCapacity }, (_, i) => {
			const idx = (curGenre + i) % genres.length;
			return genres[idx];
		});
	}

	render() {
		const { genres } = this.props;
		const { phase, direction } = this.state;

		if (!genres.length) {
			return <div></div>;
		}

		const visibleGenres = this.getVisibleGenres();

		let animationClass = '';

		if (phase === 'out') {
			animationClass =
				direction === 'left' ? styles.slideOutLeft : styles.slideOutRight;
		} else if (phase === 'in') {
			animationClass =
				direction === 'left' ? styles.slideInRight : styles.slideInLeft;
		}

		return (
			<section className={styles.genreSlider}>
				<h2 className={styles.title}>Жанры</h2>
				<div className={styles.container} onClick={this.onSliderClick}>
					<div className={clsx(styles.slider, animationClass)}>
						{visibleGenres.map((genre) => (
							<GenreSliderItem genre={genre} />
						))}
					</div>

					<button className={styles.prevBtn} onClick={this.onPrevBtnClick}>
						<img src={ArrowLeft} alt="Назад" className={styles.prevBtnIcon} />
					</button>

					<button className={styles.nextBtn} onClick={this.onNextBtnClick}>
						<img src={ArrowRight} alt="Вперёд" className={styles.nextBtnIcon} />
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
