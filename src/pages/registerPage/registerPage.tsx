import close from '@/assets/img/close.svg';
import userSvg from '@/assets/img/user.svg';
import { InputField } from '@/components/inputField/inputField.tsx';
import { PasswordInputField } from '@/components/passwordInputField/passwordInputField.tsx';
import { AppToast } from '@/components/toastContainer/toastContainer';
import { getStaticURL } from '@/helpers/getCDNImageHelper/getStaticURL.ts';
import { validateLogin } from '@/helpers/validateLogin/validateLogin.ts';
import { validatePassword } from '@/helpers/validatePassword/validatePassword.ts';
import { validatePasswordConfirm } from '@/helpers/validatePasswordConfirm/validatePasswordConfirm.ts';
import { compose, connect } from '@/modules/redux';
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
import styles from './registerPage.module.scss';

interface RegistrationPageProps {
	user: ModelsUser;
	userError: string;
	registerUser: (login: string, password: string) => void;
}

export class RegisterPageNotConnected extends Component<
	RegistrationPageProps & WithRouterProps
> {
	state = {
		username: '',
		password: '',
		repeatPassword: '',
		showVideo: window.innerWidth >= 768,
		validationErrors: {
			username: '',
			password: '',
			repeatPassword: '',
		},
		errorShown: false,
	};

	handleResize = () => {
		if (window.innerWidth < 768) {
			this.setState({ showVideo: false });
		} else {
			this.setState({ showVideo: true });
		}
	};

	onMount() {
		this.updateProps({ ...this.props, userError: '' });
		window.addEventListener('resize', this.handleResize);
	}

	onUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	validateFields() {
		const usernameValidation = validateLogin(this.state.username);
		const passwordValidation = validatePassword(this.state.password);
		const repeatPasswordValidation = validatePasswordConfirm(
			this.state.password,
			this.state.repeatPassword,
		);

		this.setState({
			...this.state,
			validationErrors: {
				username: usernameValidation.message,
				password: passwordValidation.message,
				repeatPassword: repeatPasswordValidation.message,
			},
		});

		return (
			usernameValidation.isValid &&
			passwordValidation.isValid &&
			repeatPasswordValidation.isValid
		);
	}

	handleRegisterUser = () => {
		if (this.validateFields()) {
			this.setState({ errorShown: false });
			this.props.registerUser(this.state.username, this.state.password);
		}
	};

	onUpdate() {
		if (this.props.user) {
			const redirectPath =
				'from' in this.props.router.params
					? this.props.router.params.from
					: '/';

			this.updateProps({ userError: '' });
			this.props.router.navigate(redirectPath);
		}

		if (this.props.userError && !this.state.errorShown) {
			AppToast.error(this.props.userError);
			this.setState({ errorShown: true });
		}
	}

	onFieldChange(
		value: string,
		field: 'username' | 'password' | 'repeatPassword',
	) {
		this.setState({ ...this.state, [field]: value });

		if (this.props.userError) {
			this.props.userError = '';
		}

		if (field === 'username') {
			this.setState({
				...this.state,
				validationErrors: {
					...this.state.validationErrors,
					[field]: validateLogin(this.state[field]).message,
				},
			});
		} else {
			this.validateFields();
		}
	}
	path =
		'from' in this.props.router.params
			? '/login?from=' + this.props.router.params.from
			: '/login';

	render() {
		return (
			<main className={styles.main}>
				<div className={styles.form}>
					<Link className={styles.closeLink} href="/">
						<img src={close} alt="close" />
					</Link>
					{this.state.showVideo && (
						<video
							src={getStaticURL('/video/login_signup.mp4')}
							alt="loginVideo"
							className={styles.loginImg}
							autoplay
							muted
							loop
							playsinline
							disablePictureInPicture
							controlsList="nodownload noremoteplayback"
						/>
					)}

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
								errorMessage={this.state.validationErrors.username}
								value={this.state.username}
								onChange={(value) => this.onFieldChange(value, 'username')}
							/>
							<PasswordInputField
								label="Пароль"
								defaultValue=""
								placeholder="Введите пароль"
								errorMessage={this.state.validationErrors.password}
								value={this.state.password}
								onChange={(value) => this.onFieldChange(value, 'password')}
							/>
							<PasswordInputField
								label="Подтверждение пароля"
								defaultValue=""
								errorMessage={this.state.validationErrors.repeatPassword}
								placeholder="Повторите пароль"
								value={this.state.repeatPassword}
								onChange={(value) =>
									this.onFieldChange(value, 'repeatPassword')
								}
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
								<Link className={styles.register} href={this.path}>
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
	registerUser: (login: string, password: string) =>
		dispatch(actions.registerUserAction(login, password)),
});

export const RegisterPage = compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
)(RegisterPageNotConnected);
