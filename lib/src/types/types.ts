import type {Component} from 'lib/src/component';
import type {ARRAY_DIFF_OP} from 'lib/src/types/consts';
import type {VDOMNode} from 'lib/src/types/vdom';

export type EventHandler = (...args: any[]) => void;
export type IEvent = Record<string, EventHandler>;
export type IProp = Record<string, any>;


export interface PropsAndEvents {
  props: IProp;
  events: IEvent;
}

export interface ArrayDiffResult<T> {
  added: T[];
  removed: T[];
}

export interface ArrayDiffOperation<T> {
  op: ArrayDiffOp;
  index: number;
  item: T;
  originalIndex?: number;
  from?: number;
}

export type ArrayDiffOp = (typeof ARRAY_DIFF_OP)[keyof typeof ARRAY_DIFF_OP];

export interface ObjectsDiffResult {
  added: string[];
  removed: string[];
  updated: string[];
}

export type PlainObject = Record<string, unknown>;

export interface StyleObject {
  [key: string]: string | number;
}

export interface ElementAttributes {
  class?: string | string[];
  style?: StyleObject;
  [key: string]: unknown;
}

export interface Context<T extends ContextValue> {
  Provider: typeof Component;
  Consumer: typeof Component;
  value: T;
  subscribe: (comp: Component) => void;
  unsubscribe: (comp: Component) => void;
}

export interface ComponentProps {
  [key: string]: unknown;
  children?: VDOMNode | VDOMNode[];
}

export interface ComponentState {
  [key: string]: unknown;
}

export interface ContextValue {
  [key: string]: unknown;
}

export interface ComponentConstructor<P = ComponentProps> {
  new (props?: P): Component<P>;
  contextType?: Context<ContextValue>;
}

export type CommandHandler<T = any> = (payload: T) => void;
export type AfterCommandHandler = () => void;
export type Unsubscribe = () => void;
