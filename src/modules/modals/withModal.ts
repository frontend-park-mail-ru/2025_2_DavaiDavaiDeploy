import type { ComponentType } from '@robocotik/react';
import { Component } from '@robocotik/react';
import { ModalContext } from './modalsContext.ts';
import type { ModalContextValue } from './modalsContext.ts';
import type { WithModalProps } from './withModalProps.ts';

type OmitModal<T> = Omit<T, keyof WithModalProps>;

export function withModal<P>(
	WrappedComponent: ComponentType<P & OmitModal>,
) {
	return class WithModal extends Component<OmitModal<P>> {
		render() {
			return (
				<ModalContext.Consumer>
					{(context: ModalContextValue) => {
						return (
							<WrappedComponent {...(this.props as any)} modal={context} />
						);
					}}
				</ModalContext.Consumer>
			);
		}
	};
}
