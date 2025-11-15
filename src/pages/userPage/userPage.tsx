import { ChangeAvatar } from '@/components/changeAvatar/changeAvatar';
import { ChangePassword } from '@/components/changePassword/changePassword';
import { compose, connect } from '@/modules/redux';
import type { State } from '@/modules/redux/types/store.ts';
import type { WithRouterProps } from '@/modules/router/types/withRouterProps.ts';
import { withRouter } from '@/modules/router/withRouter.tsx';
import actions from '@/redux/features/user/actions';
import {
	selectIsAdmin,
	selectIsAuthentificated,
	selectMyRequests,
	selectStats,
} from '@/redux/features/user/selectors';
import type { Map } from '@/types/map';
import { Component } from '@robocotik/react';
import { CircleDiagram } from '../../components/circleDiagram/circleDiagram.tsx';
import { formatDatetime } from '../../helpers/formatDateHelper/formatDateHelper.ts';
import clsx from '../../modules/clsx/index.ts';
import { MODALS } from '../../modules/modals/modals.ts';
import { withModal } from '../../modules/modals/withModal.tsx';
import type { WithModalProps } from '../../modules/modals/withModalProps.ts';
import type { Dispatch } from '../../modules/redux/types/actions.ts';
import type { Stats, TechResponse } from '../../types/models.ts';
import styles from './userPage.module.scss';

interface UserPageProps {
	isAuthentificated: boolean;
	isAdmin: boolean;
	getMyRequests: () => {};
	myRequests: TechResponse[];
	stats: Stats;
	getStats: (isAdmin: boolean) => {};
}

function getPhraseFromRequest(req: string) {
	switch (req) {
		case 'in_progress':
			return 'В обработке';
		case 'open':
			return 'Открыта';
		case 'closed':
			return 'Завершена';
	}
}

class UserPageComponent extends Component<
	UserPageProps & WithRouterProps & WithModalProps
> {
	onUpdate() {
		if (!this.props.isAuthentificated) {
			this.props.router.navigate('/');
		}
	}
	sampleData = {
		all: 10,
		done: 6,
		inProgress: 4,
	};

	onMount() {
		this.props.getMyRequests();
		this.props.getStats(this.props.isAdmin);
	}

	render() {
		console.log(this.props.isAdmin);
		return (
			<>
				<div className={styles.page}>
					<h1 className={styles.title}>Добро пожаловать в ваш профиль</h1>
					<section className={styles.profile}>
						<ChangeAvatar />
						<ChangePassword />
					</section>
				</div>
				<div className={styles.pageSupport}>
					<h1 className={styles.title}>
						{this.props.isAdmin
							? 'Обращения в тех. поддержку'
							: 'Мои обращения в тех. поддержку'}
					</h1>
					{this.props.isAdmin && (
						<CircleDiagram
							all={this.sampleData.all}
							done={this.sampleData.done}
							inProgress={this.sampleData.inProgress}
						/>
					)}
					<div className={styles.supportRequestsContainer}>
						{this.props.stats && (
							<div>
								<div>
									<p className={styles.supportRequestInfo}>
										Кол-во заявок: {this.props.stats.total}
									</p>
									<p className={styles.supportRequestInfo}>
										Кол-во решенных заявок: {this.props.stats.closed}
									</p>
									<p className={styles.supportRequestInfo}>
										Кол-во открытых заявок: {this.props.stats.open}
									</p>
									<p className={styles.supportRequestInfo}>
										Кол-во заявок в работе: {this.props.stats.in_progress}
									</p>
								</div>
							</div>
						)}
						<div className={styles.supportRequests}>
							<div className={styles.supportRequestRow}>
								<div className={styles.supportRequestStatus}>Статус</div>
								<div className={styles.supportRequestTheme}>Тема</div>
								<div className={styles.supportRequestDate}>Дата обращения</div>
								<div className={styles.supportRequestEvents}>События</div>
							</div>
							{this.props.myRequests &&
								this.props.myRequests.map((request) => {
									return (
										<div className={styles.supportRequestRow}>
											<div
												className={clsx(styles.supportRequestStatus, {
													[styles.requestActive]:
														request.status === 'in_progress',
													[styles.requestDone]: request.status === 'closed',
													[styles.requestOpen]: request.status === 'open',
												})}
											>
												{getPhraseFromRequest(request.status)}
											</div>
											<div className={styles.supportRequestTheme}>
												{request.description}
											</div>
											<div className={styles.supportRequestDate}>
												{formatDatetime(request.created_at)}
											</div>
											<button
												onClick={() =>
													this.props.modal.open(MODALS.TECH_SUP_REQUEST_MODAL)
												}
												className={styles.aboutBtn}
											>
												Подробнее
											</button>
										</div>
									);
								})}
						</div>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	isAuthentificated: selectIsAuthentificated(state),
	isAdmin: selectIsAdmin(state),
	myRequests: selectMyRequests(state),
	stats: selectStats(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	getMyRequests: () => dispatch(actions.getMyRequests()),
	getStats: (isAdmin: boolean) => dispatch(actions.getMyStats(isAdmin)),
});

export const UserPage = compose(
	withRouter,
	withModal,
	connect(mapStateToProps, mapDispatchToProps),
)(UserPageComponent);
