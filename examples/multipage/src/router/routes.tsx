import {Component} from '@lib/index';
import {getCurrChild} from './utils/getCurrChild.tsx';
import type {RoutesConfig} from './types/routesConfig.ts';
import {RouterContext} from './routerContext.ts';

interface ContextProps {
  path: string;
}

export class Routes extends Component<RoutesConfig, {}, ContextProps> {
  constructor(props: RoutesConfig) {
    super(props);
  }
  static contextType = RouterContext;

  render() {
    return getCurrChild({children: this.props.children, currPath: this.context.path});
  }
}
