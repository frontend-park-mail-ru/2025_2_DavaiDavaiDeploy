import { validateNewPassword } from '@/helpers/validateNewPassword/validateNewPassword.ts';
import { validatePassword } from '@/helpers/validatePassword/validatePassword.ts';
import { validatePasswordConfirm } from '@/helpers/validatePasswordConfirm/validatePasswordConfirm.ts';
import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import actions from '@/redux/features/user/actions';
import {
	selectNewPasswordLoading,
	selectPasswordChangeError,
} from '@/redux/features/user/selectors.ts';
import type { Map } from '@/types/map';
import { Component } from '@robocotik/react';
import { Button, Flex, Title } from 'ddd-ui-kit';
import type { WithRouterProps } from '../../modules/router/types/withRouterProps.ts';
import { withRouter } from '../../modules/router/withRouter.tsx';
import { PasswordInputField } from '../passwordInputField/passwordInputField.tsx';
import { AppToast } from '../toastContainer/toastContainer.tsx';
import styles from './changePassword.module.scss';

interface ChangePasswordProps {
	error: string | null;
	loading: boolean;
	setPassword: (old_password: string, new_password: string) => void;
}

class ChangePasswordComponent extends Component<
	ChangePasswordProps & WithRouterProps
> {
	state = {
		password: '',
		newPassword: '',
		repeatNewPassword: '',
		validationErrors: {
			password: '',
			newPassword: '',
			repeatNewPassword: '',
		},
		isSuccess: false,
		errorShown: false,
		successShown: false,
	};

	onFieldChange(
		value: string,
		field: 'password' | 'newPassword' | 'repeatNewPassword',
	) {
		this.setState({ ...this.state, [field]: value, isSuccess: false });
		this.validateFields();
	}

	handleChangePassword = () => {
		if (this.validateFields()) {
			this.setState({
				isSuccess: true,
			});

			this.setState({ errorShown: false, successShown: false });

			this.props.setPassword(this.state.password, this.state.newPassword);
		}
	};

	onUpdate() {
		if (this.props.error && !this.state.errorShown) {
			AppToast.error('Неверный текущий пароль');
			this.setState({ errorShown: true });
		}

		if (
			!this.props.loading &&
			!this.props.error &&
			this.state.isSuccess &&
			!this.state.successShown
		) {
			AppToast.success('Пароль успешно сохранён!');
			this.setState({ successShown: true });
		}
	}

	validateFields() {
		const passwordValidation = validatePassword(this.state.password);

		const newPasswordValidation = validateNewPassword(
			this.state.newPassword,
			this.state.password,
		);

		const repeatNewPasswordValidation = validatePasswordConfirm(
			this.state.newPassword,
			this.state.repeatNewPassword,
		);

		this.setState({
			...this.state,
			validationErrors: {
				password: passwordValidation.message,
				newPassword: newPasswordValidation.message,
				repeatNewPassword: repeatNewPasswordValidation.message,
			},
		});

		return (
			passwordValidation.isValid &&
			newPasswordValidation.isValid &&
			repeatNewPasswordValidation.isValid
		);
	}

	render() {
		return (
			<Flex
				className={styles.changePasswordForm}
				align="center"
				direction="column"
			>
				<Title className={styles.title} level="4" weight="bold">
					Сменить пароль
				</Title>
				<PasswordInputField
					mode="secondary"
					label="Старый пароль"
					defaultValue=""
					placeholder="Введите пароль"
					errorMessage={this.state.validationErrors.password}
					onChange={(value) => this.onFieldChange(value, 'password')}
				/>
				<PasswordInputField
					mode="secondary"
					label="Новый пароль"
					defaultValue=""
					placeholder="Введите пароль"
					errorMessage={this.state.validationErrors.newPassword}
					onChange={(value) => this.onFieldChange(value, 'newPassword')}
				/>
				<PasswordInputField
					mode="secondary"
					label="Подтверждение пароля"
					defaultValue=""
					errorMessage={this.state.validationErrors.repeatNewPassword}
					placeholder="Повторите пароль"
					onChange={(value) => this.onFieldChange(value, 'repeatNewPassword')}
				/>
				<Button
					mode="primary"
					onClick={this.handleChangePassword}
					className={styles.saveBtn}
					size="m"
					borderRadius="l"
				>
					Сохранить
				</Button>
			</Flex>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	error: selectPasswordChangeError(state),
	loading: selectNewPasswordLoading(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	setPassword: (old_password: string, new_password: string) =>
		dispatch(actions.changePasswordAction(old_password, new_password)),
});

export const ChangePassword = compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
)(ChangePasswordComponent);
