import { UserAvatar } from '@/components/headerUserAvatar/headerUserAvatar';
import { getStaticURL } from '@/helpers/getCDNImageHelper/getStaticURL.ts';
import type { ModelsUser } from '@/types/models.ts';
import { Avatar } from '@/uikit/avatar/avatar';
import { Component } from '@robocotik/react';
import styles from './headerLoadedUser.module.scss';

interface LoadedUserProps {
	user: ModelsUser | null;
	logoutUser: VoidFunction;
}

export class LoadedUser extends Component<LoadedUserProps> {
	render() {
		return (
			<div className={styles.userInfo}>
				<div className={styles.avatarContainer}>
					<Avatar
						src={getStaticURL(this.props.user?.avatar)}
						alt={'avatar'}
						className={styles.avatar}
						size="m"
					/>
					<UserAvatar
						user={this.props.user}
						logoutUser={this.props.logoutUser}
						className={styles.avatarActions}
					/>
				</div>
			</div>
		);
	}
}
