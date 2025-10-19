import { destroyDOM } from './destroy-dom.ts';
import { removeAttribute, setAttribute, removeStyle, setStyle } from './attributes.ts';
import { mountDOM } from './mount-dom.ts';
import { extractChildren } from './h.ts';
import { areNodesEqual } from './nodes-equal.ts';
import { objectsDiff } from './utils/objects.ts';
import { isNotBlankOrEmptyString } from './utils/strings.ts';
import { arraysDiff, arraysDiffSequence } from './utils/arrays.ts';
import { addEventListener } from './events.ts';
import { extractPropsAndEvents } from './utils/props.ts';

import type {
  VDOMNode,
  TextVDOMNode,
  ElementVDOMNode,
  FragmentVDOMNode,
  ComponentVDOMNode,
} from './types/vdom.ts';
import type { EventListeners } from './events.ts';
import type { ArrayDiffOperation } from './types/types.ts';
import { ARRAY_DIFF_OP, DOM_TYPES } from './types/consts.ts';
import type { Component } from './component.ts';

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
      patchElement(oldVdom as ElementVDOMNode, newVdom as ElementVDOMNode, hostComponent);
      break;
    }
    case DOM_TYPES.COMPONENT: {
      patchComponent(oldVdom as ComponentVDOMNode, newVdom as ComponentVDOMNode);
      break;
    }
  }

  patchChildren(oldVdom, newVdom, hostComponent);
  return newVdom;
}

function findIndexInParent(parentEl: HTMLElement, el: Node | null | undefined): number | null {
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

function patchElement(oldVdom: ElementVDOMNode, newVdom: ElementVDOMNode, hostComponent: Component | null) {
  const el = oldVdom.el as HTMLElement;
  const {
    class: oldClass,
    style: oldStyle,
    on: oldEvents,
    ...oldAttrs
  } = oldVdom.props || ({} as Record<string, any>);
  const {
    class: newClass,
    style: newStyle,
    on: newEvents,
    ...newAttrs
  } = newVdom.props || ({} as Record<string, any>);

  const { listeners: oldListeners } = oldVdom as Partial<ElementVDOMNode>;
  patchAttrs(el, oldAttrs, newAttrs);
  patchClasses(el, oldClass as any, newClass as any);
  patchStyles(el, oldStyle as any, newStyle as any);
  newVdom.listeners = patchEvents(el, oldListeners as EventListeners | undefined, oldEvents as Record<string, Function> | undefined, newEvents as Record<string, Function> | undefined, hostComponent);
}

function patchAttrs(el: HTMLElement, oldAttrs: Record<string, any> = {}, newAttrs: Record<string, any> = {}): void {
  const { added, removed, updated } = objectsDiff(oldAttrs, newAttrs);
  for (const attr of removed) {
    removeAttribute(el, attr);
  }
  for (const attr of added.concat(updated)) {
    setAttribute(el, attr, newAttrs[attr]);
  }
}

function patchClasses(el: HTMLElement, oldClass: string | string[] | undefined, newClass: string | string[] | undefined): void {
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

function patchStyles(el: HTMLElement, oldStyle: Record<string, string | number> = {}, newStyle: Record<string, string | number> = {}): void {
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
    const listener = addEventListener(eventName, newEvents[eventName] as any, el, hostComponent as any);
    addedListeners[eventName] = listener;
  }

  return addedListeners;
}

function patchChildren(oldVdom: VDOMNode, newVdom: VDOMNode, hostComponent: Component | null) {
  const oldChildren = extractChildren(oldVdom);
  const newChildren = extractChildren(newVdom);
  const parentEl = oldVdom.el as HTMLElement;
  const diffSeq = arraysDiffSequence(oldChildren, newChildren, areNodesEqual) as Array<ArrayDiffOperation<VDOMNode>>;

  for (const operation of diffSeq) {
    const { from, originalIndex, index, item } = operation as any;
    const offset = (hostComponent as any)?.offset ?? 0;
    switch (operation.op) {
      case ARRAY_DIFF_OP.ADD: {
        mountDOM(item, parentEl, index + offset, hostComponent);
        break;
      }
      case ARRAY_DIFF_OP.REMOVE: {
        destroyDOM(item);
        break;
      }
      case ARRAY_DIFF_OP.MOVE: {
        const el = oldChildren[from].el;
        const elAtTargetIndex = parentEl.childNodes[index + offset];
        if (el) {
          parentEl.insertBefore(el, elAtTargetIndex);
          patchDOM(oldChildren[from], newChildren[index], parentEl, hostComponent);
        }
        break;
      }
      case ARRAY_DIFF_OP.NOOP: {
        patchDOM(oldChildren[originalIndex!], newChildren[index], parentEl, hostComponent);
        break;
      }
    }
  }
}

function patchComponent(oldVdom: ComponentVDOMNode, newVdom: ComponentVDOMNode) {
  const { component } = oldVdom;
  const { props } = extractPropsAndEvents(newVdom);
  component.updateProps(props);
  newVdom.component = component;
  newVdom.el = component.firstElement;
}
