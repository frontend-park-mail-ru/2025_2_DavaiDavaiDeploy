import Close from '@/assets/img/close.svg?react';
import Loupe from '@/assets/img/loupe.svg?react';
import clsx from '@/modules/clsx/index.ts';
import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import actions from '@/redux/features/search/actions.ts';
import type { Map } from '@/types/map';
import { Flex, IconButton } from '@/uikit/index';
import { Component } from '@robocotik/react';
import type { WithRouterProps } from '../../modules/router/types/withRouterProps.ts';
import { withRouter } from '../../modules/router/withRouter.tsx';
import styles from './searchInput.module.scss';

interface SearchInputProps {
	getSearchResult: (searchRequest: string) => void;
	onClose?: VoidFunction;
	type: 'small' | 'big';
	className: string;
}

interface SearchInputState {
	searchRequest: string;
}

class SearchInputComponent extends Component<
	SearchInputProps & WithRouterProps,
	SearchInputState
> {
	state = {
		searchRequest: '',
	};

	search = () => {
		this.props.getSearchResult(this.state.searchRequest);

		if (this.props.router.path !== '/search') {
			this.props.router.navigate('/search');
		}
	};

	handleSearchRequestChange = (event: InputEvent) => {
		const value = (event.target as HTMLInputElement).value;
		this.setState({ searchRequest: value });
	};

	handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			this.search();
		}
	};

	render() {
		if (this.props.type === 'big') {
			return (
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
						onClick={this.props.onClose}
					>
						<Loupe className={styles.loupe} />
					</IconButton>
				</Flex>
			);
		}

		return (
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
		);
	}
}

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	getSearchResult: (searchRequest: string) =>
		dispatch(actions.getSearchResultAction(searchRequest)),
});

export const SearchInput = compose(
	withRouter,
	connect(null, mapDispatchToProps),
)(SearchInputComponent);
