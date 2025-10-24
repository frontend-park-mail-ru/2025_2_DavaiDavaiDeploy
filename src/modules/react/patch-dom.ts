import {
	removeAttribute,
	removeStyle,
	setAttribute,
	setStyle,
} from './attributes.ts';
import { destroyDOM } from './destroy-dom.ts';
import { addEventListener } from './events.ts';
import { extractChildren } from './h.ts';
import { mountDOM } from './mount-dom.ts';
import { areNodesEqual } from './nodes-equal.ts';
import { arraysDiff, arraysDiffSequence } from './utils/arrays.ts';
import { objectsDiff } from './utils/objects.ts';
import { extractPropsAndEvents } from './utils/props.ts';
import { isNotBlankOrEmptyString } from './utils/strings.ts';

import type { Component } from './component.ts';
import type { EventListeners } from './events.ts';
import type {
	ArrayDiffOperation,
	ComponentVDOMNode,
	ElementAttributes,
	ElementVDOMNode,
	IProp,
	TextVDOMNode,
	VDOMNode,
} from './types';
import { ARRAY_DIFF_OP, DOM_TYPES } from './types';

export function patchDOM(
	oldVdom: VDOMNode,
	newVdom: VDOMNode,
	parentEl: HTMLElement,
	hostComponent: Component | null = null,
): VDOMNode {
	if (!areNodesEqual(oldVdom, newVdom)) {
		const index = findIndexInParent(parentEl, oldVdom.el);
		destroyDOM(oldVdom);
		mountDOM(newVdom, parentEl, index, hostComponent);
		return newVdom;
	}

	newVdom.el = oldVdom.el;

	switch (newVdom.type) {
		case DOM_TYPES.TEXT: {
			patchText(oldVdom as TextVDOMNode, newVdom as TextVDOMNode);
			return newVdom;
		}
		case DOM_TYPES.ELEMENT: {
			patchElement(
				oldVdom as ElementVDOMNode,
				newVdom as ElementVDOMNode,
				hostComponent,
			);
			break;
		}
		case DOM_TYPES.COMPONENT: {
			patchComponent(
				oldVdom as ComponentVDOMNode,
				newVdom as ComponentVDOMNode,
			);
			break;
		}
	}

	patchChildren(oldVdom, newVdom, hostComponent);
	return newVdom;
}

function findIndexInParent(
	parentEl: HTMLElement,
	el: Node | null | undefined,
): number | null {
	if (!el) return null;
	const index = Array.from(parentEl.childNodes).indexOf(el as ChildNode);
	return index < 0 ? null : index;
}

function patchText(oldVdom: TextVDOMNode, newVdom: TextVDOMNode): void {
	const el = oldVdom.el as Text;
	const { value: oldText } = oldVdom;
	const { value: newText } = newVdom;
	if (oldText !== newText && el) {
		(el as unknown as CharacterData).nodeValue = newText;
	}
}

function patchElement(
	oldVdom: ElementVDOMNode,
	newVdom: ElementVDOMNode,
	hostComponent: Component | null,
) {
	const el = oldVdom.el as HTMLElement;
	const {
		class: oldClass,
		style: oldStyle,
		on: oldEvents,
		...oldAttrs
	} = (oldVdom.props ?? {}) as IProp;
	const {
		class: newClass,
		style: newStyle,
		on: newEvents,
		...newAttrs
	} = (newVdom.props ?? {}) as IProp;

	const { listeners: oldListeners } = oldVdom as Partial<ElementVDOMNode>;
	patchAttrs(el, oldAttrs as ElementAttributes, newAttrs as ElementAttributes);
	patchClasses(el, oldClass as any, newClass as any);
	patchStyles(
		el,
		oldStyle as Record<string, string | number>,
		newStyle as Record<string, string | number>,
	);
	newVdom.listeners = patchEvents(
		el,
		oldListeners as EventListeners | undefined,
		(oldEvents as Record<string, Function>) ?? {},
		(newEvents as Record<string, Function>) ?? {},
		hostComponent,
	);
}

