import { Component } from '@react';
import styles from './header.module.scss';
import Logo from '@/assets/img/logo.svg';

export class Header extends Component {
	render() {
		return (
			<header id="header" className={styles.header}>
				<img src={Logo} alt="На главную" className={styles.logo} />
				<div className={styles.user}>
					<p className={styles.text1}>Нет аккаунта?</p>
					<p className={styles.text2}>Зарегистрироваться</p>
					<button id="login-button" className={styles.loginBtn}>
						Войти
					</button>
				</div>
			</header>
		);
	}
}
