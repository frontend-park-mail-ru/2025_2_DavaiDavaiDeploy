import Logo from '@/assets/img/logo.svg';
import { NavigateButton } from '@/modules/router/button.tsx';
import { Link } from '@/modules/router/link.tsx';
import type { ModelsUser } from '@/types/models.ts';
import { Component } from '@robocotik/react';
import styles from './header.module.scss';

interface IHeaderState {
	user: ModelsUser | null;
}

export class Header extends Component<{}, IHeaderState> {
	state: IHeaderState = {
		user: null,
	};

	render() {
		return (
			<header id="header" className={styles.header}>
				<Link href="/">
					<img src={Logo} alt="На главную" className={styles.logo} />
				</Link>
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
