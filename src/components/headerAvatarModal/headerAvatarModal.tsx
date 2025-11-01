import type { ModelsUser } from '@/types/models.ts';
import { Component } from '@robocotik/react';
import styles from './headerAvatarModal.module.scss';
import { Link } from '@/modules/router/link.tsx';
import exit from '@/assets/img/exit.svg';


interface ModalProps {
	user: ModelsUser | null;
	logoutUser: () => {};
}

export class AvatarModal extends Component<ModalProps> {
	handleLogout = (e: Event) => {
		e.preventDefault();
		this.props.logoutUser();
	};

	render() {
		return (
			<div className={styles.avatarActions}>
				<img
					src={'https://cdn.ddfilms-static.ru' + this.props.user?.avatar}
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
