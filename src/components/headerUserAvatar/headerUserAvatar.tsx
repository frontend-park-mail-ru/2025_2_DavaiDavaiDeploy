import Exit from '@/assets/img/exit.svg?react';
import clsx from '@/modules/clsx/index.ts';
import { Link } from '@/modules/router/link.tsx';
import type { ModelsUser } from '@/types/models.ts';
import { Avatar, Flex, Headline, Separator } from '@/uikit/index';
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
			onLogout: this.props.logoutUser,
		});
	};

	render() {
		return (
			<Flex
				className={clsx(styles.avatarActions, this.props.className)}
				direction="column"
			>
				<Avatar
					level="7"
					src={this.props.user?.avatar}
					alt={this.props.user?.login}
					className={styles.avatar}
				/>

				{this.props.user?.login && (
					<Headline
						className={styles.avatarActionsLogin}
						level="7"
						color="accent"
						align="center"
					>
						{this.props.user.login}
					</Headline>
				)}

				<Link className={styles.avatarActionsLink} href="/profile">
					Мой профиль
				</Link>

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
