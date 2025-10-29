import { Component } from '@robocotik/react';
import styles from './header.module.scss';
import Logo from '@/assets/img/logo.svg';
import { Link } from '@/modules/router/link.tsx';
import { selectUser } from '@/redux/features/user/selectors.ts';
import { store } from '@/redux/store.ts';
import type { ModelsUser } from '@/types/models.ts';

interface IHeaderState {
	user: ModelsUser | null;
}

export class Header extends Component<{}, IHeaderState> {
	state: IHeaderState = {
		user: null,
	};

	onMount(): void | Promise<void> {
		this.state.user = selectUser(store.getState());
	}

	render() {
		return (
			<header id="header" className={styles.header}>
				<img src={Logo} alt="На главную" className={styles.logo} />
				<div className={styles.user}>
					{this.state.user ? (
						<div>
							<p className={styles.username}>{this.state.user.login}</p>
							<img
								src={this.state.user.avatar}
								alt={this.state.user.login}
								className={styles.avatar}
							/>
						</div>
					) : (
						<>
							<p className={styles.text1}>Нет аккаунта?</p>
							<Link href="/register" className={styles.text2}>
								Зарегистрироваться
							</Link>
							<button id="login-button" className={styles.loginBtn}>
								Войти
							</button>
						</>
					)}
				</div>
			</header>
		);
	}
}
