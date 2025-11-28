import ArrowLeft from '@/assets/img/arrowLeft.svg?react';
import ArrowRight from '@/assets/img/arrowRight.svg?react';
import { createPeriodFunction } from '@/helpers/periodStartHelper/periodStartHelper.ts';
import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import actions from '@/redux/features/actor/actions';
import { selectActorFilms } from '@/redux/features/actor/selectors';
import type { Map } from '@/types/map';
import type { ModelsMainPageFilm } from '@/types/models';
import { Flex, IconButton, Title } from '@/uikit/index';
import { Component, createRef } from '@robocotik/react';
import { withAdaptivity } from '../../modules/adaptivity/withAdaptivity';
import type { WithAdaptivityProps } from '../../modules/adaptivity/withAdaptivityProps';
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
	autoSlider: null | {
		start: VoidFunction;
		isWorking: () => boolean;
		stop: VoidFunction;
	};
	inactivityTimer: NodeJS.Timeout | null;
}

const MIN_SLIDEABLE_COUNT = 2;
const MIN_SLIDE_CAPACITY = 3;
const MEDIUM_SLIDE_CAPACITY = 5;
const MAX_SLIDE_CAPACITY = 7;
const AUTO_SLIDE_DURATION = 7000;
const AUTO_SLIDE_RESTART_DURATION = 30000;
const FILM_COUNT: number = 50;
const OFFSET: number = 0;
const SMALL_CARD_HEIGHT = 30;
const BIG_CARD_HEIGHT = 50;

function getIsActive(slideCapacity: number) {
	return slideCapacity >= MIN_SLIDEABLE_COUNT;
}

function getCardHeight(slideCapacity: number) {
	return slideCapacity === MIN_SLIDE_CAPACITY
		? BIG_CARD_HEIGHT
		: SMALL_CARD_HEIGHT;
}

function getSliderHeight(
	slider: HTMLElement | null,
	slides: (HTMLElement | null)[],
) {
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

		return maxHeight;
	}
}

class FilmSliderComponent extends Component<
	FilmSliderProps & WithRouterProps & WithAdaptivityProps,
	FilmSliderState
> {
	state: FilmSliderState = {
		curFilm: 0,
		autoSlider: null,
		inactivityTimer: null,
	};

	sliderRef = createRef<HTMLElement>();
	slideRefMap = Array.from({ length: FILM_COUNT }, () =>
		createRef<HTMLElement>(),
	);

	getSlideCapacityFromWidth() {
		if (this.props.adaptivity.isWideDesktop) {
			return MAX_SLIDE_CAPACITY;
		} else if (this.props.adaptivity.isSmallTablet) {
			return MEDIUM_SLIDE_CAPACITY;
		}

		return MIN_SLIDE_CAPACITY;
	}

	onMount() {
		this.props.getFilms(FILM_COUNT, OFFSET, this.props.router.params.id);

		const autoSlider = createPeriodFunction(
			() => this.next(),
			AUTO_SLIDE_DURATION,
		);

		this.setState({
			autoSlider,
		});

		autoSlider.start();
	}

	onUnmount() {
		if (this.state.autoSlider) {
			this.state.autoSlider.stop();
		}

		if (this.state.inactivityTimer) {
			clearTimeout(this.state.inactivityTimer);
		}
	}

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
		this.setState((state) => ({
			curFilm: (state.curFilm + 1) % this.props.films.length,
		}));
	};

	prev = () => {
		this.setState((state) => ({
			curFilm:
				(state.curFilm - 1 + this.props.films.length) % this.props.films.length,
		}));
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

	getStyles = (index: number, cardHeight: number, slideCapacity: number) => {
		const total = this.props.films.length;
		const stepPx = (this.props.adaptivity.viewWidth * cardHeight) / (100 * 1.7);

		const curIndex = this.state.curFilm;

		let diff = (index - curIndex + total) % total;

		if (diff > total / 2) {
			diff -= total;
		}

		const maxVisible = (slideCapacity - 1) / 2;

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
			return <div />;
		}

		const slider = this.sliderRef.current;
		const slides = this.slideRefMap.map((ref) => ref.current);

		if (slider && slides.length > 0) {
			slider.style.height = getSliderHeight(slider, slides) + 'px';
		}

		let slideCapacity = this.getSlideCapacityFromWidth();

		if (this.props.films.length > 0) {
			slideCapacity = Math.min(slideCapacity, this.props.films.length);
		}

		const cardHeight = getCardHeight(slideCapacity);

		const active = getIsActive(slideCapacity);

		if (!active && this.state.autoSlider) {
			this.state.autoSlider.stop();
		} else if (
			active &&
			this.state.autoSlider &&
			!this.state.autoSlider.isWorking()
		) {
			this.state.autoSlider.start();
		}

		return (
			<div className={styles.content}>
				<Title level="1" className={styles.title}>
					ПРОЕКТЫ
				</Title>
				<Flex
					getRootRef={this.sliderRef}
					className={styles.slider}
					onClick={this.onSliderClick}
					direction="row"
					align="top"
				>
					{active && (
						<>
							<IconButton
								mode="tertiary"
								className={styles.prevBtn}
								onClick={this.prev}
							>
								<ArrowLeft alt="Предыдущий" className={styles.prevBtnIcon} />
							</IconButton>

							<IconButton
								mode="tertiary"
								className={styles.nextBtn}
								onClick={this.next}
							>
								<ArrowRight alt="Следующий" className={styles.nextBtnIcon} />
							</IconButton>
						</>
					)}

					<Flex className={styles.container} justify="center" align="start">
						{this.props.films.map((film, i) => (
							<div
								key={film.id}
								ref={this.slideRefMap[i]}
								className={styles.slide}
								style={{ ...this.getStyles(i, cardHeight, slideCapacity) }}
							>
								<FilmCard film={film} />
							</div>
						))}
					</Flex>
				</Flex>
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
	withAdaptivity,
	connect(mapStateToProps, mapDispatchToProps),
)(FilmSliderComponent);
