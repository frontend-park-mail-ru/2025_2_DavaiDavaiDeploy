import { compose } from '@/modules/redux';
import type { WithRouterProps } from '@/modules/router/types/withRouterProps';
import { withRouter } from '@/modules/router/withRouter';
import {
	selectVKIDAuthentificated,
	selectvkidError,
} from '@/redux/features/user/selectors';
import { Component } from '@robocotik/react';
import { Button, Flex } from 'ddd-ui-kit';
import { ERROR_CODES } from '../../consts/errorCodes';
import { vkidAuthorizationCodeToErrorHelper } from '../../helpers/vkidAuthorizationCodeToErrorHelper/vkidAuthorizationCodeToErrorHelper';
import { withModal } from '../../modules/modals/withModal';
import type { WithModalProps } from '../../modules/modals/withModalProps';
import { store } from '../../redux/store';
import { BaseModal, type BaseModalProps } from '../BaseModal/BaseModal';
import { AppToast } from '../toastContainer/toastContainer';
import styles from './VKIDModal.module.scss';

export interface VKIDModalExtraProps {
	access_token: string;
	onSubmit: (access_token: string, login?: string) => void;
	handleClearError: () => void;
}

interface VKIDState {
	input: string;
	errorShown: boolean;
}

export class VKIDModalComponent extends Component<
	BaseModalProps & WithRouterProps & VKIDModalExtraProps & WithModalProps,
	VKIDState
> {
	state = {
		input: '',
		errorShown: false,
	};
	interval: number | null = null;

	onMount() {
		this.props.handleClearError();

		this.interval = window.setInterval(() => {
			if (selectVKIDAuthentificated(store.getState())) {
				this.props.router.navigate('/');
				this.props.modal.hide();
			}

			if (
				selectvkidError(store.getState()) ===
					vkidAuthorizationCodeToErrorHelper(ERROR_CODES.BAD_REQUEST) &&
				this.state.errorShown === false
			) {
				AppToast.error(
					vkidAuthorizationCodeToErrorHelper(ERROR_CODES.BAD_REQUEST),
				);

				this.setState({ errorShown: true });
			}
		}, 1000);
	}

	onUnmount() {
		if (this.interval) {
			clearInterval(this.interval);
			this.interval = null;
		}
	}

	handleSubmit = () => {
		this.props.handleClearError();
		this.setState({ errorShown: false });
		this.props.onSubmit(this.props.access_token, this.state.input);
	};

	onInputChange = (e: Event) => {
		const target = e.target as HTMLInputElement;
		this.setState({ input: target.value });
	};

	render() {
		return (
			<BaseModal closeOnOverlayClick={false}>
				<Flex
					className={styles.VKIDmodal}
					direction="column"
					justify="end"
					align="center"
				>
					<h1 className={styles.vkidTitle}>Придумайте логин</h1>
					<div className={styles.inputContainer}>
						<input
							value={this.state.input}
							type="text"
							name="login"
							id="vkid-login"
							onInput={this.onInputChange}
							placeholder='Введите логин (например, "ivanov")'
							className={styles.vkidInput}
						/>
					</div>
					<Button
						mode="primary"
						onClick={this.handleSubmit}
						className={styles.vkidButton}
						size="m"
						borderRadius="lg"
						type="submit"
					>
						Войти
					</Button>
				</Flex>
			</BaseModal>
		);
	}
}

export const VKIDModal = compose(withRouter, withModal)(VKIDModalComponent);
