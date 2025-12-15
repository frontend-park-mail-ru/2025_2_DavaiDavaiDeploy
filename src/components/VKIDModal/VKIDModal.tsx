import { compose, connect } from '@/modules/redux';
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
import type { State } from '../../modules/redux/types/store';
import type { Map } from '../../types/map';
import { BaseModal, type BaseModalProps } from '../BaseModal/BaseModal';
import { AppToast } from '../toastContainer/toastContainer';
import styles from './VKIDModal.module.scss';

export interface VKIDModalExtraProps {
	access_token: string;
	onSubmit: (access_token: string, login?: string) => void;
	handleClearError: () => void;
}

export interface VKIDModalProps {
	vkidError: string;
	vkidAuthentificated: boolean;
}

interface VKIDState {
	input: string;
	errorShown: boolean;
}

export class VKIDModalComponent extends Component<
	BaseModalProps &
		WithRouterProps &
		VKIDModalExtraProps &
		VKIDModalProps &
		WithModalProps,
	VKIDState
> {
	state = {
		input: '',
		errorShown: false,
	};

	onMount() {
		this.props.handleClearError();
	}

	onUpdate() {
		if (this.props.vkidAuthentificated) {
			this.props.router.navigate('/');
			this.props.modal.hide();
			this.props.handleClearError();
		}

		if (
			this.props.vkidError ===
				vkidAuthorizationCodeToErrorHelper(ERROR_CODES.BAD_REQUEST) &&
			this.state.errorShown === false
		) {
			AppToast.error(this.props.vkidError);

			this.setState({ errorShown: true });
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
			<BaseModal hasClose={false} closeOnOverlayClick={false}>
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

const mapStateToProps = (state: State): Map => ({
	vkidError: selectvkidError(state),
	vkidAuthentificated: selectVKIDAuthentificated(state),
});

export const VKIDModal = compose(
	withRouter,
	withModal,
	connect(mapStateToProps),
)(VKIDModalComponent);
