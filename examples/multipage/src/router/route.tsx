import {Component} from '@lib/index';
import type {RouteConfig} from './types/routeConfig';
import type {VDOMNode} from '@lib/types';

export class Route extends Component<RouteConfig, {}> {
  constructor(props: RouteConfig) {
    super(props);
  }

  render(): VDOMNode {
    const {component} = this.props;

    return <>{component}</>;
  }
}
