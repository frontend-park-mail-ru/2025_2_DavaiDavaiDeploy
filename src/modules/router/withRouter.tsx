import type { ComponentType } from '@/modules/react';
import { Component } from '@/modules/react';
import { RouterContext } from './routerContext';
import type { RouterContextValue } from './types/routerContext.ts';
import type { WithRouterProps } from './types/withRouterProps.ts';

type OmitRouter<T> = Omit<T, keyof WithRouterProps>;

export function withRouter<P>(
	WrappedComponent: ComponentType<P & WithRouterProps>,
) {
	return class WithRouter extends Component<OmitRouter<P>> {
		static readonly contextType = RouterContext;
		render() {
			return (
				<RouterContext.Consumer>
					{(context: RouterContextValue) => {
						return (
							<WrappedComponent {...(this.props as any)} router={context} />
						);
					}}
				</RouterContext.Consumer>
			);
		}
	};
}
