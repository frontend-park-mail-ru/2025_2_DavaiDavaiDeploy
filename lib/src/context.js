import {hFragment} from './h.js';
import {Component} from './component.js';
import equal from 'fast-deep-equal';

export function createContext(defaultValue) {
  let value = defaultValue;
  const subscribers = new Set();

  function subscribe(comp) {
    subscribers.add(comp);
  }

  function unsubscribe(comp) {
    subscribers.delete(comp);
  }
  class Provider extends Component {
    onUpdate() {
      if (!equal(value, this.props.value)) {
        value = this.props.value;
        subscribers.forEach(subscriber => {
          subscriber.setContext(value);
        });
      }
    }

    onMount() {
      if (!equal(value, this.props.value)) {
        value = this.props.value;
        subscribers.forEach(subscriber => {
          subscriber.setContext(value);
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
      subscribers.add(this);
    }

    onWillUnmount() {
      subscribers.delete(this);
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

      const result = this.props.children(value);
      return Array.isArray(result) ? hFragment(result) : result;
    }
  }

  return {
    Provider,
    Consumer,
    value,
    subscribe,
    unsubscribe,
  };
}
