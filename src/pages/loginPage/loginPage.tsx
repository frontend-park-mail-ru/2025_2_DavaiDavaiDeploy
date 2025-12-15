import close from '@/assets/close.svg';
import userSvg from '@/assets/user.svg';
import { PasswordInputField } from '@/components/passwordInputField/passwordInputField.tsx';
import { AppToast } from '@/components/toastContainer/toastContainer';
import { ERROR_CODES } from '@/consts/errorCodes';
import { getStaticURL } from '@/helpers/getCDNImageHelper/getStaticURL.ts';
import { getPathWithFrom } from '@/helpers/getPathWithFrom/getPathWithFrom.ts';
import { validateLogin } from '@/helpers/validateLogin/validateLogin.ts';
import { validatePassword } from '@/helpers/validatePassword/validatePassword.ts';
import { compose, connect } from '@/modules/redux/index.ts';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import { Link } from '@/modules/router/link.tsx';
import { Redirect } from '@/modules/router/redirect';
import type { WithRouterProps } from '@/modules/router/types/withRouterProps.ts';
import { withRouter } from '@/modules/router/withRouter.tsx';
import actions from '@/redux/features/user/actions.ts';
import {
	selectIsTwoFactorEnabled,
	selectUser,
	selectUserErrorNot401,
	selectvkidError,
} from '@/redux/features/user/selectors.ts';
import { store } from '@/redux/store';
import type { Map } from '@/types/map';
import type { ModelsUser } from '@/types/models.ts';
import { Component, createRef } from '@robocotik/react';
import * as VKID from '@vkid/sdk';
import {
	Button,
	Flex,
	FormItem,
	Headline,
	Logo,
	OTPInput,
	Title,
} from 'ddd-ui-kit';
import { MODALS } from '../../modules/modals/modals';
import { withModal } from '../../modules/modals/withModal';
import type { WithModalProps } from '../../modules/modals/withModalProps';
import styles from './loginPage.module.scss';

interface LoginPageProps {
	user: ModelsUser;
	userError: string;
	hasOTP: boolean;
	vkidError: string;
	vkAuthLogin: (access_token: string, login?: string) => void;
	clearvkidError: () => void;
	loginUser: (login: string, password: string) => void;
	loginUserWithOTP: (login: string, password: string, otp: string) => void;
}

export class LoginPageNotConnected extends Component<
	LoginPageProps & WithRouterProps & WithModalProps
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
		accessToken: '',
	};
	oneTapContainer = createRef<HTMLButtonElement>();

	handleResize = () => {
		if (window.innerWidth < 768) {
			this.setState({ showVideo: false });
		} else {
			this.setState({ showVideo: true });
		}
	};

	hasOTP() {
		return this.props.userError === ERROR_CODES.PRECONDITION_FAILED.toString();
	}

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
		const oneTap = new VKID.OneTap();
		oneTap
			.render({
				container: this.oneTapContainer.current as HTMLElement,
				styles: {
					borderRadius: 16,
					height: 56,
				},
			})
			.on(
				VKID.OneTapInternalEvents.LOGIN_SUCCESS,
				(payload: VKID.AuthResponse) => {
					const code = payload.code;
					const deviceId = payload.device_id;
					VKID.Auth.exchangeCode(code, deviceId)
						.then(async (data) => {
							this.state.accessToken = data.access_token;
							this.props.vkAuthLogin(this.state.accessToken);
						})

						.catch(() => {
							AppToast.error('Не удалось войти через ВКонтакте');
						});
				},
			);
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

		if (
			this.props.userError &&
			!this.state.errorShown &&
			!this.hasOTP() &&
			!this.props.userError.includes('401')
		) {
			AppToast.error(this.props.userError);
			this.setState({ errorShown: true });
		}

		if (
			this.props.vkidError &&
			this.props.vkidError === ERROR_CODES.PRECONDITION_FAILED.toString()
		) {
			this.props.modal.open(MODALS.VK_ID_MODAL, {
				access_token: this.state.accessToken,
				onSubmit: this.props.vkAuthLogin,
				handleClearError: this.props.clearvkidError,
			});
		}
	}

	onFieldChange(value: string, field: 'username' | 'password') {
		this.setState({ ...this.state, [field]: value });

		if (this.props.userError) {
			this.props.userError = '';
		}

		this.validateFields();
	}

	handleOTPFinish = (otp: string) => {
		this.props.loginUserWithOTP(this.state.username, this.state.password, otp);
	};

	render() {
		const redirectPath =
			'from' in this.props.router.params ? this.props.router.params.from : '/';

		if (this.props.user) {
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
					<Link className={styles.closeLink} href={redirectPath}>
						<img src={close} alt="close" />
					</Link>
					{this.state.showVideo && (
						<div className={styles.videoContainer}>
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
							<Logo level="7" className={styles.logo} />
						</div>
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
								before={
									<img src={userSvg} alt="icon" className={styles.inputIcon} />
								}
								placeholder="Введите логин"
								bottom={this.state.validationErrors.username}
								status={
									this.state.validationErrors.username ? 'error' : 'default'
								}
								value={this.state.username}
								onChange={(value: string) =>
									this.onFieldChange(value, 'username')
								}
								name="login"
							/>
							<PasswordInputField
								mode="primary"
								label="Пароль"
								defaultValue=""
								errorMessage={this.state.validationErrors.password}
								placeholder="Введите пароль"
								value={this.state.password}
								onChange={(value) => this.onFieldChange(value, 'password')}
								name="password"
							/>

							{this.hasOTP() && (
								<div className={styles.otpContainer}>
									<div className={styles.otpContent}>
										<Title level="6">Введите OTP код</Title>
										<OTPInput length={6} onFinish={this.handleOTPFinish} />
									</div>
								</div>
							)}
						</Flex>
						<Flex className={styles.rightSide__actions} direction="column">
							<Button
								mode="primary"
								onClick={this.handleLoginUser}
								className={styles.login__button}
								size="m"
								borderRadius="lg"
								type="submit"
							>
								Войти
							</Button>
							<div ref={this.oneTapContainer}></div>
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
	hasOTP: selectIsTwoFactorEnabled(state),
	vkidError: selectvkidError(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	loginUser: (login: string, password: string) =>
		dispatch(actions.loginUserAction(login, password)),
	loginUserWithOTP: (login: string, password: string, otp: string) =>
		dispatch(actions.loginUserAction(login, password, otp)),
	vkAuthLogin: (access_token: string, login?: string) =>
		dispatch(actions.vkidLoginUserAction(access_token, login)),
	clearvkidError: () => dispatch(actions.clearvkidErrorAction()),
});

export const LoginPage = compose(
	withRouter,
	withModal,
	connect(mapStateToProps, mapDispatchToProps),
)(LoginPageNotConnected);
