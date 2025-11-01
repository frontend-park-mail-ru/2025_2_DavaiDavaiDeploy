import exit from '@/assets/img/exit.svg';
import Logo from '@/assets/img/logo.svg';
import { getStaticURL } from '@/helpers/getCDNImageHelper/getStaticURL.ts';
import { connect } from '@/modules/redux/index.ts';
import type { State } from '@/modules/redux/types/store.ts';
import { NavigateButton } from '@/modules/router/button.tsx';
import { Link } from '@/modules/router/link.tsx';
import type { WithRouterProps } from '@/modules/router/types/withRouterProps.ts';
import { selectUser } from '@/redux/features/user/selectors.ts';
import type { Map } from '@/types/map';
import type { ModelsUser } from '@/types/models.ts';
import { Component } from '@robocotik/react';
import type { Dispatch } from '../../modules/redux/types/actions.ts';
import actions from '../../redux/features/user/actions.ts';
import styles from './header.module.scss';

interface ModalProps {
	user: ModelsUser | null;
	logoutUser: () => {};
}

class AvatarModal extends Component<ModalProps> {
	handleLogout = (e: Event) => {
		e.preventDefault();
		this.props.logoutUser();
	};

	render() {
		return (
			<div className={styles.avatarActions}>
				<img
					src={'https://cdn.ddfilms-static.ru' + this.props.user?.avatar}
					alt={this.props.user?.login}
					className={styles.avatar}
				/>
				<p className={styles.avatarActions__login}>{this.props.user?.login}</p>
				<Link className={styles.avatarActions__link} href="/profile">
					Мой профиль
				</Link>

				<button className={styles.logoutButton} onClick={this.handleLogout}>
					<img src={exit} alt="logout" />
					Выйти
				</button>
			</div>
		);
	}
}

interface HeaderProps {
	user: ModelsUser | null;
	logoutUser: () => {};
}

export class HeaderComponent extends Component<HeaderProps & WithRouterProps> {
	render() {
		return (
			<header id="header" className={styles.header}>
				<Link href="/">
					<img src={Logo} alt="На главную" className={styles.logo} />
				</Link>
				<div className={styles.user}>
					{this.props.user ? (
						<div className={styles.userInfo}>
							<p className={styles.username}>{this.props.user?.login}</p>
							<div className={styles.avatarContainer}>
								<img
									src={getStaticURL(this.props.user?.avatar)}
									alt={this.props.user?.login}
									className={styles.avatar}
								/>
								<AvatarModal
									user={this.props.user}
									logoutUser={this.props.logoutUser}
								/>
							</div>
						</div>
					) : (
						<>
							<p className={styles.text1}>Нет аккаунта?</p>
							<Link href="/register" className={styles.text2}>
								Зарегистрироваться
							</Link>
							<NavigateButton href="/login" className={styles.loginBtn}>
								Войти
							</NavigateButton>
						</>
					)}
				</div>
			</header>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	user: selectUser(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	logoutUser: () => dispatch(actions.logoutUserAction()),
});

export const Header = connect(
	mapStateToProps,
	mapDispatchToProps,
)(HeaderComponent);
