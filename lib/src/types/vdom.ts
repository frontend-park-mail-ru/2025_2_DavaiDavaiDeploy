import type { Component } from 'lib/src/component';
import type { IProp } from 'lib/src/types/types';

export interface VDOMNode {
  type: string;
  props?: {
    [key: string]: any;
    on?: IProp;
    key?: string | number;
  };
  children?: VDOMNode[];
  tag?: any;
  value?: string;
  component?: Component;
  el?: Node;
  listeners?: {[eventName: string]: Function};
}

export interface TextVDOMNode extends VDOMNode {
  type: 'text';
  value: string;
  el?: Text;
}

export interface ElementVDOMNode extends VDOMNode {
  type: 'element';
  tag: string;
  children?: VDOMNode[];
  el?: HTMLElement;
  listeners?: {[eventName: string]: Function};
}

export interface FragmentVDOMNode extends VDOMNode {
  type: 'fragment';
  children?: VDOMNode[];
  el?: HTMLElement;
}

export interface ComponentVDOMNode extends VDOMNode {
  type: 'component';
  tag: any;
  component?: Component;
  el?: HTMLElement;
}
