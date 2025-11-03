import Logo from '@/assets/img/logo.svg';
import { LoadedUser } from '@/components/headerLoadedUser/headerLoadedUser.tsx';
import { LoadingState } from '@/components/loadingState/loadingState.tsx';
import { connect } from '@/modules/redux/index.ts';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import { NavigateButton } from '@/modules/router/button.tsx';
import { Link } from '@/modules/router/link.tsx';
import type { WithRouterProps } from '@/modules/router/types/withRouterProps.ts';
import actions from '@/redux/features/user/actions.ts';
import {
	selectUser,
	selectUserLoading,
} from '@/redux/features/user/selectors.ts';
import type { Map } from '@/types/map';
import type { ModelsUser } from '@/types/models.ts';
import { Component } from '@robocotik/react';
import * as Sentry from '@sentry/browser';
import styles from './header.module.scss';

interface HeaderProps {
	user: ModelsUser | null;
	isLoading: boolean;
	logoutUser: VoidFunction;
}

export class HeaderComponent extends Component<HeaderProps & WithRouterProps> {
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
			<NavigateButton href="/login" className={styles.loginBtn}>
				Войти
			</NavigateButton>
		);
	}

	render() {
		return (
			<header
				id="header"
				className={styles.header}
				onClick={() => Sentry.captureException(new AggregateError('asdf'))}
			>
				<Link href="/">
					<img src={Logo} alt="На главную" className={styles.logo} />
				</Link>
				<div className={styles.user}>{this.renderUserSection()}</div>
			</header>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	user: selectUser(state),
	isLoading: selectUserLoading(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	logoutUser: () => dispatch(actions.logoutUserAction()),
});

export const Header = connect(
	mapStateToProps,
	mapDispatchToProps,
)(HeaderComponent);
