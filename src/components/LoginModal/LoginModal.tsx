import Exit from '@/assets/img/exit.svg?react';
import { Button, Flex, Title } from '@/uikit/index';
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
							<Title className={style.modalTitle} level="5">
								Уже уходите?
							</Title>
							<Title className={style.modalTitle} level="5">
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
								level="8"
								before={<Exit />}
								className={style.exitButton}
							>
								Выйти
							</Button>
							<Button
								mode="primary"
								level="8"
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