function patchAttrs(
	el: HTMLElement,
	oldAttrs: Record<string, unknown> = {},
	newAttrs: Record<string, unknown> = {},
): void {
	const { added, removed, updated } = objectsDiff(oldAttrs, newAttrs);
	for (const attr of removed) {
		removeAttribute(el, attr);
	}
	for (const attr of added.concat(updated)) {
		setAttribute(el, attr, newAttrs[attr]);
	}
}

function patchClasses(
	el: HTMLElement,
	oldClass: string | string[] | undefined,
	newClass: string | string[] | undefined,
): void {
	const oldClasses = toClassList(oldClass);
	const newClasses = toClassList(newClass);
	const { added, removed } = arraysDiff(oldClasses, newClasses);

	if (removed.length > 0) {
		el.classList.remove(...removed);
	}
	if (added.length > 0) {
		el.classList.add(...added);
	}
}

function toClassList(classes: string | string[] | undefined = ''): string[] {
	return Array.isArray(classes)
		? classes.filter(isNotBlankOrEmptyString)
		: String(classes).split(/(\s+)/).filter(isNotBlankOrEmptyString);
}

function patchStyles(
	el: HTMLElement,
	oldStyle: Record<string, string | number> = {},
	newStyle: Record<string, string | number> = {},
): void {
	const { added, removed, updated } = objectsDiff(oldStyle, newStyle);
	for (const style of removed) {
		removeStyle(el, style);
	}
	for (const style of added.concat(updated)) {
		setStyle(el, style, newStyle[style]);
	}
}

function patchEvents(
	el: HTMLElement,
	oldListeners: EventListeners | undefined = {},
	oldEvents: Record<string, Function> = {},
	newEvents: Record<string, Function> = {},
	hostComponent: Component | null = null,
): EventListeners {
	const { removed, added, updated } = objectsDiff(oldEvents, newEvents);

	for (const eventName of removed.concat(updated)) {
		const handler = oldListeners?.[eventName];
		if (handler) {
			el.removeEventListener(eventName, handler as EventListener);
		}
	}

	const addedListeners: EventListeners = {};
	for (const eventName of added.concat(updated)) {
		addedListeners[eventName] = addEventListener(
			eventName,
			newEvents[eventName] as any,
			el,
			hostComponent,
		);
	}

	return addedListeners;
}

function patchChildren(
	oldVdom: VDOMNode,
	newVdom: VDOMNode,
	hostComponent: Component | null,
) {
	const oldChildren = extractChildren(oldVdom);
	const newChildren = extractChildren(newVdom);
	const parentEl = oldVdom.el as HTMLElement;
	const diffSeq = arraysDiffSequence(
		oldChildren,
		newChildren,
		areNodesEqual,
	) as Array<ArrayDiffOperation<VDOMNode>>;

	const offset = (hostComponent as any)?.offset ?? 0;

	for (const operation of diffSeq) {
		if (operation.op === ARRAY_DIFF_OP.NOOP) {
			const { originalIndex, index } = operation as any;
			patchDOM(
				oldChildren[originalIndex!],
				newChildren[index],
				parentEl,
				hostComponent,
			);
		}
	}

	for (const operation of diffSeq) {
		switch (operation.op) {
			case ARRAY_DIFF_OP.MOVE: {
				const { from, index } = operation as any;
				const el = oldChildren[from].el;
				const elAtTargetIndex = parentEl.childNodes[index + offset];
				if (el) {
					parentEl.insertBefore(el, elAtTargetIndex);
					patchDOM(
						oldChildren[from],
						newChildren[index],
						parentEl,
						hostComponent,
					);
				}
				break;
			}
			case ARRAY_DIFF_OP.REMOVE: {
				const { item } = operation as any;
				destroyDOM(item);
				break;
			}
			case ARRAY_DIFF_OP.ADD: {
				const { index, item } = operation as any;
				mountDOM(item, parentEl, index + offset, hostComponent);
				break;
			}
		}
	}
}

function patchComponent(
	oldVdom: ComponentVDOMNode,
	newVdom: ComponentVDOMNode,
) {
	const { component } = oldVdom;
	const { props } = extractPropsAndEvents(newVdom);
	component.updateProps(props);
	newVdom.component = component;
	newVdom.el = component.firstElement;
}
