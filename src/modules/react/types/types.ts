import type { Component } from '../component.ts';
import type { VDOMNode } from './';
import { ARRAY_DIFF_OP } from './consts';

export type EventHandler = (...args: any[]) => void;
export type IEvent = Record<string, EventHandler>;
export type IProp = Record<string, unknown>;

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

export interface Context<T> {
	Provider: Function;
	Consumer: Function;
	defaultValue: T;
}

export interface ComponentState {
	[key: string]: unknown;
}

export interface WithChildrenProps {
	children?: VDOMNode[] | VDOMNode | string | Function;
}

export type ComponentType<
	Props = any,
	ComponentState = any,
	Context = any,
> = new (
	props: Props,
	parentComponent: Component<{}, any, null> | null,
) => Component<Props, ComponentState, Context>;
