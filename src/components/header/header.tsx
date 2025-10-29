import Logo from '@/assets/img/logo.svg';
import { Link } from '@/modules/router/link.tsx';
import { Component } from '@robocotik/react';
import styles from './header.module.scss';

export class Header extends Component {
	render() {
		return (
			<header id="header" className={styles.header}>
				<Link href={`/`}>
					<img src={Logo} alt="На главную" className={styles.logo} />
				</Link>
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
