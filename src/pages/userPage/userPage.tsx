import { ChangePassword } from '@/components/changePassword/changePassword';
import { Component } from '@robocotik/react';
import styles from './userPage.module.scss';

export class UserPage extends Component {
	render() {
		return (
			<div className={styles.page}>
				<h1 className={styles.title}>Добро пожаловать в ваш профиль</h1>
				<section className={styles.profile}>
					<ChangePassword />
				</section>
			</div>
		);
	}
}
