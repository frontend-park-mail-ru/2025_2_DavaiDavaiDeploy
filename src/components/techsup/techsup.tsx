import close from '@/assets/img/close.svg';
import { APP_URL_WITH_SCHEMA } from '@/consts/urls';
import { validateTechSup } from '@/helpers/validateTechSupHelper/validateTechSupHelper';
import clsx from '@/modules/clsx';
import HTTPClient from '@/modules/HTTPClient';
import { Component, createRef } from '@robocotik/react';
import type { FeedBack } from '../feedBack/feedBack';
import styles from './techsup.module.scss';

const MAX_FILE_SIZE_MB = 8;
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

interface TechSupState {
	type: string;
	typeErrorMessage: string;
	description: string;
	descriptionErrorMessage: string;
	name: string;
	nameErrorMessage: string;
	phone: string;
	phoneErrorMessage: string;
	file: File | null;
	error: string;
	preview: string | null;
	isSuccess: boolean;
}

class TechSupComponent extends Component<{}, TechSupState> {
	state: TechSupState = {
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
		isSuccess: false,
	};

	fileInputRef = createRef<HTMLElement>();

	handleTypeChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const { value } = target;
		let typeErrorMessage = '';

		if (value == 'nothing') {
			typeErrorMessage = 'Выберите тип обращения';
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

		const validation = validateTechSup(value, 'description');
		descriptionErrorMessage = validation.message;

		this.setState({
			description: value,
			descriptionErrorMessage: descriptionErrorMessage,
		});
	};

	send = async () => {
		const { type, description, file } = this.state;

		const validation = validateTechSup(description, 'description');
		const descriptionErrorMessage = validation.message;
		let typeErrorMessage = '';

		if (type == 'nothing' || type == '') {
			typeErrorMessage = 'Пожалуйста, выберите тип обращения';
		}

		if (descriptionErrorMessage || typeErrorMessage) {
			this.setState({
				descriptionErrorMessage: descriptionErrorMessage,
				typeErrorMessage: typeErrorMessage,
			});

			return;
		}

		try {
			if (file) {
				const formData = new FormData();
				formData.append('attachment', file);
				await HTTPClient.post<FeedBack>(`/feedback`, {
					data: {
						description,
						category: type,
						formData,
					},
				});
			} else {
				await HTTPClient.post<FeedBack>(`/feedback`, {
					data: {
						category: type,
						description,
					},
				});

				this.setState({ isSuccess: true });
			}
		} catch {
			this.setState({ isSuccess: false });
			window.parent.postMessage(
				{ type: 'error', text: 'Что-то пошло не так' },
				APP_URL_WITH_SCHEMA,
			);

			return;
		}

		window.parent.postMessage(
			{ type: 'success', text: 'Обращение успешно отправлено!' },
			APP_URL_WITH_SCHEMA,
		);
	};

	handleFileChange = (event: Event) => {
		const target = event.target as HTMLInputElement | null;
		const selected = target?.files?.[0];

		if (!selected) {
			return;
		}

		if (!ALLOWED_TYPES.includes(selected.type)) {
			window.parent.postMessage(
				{ type: 'error', text: 'Можно загружать только JPG, PNG, WEBP.' },
				APP_URL_WITH_SCHEMA,
			);

			return;
		}

		if (selected.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
			window.parent.postMessage(
				{
					type: 'error',
					text: `Размер не должен превышать ${MAX_FILE_SIZE_MB} МБ.`,
				},
				APP_URL_WITH_SCHEMA,
			);

			return;
		}

		this.setState({
			isSuccess: false,
		});

		const reader = new FileReader();

		reader.onloadend = () => {
			this.setState({
				file: selected,
				error: '',
			});
		};

		console.log(selected);

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
			isSuccess: true,
		});
	};

	handleClose = () => {
		window.parent.postMessage(
			{
				type: 'close',
			},
			APP_URL_WITH_SCHEMA,
		);
	};

	render() {
		const {
			type,
			typeErrorMessage,
			description,
			descriptionErrorMessage,
			file,
		} = this.state;

		return (
			<div className={styles.content}>
				<img
					src={close}
					alt="close"
					className={styles.close}
					onClick={this.handleClose}
				/>
				<h1 className={styles.title}>Расскажите о проблеме</h1>
				<p className={styles.description}>
					Если возник вопрос или что-то пошло не так — напишите нам. Мы быстро
					разберёмся и подскажем, как решить проблему.
				</p>

				<div className={styles.form}>
					<p className={styles.question}> С чем связано ваше обращение?</p>

					<select
						className={clsx(styles.select, {
							[styles.errorBorder]: typeErrorMessage.length > 0,
						})}
						onInput={this.handleTypeChange}
						value={type}
						placeholder="Не выбрано"
					>
						<option className={styles.option} value="nothing" selected disabled>
							Не выбрано
						</option>
						<option value="feature_request">Пожелание</option>
						<option value="bug">Проблема</option>
						<option value="question">Вопрос</option>
					</select>

					<p className={styles.errorMessage}>
						{typeErrorMessage ? typeErrorMessage : ''}
					</p>
				</div>

				<div className={styles.form}>
					<p className={styles.question}>
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
					<p className={styles.errorMessage}>
						{descriptionErrorMessage ? descriptionErrorMessage : ''}
					</p>
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

						<span className={styles.files}>{file?.name || 'Без названия'}</span>
					</div>
				</div>

				<button className={styles.sendBtn} onClick={this.send}>
					Отправить
				</button>
			</div>
		);
	}
}

export const TechSup = TechSupComponent;
