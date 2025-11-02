import exit from '@/assets/img/exit.svg';
import { getStaticURL } from '@/helpers/getCDNImageHelper/getStaticURL.ts';
import clsx from '@/modules/clsx/index.ts';
import { Link } from '@/modules/router/link.tsx';
import type { ModelsUser } from '@/types/models.ts';
import { Component } from '@robocotik/react';
import styles from './headerAvatarModal.module.scss';
interface ModalProps {
	user: ModelsUser | null;
	logoutUser: () => {};
	className: string;
}

export class AvatarModal extends Component<ModalProps> {
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
				<p className={styles.avatarActions__login}>{this.props.user?.login}</p>
				<Link className={styles.avatarActions__link} href="/profile">
					Мой профиль
				</Link>

				<button className={styles.logoutButton} onClick={this.handleLogout}>
					<img src={exit} alt="logout" />
					Выйти
				</button>
			</div>
		);
	}
}
