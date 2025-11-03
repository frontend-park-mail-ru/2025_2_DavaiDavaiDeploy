import ArrowLeft from '@/assets/img/arrowLeft.svg';
import ArrowRight from '@/assets/img/arrowRight.svg';
import { NARROW_SCREEN_WIDTH, WIDE_SCREEN_WIDTH } from '@/consts/devices';
import { debounce } from '@/helpers/debounceHelper/debounceHelper';
import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import actions from '@/redux/features/actor/actions';
import { selectActorFilms } from '@/redux/features/actor/selectors';
import type { Map } from '@/types/map';
import type { ModelsMainPageFilm } from '@/types/models';
import { Component } from '@robocotik/react';
import type { WithRouterProps } from '../../modules/router/types/withRouterProps.ts';
import { withRouter } from '../../modules/router/withRouter.tsx';
import { FilmCard } from '../filmCard/filmCard';
import styles from './filmSlider.module.scss';

const FILM_COUNT: number = 50;
const OFFSET: number = 0;
const THROTTLE_DELAY = 100;
const INITIAL_RESIZE_DELAY = 300;
const SMALL_CARD_HEIGHT = 30;
const BIG_CARD_HEIGHT = 50;

interface FilmSliderProps {
	films: ModelsMainPageFilm[];
	getFilms: (limit: number, offset: number, id: string) => void;
}

interface FilmSliderState {
	curFilm: number;
	slideCapacity: number;
	cardHeight: number;
	windowHeight: number;
	active: boolean;
	debounceResizeHandler: (ev?: Event | undefined) => void;
}

class FilmSliderComponent extends Component<
	FilmSliderProps & WithRouterProps,
	FilmSliderState
> {
	state: FilmSliderState = {
		curFilm: 0,
		slideCapacity: 3,
		cardHeight: SMALL_CARD_HEIGHT,
		active: false,
		windowHeight: window.innerHeight,
		debounceResizeHandler: () => {},
	};

	onMount() {
		this.props.getFilms(FILM_COUNT, OFFSET, this.props.router.params.id);

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
		const slider = document.querySelector(`.${styles.slider}`) as HTMLElement;
		const slides = document.querySelectorAll(
			`.${styles.slide}`,
		) as NodeListOf<HTMLElement>;

		if (slider && slides.length > 0) {
			let maxHeight = 0;
			slides.forEach((s) => {
				const h = s.offsetHeight;

				if (h > maxHeight) {
					maxHeight = h;
				}
			});

			slider.style.height = maxHeight + 'px';
		}

		const width = window.innerWidth;
		let slideCapacity = 5;
		let cardHeight = SMALL_CARD_HEIGHT;

		if (width > WIDE_SCREEN_WIDTH) {
			slideCapacity = 7;
		} else if (width < NARROW_SCREEN_WIDTH) {
			slideCapacity = 3;
			cardHeight = BIG_CARD_HEIGHT;
		}

		slideCapacity = Math.min(slideCapacity, this.props.films.length);

		this.setState({
			windowHeight: window.innerHeight,
			slideCapacity,
			cardHeight,
			active: slideCapacity >= 3,
		});
	};

	next() {
		this.setState({
			curFilm: (this.state.curFilm + 1) % this.props.films.length,
		});
	}

	prev() {
		this.setState({
			curFilm:
				(this.state.curFilm - 1 + this.props.films.length) %
				this.props.films.length,
		});
	}

	getSlideStyle(
		zIndex: number,
		opacity: number,
		step = 0,
		rotateY = 0,
		translateZ = 0,
	) {
		return {
			zIndex,
			opacity,
			transform: `translateX(${step}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
		};
	}

	getStyles = (index: number) => {
		const total = this.props.films.length;
		const stepPx = (window.innerWidth * this.state.cardHeight) / (100 * 1.7);
		const curIndex = this.state.curFilm;

		let diff = (index - curIndex + total) % total;

		if (diff > total / 2) {
			diff -= total;
		}

		const maxVisible = (this.state.slideCapacity - 1) / 2;

		if (diff === 0) {
			return this.getSlideStyle(10, 1, 0, 0, 0);
		}

		for (let i = 1; i <= maxVisible; i++) {
			if (diff === i) {
				return this.getSlideStyle(
					10 - i,
					1,
					stepPx * i,
					-35,
					-400 - (i - 1) * 100,
				);
			}

			if (diff === -i) {
				return this.getSlideStyle(
					10 - i,
					1,
					-stepPx * i,
					35,
					-400 - (i - 1) * 100,
				);
			}
		}

		if (diff > 0) {
			return this.getSlideStyle(7, 0, stepPx * maxVisible, -35, -500);
		} else {
			return this.getSlideStyle(7, 0, -stepPx * maxVisible, 50, -500);
		}
	};

	render() {
		if (this.props.films.length === 0) {
			return <div>Loading...</div>;
		}

		return (
			<div className={styles.content}>
				<h1 className={styles.title}>ПРОЕКТЫ</h1>
				<div className={styles.slider}>
					{this.state.active && (
						<button className={styles.prevBtn} onClick={this.prev.bind(this)}>
							<img
								src={ArrowLeft}
								alt="Предыдущий"
								className={styles.prevBtnIcon}
							/>
						</button>
					)}
					{this.state.active && (
						<button className={styles.nextBtn} onClick={this.next.bind(this)}>
							<img
								src={ArrowRight}
								alt="Следующий"
								className={styles.nextBtnIcon}
							/>
						</button>
					)}
					<div className={styles.container}>
						{this.props.films.map((film, i) => (
							<div
								key={i}
								className={styles.slide}
								style={{ ...this.getStyles(i) }}
							>
								<FilmCard film={film} />
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	films: selectActorFilms(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	getFilms: (limit: number, offset: number, id: string) =>
		dispatch(actions.getActorFilmsAction(limit, offset, id)),
});

export const FilmSlider = compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
)(FilmSliderComponent);
