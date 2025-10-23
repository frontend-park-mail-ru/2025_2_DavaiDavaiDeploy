import { Component } from '@react/index';
import type {RouteConfig} from './types/routeConfig';
import type { VDOMNode } from '@react/types';

export class Route extends Component<RouteConfig, {}> {
  render(): VDOMNode {
    const {component} = this.props;

    return <>{component}</>;
  }
}
