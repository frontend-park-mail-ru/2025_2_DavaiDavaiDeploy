import { ChangeAvatar } from '@/components/changeAvatar/changeAvatar';
import { ChangePassword } from '@/components/changePassword/changePassword';
import { compose, connect } from '@/modules/redux';
import type { State } from '@/modules/redux/types/store.ts';
import type { WithRouterProps } from '@/modules/router/types/withRouterProps.ts';
import { withRouter } from '@/modules/router/withRouter.tsx';
import { selectIsAuthentificated } from '@/redux/features/user/selectors';
import type { Map } from '@/types/map';
import { Title } from '@/uikit/title/title';
import { Component } from '@robocotik/react';
import styles from './userPage.module.scss';

interface UserPageProps {
	isAuthentificated: boolean;
}

class UserPageComponent extends Component<UserPageProps & WithRouterProps> {
	onUpdate() {
		if (!this.props.isAuthentificated) {
			this.props.router.navigate('/');
		}
	}
	render() {
		return (
			<div className={styles.page}>
				<Title
					className={styles.title}
					text="Добро пожаловать в ваш профиль"
					size="5xl"
				/>
				<section className={styles.profile}>
					<ChangeAvatar />
					<ChangePassword />
				</section>
			</div>
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
