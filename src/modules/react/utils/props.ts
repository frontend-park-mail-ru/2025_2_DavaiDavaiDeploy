import type { PropsAndEvents, VDOMNode } from '../types';

export function extractPropsAndEvents(vdom: VDOMNode): PropsAndEvents {
	const { on: events = {}, ...props } = vdom.props;
	delete props.key;
	return { props, events };
}
