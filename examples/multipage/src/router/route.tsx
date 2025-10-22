import {Component} from '@lib/index';
import type {RouteConfig} from './types/routeConfig';
import type {VDOMNode} from '@lib/types';
import {ExtraFieldsWrapper} from './extraFieldsWrapper.tsx';

export class Route extends Component<RouteConfig, {}> {
  constructor(props: RouteConfig) {
    super(props);
  }

  render(): VDOMNode {
    const {hasFooter = true, hasHeader = true, component} = this.props;

    return (
      <ExtraFieldsWrapper hasHeader={hasHeader} hasFooter={hasFooter}>
        <>{component}</>
      </ExtraFieldsWrapper>
    );
  }
}
