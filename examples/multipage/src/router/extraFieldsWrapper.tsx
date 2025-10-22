import {Component} from '@lib/index';
import type { VDOMNode } from '../../../../lib/src/types/vdom.ts';

export class ExtraFieldsWrapper extends Component {
  render(): VDOMNode {
    const {hasHeader, hasFooter} = this.props;
    return (
      <>
        {hasHeader && <header>Header Content</header>}
        {this.props.children}
        {hasFooter && <footer>Footer Content</footer>}
      </>
    );
  }
}
