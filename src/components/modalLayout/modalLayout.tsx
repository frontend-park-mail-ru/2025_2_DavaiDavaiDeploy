import { Component, render } from '@robocotik/react';
import {
	ModalContext,
	type ModalContextValue,
} from '../modalProvider/modalProvider.tsx';
import style from './modalLayout.module.scss';

interface ModalLayoutProps {
	Actions: Component;
}

export class ModalLayout extends Component<ModalLayoutProps> {
	portalRoot: HTMLElement | null = null;

	onMount() {
		// Создаем или находим контейнер для порталов
		this.portalRoot = document.getElementById('modal-root');

		if (!this.portalRoot) {
			this.portalRoot = document.createElement('div');
			this.portalRoot.id = 'modal-root';
			document.body.appendChild(this.portalRoot);
		}
	}

	onUnmount() {
		// Очищаем портал при размонтировании
		if (this.portalRoot && this.portalRoot.parentNode) {
			this.portalRoot.innerHTML = '';
		}
	}

	renderPortal(content: any) {
		if (this.portalRoot) {
			render(content, this.portalRoot);
		}
	}

	clearPortal() {
		if (this.portalRoot) {
			this.portalRoot.innerHTML = '';
		}
	}

	render() {
		const { Actions } = this.props;

		return (
			<ModalContext.Consumer>
				{({
					handleCloseModal,
					showModal,
					toggleVisibility,
				}: ModalContextValue) => {
					// Рендерим портал при открытии модалки
					if (showModal) {
						this.renderPortal(
							<div className={style.modalWrapper} onClick={handleCloseModal}>
								<div
									className={style.modalContent}
									onClick={(e) => e.stopPropagation()}
								>
									{this.props.children}
								</div>
							</div>,
						);
					} else {
						// Очищаем портал при закрытии
						this.clearPortal();
					}

					return (
						<button className={style.actionButton} onClick={toggleVisibility}>
							{Actions}
						</button>
					);
				}}
			</ModalContext.Consumer>
		);
	}
}
