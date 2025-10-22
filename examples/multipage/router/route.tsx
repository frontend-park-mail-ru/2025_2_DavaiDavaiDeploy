import { Component} from '@lib/dist/react';
import type { RouteConfig } from './types/routes';

export class Route extends Component<RouteConfig, {}> {
  constructor(props: RouteConfig) {
    super(props);
  }

  render() {
    const { href, component } = this.props;
    const currentPath = window.location.pathname;
    return currentPath === href ? <>{component}</> : null;
  }
}
