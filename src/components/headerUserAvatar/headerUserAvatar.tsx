import exit from '@/assets/img/exit.svg';
import { getStaticURL } from '@/helpers/getCDNImageHelper/getStaticURL.ts';
import clsx from '@/modules/clsx/index.ts';
import { Link } from '@/modules/router/link.tsx';
import type { ModelsUser } from '@/types/models.ts';
import { Avatar } from '@/uikit/avatar/avatar';
import { Headline } from '@/uikit/headline/headline';
import { Separator } from '@/uikit/separator/separator';
import { Component } from '@robocotik/react';
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
				<Avatar
					size="l"
					src={getStaticURL(this.props.user?.avatar)}
					alt={this.props.user?.login}
					className={styles.avatar}
				/>

				{this.props.user?.login && (
					<Headline
						text={this.props.user.login}
						className={styles.avatarActionsLogin}
						size="l"
						color="accent"
						align="center"
					/>
				)}

				<Link className={styles.avatarActionsLink} href="/profile">
					Мой профиль
				</Link>

				<Separator mode="primary" className={styles.line} />

				<div className={styles.logoutButton} onClick={this.handleLogout}>
					<img src={exit} alt="logout" />
					Выйти
				</div>
			</div>
		);
	}
}
