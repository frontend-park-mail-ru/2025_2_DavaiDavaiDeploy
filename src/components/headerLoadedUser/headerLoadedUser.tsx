import { AvatarModal } from '@/components/headerAvatarModal/headerAvatarModal.tsx';
import { getStaticURL } from '@/helpers/getCDNImageHelper/getStaticURL.ts';
import type { ModelsUser } from '@/types/models.ts';
import { Component } from '@robocotik/react';
import styles from './headerLoadedUser.module.scss';

interface LoadedUserProps {
	user: ModelsUser | null;
	logoutUser: () => {};
}

export class LoadedUser extends Component<LoadedUserProps> {
	render() {
		return (
			<div className={styles.userInfo}>
				<p className={styles.username}>{this.props.user?.login}</p>
				<div className={styles.avatarContainer}>
					<img
						src={getStaticURL(this.props.user?.avatar)}
						alt={this.props.user?.login}
						className={styles.avatar}
					/>
					<AvatarModal
						user={this.props.user}
						logoutUser={this.props.logoutUser}
					/>
				</div>
			</div>
		);
	}
}
