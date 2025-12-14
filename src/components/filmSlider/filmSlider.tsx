import ArrowLeft from '@/assets/arrowLeft.svg?react';
import ArrowRight from '@/assets/arrowRight.svg?react';
import { NARROW_SCREEN_WIDTH, WIDE_SCREEN_WIDTH } from '@/consts/devices';
import { debounce } from '@/helpers/debounceHelper/debounceHelper';
import { createPeriodFunction } from '@/helpers/periodStartHelper/periodStartHelper.ts';
import type { ModelsMainPageFilm } from '@/types/models';
import { Component, createRef } from '@robocotik/react';
import { Flex, IconButton, Title } from 'ddd-ui-kit';
import { FilmCard } from '../filmCard/filmCard';
import styles from './filmSlider.module.scss';

interface FilmSliderProps {
	films: ModelsMainPageFilm[];
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
}

const MIN_SLIDE_CAPACITY = 3;
const DEBOUNCE_DELAY = 100;
const MAX_SLIDE_CAPACITY = 7;
const AUTO_SLIDE_DURATION = 7000;
const AUTO_SLIDE_RESTART_DURATION = 30000;
const FILM_COUNT: number = 100;
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

export class FilmSlider extends Component<FilmSliderProps, FilmSliderState> {
	state: FilmSliderState = {
		curFilm: 0,
		slideCapacity: getSlideCapacityFromWidth(window.innerWidth),
		cardHeight: SMALL_CARD_HEIGHT,
		active: false,
		windowHeight: window.innerHeight,
		debounceResizeHandler: () => {},
		autoSlider: null,
		inactivityTimer: null,
	};

	sliderRef = createRef<HTMLElement>();
	slideRefMap = Array.from({ length: FILM_COUNT }, () =>
		createRef<HTMLElement>(),
	);

	onMount() {
		const debounceResizeHandler = debounce(this.handleResize, DEBOUNCE_DELAY);

		this.setState({ debounceResizeHandler });

		window.addEventListener('resize', debounceResizeHandler);

		const autoSlider = createPeriodFunction(
			() => this.next(),
			AUTO_SLIDE_DURATION,
		);

		this.setState({
			autoSlider,
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

	onUpdate() {
		if (
			(!this.props.films || this.props.films.length === 0) &&
			this.state.active
		) {
			this.setState({ active: false });
		}

		if (this.props.films.length > 1 && !this.state.active) {
			this.handleResize();
		}
	}

	handleResize = () => {
		const width = window.innerWidth;
		let slideCapacity = getSlideCapacityFromWidth(width);
		const cardHeight = getCardHeight(slideCapacity);

		if (this.props.films.length > 0) {
			slideCapacity = Math.min(slideCapacity, this.props.films.length);
		} else {
			slideCapacity = 1;
		}

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
			return <div />;
		}

		const slider = this.sliderRef.current;
		const slides = this.slideRefMap.map((ref) => ref.current);

		if (slider && slides.length > 0) {
			slider.style.height = getSliderHeight(slider, slides) + 'px';
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
					{this.state.active && (
						<IconButton
							mode="tertiary"
							className={styles.prevBtn}
							onClick={this.prev}
						>
							<ArrowLeft alt="Предыдущий" className={styles.prevBtnIcon} />
						</IconButton>
					)}
					{this.state.active && (
						<IconButton
							mode="tertiary"
							className={styles.nextBtn}
							onClick={this.next}
						>
							<ArrowRight alt="Следующий" className={styles.nextBtnIcon} />
						</IconButton>
					)}
					<Flex className={styles.container} justify="center" align="start">
						{this.props.films.map((film, i) => (
							<div
								key={film.id}
								ref={this.slideRefMap[i]}
								className={styles.slide}
								style={{ ...this.getStyles(i) }}
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
