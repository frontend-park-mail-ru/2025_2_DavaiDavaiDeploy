import close from '@/assets/img/close.svg';
import userSvg from '@/assets/img/user.svg';
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
import { Button, Flex, FormItem, Headline, Title } from '@/uikit/index';
import { Component } from '@robocotik/react';
import { SMALL_TABLET_MIN_WIDTH } from '../../consts/adaptivity';
import { getPathWithFrom } from '../../helpers/getPathWithFrom/getPathWithFrom.ts';
import { withAdaptivity } from '../../modules/adaptivity/withAdaptivity';
import type { WithAdaptivityProps } from '../../modules/adaptivity/withAdaptivityProps';
import { Redirect } from '../../modules/router/redirect.tsx';
import { store } from '../../redux/store';
import styles from './registerPage.module.scss';

interface RegistrationPageProps {
	user: ModelsUser;
	userError: string;
	registerUser: (login: string, password: string) => void;
}

export class RegisterPageNotConnected extends Component<
	RegistrationPageProps & WithRouterProps & WithAdaptivityProps
> {
	state = {
		username: '',
		password: '',
		repeatPassword: '',
		validationErrors: {
			username: '',
			password: '',
			repeatPassword: '',
		},
		errorShown: false,
	};

	onMount() {
		store.dispatch(actions.resetUserError());
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
			store.dispatch(actions.resetUserError());
		}

		if (
			this.props.userError &&
			!this.state.errorShown &&
			!this.props.userError.includes('401')
		) {
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

	render() {
		if (this.props.user) {
			const redirectPath =
				'from' in this.props.router.params
					? this.props.router.params.from
					: '/';

			return <Redirect to={redirectPath} />;
		}

		return (
			<div className={styles.main}>
				<Flex
					className={styles.form}
					direction="row"
					justify="center"
					align="center"
				>
					<Link className={styles.closeLink} href="/">
						<img src={close} alt="close" />
					</Link>
					{this.props.adaptivity.viewWidth > SMALL_TABLET_MIN_WIDTH && (
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

					<Flex
						className={styles.rightSide}
						direction="column"
						justify="between"
					>
						<div className={styles.rightSide__titles}>
							<Title
								className={styles.rightSide__title}
								level="3"
								weight="bold"
							>
								Создать аккаунт
							</Title>
							<Headline
								className={styles.rightSide__subtitle}
								color="light"
								level="9"
							>
								Присоединяйтесь к сообществу киноманов
							</Headline>
						</div>
						<Flex className={styles.rightSide__inputFields} direction="column">
							<FormItem
								mode="primary"
								top="Имя пользователя"
								defaultValue=""
								before={
									<img src={userSvg} alt="icon" className={styles.inputIcon} />
								}
								placeholder="Введите логин"
								bottom={this.state.validationErrors.username}
								status={
									this.state.validationErrors.username ? 'error' : 'default'
								}
								value={this.state.username}
								onChange={(value) => this.onFieldChange(value, 'username')}
							/>

							<PasswordInputField
								mode="primary"
								label="Пароль"
								defaultValue=""
								placeholder="Введите пароль"
								errorMessage={this.state.validationErrors.password}
								value={this.state.password}
								onChange={(value) => this.onFieldChange(value, 'password')}
							/>
							<PasswordInputField
								mode="primary"
								label="Подтверждение пароля"
								defaultValue=""
								errorMessage={this.state.validationErrors.repeatPassword}
								placeholder="Повторите пароль"
								value={this.state.repeatPassword}
								onChange={(value) =>
									this.onFieldChange(value, 'repeatPassword')
								}
							/>
						</Flex>
						<Flex className={styles.rightSide__actions} direction="column">
							<Button
								mode="primary"
								onClick={this.handleRegisterUser}
								className={styles.login__button}
								size="m"
								borderRadius="lg"
							>
								Зарегистрироваться
							</Button>
							<div className={styles.register__button}>
								Уже есть аккаунт?{' '}
								<Link
									className={styles.register}
									href={getPathWithFrom('login', this.props.router.params)}
								>
									Войти
								</Link>
							</div>
						</Flex>
					</Flex>
				</Flex>
			</div>
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
	withAdaptivity,
	connect(mapStateToProps, mapDispatchToProps),
)(RegisterPageNotConnected);
