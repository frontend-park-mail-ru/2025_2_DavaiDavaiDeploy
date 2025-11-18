import { getImageURL } from '@/helpers/getCDNImageHelper/getCDNImageHelper.ts';
import clsx from '@/modules/clsx/index.ts';
import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import actions from '@/redux/features/user/actions';
import {
	selectAvatarChangeError,
	selectNewAvatarLoading,
	selectUser,
} from '@/redux/features/user/selectors.ts';
import type { Map } from '@/types/map';
import type { ModelsUser } from '@/types/models.ts';
import { Avatar } from '@/uikit/avatar/avatar.tsx';
import { Button } from '@/uikit/button/button.tsx';
import { Subhead } from '@/uikit/subhead/subhead.tsx';
import { Title } from '@/uikit/title/title.tsx';
import { Component } from '@robocotik/react';
import type { WithRouterProps } from '../../modules/router/types/withRouterProps.ts';
import { withRouter } from '../../modules/router/withRouter.tsx';
import { AppToast } from '../toastContainer/toastContainer.tsx';
import styles from './changeAvatar.module.scss';

interface ChangeAvatarProps {
	error: string | null;
	user: ModelsUser;
	loading: boolean;
	setAvatar: (file: File) => void;
}

const MAX_FILE_SIZE_MB = 8;

const IDEAL_SIZE = 200;
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

class ChangeAvatarComponent extends Component<
	ChangeAvatarProps & WithRouterProps
> {
	state = {
		file: null,
		error: '',
		preview: null,
		isEditing: false,
		isSuccess: false,
		errorShown: false,
		successShown: false,
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
	}

	render() {
		if (!this.props.user) {
			return <div></div>;
		}

		const { avatar } = this.props.user;
		const { preview, file, isEditing } = this.state;
		const avatarURL = getImageURL(avatar);

		return (
			<div className={styles.content}>
				<div className={styles.text}>
					<Title className={styles.title} size="3xl" weight="bold">
						Хочется чего-то нового? Обновите фото профиля
					</Title>
					<div className={styles.subtitle}>
						<Subhead
							color="light"
							size="xs"
							opacity="70"
							className={styles.subtitleText}
						>
							{`Идеальный размер файла ${IDEAL_SIZE} * ${IDEAL_SIZE} px`}
						</Subhead>
						<Subhead
							color="light"
							size="xs"
							opacity="70"
							className={styles.subtitleText}
						>
							Вес файла: не более 8МБ
						</Subhead>
					</div>
				</div>

				<div className={styles.changeAvatar}>
					{preview ? (
						<Avatar
							size="xl"
							className={styles.avatar}
							src={preview}
							alt="Preview"
						/>
					) : (
						<Avatar
							size="xl"
							className={styles.avatar}
							src={avatarURL}
							alt="Аватар"
						/>
					)}

					<div className={styles.btns}>
						<div className={styles.wrapper}>
							<Button
								mode="primary"
								size="xs"
								borderRadius="l"
								className={styles.btn}
								onClick={this.handleUpload}
							>
								Изменить фото
							</Button>
							<input
								className={styles.input}
								type="file"
								accept=".jpg, .jpeg, .png"
								onChange={this.handleFileChange}
							/>
						</div>

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
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	user: selectUser(state),
	error: selectAvatarChangeError(state),
	loading: selectNewAvatarLoading(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	setAvatar: (file: File) => dispatch(actions.changeAvatarAction(file)),
});

export const ChangeAvatar = compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
)(ChangeAvatarComponent);
