import { UserAvatar } from '@/components/headerUserAvatar/headerUserAvatar';
import { getImageURL } from '@/helpers/getCDNImageHelper/getCDNImageHelper';
import type { ModelsUser } from '@/types/models.ts';
import { Component } from '@robocotik/react';
import clsx from 'ddd-clsx';
import { Avatar, Flex } from 'ddd-ui-kit';
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
			<Flex
				className={styles.userInfo}
				align="center"
				data-test-id="user-avatar-container"
			>
				<div className={styles.avatarContainer}>
					{this.props.user?.avatar && (
						<Avatar
							src={getImageURL(this.props.user.avatar)}
							alt={'avatar'}
							className={styles.avatar}
							level="9"
							onClick={this.handleAvatarClick}
							onMouseEnter={this.handleOpen}
						/>
					)}
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
