import { Component } from '@robocotik/react';
import { formatDatetime } from '../../helpers/formatDateHelper/formatDateHelper.ts';
import clsx from '../../modules/clsx/index.ts';
import { MODALS } from '../../modules/modals/modals.ts';
import { withModal } from '../../modules/modals/withModal.tsx';
import type { WithModalProps } from '../../modules/modals/withModalProps.ts';
import { compose, connect } from '../../modules/redux/index.ts';
import type { Dispatch } from '../../modules/redux/types/actions.ts';
import type { State } from '../../modules/redux/types/store.ts';
import actions from '../../redux/features/user/actions.ts';
import {
	selectIsAdmin,
	selectMyRequests,
	selectStats,
} from '../../redux/features/user/selectors.ts';
import type { Map } from '../../types/map.ts';
import type { Stats, TechResponse } from '../../types/models.ts';
import { CircleDiagram } from '../circleDiagram/circleDiagram.tsx';
import styles from './getTable.module.css';

interface getTableProps {
	isAdmin: boolean;
	stats: Stats;
	getMyRequests: () => {};
	getAllRequests: () => {};
	myRequests: TechResponse[];
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

class getTableComponent extends Component<getTableProps & WithModalProps> {
	onMount() {
		if (this.props.isAdmin != true) {
			this.props.getMyRequests();
		} else {
			this.props.getAllRequests();
		}
	}

	render() {
		if (this.props.isAdmin) {
			return (
				<>
					{this.props.isAdmin && (
						<CircleDiagram
							all={this.props.stats.total}
							done={this.props.stats.closed}
							inProgress={this.props.stats.in_progress}
						/>
					)}
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
											[styles.requestActive]: request.status === 'in_progress',
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
				</>
			);
		}
		return (
			<>
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
										[styles.requestActive]: request.status === 'in_progress',
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
			</>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	myRequests: selectMyRequests(state),
	stats: selectStats(state),
	isAdmin: selectIsAdmin(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	getMyRequests: () => dispatch(actions.getMyRequests()),
	getAllRequests: () => dispatch(actions.getAllRequests()),
});

export const GetTable = compose(
	withModal,
	connect(mapStateToProps, mapDispatchToProps),
)(getTableComponent);
