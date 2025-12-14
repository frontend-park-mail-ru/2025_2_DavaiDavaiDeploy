import Close from '@/assets/close.svg?react';
import Loupe from '@/assets/loupe.svg?react';
import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import actions from '@/redux/features/search/actions.ts';
import type { Map } from '@/types/map';
import { Component, createRef } from '@robocotik/react';
import clsx from 'ddd-clsx';
import { Flex, IconButton } from 'ddd-ui-kit';
import { debounce } from '../../helpers/debounceHelper/debounceHelper';
import type { State } from '../../modules/redux/types/store';
import type { WithRouterProps } from '../../modules/router/types/withRouterProps.ts';
import { withRouter } from '../../modules/router/withRouter.tsx';
import {
	selectSearchResult,
	selectVoiceIsWorking,
	selectVoiceSearchResult,
} from '../../redux/features/search/selectors';
import type { ModelsSearchResponse } from '../../types/models';
import { SearchSuggest } from '../SearchSuggest/SearchSuggest';
import { SearchVoice } from '../SearchVoice/SearchVoice';
import styles from './searchInput.module.scss';

const DEBOUNCE_DELAY = 150;
const DEBOUNCE_RESIZE_DELAY = 300;
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
	isVoiceWorking: boolean;
}

interface SearchInputState {
	searchRequest: string;
	isSuggestVisible: boolean;
	prevSearchRequest: string;
}

class SearchInputComponent extends Component<
	SearchInputProps & WithRouterProps,
	SearchInputState
> {
	state: SearchInputState = {
		searchRequest: '',
		isSuggestVisible: false,
		prevSearchRequest: '',
	};

	inputRef = createRef<HTMLInputElement>();

	handleResize = () => {
		this.setState({ isSuggestVisible: false });
	};

	debouncedResize = debounce(this.handleResize, DEBOUNCE_RESIZE_DELAY);

	onMount() {
		window.addEventListener('resize', this.debouncedResize);
	}

	onUnmount() {
		window.removeEventListener('resize', this.debouncedResize);
	}

	onUpdate() {
		if (
			this.props.voiceSearchResult &&
			this.props.voiceSearchResult.search_string &&
			this.props.voiceSearchResult.search_string?.length > 0
		) {
			this.voiceSearch();
			this.props.clearVoiceSearch();
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
							name="search"
							onKeyDown={this.handleKeyDown}
							disabled={this.props.isVoiceWorking ? true : undefined}
						></input>

						<SearchVoice className={styles.loupeBtn} />

						<IconButton
							mode="tertiary"
							className={styles.loupeBtn}
							onClick={this.search}
							data-test-id="loupe"
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
						name="search"
						placeholder="Поиск фильмов, актеров..."
						value={this.state.searchRequest}
						onInput={this.handleSearchRequestChange}
						className={styles.input}
						onKeyDown={this.handleKeyDown}
						disabled={this.props.isVoiceWorking ? true : undefined}
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
	isVoiceWorking: selectVoiceIsWorking(state),
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
	connect(mapStateToProps, mapDispatchToProps),
)(SearchInputComponent);
