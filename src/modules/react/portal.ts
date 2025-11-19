import { hPortal } from './h';
import type { PortalVDOMNode, VDOMNode } from './types/vdom';

export function createPortal(
	children: VDOMNode | VDOMNode[],
	container: HTMLElement,
): PortalVDOMNode {
	const childrenArray = Array.isArray(children) ? children : [children];

	return hPortal(childrenArray, container);
}
