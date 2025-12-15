import { ChangeAvatar } from '@/components/changeAvatar/changeAvatar';
import { ChangePassword } from '@/components/changePassword/changePassword';
import { FavoritesFilmCard } from '@/components/favoritesFilmCard/favoritesFilmCard';
import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions';
import type { State } from '@/modules/redux/types/store.ts';
import { Redirect } from '@/modules/router/redirect';
import type { WithRouterProps } from '@/modules/router/types/withRouterProps.ts';
import { withRouter } from '@/modules/router/withRouter.tsx';
import actions from '@/redux/features/favorites/actions';
import { selectFavorites } from '@/redux/features/favorites/selectors';
import {
	selectIsAuthentificated,
	selectVKIDAuthentificated,
} from '@/redux/features/user/selectors';
import type { Map } from '@/types/map';
import type { ModelsFavFilm } from '@/types/models';
import { Component } from '@robocotik/react';
import { Flex, Headline, Title } from 'ddd-ui-kit';
import styles from './userPage.module.scss';

interface UserPageProps {
	isAuthentificated: boolean;
	favoriteFilms: ModelsFavFilm[];
	getFavorites: VoidFunction;
	isVKIDAuthentificated: boolean;
}

class UserPageComponent extends Component<UserPageProps & WithRouterProps> {
	onMount() {
		if (this.props.router.params.anchor) {
			const anchorElement = document.querySelector(
				`#${this.props.router.params.anchor}`,
			);

			if (!anchorElement) {
				return;
			}

			const { top } = anchorElement.getBoundingClientRect();
			const height = top - window.innerHeight * 0.2;
			window.scrollTo({
				top: height,
				behavior: 'smooth',
			});
		}

		this.props.getFavorites();
	}

	render() {
		if (!this.props.isAuthentificated) {
			return <Redirect to="/" />;
		}

		const { favoriteFilms } = this.props;

		return (
			<Flex className={styles.page} direction="column" align="center">
				<Title className={styles.title} level="2">
					Добро пожаловать в ваш профиль
				</Title>
				<Flex className={styles.profile} direction="row" align="start">
					<ChangeAvatar />
					{!this.props.isVKIDAuthentificated && <ChangePassword />}
				</Flex>
				<Flex className={styles.favorites} direction="column" align="center">
					<Title className={styles.title} level="2" id="favorites">
						Избранное
					</Title>
					{(!favoriteFilms || (favoriteFilms && favoriteFilms.length == 0)) && (
						<Headline className={styles.subtitle} level="7" align="center">
							Похоже, вы ничего не добавили в избранное
						</Headline>
					)}
					<Flex
						className={styles.films}
						direction="column"
						align="center"
						justify="center"
					>
						{favoriteFilms &&
							favoriteFilms.map((film) => {
								return <FavoritesFilmCard film={film} />;
							})}
					</Flex>
				</Flex>
			</Flex>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	isAuthentificated: selectIsAuthentificated(state),
	favoriteFilms: selectFavorites(state),
	isVKIDAuthentificated: selectVKIDAuthentificated(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	getFavorites: () => dispatch(actions.getFavoritesAction()),
});

export const UserPage = compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
)(UserPageComponent);
