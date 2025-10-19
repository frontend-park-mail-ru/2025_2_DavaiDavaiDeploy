import type {PropsAndEvents} from '../types/types.ts';
import type {VDOMNode} from '../types/vdom.ts';

export function extractPropsAndEvents(vdom: VDOMNode): PropsAndEvents {
  const {on: events = {}, ...props} = vdom.props;
  delete props.key;
  return {props, events};
}
