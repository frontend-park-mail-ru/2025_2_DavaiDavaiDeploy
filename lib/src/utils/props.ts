import type {PropsAndEvents} from 'lib/src/types/types';
import type {VDOMNode} from 'lib/src/types/vdom';

export function extractPropsAndEvents(vdom: VDOMNode): PropsAndEvents {
  const {on: events = {}, ...props} = vdom.props;
  delete props.key;
  return {props, events};
}
