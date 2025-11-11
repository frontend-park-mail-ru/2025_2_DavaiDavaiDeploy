import { Component, type ComponentType } from '@robocotik/react';
import { ToastsContext } from './toastsContext.ts';
import type { ToastsContextValue } from './types/toastsContext.ts';
import type { WithToastsProps } from './withToastasProps.ts';

type OmitToasts<T> = Omit<T, keyof WithToastsProps>;

export function withToasts<P>(
	WrappedComponent: ComponentType<P & WithToastsProps>,
) {
	return class WithToasts extends Component<OmitToasts<P>> {
		render() {
			return (
				<ToastsContext.Consumer>
					{(context: ToastsContextValue) => {
						return (
							<WrappedComponent {...(this.props as any)} toast={context} />
						);
					}}
				</ToastsContext.Consumer>
			);
		}
	};
}
