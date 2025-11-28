import { Component } from '@/modules/react';
import type { RouteConfig } from './types/routeConfig';

export class Route extends Component<RouteConfig, {}> {
	render() {
		const { component } = this.props;

		return <>{component}</>;
	}
}
