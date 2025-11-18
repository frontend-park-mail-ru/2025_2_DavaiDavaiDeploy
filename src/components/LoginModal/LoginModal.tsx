import Exit from '@/assets/img/exit.svg?react';
import { Button } from '@/uikit/button/button';
import { Flex } from '@/uikit/flex/flex';
import { Title } from '@/uikit/title/title';
import { Component, createPortal } from '@robocotik/react';
import style from './LoginModal.module.scss';

export class LoginModal extends Component {
	render() {
		return createPortal(
			<Flex className={style.modalWrapper} align="center" justify="center">
				<div
					className={style.modalContent}
					onClick={(e) => e.stopPropagation()}
				>
					<Flex
						className={style.modalLogout}
						direction="column"
						justify="between"
						align="center"
					>
						<Flex
							className={style.modalHeader}
							align="center"
							direction="column"
						>
							<Title className={style.modalTitle} size="2xl">
								Уже уходите?
							</Title>
							<Title className={style.modalTitle} size="2xl">
								Мы будем скучать!
							</Title>
						</Flex>
						<Flex
							className={style.modalActions}
							align="center"
							direction="column"
						>
							<Button
								mode="secondary"
								size="m"
								before={<Exit />}
								className={style.exitButton}
							>
								Выйти
							</Button>
							<Button
								mode="primary"
								size="m"
								borderRadius="l"
								className={style.turnBackButton}
							>
								Вернуться на сайт
							</Button>
						</Flex>
					</Flex>
				</div>
			</Flex>,
			document.body,
		);
	}
}
