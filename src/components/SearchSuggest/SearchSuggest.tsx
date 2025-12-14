import { getImageURL } from '@/helpers/getCDNImageHelper/getCDNImageHelper';
import { Component, createRef, type Ref } from '@robocotik/react';
import clsx from 'ddd-clsx';
import { Badge, Headline, Image } from 'ddd-ui-kit';
import { formatRating } from '../../helpers/ratingFormatHelper/ratingFormatHelper';
import { getRatingType } from '../../helpers/ratingTypeHelper/ratingTypeHelper';
import { Link } from '../../modules/router/link';
import type {
	ModelsMainPageActor,
	ModelsMainPageFilm,
} from '../../types/models';
import styles from './SearchSuggest.module.scss';

interface SearchSuggestProps {
	hintResult: {
		films?: ModelsMainPageFilm[];
		actors?: ModelsMainPageActor[];
	};
	handleClose: VoidFunction;
}

interface SearchSuggestState {
	hintRef: Ref<HTMLDivElement>;
}

export class SearchSuggest extends Component<
	SearchSuggestProps,
	SearchSuggestState
> {
	state = {
		hintRef: createRef<HTMLDivElement>(),
	};

	handleClickOutside = (event: MouseEvent | TouchEvent) => {
		if (
			this.state.hintRef.current &&
			!this.state.hintRef.current.contains(event.target as Node)
		) {
			this.props.handleClose();
		}
	};

	onMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
		document.addEventListener('touchstart', this.handleClickOutside);
	}

	onWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
		document.removeEventListener('touchstart', this.handleClickOutside);
	}

	renderFilm = (film: ModelsMainPageFilm) => {
		const { rating, id, title, cover, genre, year } = film;
		const formattedRating = formatRating(rating);
		const ratingType = getRatingType(rating);
		return (
			<li
				onClick={this.props.handleClose}
				className={styles.lilist}
				key={`film-${id}`}
			>
				<Link className={styles.link} href={`/films/${id}`}>
					<Image
						className={styles.image}
						src={getImageURL(cover)}
						alt={title}
					/>
					<div className={styles.filmInfo}>
						<div className={styles.titleRow}>
							<h3 data-test-id="search-film-title">{title}</h3>
							{ratingType && (
								<Badge mode={ratingType} className={styles.badge} size="s">
									<Headline level="7">{formattedRating}</Headline>
								</Badge>
							)}
						</div>
						<div className={styles.subtitleRow}>{`${genre}, ${year}`}</div>
					</div>
				</Link>
			</li>
		);
	};

	renderActor = (actor: ModelsMainPageActor) => {
		const { id, photo, russian_name } = actor;
		return (
			<li
				onClick={this.props.handleClose}
				className={styles.lilist}
				key={`actor-${id}`}
			>
				<Link className={styles.link} href={`/actors/${id}`}>
					<Image
						className={styles.image}
						src={getImageURL(photo)}
						alt={russian_name}
					/>
					<p className={styles.titleRow}>{russian_name}</p>
				</Link>
			</li>
		);
	};

	render() {
		return (
			<div ref={this.state.hintRef} className={styles.hint}>
				<div className={clsx(styles.hintWrapper, styles.customScrollbar)}>
					{this.props.hintResult?.films?.length === 0 &&
						this.props.hintResult?.actors?.length === 0 && (
							<p>Нет результатов</p>
						)}

					{this.props.hintResult?.films &&
						this.props.hintResult?.films.length > 0 && (
							<div className={styles.hintContent}>
								<h1 className={styles.hintTitle}>Фильмы</h1>
								{this.props.hintResult.films &&
									this.props.hintResult.films.length > 0 && (
										<ul className={styles.ullist}>
											{this.props.hintResult.films.map((film) => {
												return this.renderFilm(film);
											})}
										</ul>
									)}
							</div>
						)}

					{this.props.hintResult?.actors &&
						this.props.hintResult.actors.length > 0 && (
							<div className={styles.hintContent}>
								<h1 className={styles.hintTitle}>Актеры</h1>
								<ul className={styles.ullist}>
									{this.props.hintResult.actors.map((actor) =>
										this.renderActor(actor),
									)}
								</ul>
							</div>
						)}
				</div>
			</div>
		);
	}
}
