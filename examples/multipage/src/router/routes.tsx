import { Component } from '@lib/index';
import type { RoutesConfig } from './types/routesConfig.props.ts';

export class Routes extends Component<RoutesConfig> {
    constructor(props: RoutesConfig) {
    super(props);
  }
  render() {
    return (<>{this.props.children}</>);
  }
}
