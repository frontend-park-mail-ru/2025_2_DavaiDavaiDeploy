import type { ComponentType } from '@robocotik/react';
import { Component } from '@robocotik/react';
import { RouterContext } from './routerContext';
import type { RouterContextValue } from './types/routerContext.ts';
import type { WithRouterProps } from './types/withRouterProps.ts';

type OmitRouter<T> = Omit<T, keyof WithRouterProps>;

export function withRouter<P>(
	WrappedComponent: ComponentType<P & WithRouterProps>,
) {
	return class WithRouter extends Component<OmitRouter<P>> {
		render() {
			return (
				<RouterContext.Consumer>
					{(context: RouterContextValue) => {
						return (
							<WrappedComponent
								{...(this.props as any)}
								router={context}
								parentComponent={this}
							/>
						);
					}}
				</RouterContext.Consumer>
			);
		}
	};
}
