import {Component} from '@lib/index';
import {RouterContext} from './routerContext';
import type { LinkProps } from './types/link.props.ts';
import type { VDOMNode } from '@lib/types';

export class Link extends Component<LinkProps> {
  href: string;
  static contextType = RouterContext;

  constructor(props: LinkProps) {
    super(props);
    this.href = props.href;
    if (!this.context) {
      throw Error('no context provided in Link');
    }
  }

  handleClick = (e: Event) => {
    e.preventDefault();
    console.log('я кликнул + ', this.context);
    this.context.navigate(this.href);
  };

  render(): VDOMNode {
    return (
      <a href={this.href} onClick={this.handleClick}>
        {this.props.children}
      </a>
    );
  }
}
