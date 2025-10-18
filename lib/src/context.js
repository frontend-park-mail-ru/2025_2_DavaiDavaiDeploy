import {hFragment} from './h.js';
import {Component} from './component.js';
import equal from 'fast-deep-equal';

export function createContext(defaultValue) {
  const contextValue = {
    value: defaultValue,
    defaultValue: defaultValue,
    subscribers: new Set(),
  };

  function subscribe() {
    contextValue.subscribers.add(this);
  }

  function unsubscribe() {
    contextValue.subscribers.delete(this);
  }
  class Provider extends Component {
    constructor(props) {
      super(props);
      contextValue.value = props.value;
    }
    onUpdate() {
      if (!equal(contextValue.value, this.props.value)) {
        contextValue.value = this.props.value;
        contextValue.subscribers.forEach(subscriber => {
          subscriber.setContext(contextValue.value);
        });
      }
    }

    onMount() {
      if (!equal(contextValue.value, this.props.value)) {
        contextValue.value = this.props.value;
        contextValue.subscribers.forEach(subscriber => {
          subscriber.setContext(contextValue.value);
        });
      }
    }

    render() {
      return hFragment(
        Array.isArray(this.props.children) ? this.props.children : [this.props.children],
      );
    }
  }

  class Consumer extends Component {
    constructor(props) {
      super(props);
      contextValue.subscribers.add(this);
    }

    onWillUnmount() {
      contextValue.subscribers.delete(this);
    }

    render() {
      if (Array.isArray(this.props.children)) {
        if (this.props.children.length === 1 && typeof this.props.children[0] === 'function') {
          this.props.children = this.props.children[0];
        } else {
          throw new Error(
            'Consumer: expected single function child, got array',
            this.props.children,
          );
        }
      }

      if (typeof this.props.children !== 'function') {
        throw new Error('Consumer: children is not a function', this.props.children);
      }

      const result = this.props.children(contextValue.value);
      return Array.isArray(result) ? hFragment(result) : result;
    }
  }

  return {
    Provider,
    Consumer,
    value: contextValue.value,
    defaultValue: contextValue.defaultValue,
    subscribers: contextValue.subscribers,
    subscribe,
    unsubscribe,
  };
}
