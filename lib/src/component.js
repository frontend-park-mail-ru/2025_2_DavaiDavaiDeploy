import {destroyDOM} from './destroy-dom.js';
import {mountDOM} from './mount-dom.js';
import {DOM_TYPES, extractChildren} from './h.js';
import {patchDOM} from './patch-dom.js';
import equal from 'fast-deep-equal';
import {enqueueJob} from './scheduler.js';

export class Component {
  #isMounted = false;
  #vdom = null;
  #hostEl = null;
  #contextValue = {
    get context() {
      return this.value;
    },
  };

  constructor(props = {}) {
    this.props = props;
  }

  onMount() {
    return Promise.resolve();
  }
  onUnmount() {
    return Promise.resolve();
  }
  onUpdate() {
    return Promise.resolve();
  }
  onWillUnmount() {
    return Promise.resolve();
  }

  get elements() {
    if (this.#vdom == null) {
      return [];
    }
    if (this.#vdom.type === DOM_TYPES.FRAGMENT) {
      return extractChildren(this.#vdom).flatMap(child => {
        if (child.type === DOM_TYPES.COMPONENT) {
          return child.component.elements;
        }
        return [child.el];
      });
    }
    return [this.#vdom.el];
  }
  get firstElement() {
    return this.elements[0];
  }
  get offset() {
    if (this.#vdom.type === DOM_TYPES.FRAGMENT) {
      return Array.from(this.#hostEl.children).indexOf(this.firstElement);
    }
    return 0;
  }

  updateProps(props) {
    const newProps = {...this.props, ...props};
    if (equal(this.props, newProps)) {
      return;
    }
    this.props = newProps;
    this.#patch();
  }

  setState(state) {
    if (typeof state === 'function') {
      this.state = {
        ...this.state,
        ...state(this.state, this.props),
      };
    } else {
      this.state = {...this.state, ...state};
    }
    this.#patch();
  }

  mount(hostEl, index = null) {
    if (this.#isMounted) {
      throw new Error('Component is already mounted');
    }

    this.#vdom = this.render();
    mountDOM(this.#vdom, hostEl, index, this);
    this.#hostEl = hostEl;
    this.#isMounted = true;
    console.log('В МАУНТЕ: contextType ', this.constructor.contextType);
    if (this.constructor.contextType != null) {
      this.setContext(this.constructor.contextType.value);
      this.constructor.contextType.subscribers.add(this);
    }
  }
  unmount() {
    if (!this.#isMounted) {
      throw new Error('Component is not mounted');
    }
    enqueueJob(() => this.onWillUnmount());
    destroyDOM(this.#vdom);
    enqueueJob(() => this.onUnmount());
    if (this.constructor.contextType != null) {
      this.constructor.contextType.subscribers.delete(this);
    }
    this.#vdom = null;
    this.#hostEl = null;
    this.#isMounted = false;
  }

  #patch() {
    if (!this.#isMounted) {
      throw new Error('Component is not mounted');
    }
    const vdom = this.render();
    this.#vdom = patchDOM(this.#vdom, vdom, this.#hostEl, this);
    enqueueJob(() => this.onUpdate());
  }

  setContext(context) {
    this.#contextValue.value = context;
    this.#patch();
  }
}
