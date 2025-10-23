import { removeEventListeners } from './events.ts';
import type {
	ComponentVDOMNode,
	ElementVDOMNode,
	FragmentVDOMNode,
	TextVDOMNode,
	VDOMNode,
} from './types';
import { DOM_TYPES } from './types';

export function destroyDOM(vdom: VDOMNode): void {
	const { type } = vdom;

	switch (type) {
		case DOM_TYPES.TEXT: {
			removeTextNode(vdom as TextVDOMNode);
			break;
		}
		case DOM_TYPES.ELEMENT: {
			removeElementNode(vdom as ElementVDOMNode);
			break;
		}
		case DOM_TYPES.FRAGMENT: {
			removeFragmentNodes(vdom as FragmentVDOMNode);
			break;
		}
		case DOM_TYPES.COMPONENT: {
			(vdom as ComponentVDOMNode).component?.unmount();
			break;
		}
		default: {
			throw new Error(`Can't destroy DOM of type: ${type}`);
		}
	}

	delete (vdom as any).el;
}

function removeTextNode(vdom: TextVDOMNode): void {
	const { el } = vdom;
	if (el) {
		el.remove();
	}
}

function removeElementNode(vdom: ElementVDOMNode): void {
	const { el, children, listeners } = vdom;

	if (el) {
		el.remove();
	}

	if (children) {
		children.forEach(destroyDOM);
	}

	if (listeners && el) {
		removeEventListeners(listeners, el);
		delete (vdom as any).listeners;
	}
}

function removeFragmentNodes(vdom: FragmentVDOMNode): void {
	const { children } = vdom;

	if (children) {
		children.forEach(destroyDOM);
	}
}
