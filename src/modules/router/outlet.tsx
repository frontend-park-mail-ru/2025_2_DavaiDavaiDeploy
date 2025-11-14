import { Component } from '@robocotik/react';
import { RouterContext } from './routerContext.ts';
import type { RouterContextValue } from './types/routerContext.ts';

export class Outlet extends Component<{}, {}, RouterContextValue> {
	render() {
		return (
			<RouterContext.Consumer>
				{(context: RouterContextValue) => {
					return context.outlet;
				}}
			</RouterContext.Consumer>
		);
	}
}
