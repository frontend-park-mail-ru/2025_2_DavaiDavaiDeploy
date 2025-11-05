import exit from '@/assets/img/exit.svg';
import { getStaticURL } from '@/helpers/getCDNImageHelper/getStaticURL.ts';
import clsx from '@/modules/clsx/index.ts';
import { Link } from '@/modules/router/link.tsx';
import type { ModelsUser } from '@/types/models.ts';
import { Component } from '@robocotik/react';
import { LogoutModal } from '../logoutModal/logoutModal.tsx';
import styles from './headerUserAvatar.module.scss';
interface UserAvatarProps {
	user: ModelsUser | null;
	logoutUser: VoidFunction;
	className: string;
}

export class UserAvatar extends Component<UserAvatarProps> {
	handleLogout = (e: Event) => {
		e.preventDefault();
		this.props.logoutUser();
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
				<LogoutModal
					onExit={this.handleLogout}
					Actions={
						<button className={styles.logoutButton}>
							<img src={exit} alt="logout" />
							Выйти
						</button>
					}
				/>
			</div>
		);
	}
}
