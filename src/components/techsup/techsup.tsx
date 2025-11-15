import { validateTechSup } from '@/helpers/validateTechSupHelper/validateTechSupHelper';
import clsx from '@/modules/clsx';
import { Component, createRef } from '@robocotik/react';
import { AppToast } from '../toastContainer/toastContainer';
import styles from './techsup.module.scss';

const MAX_FILE_SIZE_MB = 8;
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export class TechSup extends Component<{}> {
	state = {
		type: '',
		typeErrorMessage: '',
		description: '',
		descriptionErrorMessage: '',
		name: '',
		nameErrorMessage: '',
		phone: '',
		phoneErrorMessage: '',
		file: null,
		error: '',
		preview: null,
		isEditing: false,
		isSuccess: false,
		errorShown: false,
		successShown: false,
	};

	fileInputRef = createRef<HTMLElement>();

	handleTypeChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const { value } = target;
		let typeErrorMessage = '';

		if (this.state.typeErrorMessage) {
			if (value == 'nothing') {
				typeErrorMessage = 'Выберите тип обращения';
			}
		}

		this.setState({
			type: value,
			typeErrorMessage: typeErrorMessage,
		});
	};

	handleDescriptionChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const { value } = target;
		let descriptionErrorMessage = '';

		if (this.state.descriptionErrorMessage) {
			const validation = validateTechSup(value, 'description');
			descriptionErrorMessage = validation.message;
		}

		this.setState({
			description: value,
			descriptionErrorMessage: descriptionErrorMessage,
		});
	};

	handleNameChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const { value } = target;
		let nameErrorMessage = '';

		if (this.state.nameErrorMessage) {
			const validation = validateTechSup(value, 'name');
			nameErrorMessage = validation.message;
		}

		this.setState({
			name: value,
			nameErrorMessage: nameErrorMessage,
		});
	};

	handlePhoneChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const { value } = target;
		let phoneErrorMessage = '';

		if (this.state.nameErrorMessage) {
			const validation = validateTechSup(value, 'phone');
			phoneErrorMessage = validation.message;
		}

		this.setState({
			phone: value,
			phoneErrorMessage: phoneErrorMessage,
		});
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

	handleFileUpload = async () => {
		this.fileInputRef?.current?.click();

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
	};

	render() {
		const {
			type,
			typeErrorMessage,
			description,
			descriptionErrorMessage,
			name,
			nameErrorMessage,
			phone,
			phoneErrorMessage,
		} = this.state;

		return (
			<div className={styles.content}>
				<h1 className={styles.title}>Расскажите о проблеме</h1>
				<p className={styles.description}>
					Если возник вопрос или что-то пошло не так — напишите нам. Мы быстро
					разберёмся и подскажем, как решить проблему.
				</p>

				<div className={styles.form}>
					<p className={styles.question}> С чем связано ваше обращение?</p>

					<select
						className={clsx(styles.input, {
							[styles.errorBorder]: typeErrorMessage.length > 0,
						})}
						onInput={this.handleTypeChange}
						value={type}
					>
						<option value="nothing">Не выбрано</option>
						<option value="wish">Пожелание</option>
						<option value="problem">Проблема</option>
						<option value="question">Вопрос</option>
					</select>
				</div>

				<div className={styles.form}>
					<p className={styles.question}>
						{' '}
						Опишите ситуацию как можно подробнее
					</p>

					<textarea
						name="description"
						className={clsx(styles.textarea, {
							[styles.errorBorder]: descriptionErrorMessage.length > 0,
						})}
						onInput={this.handleDescriptionChange}
					>
						{description}
					</textarea>
				</div>

				<div className={styles.form}>
					<p className={styles.question}>
						Приложите скриншот, это поможет нам разобраться быстрее
					</p>

					<div className={styles.btns}>
						<div className={styles.wrapper}>
							<button className={styles.btn} onClick={this.handleFileUpload}>
								Выбрать файл
							</button>
							<input
								className={styles.fileInput}
								type="file"
								ref={this.fileInputRef}
								accept=".jpg, .jpeg, .png"
								onChange={this.handleFileChange}
							></input>
						</div>

						<span classname={styles.files}></span>
					</div>
				</div>

				<h1 className={styles.title}>Оставьте свои контакты</h1>
				<p className={styles.description}>Мы ответим вам в ближайшее время</p>

				<div className={styles.form}>
					<p className={styles.question}>Имя</p>
					<input
						type="text"
						name="name"
						value={name}
						className={clsx(styles.input, {
							[styles.errorBorder]: nameErrorMessage.length > 0,
						})}
						onInput={this.handleNameChange}
					/>
				</div>

				<div className={styles.form}>
					<p className={styles.question}>Номер телефона</p>
					<input
						type="text"
						name="phone"
						value={phone}
						className={clsx(styles.input, {
							[styles.errorBorder]: phoneErrorMessage.length > 0,
						})}
						onInput={this.handlePhoneChange}
					/>
				</div>
			</div>
		);
	}
}
