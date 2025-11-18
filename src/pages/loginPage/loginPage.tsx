import close from '@/assets/img/close.svg';
import userSvg from '@/assets/img/user.svg';
import { PasswordInputField } from '@/components/passwordInputField/passwordInputField.tsx';
import { AppToast } from '@/components/toastContainer/toastContainer';
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
	selectUserErrorNot401,
} from '@/redux/features/user/selectors.ts';
import type { Map } from '@/types/map';
import type { ModelsUser } from '@/types/models.ts';
import { Button, Flex, FormItem, Headline, Title } from '@/uikit/index';
import { Component } from '@robocotik/react';
import { getPathWithFrom } from '../../helpers/getPathWithFrom/getPathWithFrom.ts';
import { Redirect } from '../../modules/router/redirect';
import { store } from '../../redux/store';
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
		showVideo: window.innerWidth >= 768,
		validationErrors: {
			username: '',
			password: '',
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

	validateFields() {
		const usernameValidation = validateLogin(this.state.username);
		const passwordValidation = validatePassword(this.state.password);

		this.setState({
			...this.state,
			validationErrors: {
				username: usernameValidation.message,
				password: passwordValidation.message,
			},
		});

		return usernameValidation.isValid && passwordValidation.isValid;
	}

	onMount() {
		store.dispatch(actions.resetUserError());
		window.addEventListener('resize', this.handleResize);
	}

	onUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	handleLoginUser = () => {
		if (this.validateFields()) {
			this.setState({ errorShown: false });
			this.props.loginUser(this.state.username, this.state.password);
		}
	};

	onUpdate() {
		if (this.props.user) {
			store.dispatch(actions.resetUserError());
		}

		if (this.props.userError && !this.state.errorShown) {
			AppToast.error(this.props.userError);
			this.setState({ errorShown: true });
		}
	}

	onFieldChange(value: string, field: 'username' | 'password') {
		this.setState({ ...this.state, [field]: value });

		if (this.props.userError) {
			this.props.userError = '';
		}

		this.validateFields();
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
					align="center"
					justify="center"
				>
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
								С возвращением!
							</Title>
							<Headline
								className={styles.rightSide__subtitle}
								color="light"
								level="9"
							>
								Войти, чтобы получить доступ ко всем возможностям
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
								errorMessage={this.state.validationErrors.password}
								placeholder="Введите пароль"
								value={this.state.password}
								onChange={(value) => this.onFieldChange(value, 'password')}
							/>
						</Flex>
						<Flex className={styles.rightSide__actions} direction="column">
							<Button
								mode="primary"
								onClick={this.handleLoginUser}
								className={styles.login__button}
								level="9"
								borderRadius="lg"
							>
								Войти
							</Button>
							<div className={styles.register__button}>
								У меня нет аккаунта.{' '}
								<Link
									className={styles.register}
									href={getPathWithFrom('register', this.props.router.params)}
								>
									Регистрация
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
	userError: selectUserErrorNot401(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	loginUser: (login: string, password: string) =>
		dispatch(actions.loginUserAction(login, password)),
});

export const LoginPage = compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
)(LoginPageNotConnected);
