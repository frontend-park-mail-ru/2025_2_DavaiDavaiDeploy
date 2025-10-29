import { Component } from '@robocotik/react';
import styles from './header.module.scss';
import Logo from '@/assets/img/logo.svg';
import { Link } from '@/modules/router/link.tsx';

export class Header extends Component {
	render() {
		return (
			<header id="header" className={styles.header}>
				<img src={Logo} alt="На главную" className={styles.logo} />
				<div className={styles.user}>
					<p className={styles.text1}>Нет аккаунта?</p>
					<Link href="/register" className={styles.text2}>
						Зарегистрироваться
					</Link>
					<button id="login-button" className={styles.loginBtn}>
						Войти
					</button>
				</div>
			</header>
		);
	}
}
