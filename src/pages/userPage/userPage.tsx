import { ChangeAvatar } from '@/components/changeAvatar/changeAvatar';
import { ChangePassword } from '@/components/changePassword/changePassword';
import { Component } from '@/modules/react';
import { compose, connect } from '@/modules/redux';
import type { State } from '@/modules/redux/types/store.ts';
import type { WithRouterProps } from '@/modules/router/types/withRouterProps.ts';
import { withRouter } from '@/modules/router/withRouter.tsx';
import { selectIsAuthentificated } from '@/redux/features/user/selectors';
import type { Map } from '@/types/map';
import { Flex, Title } from '@/uikit/index';
import { Redirect } from '../../modules/router/redirect';
import styles from './userPage.module.scss';

interface UserPageProps {
	isAuthentificated: boolean;
}

class UserPageComponent extends Component<UserPageProps & WithRouterProps> {
	render() {
		if (!this.props.isAuthentificated) {
			return <Redirect to="/" />;
		}

		return (
			<Flex className={styles.page} direction="column" align="center">
				<Title className={styles.title} level="2">
					Добро пожаловать в ваш профиль
				</Title>
				<Flex className={styles.profile} direction="row" align="start">
					<ChangeAvatar />
					<ChangePassword />
				</Flex>
			</Flex>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	isAuthentificated: selectIsAuthentificated(state),
});

export const UserPage = compose(
	withRouter,
	connect(mapStateToProps),
)(UserPageComponent);
