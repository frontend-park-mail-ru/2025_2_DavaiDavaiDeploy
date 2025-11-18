import { UserAvatar } from '@/components/headerUserAvatar/headerUserAvatar';
import type { ModelsUser } from '@/types/models.ts';
import { Avatar } from '@/uikit/avatar/avatar';
import { Flex } from '@/uikit/flex/flex';
import { Component } from '@robocotik/react';
import styles from './headerLoadedUser.module.scss';

interface LoadedUserProps {
	user: ModelsUser | null;
	logoutUser: VoidFunction;
}

export class LoadedUser extends Component<LoadedUserProps> {
	render() {
		return (
			<Flex className={styles.userInfo} align="center">
				<div className={styles.avatarContainer}>
					<Avatar
						src={this.props.user?.avatar}
						alt={'avatar'}
						className={styles.avatar}
						level="9"
					/>
					<UserAvatar
						user={this.props.user}
						logoutUser={this.props.logoutUser}
						className={styles.avatarActions}
					/>
				</div>
			</Flex>
		);
	}
}
