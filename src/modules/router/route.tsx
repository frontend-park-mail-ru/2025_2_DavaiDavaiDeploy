import { Component } from '@robocotik/react';
import type { RouteConfig } from './types/routeConfig';

export class Route extends Component<RouteConfig, {}> {
	render() {
		const { component, children } = this.props;

		if (component) {
			return <>{component}</>;
		}

		return <>{children}</>;
	}
}
