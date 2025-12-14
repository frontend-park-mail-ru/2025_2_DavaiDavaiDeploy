import { compose, connect } from '@/modules/redux';
import type { State } from '@/modules/redux/types/store';
import type { WithRouterProps } from '@/modules/router/types/withRouterProps';
import { withRouter } from '@/modules/router/withRouter';
import {
	selectVKIDAuthentificated,
	selectVKIDError,
} from '@/redux/features/user/selectors';
import type { Map } from '@/types/map';
import { Component } from '@robocotik/react';
import clsx from 'ddd-clsx';
import { Button, Flex } from 'ddd-ui-kit';
import { withModal } from '../../modules/modals/withModal';
import type { WithModalProps } from '../../modules/modals/withModalProps';
import { BaseModal, type BaseModalProps } from '../BaseModal/BaseModal';
import styles from './VKIDModal.module.scss';

export interface VKIDModalExtraProps {
	access_token: string;
	onSubmit: (access_token: string, login?: string) => void;
	handleClearError: () => void;
}

export interface VKIDModalProps {
	VKIDError: string;
	isVKIDAuthentificated: boolean;
}

interface VKIDState {
	input: string;
	errorShown: boolean;
}

export class VKIDModalComponent extends Component<
	BaseModalProps &
		VKIDModalProps &
		WithRouterProps &
		VKIDModalExtraProps &
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

	handleSubmit = () => {
		this.props.handleClearError();
		this.props.onSubmit(this.props.access_token, this.state.input);
	};

	onUpdate() {
		if (this.props.isVKIDAuthentificated && !this.props.VKIDError) {
			this.props.router.navigate('/');
			this.props.modal.hide();
		}

		if (!this.state.errorShown && this.props.VKIDError) {
			this.setState({ errorShown: true });
		}

		if (this.state.errorShown && !this.props.VKIDError) {
			this.setState({ errorShown: false });
		}
	}

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
					<h1 className={styles.vkidTitle}>Введите логин</h1>
					<div className={styles.inputContainer}>
						<input
							value={this.state.input}
							type="text"
							name="login"
							id="vkid-login"
							onInput={this.onInputChange}
							placeholder='Введите логин (например, "ivanov")'
							className={clsx(styles.vkidInput, {
								[styles.inputError]: this.state.errorShown,
							})}
						/>
						{this.state.errorShown && (
							<div className={styles.error}>{this.props.VKIDError}</div>
						)}
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
	VKIDError: selectVKIDError(state),
	isVKIDAuthentificated: selectVKIDAuthentificated(state),
});

export const VKIDModal = compose(
	withRouter,
	withModal,
	connect(mapStateToProps),
)(VKIDModalComponent);
