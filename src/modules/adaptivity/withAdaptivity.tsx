import type { ComponentType } from '@robocotik/react';
import { Component } from '@robocotik/react';
import type { AdaptivityContextValue } from './AdaptivityContext.ts';
import { AdaptivityContext } from './AdaptivityContext.ts';
import type { WithAdaptivityProps } from './withAdaptivityProps.ts';

type OmitAdaptivity<T> = Omit<T, keyof WithAdaptivityProps>;

export function withAdaptivity<P>(
	WrappedComponent: ComponentType<P & WithAdaptivityProps>,
) {
	return class WithAdaptivity extends Component<OmitAdaptivity<P>> {
		static readonly contextType = AdaptivityContext;

		render() {
			return (
				<AdaptivityContext.Consumer>
					{(context: AdaptivityContextValue) => {
						// eslint-disable-next-line no-console
						console.log('В WITH ADAPTIVITY CONTEXT ', context);
						return (
							<WrappedComponent {...(this.props as any)} adaptivity={context} />
						);
					}}
				</AdaptivityContext.Consumer>
			);
		}
	};
}
