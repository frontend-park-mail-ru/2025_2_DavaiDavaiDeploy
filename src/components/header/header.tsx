import Logo from '@/assets/img/logo.svg';
import { getStaticURL } from '@/helpers/getCDNImageHelper/getStaticURL.ts';
import { connect } from '@/modules/redux/index.ts';
import type { State } from '@/modules/redux/types/store.ts';
import { NavigateButton } from '@/modules/router/button.tsx';
import { Link } from '@/modules/router/link.tsx';
import type { WithRouterProps } from '@/modules/router/types/withRouterProps.ts';
import { selectUser } from '@/redux/features/user/selectors.ts';
import type { Map } from '@/types/map';
import type { ModelsUser } from '@/types/models.ts';
import { Component } from '@robocotik/react';
import styles from './header.module.scss';

interface HeaderProps {
	user: ModelsUser | null;
}

export class HeaderComponent extends Component<HeaderProps & WithRouterProps> {
	render() {
		return (
			<header id="header" className={styles.header}>
				<Link href="/">
					<img src={Logo} alt="На главную" className={styles.logo} />
				</Link>
				<div className={styles.user}>
					{this.props.user ? (
						<div className={styles.userInfo}>
							<p className={styles.username}>{this.props.user?.login}</p>
							<img
								src={getStaticURL(this.props.user?.avatar)}
								alt={this.props.user?.login}
								className={styles.avatar}
							/>
						</div>
					) : (
						<>
							<p className={styles.text1}>Нет аккаунта?</p>
							<Link href="/register" className={styles.text2}>
								Зарегистрироваться
							</Link>
							<NavigateButton href="/login" className={styles.loginBtn}>
								Войти
							</NavigateButton>
						</>
					)}
				</div>
			</header>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	user: selectUser(state),
});

export const Header = connect(mapStateToProps)(HeaderComponent);
