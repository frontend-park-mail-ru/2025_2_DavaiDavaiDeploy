import exit from '@/assets/img/exit.svg';
import { getStaticURL } from '@/helpers/getCDNImageHelper/getStaticURL.ts';
import clsx from '@/modules/clsx/index.ts';
import { Link } from '@/modules/router/link.tsx';
import type { ModelsUser } from '@/types/models.ts';
import { Component } from '@robocotik/react';
import { MODALS } from '../../modules/modals/modals';
import { withModal } from '../../modules/modals/withModal';
import type { WithModalProps } from '../../modules/modals/withModalProps';
import styles from './headerUserAvatar.module.scss';
interface UserAvatarProps {
	user: ModelsUser | null;
	logoutUser: VoidFunction;
	className: string;
}

export class UserAvatarComponent extends Component<
	UserAvatarProps & WithModalProps
> {
	handleLogout = (e: Event) => {
		e.preventDefault();
		this.props.modal.open(MODALS.LOGIN_MODAL, {
			onLogout: () => this.props.logoutUser(),
		});
	};

	render() {
		return (
			<div className={clsx(styles.avatarActions, this.props.className)}>
				<img
					src={getStaticURL(this.props.user?.avatar)}
					alt={this.props.user?.login}
					className={styles.avatar}
				/>
				<p className={styles.avatarActionsLogin}>{this.props.user?.login}</p>
				<Link className={styles.avatarActionsLink} href="/profile">
					Мой профиль
				</Link>

				<div className={styles.logoutButton} onClick={this.handleLogout}>
					<img src={exit} alt="logout" />
					Выйти
				</div>
			</div>
		);
	}
}

export const UserAvatar = withModal(UserAvatarComponent);
