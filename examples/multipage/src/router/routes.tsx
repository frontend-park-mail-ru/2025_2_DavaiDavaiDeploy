import { Component } from '@lib/index';
import type { Routes as RoutesProps } from './types/routes.ts';

export class Routes extends Component<RoutesProps> {
    constructor(props: RoutesProps) {
    super(props);
  }
  render() {
    return (<>{this.props.children}</>);
  }
}
