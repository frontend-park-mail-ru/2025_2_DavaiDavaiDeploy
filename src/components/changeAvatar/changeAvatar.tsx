import { getImageURL } from '@/helpers/getCDNImageHelper/getCDNImageHelper.ts';
import clsx from '@/modules/clsx/index.ts';
import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import actions from '@/redux/features/user/actions';
import {
	selectAvatarChangeError,
	selectUser,
} from '@/redux/features/user/selectors.ts';
import type { Map } from '@/types/map';
import type { ModelsUser } from '@/types/models.ts';
import { Component } from '@robocotik/react';
import type { WithRouterProps } from '../../modules/router/types/withRouterProps.ts';
import { withRouter } from '../../modules/router/withRouter.tsx';
import styles from './changeAvatar.module.scss';

interface ChangeAvatarProps {
	error: string | null;
	user: ModelsUser;
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
	};

	handleFileChange = (event: Event) => {
		const target = event.target as HTMLInputElement | null;
		const selected = target?.files?.[0];

		if (!selected) {
			return;
		}

		if (!ALLOWED_TYPES.includes(selected.type)) {
			this.setState({ error: 'Можно загружать только JPG, PNG, WEBP.' });
			return;
		}

		if (selected.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
			this.setState({
				error: `Размер не должен превышать ${MAX_FILE_SIZE_MB} МБ.`,
			});

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

		this.props.setAvatar(file);
	};

	render() {
		if (!this.props.user) {
			return <div></div>;
		}

		const { avatar } = this.props.user;
		const { preview, error, file, isEditing, isSuccess } = this.state;
		const avatarURL = getImageURL(avatar);

		return (
			<div className={styles.content}>
				<div className={styles.text}>
					<h1 className={styles.title}>
						Хочется чего-то нового? Обновите фото профиля
					</h1>

					{error && <p className={styles.error}>{error}</p>}
					{isSuccess && !this.props.error && (
						<p className={styles.success}>Фото успешно сохранено!</p>
					)}
					{!error && (!isSuccess || !preview) && (
						<div className={styles.subtitle}>
							<p>{`Идеальный размер файла ${IDEAL_SIZE} * ${IDEAL_SIZE} px`}</p>
							<p>Вес файла: не более 8МБ</p>
						</div>
					)}
				</div>

				<div className={styles.changeAvatar}>
					{preview ? (
						<img className={styles.avatar} src={preview} alt="Preview" />
					) : (
						<img className={styles.avatar} src={avatarURL} alt="Аватар"></img>
					)}

					<div className={styles.btns}>
						<div className={styles.wrapper}>
							<button className={styles.btn} onClick={this.handleUpload}>
								Изменить фото
							</button>
							<input
								className={styles.input}
								type="file"
								accept="image/*"
								onChange={this.handleFileChange}
							></input>
						</div>

						<button
							className={clsx(styles.btn, {
								[styles.hidden]: !file || !isEditing,
							})}
							onClick={this.handleUpload}
						>
							Сохранить
						</button>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	user: selectUser(state),
	error: selectAvatarChangeError(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	setAvatar: (file: File) => dispatch(actions.changeAvatarAction(file)),
});

export const ChangeAvatar = compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
)(ChangeAvatarComponent);
