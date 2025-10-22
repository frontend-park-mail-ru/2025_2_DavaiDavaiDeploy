import {Component} from '@lib/index';
import {RouterContext} from './routerContext';
import type {LinkProps} from './types/link.props.ts';
import type {VDOMNode} from '@lib/types';
import type {RouterContextValue} from './types/routerContext.ts';

export class Link extends Component<LinkProps, {}, RouterContextValue> {
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
    this.context.navigate(this.href);
  };

  render(): VDOMNode {
    console.log(this.context.params)
    return (
      <a href={this.href} onClick={this.handleClick}>
        {this.props.children}
      </a>
    );
  }
}
