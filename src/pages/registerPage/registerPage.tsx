import { Component } from '@robocotik/react';
import { validateLogin } from '../../helpers/validateLogin/validateLogin.ts';
import { validatePassword } from '../../helpers/validatePassword/validatePassword.ts';
import { validatePasswordConfirm } from '../../helpers/validatePasswordConfirm/validatePasswordConfirm.ts';
import { RouterContext } from '../../modules/router/routerContext.ts';
import styles from './registerPage.module.scss';
import close from '@/assets/img/close.svg';
import userSvg from '@/assets/img/user.svg';
import { InputField } from '@/components/inputField/inputField.tsx';
import { PasswordInputField } from '@/components/passwordInputField/passwordInputField.tsx';
import { connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import { Link } from '@/modules/router/link.tsx';
import actions from '@/redux/features/user/actions.ts';
import {
	selectUser,
	selectUserError,
} from '@/redux/features/user/selectors.ts';
import type { Map } from '@/types/map';
import type { ModelsUser } from '@/types/models.ts';

interface RegistrationPageProps {
	user: ModelsUser;
	userError: string;
	useRegisterUser: (login: string, password: string) => void;
}

export class RegisterPageNotConnected extends Component<RegistrationPageProps> {
	static readonly contextType = RouterContext;

	state = {
		username: '',
		password: '',
		repeatPassword: '',
	};

	handleRegisterUser = () => {
		if (
			validateLogin(this.state.username).isValid &&
			validatePassword(this.state.password).isValid &&
			validatePasswordConfirm(this.state.password, this.state.repeatPassword)
				.isValid
		) {
			this.props.useRegisterUser(this.state.username, this.state.password);
		}
	};

	// onUpdate() {
	// 	// Проверяем, изменился ли user (это значит, что регистрация завершилась)
	// 	if (this.props.user) {
	// 		if (!this.props.userError) {
	// 			alert('НАВИГИРУЮ НА /')
	// 			this.context.navigate('/');
	// 		} else {
	// 			// Показываем ошибку
	// 			alert('Произошла ошибка регистрации: ' + this.props.userError);
	// 		}
	// 	}
	// }

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
							<button
								onClick={this.handleRegisterUser}
								className={styles.login__button}
							>
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

const mapStateToProps = (state: State): Map => ({
	user: selectUser(state),
	userError: selectUserError(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	useRegisterUser: (login: string, password: string) =>
		dispatch(actions.registerUserAction(login, password)),
});

export const RegisterPage = connect(
	mapStateToProps,
	mapDispatchToProps,
)(RegisterPageNotConnected);
