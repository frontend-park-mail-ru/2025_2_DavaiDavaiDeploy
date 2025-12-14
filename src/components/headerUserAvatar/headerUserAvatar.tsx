import Exit from '@/assets/exit.svg?react';
import { getImageURL } from '@/helpers/getCDNImageHelper/getCDNImageHelper';
import { Link } from '@/modules/router/link.tsx';
import type { ModelsUser } from '@/types/models.ts';
import { Component } from '@robocotik/react';
import clsx from 'ddd-clsx';
import { Avatar, Flex, Headline, Separator } from 'ddd-ui-kit';
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
			onLogout: this.props.logoutUser,
		});
	};

	render() {
		return (
			<Flex
				className={clsx(styles.avatarActions, this.props.className)}
				direction="column"
			>
				{this.props.user?.avatar && (
					<Avatar
						level="7"
						src={getImageURL(this.props.user.avatar)}
						alt={this.props.user?.login}
						className={styles.avatar}
					/>
				)}

				{this.props.user?.login && (
					<Headline
						className={styles.avatarActionsLogin}
						level="7"
						color="accent"
						align="center"
						data-test-id="user-profile-login"
					>
						{this.props.user.login}
					</Headline>
				)}

				<Flex direction="column" align="center" className={styles.links}>
					<Link className={styles.avatarActionsLink} href="/profile">
						Мой профиль
					</Link>

					<Link className={styles.avatarActionsLink} href="/profile#favorites">
						Избранное
					</Link>
				</Flex>

				<Separator mode="primary" className={styles.line} />

				<Flex
					className={styles.logoutButton}
					onClick={this.handleLogout}
					align="center"
					justify="center"
				>
					<Exit alt="logout" />
					Выйти
				</Flex>
			</Flex>
		);
	}
}

export const UserAvatar = withModal(UserAvatarComponent);
