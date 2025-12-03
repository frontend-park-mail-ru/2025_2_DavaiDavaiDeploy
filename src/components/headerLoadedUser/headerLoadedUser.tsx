import { UserAvatar } from '@/components/headerUserAvatar/headerUserAvatar';
import clsx from '@/modules/clsx';
import type { ModelsUser } from '@/types/models.ts';
import { Avatar, Flex } from '@/uikit/index';
import { Component } from '@robocotik/react';
import styles from './headerLoadedUser.module.scss';

interface LoadedUserProps {
	user: ModelsUser | null;
	logoutUser: VoidFunction;
}

interface LoadedUserState {
	isClosed: boolean;
}

export class LoadedUser extends Component<LoadedUserProps, LoadedUserState> {
	state = {
		isClosed: false,
	};

	handleAvatarClick = () => {
		this.setState({ isClosed: !this.state.isClosed });
	};

	handleOpen = () => {
		this.setState({ isClosed: false });
	};

	render() {
		return (
			<Flex className={styles.userInfo} align="center">
				<div className={styles.avatarContainer}>
					<Avatar
						src={this.props.user?.avatar}
						alt={'avatar'}
						className={styles.avatar}
						level="9"
						onClick={this.handleAvatarClick}
						onMouseEnter={this.handleOpen}
					/>
					<UserAvatar
						user={this.props.user}
						logoutUser={this.props.logoutUser}
						className={clsx(styles.avatarActions, {
							[styles.closed]: this.state.isClosed,
						})}
					/>
				</div>
			</Flex>
		);
	}
}
