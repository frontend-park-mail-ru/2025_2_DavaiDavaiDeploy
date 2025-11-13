import ArrowLeft from '@/assets/img/arrowLeft.svg';
import ArrowRight from '@/assets/img/arrowRight.svg';
import { NARROW_SCREEN_WIDTH, WIDE_SCREEN_WIDTH } from '@/consts/devices';
import { debounce } from '@/helpers/debounceHelper/debounceHelper';
import { createPeriodFunction } from '@/helpers/periodStartHelper/periodStartHelper.ts';
import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import actions from '@/redux/features/actor/actions';
import { selectActorFilms } from '@/redux/features/actor/selectors';
import type { Map } from '@/types/map';
import type { ModelsMainPageFilm } from '@/types/models';
import { Component, createRef, type Ref } from '@robocotik/react';
import type { WithRouterProps } from '../../modules/router/types/withRouterProps.ts';
import { withRouter } from '../../modules/router/withRouter.tsx';
import { FilmCard } from '../filmCard/filmCard';
import styles from './filmSlider.module.scss';

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
	autoSlider: null | {
		start: VoidFunction;
		isWorking: () => boolean;
		stop: VoidFunction;
	};
	inactivityTimer: NodeJS.Timeout | null;
	debounceResizeHandler: (ev?: Event | undefined) => void;
	sliderRef: Ref<HTMLElement>;
	slideRefMap: Ref<HTMLElement>[];
}

const MIN_SLIDE_CAPACITY = 3;
const MAX_SLIDE_CAPACITY = 7;
const THROTTLE_DELAY = 100;
const AUTO_SLIDE_DURATION = 7000;
const AUTO_SLIDE_RESTART_DURATION = 30000;
const FILM_COUNT: number = 50;
const OFFSET: number = 0;
const SMALL_CARD_HEIGHT = 30;
const BIG_CARD_HEIGHT = 50;

function getSlideCapacityFromWidth(width: number) {
	if (width > WIDE_SCREEN_WIDTH) {
		return MAX_SLIDE_CAPACITY;
	} else if (width < NARROW_SCREEN_WIDTH) {
		return MIN_SLIDE_CAPACITY;
	}

	return 5;
}

function getIsActive(slideCapacity: number) {
	return slideCapacity >= MIN_SLIDE_CAPACITY;
}

function getCardHeight(slideCapacity: number) {
	return slideCapacity === MIN_SLIDE_CAPACITY
		? BIG_CARD_HEIGHT
		: SMALL_CARD_HEIGHT;
}

class FilmSliderComponent extends Component<
	FilmSliderProps & WithRouterProps,
	FilmSliderState
> {
	state: FilmSliderState = {
		curFilm: 0,
		slideCapacity: getSlideCapacityFromWidth(window.innerWidth),
		cardHeight: SMALL_CARD_HEIGHT,
		active: false,
		windowHeight: window.innerHeight,
		debounceResizeHandler: () => {},
		autoSlider: null,
		inactivityTimer: null,
		sliderRef: createRef(),
		slideRefMap: Array.from({ length: FILM_COUNT }, () =>
			createRef<HTMLElement>(),
		),
	};

	onMount() {
		this.props.getFilms(FILM_COUNT, OFFSET, this.props.router.params.id);
		const debounceResizeHandler = debounce(this.handleResize, THROTTLE_DELAY);

		this.setState({ debounceResizeHandler });

		window.addEventListener('resize', debounceResizeHandler);

		const autoSlider = createPeriodFunction(
			() => this.next(),
			AUTO_SLIDE_DURATION,
		);

		this.setState({
			autoSlider,
			active: getIsActive(this.state.slideCapacity),
			cardHeight: getCardHeight(this.state.slideCapacity),
		});

		if (this.state.active) {
			autoSlider.start();
		}
	}

	onUnmount() {
		if (this.state.debounceResizeHandler) {
			window.removeEventListener('resize', this.state.debounceResizeHandler);
		}

		if (this.state.autoSlider) {
			this.state.autoSlider.stop();
		}

		if (this.state.inactivityTimer) {
			clearTimeout(this.state.inactivityTimer);
		}
	}

	handleResize = () => {
		const width = window.innerWidth;
		let slideCapacity = getSlideCapacityFromWidth(width);
		const cardHeight = getCardHeight(slideCapacity);

		slideCapacity = Math.min(slideCapacity, this.props.films.length);

		const active = getIsActive(slideCapacity);

		this.setState({
			windowHeight: window.innerHeight,
			slideCapacity,
			cardHeight,
			active,
		});

		if (!active && this.state.autoSlider) {
			this.state.autoSlider.stop();
		} else if (
			active &&
			this.state.autoSlider &&
			!this.state.autoSlider.isWorking()
		) {
			this.state.autoSlider.start();
		}
	};

	onSliderClick = () => {
		if (this.state.autoSlider) {
			this.state.autoSlider.stop();

			if (this.state.inactivityTimer) {
				clearTimeout(this.state.inactivityTimer);
			}

			const inactivityTimer = setTimeout(() => {
				if (this.state.autoSlider && !this.state.autoSlider.isWorking()) {
					this.state.autoSlider.start();
				}
			}, AUTO_SLIDE_RESTART_DURATION);

			this.setState({ inactivityTimer });
		}
	};

	next = () => {
		this.setState({
			curFilm: (this.state.curFilm + 1) % this.props.films.length,
		});
	};

	prev = () => {
		this.setState({
			curFilm:
				(this.state.curFilm - 1 + this.props.films.length) %
				this.props.films.length,
		});
	};

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
			return <div></div>;
		}

		const slider = this.state.sliderRef.current;
		const slides = this.state.slideRefMap.map((ref) => ref.current);

		if (slider && slides.length > 0) {
			let maxHeight = 0;
			slides.forEach((s) => {
				if (!s) {
					return;
				}

				const h = s.offsetHeight;

				if (h > maxHeight) {
					maxHeight = h;
				}
			});

			slider.style.height = maxHeight + 'px';
		}

		return (
			<div className={styles.content}>
				<h1 className={styles.title}>ПРОЕКТЫ</h1>
				<div
					ref={this.state.sliderRef}
					className={styles.slider}
					onClick={this.onSliderClick}
				>
					{this.state.active && (
						<button className={styles.prevBtn} onClick={this.prev}>
							<img
								src={ArrowLeft}
								alt="Предыдущий"
								className={styles.prevBtnIcon}
							/>
						</button>
					)}
					{this.state.active && (
						<button className={styles.nextBtn} onClick={this.next}>
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
								ref={this.state.slideRefMap[i]}
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
