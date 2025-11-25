import { ActorCard } from '@/components/actorCard/actorCard';
import { FilmCard } from '@/components/filmCard/filmCard';
import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions';
import type { State } from '@/modules/redux/types/store.ts';
import type { WithRouterProps } from '@/modules/router/types/withRouterProps.ts';
import { withRouter } from '@/modules/router/withRouter.tsx';
import actions from '@/redux/features/search/actions';
import {
	selectSearchResult,
	selectVoiceSearchResult,
} from '@/redux/features/search/selectors';
import type { Map } from '@/types/map';
import type {
	ModelsSearchResponse,
	ModelsVoiceSearchResponse,
} from '@/types/models';

import { CardGrid, Flex, Paragraph, Title } from '@/uikit/index';
import { Component } from '@robocotik/react';
import styles from './searchPage.module.scss';

interface SearchPageProps {
	searchResult: ModelsSearchResponse;
	searchVoiceResult: ModelsVoiceSearchResponse;
	clearResult: VoidFunction;
	getSearchResult: (searchRequest: string) => void;
}

class SearchPageComponent extends Component<SearchPageProps & WithRouterProps> {
	onMount() {
		if (this.props.router.params['query']) {
			this.props.getSearchResult(this.props.router.params['query']);
		}
	}

	onUnmount() {
		this.props.clearResult();
	}

	renderActors = () => {
		const { actors } = this.props.searchResult;

		return (
			<Flex direction="column" className={styles.grid}>
				<Title className={styles.subtitle} level="4" weight="bold">
					Актеры
				</Title>
				<CardGrid>
					{actors && actors.map((actor) => <ActorCard actor={actor} />)}
				</CardGrid>
			</Flex>
		);
	};

	renderFilms = () => {
		const { films } = this.props.searchResult;

		return (
			<Flex direction="column" className={styles.grid}>
				<Title className={styles.subtitle} level="4" weight="bold">
					Фильмы
				</Title>
				<CardGrid>
					{films && films.map((film) => <FilmCard film={film} />)}
				</CardGrid>
			</Flex>
		);
	};

	renderResult = () => {
		if (!this.props.searchResult) {
			return <div />;
		}

		const { actors, films } = this.props.searchResult;

		if ((!actors && !films) || (actors?.length === 0 && films?.length === 0)) {
			return (
				<>
					<Title className={styles.nothingFoundTitle} level="2">
						К сожалению, по вашему запросу ничего не найдено...
					</Title>
					<Flex
						align="start"
						direction="column"
						className={styles.nothingFound}
					>
						<Title
							className={styles.nothingFoundSubtitle}
							level="4"
							color="light"
							weight="bold"
						>
							Что делать?
						</Title>
						<Paragraph
							className={styles.nothingFoundItem}
							level="7"
							color="light"
						>
							Попробуйте изменить запрос.
						</Paragraph>
						<Paragraph
							className={styles.nothingFoundItem}
							level="7"
							color="light"
						>
							Если вы пытаетесь найти актера, найдите сначала фильм с его
							участием. Затем на странице фильма вы найдёте того, кого искали.
						</Paragraph>
						<Paragraph
							className={styles.nothingFoundItem}
							level="7"
							color="light"
						>
							Если вы пытаетесь найти фильм, найдите сначала актера,
							участвовавшего в нем. Затем по его фильмографии вы найдёте и сам
							фильм.
						</Paragraph>
					</Flex>
				</>
			);
		}

		return (
			<>
				<Title className={styles.title} level="2">
					Возможно вы искали:
				</Title>
				{films?.length !== 0 && this.renderFilms()}
				{actors?.length !== 0 && this.renderActors()}
			</>
		);
	};

	render() {
		return (
			<Flex className={styles.page} direction="column">
				{this.renderResult()}
			</Flex>
		);
	}
}

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	getSearchResult: (searchRequest: string) =>
		dispatch(actions.getSearchResultAction(searchRequest)),
	clearResult: () => dispatch(actions.clearSearchResultAction()),
});

const mapStateToProps = (state: State): Map => ({
	searchResult: selectSearchResult(state),
	searchVoiceResult: selectVoiceSearchResult(state),
});

export const SearchPage = compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
)(SearchPageComponent);
