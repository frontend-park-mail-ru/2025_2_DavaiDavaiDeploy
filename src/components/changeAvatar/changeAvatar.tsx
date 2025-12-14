import { getImageURL } from '@/helpers/getCDNImageHelper/getCDNImageHelper.ts';
import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import actions from '@/redux/features/user/actions';
import {
	selectAvatarChangeError,
	selectIsTwoFactorEnabled,
	selectIsTwoFactorLoading,
	selectNewAvatarLoading,
	selectOTPQRCode,
	selectUser,
} from '@/redux/features/user/selectors.ts';
import type { Map } from '@/types/map';
import type { ModelsUser } from '@/types/models.ts';
import { Component } from '@robocotik/react';
import clsx from 'ddd-clsx';
import {
	Avatar,
	Button,
	FileButton,
	Flex,
	Subhead,
	Switch,
	Title,
} from 'ddd-ui-kit';
import { MODALS } from '../../modules/modals/modals';
import { withModal } from '../../modules/modals/withModal';
import type { WithModalProps } from '../../modules/modals/withModalProps';
import type { WithRouterProps } from '../../modules/router/types/withRouterProps.ts';
import { withRouter } from '../../modules/router/withRouter.tsx';
import { AppToast } from '../toastContainer/toastContainer.tsx';
import styles from './changeAvatar.module.scss';

interface ChangeAvatarProps {
	error: string | null;
	user: ModelsUser;
	loading: boolean;
	OTPActivated: boolean;
	OTPLoading: boolean;
	OTPQR: string | null;
	setAvatar: (file: File) => void;
	activateOTP: () => void;
	deactivateOTP: () => void;
}

const MAX_FILE_SIZE_MB = 8;

const IDEAL_SIZE = 200;
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

class ChangeAvatarComponent extends Component<
	ChangeAvatarProps & WithRouterProps & WithModalProps
> {
	state = {
		file: null,
		error: '',
		preview: null,
		isEditing: false,
		isSuccess: false,
		errorShown: false,
		successShown: false,
		OTPActivated: false,
	};

	handleFileChange = (event: Event) => {
		const target = event.target as HTMLInputElement | null;
		const selected = target?.files?.[0];

		if (!selected) {
			return;
		}

		if (!ALLOWED_TYPES.includes(selected.type)) {
			AppToast.error('Можно загружать только JPG, PNG, WEBP.');
			return;
		}

		if (selected.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
			AppToast.error(`Размер не должен превышать ${MAX_FILE_SIZE_MB} МБ.`);

			return;
		}

		this.setState({
			isEditing: true,
			isSuccess: false,
		});

		const reader = new FileReader();

		reader.onloadend = () => {
			this.setState({
				file: selected,
				error: '',
				preview: reader.result,
			});
		};

		reader.readAsDataURL(selected);
	};

	handleUpload = async () => {
		const { file } = this.state;

		if (!file) {
			this.setState({ error: 'Выберите файл.' });
			return;
		}

		if (this.state.error) {
			return;
		}

		this.setState({
			isEditing: false,
			isSuccess: true,
		});

		this.setState({ errorShown: false, successShown: false });
		this.props.setAvatar(file);
	};

	onUpdate() {
		if (this.props.error && !this.props.loading && !this.state.errorShown) {
			AppToast.error(this.props.error);
			this.setState({ errorShown: true });
			return;
		}

		if (
			this.state.isSuccess &&
			!this.props.loading &&
			!this.state.successShown &&
			!this.props.error
		) {
			AppToast.success('Фото успешно сохранено!');
			this.setState({ successShown: true });
		}

		if (this.state.OTPActivated === false && this.props.OTPActivated === true) {
			this.props.modal.open(MODALS.OTP_MODAL, { qrCode: this.props.OTPQR });
			this.setState({ OTPActivated: true });
		}

		if (this.state.OTPActivated === true && this.props.OTPActivated === false) {
			this.setState({ OTPActivated: false });
		}
	}

	handleToggleOTP = (checked: boolean) => {
		if (this.props.OTPLoading || checked === this.props.OTPActivated) {
			return;
		}

		if (!checked) {
			this.props.deactivateOTP();
			AppToast.success('2FA успешно отключена');
		} else {
			this.props.activateOTP();
		}
	};

	onMount(): void | Promise<void> {
		this.setState({ OTPActivated: this.props.OTPActivated });
	}

	render() {
		if (!this.props.user) {
			return <div />;
		}

		const { avatar } = this.props.user;
		const { preview, file, isEditing } = this.state;

		return (
			<Flex className={styles.content} direction="row">
				<Flex className={styles.text} direction="column" justify="between">
					<Flex className={styles.wrap} direction="column" justify="between">
						<Title className={styles.title} level="4" weight="bold">
							Хочется чего-то нового? Обновите фото профиля
						</Title>
						<Flex className={styles.subtitle} direction="column">
							<Subhead
								color="light"
								level="10"
								opacity="70"
								className={styles.subtitleText}
							>
								{`Идеальный размер файла ${IDEAL_SIZE} * ${IDEAL_SIZE} px`}
							</Subhead>
							<Subhead
								color="light"
								level="10"
								opacity="70"
								className={styles.subtitleText}
							>
								Вес файла: не более 8МБ
							</Subhead>
						</Flex>
					</Flex>
					<Flex className={styles.otp} align="center">
						<Switch
							onChange={this.handleToggleOTP}
							checked={this.props.OTPActivated}
						/>
						<p className={styles.otpText}>Двухфакторная аутентификация</p>
					</Flex>
				</Flex>

				<Flex className={styles.changeAvatar} direction="column" align="center">
					{preview ? (
						<Avatar
							level="6"
							className={styles.avatar}
							src={preview}
							alt="Preview"
						/>
					) : (
						<Avatar
							level="6"
							className={styles.avatar}
							src={getImageURL(avatar)}
							alt="Аватар"
						/>
					)}

					<Flex className={styles.btns} align="center" direction="column">
						<FileButton
							onChange={this.handleFileChange}
							accept=".jpg, .jpeg, .png"
						/>

						<Button
							mode="primary"
							size="xs"
							borderRadius="l"
							className={clsx(styles.btn, {
								[styles.hidden]: !file || !isEditing,
							})}
							onClick={this.handleUpload}
						>
							Сохранить
						</Button>
					</Flex>
				</Flex>
			</Flex>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	user: selectUser(state),
	OTPActivated: selectIsTwoFactorEnabled(state),
	OTPLoading: selectIsTwoFactorLoading(state),
	OTPQR: selectOTPQRCode(state),
	error: selectAvatarChangeError(state),
	loading: selectNewAvatarLoading(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	setAvatar: (file: File) => dispatch(actions.changeAvatarAction(file)),
	activateOTP: () => dispatch(actions.sendActivateOTP()),
	deactivateOTP: () => dispatch(actions.sendDeactivateOTP()),
});

export const ChangeAvatar = compose(
	withRouter,
	withModal,
	connect(mapStateToProps, mapDispatchToProps),
)(ChangeAvatarComponent);
