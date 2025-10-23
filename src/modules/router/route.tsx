import { Component } from '@react/index';
import type { VDOMNode } from '@react/types';
import type { RouteConfig } from './types/routeConfig';

export class Route extends Component<RouteConfig, {}> {
	render(): VDOMNode {
		const { component } = this.props;

		return <>{component}</>;
	}
}
