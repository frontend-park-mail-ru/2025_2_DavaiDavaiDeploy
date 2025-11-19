import clsx from '@/modules/clsx/index.ts';
import { Component } from '@/modules/react';
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
import {
	Avatar,
	Button,
	FileButton,
	Flex,
	Subhead,
	Title,
} from '@/uikit/index';
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
			return <div />;
		}

		const { avatar } = this.props.user;
		const { preview, file, isEditing } = this.state;

		return (
			<Flex className={styles.content} direction="row">
				<Flex className={styles.text} direction="column" justify="between">
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

				<Flex className={styles.changeAvatar} direction="column" align="center">
					{preview ? (
						<Avatar
							level="6"
							className={styles.avatar}
							src={preview}
							alt="Preview"
							preview={true}
						/>
					) : (
						<Avatar
							level="6"
							className={styles.avatar}
							src={avatar}
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
