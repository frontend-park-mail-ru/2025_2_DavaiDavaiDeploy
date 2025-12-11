import Loupe from '@/assets/loupe.svg?react';
import { LoadedUser } from '@/components/headerLoadedUser/headerLoadedUser.tsx';
import { LoadingState } from '@/components/loadingState/loadingState.tsx';
import { compose, connect } from '@/modules/redux/index.ts';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import { NavigateButton } from '@/modules/router/button.tsx';
import { Link } from '@/modules/router/link.tsx';
import type { WithRouterProps } from '@/modules/router/types/withRouterProps.ts';
import actions from '@/redux/features/user/actions.ts';
import {
	selectNewAvatarLoading,
	selectUser,
	selectUserLoading,
} from '@/redux/features/user/selectors.ts';
import type { Map } from '@/types/map';
import type { ModelsUser } from '@/types/models.ts';
import { Component } from '@robocotik/react';
import { Flex, IconButton, Logo } from 'ddd-ui-kit';
import { getPathWithPath } from '../../helpers/getPathWithPath/getPathWithPath.ts';
import { withModal } from '../../modules/modals/withModal.tsx';
import type { WithModalProps } from '../../modules/modals/withModalProps.ts';
import { withRouter } from '../../modules/router/withRouter.tsx';
import { SearchInput } from '../searchInput/searchInput.tsx';
import styles from './header.module.scss';

interface HeaderProps {
	user: ModelsUser | null;
	isLoading: boolean;
	logoutUser: VoidFunction;
}

interface HeaderState {
	searchOpened: boolean;
}

class HeaderComponent extends Component<
	HeaderProps & WithRouterProps & WithModalProps,
	HeaderState
> {
	state = {
		searchOpened: false,
	};

	openSearch = () => {
		this.setState({ searchOpened: true });
	};

	closeSearch = () => {
		this.setState({ searchOpened: false });
	};

	renderUserSection() {
		if (this.props.isLoading) {
			return (
				<div className={styles.loadingContainer}>
					<LoadingState />
				</div>
			);
		}

		if (this.props.user) {
			return (
				<LoadedUser user={this.props.user} logoutUser={this.props.logoutUser} />
			);
		}

		return (
			<NavigateButton
				href={getPathWithPath('login', this.props.router.path)}
				className={styles.loginBtn}
			>
				Войти
			</NavigateButton>
		);
	}

	render() {
		if (this.state.searchOpened) {
			return (
				<Flex
					id="header"
					className={styles.header}
					justify="center"
					align="center"
				>
					<SearchInput
						type="small"
						className={styles.smallSearch}
						onClose={this.closeSearch}
					/>
				</Flex>
			);
		}

		return (
			<Flex
				id="header"
				className={styles.header}
				justify="between"
				align="center"
			>
				<Link href="/">
					<Logo className={styles.logo} />
				</Link>
				<Flex className={styles.right} direction="row" align="center">
					<SearchInput type="big" className={styles.bigSearch} />
					<IconButton
						mode="tertiary"
						className={styles.loupeBtn}
						onClick={this.openSearch}
					>
						<Loupe className={styles.loupe} />
					</IconButton>
					<Flex className={styles.user} align="center">
						{this.renderUserSection()}
					</Flex>
				</Flex>
			</Flex>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	user: selectUser(state),
	isLoading: selectUserLoading(state) | selectNewAvatarLoading(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	logoutUser: () => dispatch(actions.logoutUserAction()),
});

export const Header = compose(
	withRouter,
	withModal,
	connect(mapStateToProps, mapDispatchToProps),
)(HeaderComponent);
