import {Component} from '@lib/index';
import type {RouteConfig} from './types/routeConfig';

export class Route extends Component<RouteConfig, {}> {
  constructor(props: RouteConfig) {
    super(props);
  }

  render() {
    const {href, component} = this.props;
    const currentPath = window.location.pathname;
    console.log('в роуте я получил href "', href, '"и currentPath "', currentPath, "'");
    return currentPath === href ? <>{component}</> : null;
  }
}
