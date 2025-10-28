import { Component } from '@robocotik/react';
import type { VDOMNode } from '@robocotik/react';
import type { RouteConfig } from './types/routeConfig';

export class Route extends Component<RouteConfig, {}> {
	render(): VDOMNode {
		const { component } = this.props;

		return <>{component}</>;
	}
}
