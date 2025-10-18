// context.ts
import {hFragment} from './h.js';
import {Component} from './component.js';
import equal from 'fast-deep-equal';
import type { VDOMNode } from 'lib/src/types/vdom';
import type { ContextValue } from 'lib/src/types/types';

export interface ProviderProps<T extends ContextValue> {
  value: T;
  children?: VDOMNode | VDOMNode[];
}

export interface ConsumerProps<T extends ContextValue> {
  children: ((value: T) => VDOMNode | VDOMNode[]) | VDOMNode[];
}

export interface Context<T extends ContextValue> {
  Provider: typeof Component;
  Consumer: typeof Component;
  value: T;
  subscribe: (comp: Component) => void;
  unsubscribe: (comp: Component) => void;
}

export function createContext<T extends ContextValue>(defaultValue: T): Context<T> {
  let value: T = defaultValue;
  const subscribers = new Set<Component>();

  function subscribe(comp: Component): void {
    subscribers.add(comp);
  }

  function unsubscribe(comp: Component): void {
    subscribers.delete(comp);
  }

  class Provider extends Component<ProviderProps<T>> {
    onUpdate(): void {
      if (!equal(value, this.props.value)) {
        value = this.props.value;
        subscribers.forEach(subscriber => {
          subscriber.setContext(value);
        });
      }
    }

    onMount(): void {
      if (!equal(value, this.props.value)) {
        value = this.props.value;
        subscribers.forEach(subscriber => {
          subscriber.setContext(value);
        });
      }
    }

    render(): VDOMNode {
      const children = Array.isArray(this.props.children)
        ? this.props.children
        : this.props.children
          ? [this.props.children]
          : [];

      return hFragment(children);
    }
  }

  class Consumer extends Component<ConsumerProps<T>> {
    constructor(props: ConsumerProps<T>) {
      super(props);
      subscribers.add(this as any);
    }

    onWillUnmount(): void {
      subscribers.delete(this as any);
    }

    render(): VDOMNode {
      let children = this.props.children;

      if (Array.isArray(children)) {
        if (children.length === 1 && typeof children[0] === 'function') {
          children = children[0] as (value: T) => VDOMNode | VDOMNode[];
        } else {
          throw new Error('Consumer: expected single function child, got array');
        }
      }

      if (typeof children !== 'function') {
        throw new Error('Consumer: children is not a function');
      }

      const result = children(value);
      return Array.isArray(result) ? hFragment(result) : result;
    }
  }

  return {
    Provider: Provider as typeof Component,
    Consumer: Consumer as typeof Component,
    value,
    subscribe,
    unsubscribe,
  };
}
