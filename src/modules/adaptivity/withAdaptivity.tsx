import type { ComponentType } from '@robocotik/react';
import { Component } from '@robocotik/react';
import type { AdaptivityContextValue } from './AdaptivityContext.ts';
import { AdaptivityContext } from './AdaptivityContext.ts';
import type { WithAdaptivityProps } from './withAdaptivityProps.ts';

type OmitModal<T> = Omit<T, keyof WithAdaptivityProps>;

export function withModal<P>(
	WrappedComponent: ComponentType<P & WithAdaptivityProps>,
) {
	return class WithModal extends Component<OmitModal<P>> {
		static readonly contextType = AdaptivityContext;

		render() {
			return (
				<AdaptivityContext.Consumer>
					{(context: AdaptivityContextValue) => {
						return (
							<WrappedComponent {...(this.props as any)} adaptivity={context} />
						);
					}}
				</AdaptivityContext.Consumer>
			);
		}
	};
}
