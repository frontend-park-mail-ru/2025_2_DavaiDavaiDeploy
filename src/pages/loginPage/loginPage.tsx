import { Component } from '@robocotik/react';
import { InputField } from '../../components/inputField/inputField.tsx';
import { PasswordInputField } from '../../components/passwordInputField/passwordInputField.tsx';
import { Link } from '../../modules/router/link.tsx';
import styles from './loginPage.module.scss';
import userSvg from '@/assets/img/user.svg';

export class LoginPage extends Component {
	state = {
		username: '',
		password: '',
		repeatPassword: '',
	};

	render() {
		return (
			<main className={styles.main}>
				<div className={styles.form}>
					<video
						src="https://cdn.ddfilms-static.ru/static/video/login_signup.mp4"
						alt="loginVideo"
						className={styles.loginImg}
						autoplay
						muted
						loop
					/>
					<div className={styles.rightSide}>
						<div className={styles.rightSide__titles}>
							<h1 className={styles.rightSide__title}>С возвращением!</h1>
							<h3 className={styles.rightSide__subtitle}>
								Войти, чтобы получить доступ ко всем возможностям
							</h3>
						</div>
						<div className={styles.rightSide__inputFields}>
							<InputField
								label="Имя пользователя"
								defaultValue=""
								preIconSrc={userSvg}
								placeholder="Введите логин"
								value={this.state.username}
								onChange={(value) => this.setState({ username: value })}
							/>
							<PasswordInputField
								label="Пароль"
								defaultValue=""
								placeholder="Введите пароль"
								value={this.state.password}
								onChange={(value) => this.setState({ password: value })}
							/>
						</div>
						<div className={styles.rightSide__actions}>
							<button className={styles.login__button}>Войти</button>
							<p className={styles.register__button}>
								У меня нет аккаунта.{' '}
								<Link className={styles.register} href="/register">
									Регистрация
								</Link>
							</p>
						</div>
					</div>
				</div>
			</main>
		);
	}
}
