import close from '@/assets/img/close.svg';
import userSvg from '@/assets/img/user.svg';
import { InputField } from '@/components/inputField/inputField.tsx';
import { PasswordInputField } from '@/components/passwordInputField/passwordInputField.tsx';
import { getStaticURL } from '@/helpers/getCDNImageHelper/getStaticURL.ts';
import { validateLogin } from '@/helpers/validateLogin/validateLogin.ts';
import { validatePassword } from '@/helpers/validatePassword/validatePassword.ts';
import { compose, connect } from '@/modules/redux/index.ts';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import { Link } from '@/modules/router/link.tsx';
import type { WithRouterProps } from '@/modules/router/types/withRouterProps.ts';
import { withRouter } from '@/modules/router/withRouter.tsx';
import actions from '@/redux/features/user/actions.ts';
import {
	selectUser,
	selectUserError,
} from '@/redux/features/user/selectors.ts';
import type { Map } from '@/types/map';
import type { ModelsUser } from '@/types/models.ts';
import { Component } from '@robocotik/react';
import styles from './loginPage.module.scss';

interface LoginPageProps {
	user: ModelsUser;
	userError: string;
	loginUser: (login: string, password: string) => void;
}

export class LoginPageNotConnected extends Component<
	LoginPageProps & WithRouterProps
> {
	state = {
		username: '',
		password: '',
	};

	handleLoginUser = () => {
		if (
			validateLogin(this.state.username).isValid &&
			validatePassword(this.state.password).isValid
		) {
			this.props.loginUser(this.state.username, this.state.password);
		}
	};

	onUpdate() {
		if (this.props.user) {
			this.props.router.navigate('/');
		}
	}

	render() {
		return (
			<main className={styles.main}>
				<div className={styles.form}>
					<Link className={styles.closeLink} href="/">
						<img src={close} alt="close" />
					</Link>
					<video
						src={getStaticURL('/video/login_signup.mp4')}
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
								validateFn={() => validatePassword(this.state.password)}
								placeholder="Введите пароль"
								value={this.state.password}
								onChange={(value) => this.setState({ password: value })}
							/>
						</div>
						<div className={styles.rightSide__actions}>
							<button
								onClick={this.handleLoginUser}
								className={styles.login__button}
							>
								Войти
							</button>
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

const mapStateToProps = (state: State): Map => ({
	user: selectUser(state),
	userError: selectUserError(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	loginUser: (login: string, password: string) =>
		dispatch(actions.loginUserAction(login, password)),
});

export const LoginPage = compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
)(LoginPageNotConnected);
