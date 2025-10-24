import type { Component } from './component.ts';
import type {
	ComponentVDOMNode,
	ElementVDOMNode,
	FragmentVDOMNode,
	TextVDOMNode,
	VDOMNode,
} from './types';
import { DOM_TYPES } from './types';
import { withoutNulls } from './utils/arrays.ts';

export interface ElementProps {
	[key: string]: unknown;
	on?: Record<string, Function>;
	key?: string | number;
	class?: string | string[];
	style?: Record<string, string | number>;
}

export function h(
	tag: typeof Component,
	props?: ElementProps,
	children?: (VDOMNode | string | null | undefined)[],
): ElementVDOMNode;
export function h(
	tag: string,
	props?: ElementProps,
	children?: (VDOMNode | string | null | undefined)[],
): ElementVDOMNode;
export function h(
	tag: string | typeof Component,
	props: ElementProps = {},
	children: (VDOMNode | string | null | undefined)[] = [],
): ElementVDOMNode | ComponentVDOMNode {
	const type =
		typeof tag === 'string' ? DOM_TYPES.ELEMENT : DOM_TYPES.COMPONENT;

	const vdom: ElementVDOMNode | ComponentVDOMNode = {
		tag,
		props,
		type,
		children: mapTextNodes(withoutNulls(children)),
	} as ElementVDOMNode | ComponentVDOMNode;

	return vdom;
}

export function hString(str: string): TextVDOMNode {
	return {
		type: DOM_TYPES.TEXT,
		value: str,
		props: {},
	};
}

export function hFragment(
	vNodes: (VDOMNode | string | null | undefined)[],
): FragmentVDOMNode {
	return {
		type: DOM_TYPES.FRAGMENT,
		children: mapTextNodes(withoutNulls(vNodes)),
		props: {},
	};
}

function mapTextNodes(children: (VDOMNode | string)[]): VDOMNode[] {
	return children.map((child) =>
		typeof child === 'string' ? hString(child) : child,
	) as VDOMNode[];
}

export function extractChildren(vdom: VDOMNode): VDOMNode[] {
	if (!vdom.children) {
		return [];
	}

	const children: VDOMNode[] = [];

	for (const child of vdom.children) {
		if (child.type === DOM_TYPES.FRAGMENT) {
			children.push(...extractChildren(child));
		} else {
			children.push(child);
		}
	}

	return children;
}
