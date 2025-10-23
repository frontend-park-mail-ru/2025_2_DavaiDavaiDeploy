import { setAttributes } from './attributes.ts';
import type { Component } from './component.ts';
import { addEventListeners } from './events.ts';
import { enqueueJob } from './scheduler.ts';
import type {
	ComponentVDOMNode,
	ElementVDOMNode,
	FragmentVDOMNode,
	TextVDOMNode,
	VDOMNode,
} from './types';
import { DOM_TYPES } from './types';
import { extractPropsAndEvents } from './utils/props.ts';

export function mountDOM(
	vdom: VDOMNode,
	parentEl: HTMLElement,
	index: number | null = null,
	hostComponent: Component | null = null,
): void {
	switch (vdom.type) {
		case DOM_TYPES.TEXT: {
			createTextNode(vdom as TextVDOMNode, parentEl, index);
			break;
		}
		case DOM_TYPES.ELEMENT: {
			createElementNode(
				vdom as ElementVDOMNode,
				parentEl,
				index,
				hostComponent,
			);
			break;
		}
		case DOM_TYPES.FRAGMENT: {
			createFragmentNodes(
				vdom as FragmentVDOMNode,
				parentEl,
				index,
				hostComponent,
			);
			break;
		}
		case DOM_TYPES.COMPONENT: {
			createComponentNode(vdom as ComponentVDOMNode, parentEl, index);
			const component = (vdom as ComponentVDOMNode).component;
			if (component) {
				enqueueJob(() => component.onMount());
			}
			break;
		}
		default: {
			throw new Error(`Can't mount DOM of type: ${vdom.type}`);
		}
	}
}

function createTextNode(
	vdom: TextVDOMNode,
	parentEl: HTMLElement,
	index: number | null,
): void {
	const { value } = vdom;
	const textNode = document.createTextNode(value);
	vdom.el = textNode;
	insert(textNode, parentEl, index);
}

function createFragmentNodes(
	vdom: FragmentVDOMNode,
	parentEl: HTMLElement,
	index: number | null,
	hostComponent: Component | null,
): void {
	const { children } = vdom;
	vdom.el = parentEl;

	children?.forEach((child, i) => {
		mountDOM(child, parentEl, index != null ? index + i : null, hostComponent);
	});
}

function createElementNode(
	vdom: ElementVDOMNode,
	parentEl: HTMLElement,
	index: number | null,
	hostComponent: Component | null,
): void {
	const { tag, children } = vdom;
	const element = document.createElement(tag);
	addProps(element, vdom, hostComponent);
	vdom.el = element;

	children?.forEach((child) => {
		mountDOM(child, element, null, hostComponent);
	});

	insert(element, parentEl, index);
}

function addProps(
	el: HTMLElement,
	vdom: ElementVDOMNode,
	hostComponent: Component | null,
): void {
	const { props: attrs, events } = extractPropsAndEvents(vdom);
	vdom.listeners = addEventListeners(events, el, hostComponent);
	setAttributes(el, attrs);
}

function createComponentNode(
	vdom: ComponentVDOMNode,
	parentEl: HTMLElement,
	index: number | null,
): void {
	const ComponentClass = vdom.tag;
	const { props } = extractPropsAndEvents(vdom);
	const component = new ComponentClass(props);
	component.mount(parentEl, index);
	vdom.component = component;
	vdom.el = component.firstElement || null;
}

function insert(el: Node, parentEl: HTMLElement, index: number | null): void {
	if (index == null) {
		parentEl.append(el);
		return;
	}

	if (index < 0) {
		throw new Error(`Index must be a positive integer, got ${index}`);
	}

	const children = parentEl.childNodes;
	if (index >= children.length) {
		parentEl.append(el);
	} else {
		parentEl.insertBefore(el, children[index]);
	}
}
