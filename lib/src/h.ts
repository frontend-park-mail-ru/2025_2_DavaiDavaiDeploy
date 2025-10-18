// h.ts
import type { Component } from '@lib/react.js';
import type { ElementVDOMNode, ComponentVDOMNode, TextVDOMNode, VDOMNode, FragmentVDOMNode } from 'lib/src/types/vdom';
import {withoutNulls} from './utils/arrays.js';
import { DOM_TYPES } from 'lib/src/types/consts';


export type DOMType = (typeof DOM_TYPES)[keyof typeof DOM_TYPES];

// Более строгие типы для props
export interface ElementProps {
  [key: string]: unknown;
  on?: Record<string, Function>;
  key?: string | number;
  class?: string | string[];
  style?: Record<string, string | number>;
}

// Перегрузки для функции h
export function h(tag: string, props?: ElementProps, children?: any[]): ElementVDOMNode;
export function h(tag: typeof Component, props?: ElementProps, children?: any[]): ComponentVDOMNode;
export function h(
  tag: string | typeof Component,
  props: ElementProps = {},
  children: any[] = [],
): ElementVDOMNode | ComponentVDOMNode {
  const type = typeof tag === 'string' ? DOM_TYPES.ELEMENT : DOM_TYPES.COMPONENT;

  const vdom: any = {
    tag,
    props,
    type,
    children: mapTextNodes(withoutNulls(children)),
  };

  return vdom;
}

export function hString(str: string): TextVDOMNode {
  return {
    type: DOM_TYPES.TEXT,
    value: str,
    props: {}, // Обязательные props
  };
}

export function hFragment(vNodes: (VDOMNode | string | null | undefined)[]): FragmentVDOMNode {
  return {
    type: DOM_TYPES.FRAGMENT,
    children: mapTextNodes(withoutNulls(vNodes)),
    props: {}, // Обязательные props
  };
}

function mapTextNodes(children: (VDOMNode | string)[]): VDOMNode[] {
  return children.map(child => (typeof child === 'string' ? hString(child) : child)) as VDOMNode[];
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
