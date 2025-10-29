import { Component } from '@robocotik/react';
import { validatePassword } from '../../helpers/validatePassword/validatePassword.ts';
import { validatePasswordConfirm } from '../../helpers/validatePasswordConfirm/validatePasswordConfirm.ts';
import styles from './registerPage.module.scss';
import close from '@/assets/img/close.svg';
import userSvg from '@/assets/img/user.svg';
import { InputField } from '@/components/inputField/inputField.tsx';
import { PasswordInputField } from '@/components/passwordInputField/passwordInputField.tsx';
import { Link } from '@/modules/router/link.tsx';

export class RegisterPage extends Component {
	state = {
		username: '',
		password: '',
		repeatPassword: '',
	};

	render() {
		return (
			<main className={styles.main}>
				<div className={styles.form}>
					<Link className={styles.closeLink} href="/">
						<img src={close} alt="close" />
					</Link>
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
							<h1 className={styles.rightSide__title}>Создать аккаунт</h1>
							<h3 className={styles.rightSide__subtitle}>
								Присоединяйтесь к сообществу киноманов
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
								validateFn={() => validatePassword(this.state.password)}
								value={this.state.password}
								onChange={(value) => this.setState({ password: value })}
							/>
							<PasswordInputField
								label="Подтверждение пароля"
								defaultValue=""
								validateFn={() =>
									validatePasswordConfirm(
										this.state.password,
										this.state.repeatPassword,
									)
								}
								placeholder="Повторите пароль"
								value={this.state.repeatPassword}
								onChange={(value) => this.setState({ repeatPassword: value })}
							/>
						</div>
						<div className={styles.rightSide__actions}>
							<button className={styles.login__button}>
								Зарегистрироваться
							</button>
							<p className={styles.register__button}>
								Уже есть аккаунт?{' '}
								<Link className={styles.register} href="/login">
									Войти
								</Link>
							</p>
						</div>
					</div>
				</div>
			</main>
		);
	}
}
