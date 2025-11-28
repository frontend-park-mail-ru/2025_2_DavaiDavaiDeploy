import Close from '@/assets/img/close.svg?react';
import Loupe from '@/assets/img/loupe.svg?react';
import clsx from '@/modules/clsx/index.ts';
import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import actions from '@/redux/features/search/actions.ts';
import type { Map } from '@/types/map';
import { Flex, IconButton } from '@/uikit/index';
import { Component, createRef } from '@robocotik/react';
import { debounce } from '../../helpers/debounceHelper/debounceHelper';
import { withAdaptivity } from '../../modules/adaptivity/withAdaptivity';
import type { WithAdaptivityProps } from '../../modules/adaptivity/withAdaptivityProps';
import type { State } from '../../modules/redux/types/store';
import type { WithRouterProps } from '../../modules/router/types/withRouterProps.ts';
import { withRouter } from '../../modules/router/withRouter.tsx';
import {
	selectSearchResult,
	selectVoiceSearchResult,
} from '../../redux/features/search/selectors';
import type { ModelsSearchResponse } from '../../types/models';
import { SearchSuggest } from '../SearchSuggest/SearchSuggest';
import { SearchVoice } from '../SearchVoice/SearchVoice';
import styles from './searchInput.module.scss';

const DEBOUNCE_DELAY = 150;
const MIN_SEARCH_LENGTH = 3;

interface SearchInputProps {
	getSearchResult: (searchRequest: string) => void;
	getHintResult: (searchRequest: string) => void;
	clearVoiceSearch: VoidFunction;
	onClose?: VoidFunction;
	type: 'small' | 'big';
	className: string;
	hintResult: ModelsSearchResponse;
	voiceSearchResult: ModelsSearchResponse;
}

interface SearchInputState {
	searchRequest: string;
	isSuggestVisible: boolean;
	prevSearchRequest: string;
	viewWidth: number;
}

class SearchInputComponent extends Component<
	SearchInputProps & WithRouterProps & WithAdaptivityProps,
	SearchInputState
> {
	state: SearchInputState = {
		searchRequest: '',
		isSuggestVisible: false,
		prevSearchRequest: '',
		viewWidth: 0,
	};

	inputRef = createRef<HTMLInputElement>();

	onUpdate() {
		if (
			this.props.voiceSearchResult &&
			this.props.voiceSearchResult.search_string &&
			this.props.voiceSearchResult.search_string?.length > 0
		) {
			this.voiceSearch();
			this.props.clearVoiceSearch();
		}

		if (this.state.viewWidth !== this.props.adaptivity.viewWidth) {
			this.setState({
				isSuggestVisible: false,
				viewWidth: this.props.adaptivity.viewWidth,
			});
		}
	}

	debouncedSearch = debounce((search) => {
		this.props.getHintResult(search);
	}, DEBOUNCE_DELAY);

	voiceSearch = () => {
		if (
			!this.props.voiceSearchResult ||
			!this.props.voiceSearchResult.search_string
		) {
			return;
		}

		this.props.getSearchResult(this.props.voiceSearchResult.search_string);

		if (this.inputRef && this.inputRef.current) {
			this.inputRef.current.value = this.props.voiceSearchResult.search_string;
		}

		this.setState({
			searchRequest: this.props.voiceSearchResult.search_string,
			isSuggestVisible: true,
		});
	};

	search = () => {
		if (this.state.searchRequest === '') {
			return;
		}

		this.setState({ isSuggestVisible: false });

		this.setState({ prevSearchRequest: this.state.searchRequest });
		this.props.getSearchResult(this.state.searchRequest);

		if (!this.props.router.path.startsWith('/search')) {
			this.props.router.navigate(`/search?query=${this.state.searchRequest}`);
		}
	};

	handleSearchRequestChange = (event: InputEvent) => {
		const value = (event.target as HTMLInputElement).value;

		if (value.length >= MIN_SEARCH_LENGTH) {
			this.setState({ isSuggestVisible: true });
			this.debouncedSearch(value);
		} else {
			this.setState({ isSuggestVisible: false });
		}

		this.setState({ searchRequest: value });
	};

	handleCloseSuggest = () => {
		this.setState({ isSuggestVisible: false });
	};

	handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			this.search();
		}
	};

	render() {
		if (this.props.type === 'big') {
			return (
				<div className={styles.bigSearchWrapper}>
					<Flex
						className={clsx(styles.searchInput, this.props.className, {
							[styles.active]: this.state.searchRequest !== '',
						})}
						direction="row"
						align="center"
					>
						<input
							type="text"
							ref={this.inputRef}
							placeholder="Поиск фильмов, актеров..."
							value={this.state.searchRequest}
							onInput={this.handleSearchRequestChange}
							className={styles.input}
							onKeyDown={this.handleKeyDown}
						></input>

						<SearchVoice className={styles.loupeBtn} />

						<IconButton
							mode="tertiary"
							className={styles.loupeBtn}
							onClick={this.search}
						>
							<Loupe className={styles.loupe} />
						</IconButton>
					</Flex>
					{this.state.isSuggestVisible && (
						<SearchSuggest
							handleClose={this.handleCloseSuggest}
							hintResult={this.props.hintResult}
						/>
					)}
				</div>
			);
		}

		return (
			<div className={styles.bigSearchWrapper}>
				<Flex
					className={clsx(styles.searchInput, {
						[styles.active]: this.state.searchRequest !== '',
					})}
					direction="row"
					align="center"
				>
					<SearchVoice className={styles.loupeBtn} />
					<IconButton
						mode="tertiary"
						className={styles.loupeBtn}
						onClick={this.search}
					>
						<Loupe className={styles.loupe} />
					</IconButton>
					<input
						type="text"
						ref={this.inputRef}
						placeholder="Поиск фильмов, актеров..."
						value={this.state.searchRequest}
						onInput={this.handleSearchRequestChange}
						className={styles.input}
						onKeyDown={this.handleKeyDown}
					></input>

					<IconButton
						mode="tertiary"
						className={styles.closeBtn}
						onClick={this.props.onClose}
					>
						<Close className={styles.close} />
					</IconButton>
				</Flex>
				{this.state.isSuggestVisible && (
					<SearchSuggest
						handleClose={this.handleCloseSuggest}
						hintResult={this.props.hintResult}
					/>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	hintResult: selectSearchResult(state),
	voiceSearchResult: selectVoiceSearchResult(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	getSearchResult: (searchRequest: string) =>
		dispatch(actions.getSearchResultAction(searchRequest)),
	getHintResult: (searchRequest: string) =>
		dispatch(actions.getSearchResultAction(searchRequest)),
	clearVoiceSearch: () => dispatch(actions.clearVoiceSearchResultAction()),
});

export const SearchInput = compose(
	withRouter,
	withAdaptivity,
	connect(mapStateToProps, mapDispatchToProps),
)(SearchInputComponent);
