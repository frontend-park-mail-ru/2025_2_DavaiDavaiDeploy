import type {Component} from '../component.ts';
import type {IProp, IEvent} from './types.ts';
import type {EventListeners} from '../events.ts';
import {DOM_TYPES} from './consts.ts';

export type DOMType = (typeof DOM_TYPES)[keyof typeof DOM_TYPES];

export interface VDOMNode {
  type: DOMType;
  props?: IProp & {on?: IEvent; key?: string | number};
  children?: VDOMNode[];
  tag?: string | (new (...args: any[]) => Component);
  value?: string;
  component?: Component;
  el?: Node | null;
  listeners?: EventListeners;
}

export interface TextVDOMNode extends VDOMNode {
  type: (typeof DOM_TYPES)['TEXT'];
  value: string;
  el?: Text | null;
}

export interface ElementVDOMNode extends VDOMNode {
  type: (typeof DOM_TYPES)['ELEMENT'];
  tag: string;
  children?: VDOMNode[];
  el?: HTMLElement | null;
  listeners?: EventListeners;
}

export interface FragmentVDOMNode extends VDOMNode {
  type: (typeof DOM_TYPES)['FRAGMENT'];
  children?: VDOMNode[];
  el?: HTMLElement | null;
}

export interface ComponentVDOMNode extends VDOMNode {
  type: (typeof DOM_TYPES)['COMPONENT'];
  tag: new (...args: any[]) => Component;
  component?: Component;
  el?: HTMLElement | null;
}
