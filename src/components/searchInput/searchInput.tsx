import Close from '@/assets/img/close.svg?react';
import Loupe from '@/assets/img/loupe.svg?react';
import clsx from '@/modules/clsx/index.ts';
import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import actions from '@/redux/features/search/actions.ts';
import type { Map } from '@/types/map';
import { Flex, IconButton } from '@/uikit/index';
import { Component } from '@robocotik/react';
import { MediaRecorder, register } from 'extendable-media-recorder';
import { connect as WAVConnect } from 'extendable-media-recorder-wav-encoder';
import { MICROPHONE_STATES } from '../../consts/microphone';
import { debounce } from '../../helpers/debounceHelper/debounceHelper';
import { getMicrophoneIconFromState } from '../../helpers/getMicrophoneIconFromState/getMicrophoneIconFromState';
import type { State } from '../../modules/redux/types/store';
import type { WithRouterProps } from '../../modules/router/types/withRouterProps.ts';
import { withRouter } from '../../modules/router/withRouter.tsx';
import {
	selectSearchResult,
	selectVoiceSearchResult,
} from '../../redux/features/search/selectors';
import type { ModelsSearchResponse } from '../../types/models';
import { SearchSuggest } from '../SearchSuggest/SearchSuggest';
import styles from './searchInput.module.scss';

const DEBOUNCE_DELAY = 150;
const DEBOUNCE_RESIZE_DELAY = 300;
const MIN_SEARCH_LENGTH = 3;
interface SearchInputProps {
	getSearchResult: (searchRequest: string) => void;
	getHintResult: (searchRequest: string) => void;
	getVoiceSearchResult: (searchWAV: Blob) => void;
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
	microphoneState: (typeof MICROPHONE_STATES)[keyof typeof MICROPHONE_STATES];
}

await register(await WAVConnect());

const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/wav' });

class SearchInputComponent extends Component<
	SearchInputProps & WithRouterProps,
	SearchInputState
> {
	state = {
		searchRequest: '',
		isSuggestVisible: false,
		prevSearchRequest: '',
		microphoneState: MICROPHONE_STATES.INACTIVE,
	};

	audioChunks: Blob[] = [];

	handleResize = () => {
		this.setState({ isSuggestVisible: false });
	};

	debouncedResize = debounce(this.handleResize, DEBOUNCE_RESIZE_DELAY);

	onMount() {
		window.addEventListener('resize', this.debouncedResize);

		mediaRecorder.ondataavailable = (event) => {
			if (event.data.size > 0) {
				this.audioChunks.push(event.data);
			}
		};

		mediaRecorder.onstop = () => {
			const audioBlob = new Blob(this.audioChunks, {
				type: 'audio/wav',
			});

			this.audioChunks = [];

			this.props.getVoiceSearchResult(audioBlob);
		};
	}
	onUnmount() {
		window.removeEventListener('resize', this.debouncedResize);
	}

	handleStartRecording = () => {
		this.audioChunks = [];
		mediaRecorder.start();
	};

	handleStopRecording = () => {
		mediaRecorder.stop();
	};

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

	handleMicrophoneClick = () => {
		if (this.state.microphoneState === MICROPHONE_STATES.INACTIVE) {
			this.setState({ microphoneState: MICROPHONE_STATES.ACTIVE });
			this.handleStartRecording();
			return;
		}

		if (this.state.microphoneState === MICROPHONE_STATES.ACTIVE) {
			this.setState({ microphoneState: MICROPHONE_STATES.LOADING });
			this.handleStopRecording();
			this.setState({ microphoneState: MICROPHONE_STATES.INACTIVE });
		}
	};

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
		this.props.router.navigate(
			`/search?query=${this.props.voiceSearchResult.search_string}`,
		);
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
			this.debouncedSearch(value);
			this.setState({ isSuggestVisible: true });
		}

		if (this.state.isSuggestVisible && value.length < MIN_SEARCH_LENGTH) {
			this.setState({ isSuggestVisible: false });
		}

		this.setState({ prevSearchRequest: this.state.searchRequest });
		this.setState({ searchRequest: value });
	};

	handleCloseSuggest = () => {
		this.setState({ isSuggestVisible: false });
	};

	handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			if (this.state.prevSearchRequest !== this.state.searchRequest) {
				this.search();
			}

			this.setState({ isSuggestVisible: false });
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
							placeholder="Поиск фильмов, актеров..."
							value={this.state.searchRequest}
							onInput={this.handleSearchRequestChange}
							className={styles.input}
							onKeyDown={this.handleKeyDown}
						></input>
						<IconButton
							mode="tertiary"
							className={styles.loupeBtn}
							onClick={this.handleMicrophoneClick}
						>
							{getMicrophoneIconFromState(this.state.microphoneState)}
						</IconButton>
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
					<IconButton
						mode="tertiary"
						className={styles.loupeBtn}
						onClick={this.search}
					>
						<Loupe className={styles.loupe} />
					</IconButton>
					<input
						type="text"
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

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	getSearchResult: (searchRequest: string) =>
		dispatch(actions.getSearchResultAction(searchRequest)),
	getHintResult: (searchRequest: string) =>
		dispatch(actions.getSearchResultAction(searchRequest)),
	getVoiceSearchResult: (searchRequest: Blob) =>
		dispatch(actions.getVoiceSearchResultAction(searchRequest)),
	clearVoiceSearch: () => dispatch(actions.clearVoiceSearchResultAction()),
});

const mapStateToProps = (state: State): Map => ({
	hintResult: selectSearchResult(state),
	voiceSearchResult: selectVoiceSearchResult(state),
});

export const SearchInput = compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
)(SearchInputComponent);
