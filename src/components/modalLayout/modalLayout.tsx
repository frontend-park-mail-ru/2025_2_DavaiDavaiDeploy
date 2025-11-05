import { Component } from '@robocotik/react';
import {
	ModalContext,
	type ModalContextValue,
} from '../modalProvider/modalProvider.tsx';
import style from './modalLayout.module.scss';

interface ModalLayoutProps {
	Actions: Component;
}

export class ModalLayout extends Component<ModalLayoutProps> {
	render() {
		const { Actions } = this.props;
		return (
			<ModalContext.Consumer>
				{({
					handleCloseModal,
					showModal,
					toggleVisibility,
				}: ModalContextValue) => {
					return (
						<>
							{showModal && (
								<div className={style.modalWrapper} onClick={handleCloseModal}>
									<div className={style.modalContent}>
										{this.props.children}
									</div>
								</div>
							)}
							<button className={style.actionButton} onClick={toggleVisibility}>
								{Actions}
							</button>
						</>
					);
				}}
			</ModalContext.Consumer>
		);
	}
}
