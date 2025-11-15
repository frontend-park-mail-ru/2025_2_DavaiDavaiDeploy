import { ChangeAvatar } from '@/components/changeAvatar/changeAvatar';
import { ChangePassword } from '@/components/changePassword/changePassword';
import { compose, connect } from '@/modules/redux';
import type { State } from '@/modules/redux/types/store.ts';
import type { WithRouterProps } from '@/modules/router/types/withRouterProps.ts';
import { withRouter } from '@/modules/router/withRouter.tsx';
import {
	selectIsAdmin,
	selectIsAuthentificated,
} from '@/redux/features/user/selectors';
import type { Map } from '@/types/map';
import { Component } from '@robocotik/react';
import { CircleDiagram } from '../../components/circleDiagram/circleDiagram.tsx';
import clsx from '../../modules/clsx/index.ts';
import styles from './userPage.module.scss';

interface UserPageProps {
	isAuthentificated: boolean;
	isAdmin: boolean;
}

class UserPageComponent extends Component<UserPageProps & WithRouterProps> {
	onUpdate() {
		if (!this.props.isAuthentificated) {
			this.props.router.navigate('/');
		}
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
						<CircleDiagram all={10} done={6} inProgress={4} />
					)}
					<div className={styles.supportRequestsContainer}>
						<div>
							<div>
								<p className={styles.supportRequestInfo}>Кол-во заявок: 10</p>
								<p className={styles.supportRequestInfo}>
									Кол-во решенных заявок: 6
								</p>
								<p className={styles.supportRequestInfo}>
									Кол-во открытых заявок: 4
								</p>
							</div>
						</div>
						<div className={styles.supportRequests}>
							<div className={styles.supportRequestRow}>
								<div className={styles.supportRequestStatus}>Статус</div>
								<div className={styles.supportRequestTheme}>Тема</div>
								<div className={styles.supportRequestDate}>Дата обращения</div>
								<div className={styles.supportRequestEvents}>События</div>
							</div>
							<div className={styles.supportRequestRow}>
								<div
									className={clsx(
										styles.supportRequestStatus,
										styles.requestActive,
									)}
								>
									В обработке
								</div>
								<div className={styles.supportRequestTheme}>
									Проблемы с подключением к сервису
								</div>
								<div className={styles.supportRequestDate}>21.10.2025</div>
								<button className={styles.aboutBtn}>Подробнее</button>
							</div>
							<div className={styles.supportRequestRow}>
								<div
									className={clsx(
										styles.supportRequestStatus,
										styles.requestDone,
									)}
								>
									Решена
								</div>
								<div className={styles.supportRequestTheme}>
									Проблемы с подключением к сервису
								</div>
								<div className={styles.supportRequestDate}>21.10.2025</div>
								<button className={styles.aboutBtn}>Подробнее</button>
							</div>
							<div className={styles.supportRequestRow}>
								<div
									className={clsx(
										styles.supportRequestStatus,
										styles.requestDone,
									)}
								>
									Решена
								</div>
								<div className={styles.supportRequestTheme}>
									Не могу оставить комментарий к фильму, трейлер которого
									посмотрел!
								</div>
								<div className={styles.supportRequestDate}>21.10.2025</div>
								<button className={styles.aboutBtn}>Подробнее</button>
							</div>
							<div className={styles.supportRequestRow}>
								<div
									className={clsx(
										styles.supportRequestStatus,
										styles.requestDone,
									)}
								>
									Решена
								</div>
								<div className={styles.supportRequestTheme}>
									Проблемы с версткой на странице редактирования профиля
								</div>
								<div className={styles.supportRequestDate}>21.10.2025</div>
								<button className={styles.aboutBtn}>Подробнее</button>
							</div>
							<div className={styles.supportRequestRow}>
								<div
									className={clsx(
										styles.supportRequestStatus,
										styles.requestDone,
									)}
								>
									Решена
								</div>
								<div className={styles.supportRequestTheme}>
									Проблемы с подключением к сервису
								</div>
								<div className={styles.supportRequestDate}>21.10.2025</div>
								<button className={styles.aboutBtn}>Подробнее</button>
							</div>
							<div className={styles.supportRequestRow}>
								<div
									className={clsx(
										styles.supportRequestStatus,
										styles.requestDone,
									)}
								>
									Решена
								</div>
								<div className={styles.supportRequestTheme}>
									Не могу оставить комментарий к фильму, трейлер которого
									посмотрел!
								</div>
								<div className={styles.supportRequestDate}>21.10.2025</div>
								<button className={styles.aboutBtn}>Подробнее</button>
							</div>
							<div className={styles.supportRequestRow}>
								<div
									className={clsx(
										styles.supportRequestStatus,
										styles.requestDone,
									)}
								>
									Решена
								</div>
								<div className={styles.supportRequestTheme}>
									Не могу оставить комментарий к фильму, трейлер которого
									посмотрел!
								</div>
								<div className={styles.supportRequestDate}>21.10.2025</div>
								<button className={styles.aboutBtn}>Подробнее</button>
							</div>

							<div className={styles.supportRequestRow}>
								<div
									className={clsx(
										styles.supportRequestStatus,
										styles.requestDone,
									)}
								>
									Решена
								</div>
								<div className={styles.supportRequestTheme}>
									Не могу оставить комментарий к фильму, трейлер которого
									посмотрел!
								</div>
								<div className={styles.supportRequestDate}>21.10.2025</div>
								<button className={styles.aboutBtn}>Подробнее</button>
							</div>
							<div className={styles.supportRequestRow}>
								<div
									className={clsx(
										styles.supportRequestStatus,
										styles.requestDone,
									)}
								>
									Решена
								</div>
								<div className={styles.supportRequestTheme}>
									Не могу оставить комментарий к фильму, трейлер которого
									посмотрел!
								</div>
								<div className={styles.supportRequestDate}>21.10.2025</div>
								<button className={styles.aboutBtn}>Подробнее</button>
							</div>
							<div className={styles.supportRequestRow}>
								<div
									className={clsx(
										styles.supportRequestStatus,
										styles.requestDone,
									)}
								>
									Решена
								</div>
								<div className={styles.supportRequestTheme}>
									Не могу оставить комментарий к фильму, трейлер которого
									посмотрел!
								</div>
								<div className={styles.supportRequestDate}>21.10.2025</div>
								<button className={styles.aboutBtn}>Подробнее</button>
							</div>
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
});

export const UserPage = compose(
	withRouter,
	connect(mapStateToProps),
)(UserPageComponent);
