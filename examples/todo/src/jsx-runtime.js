// src/jsx-runtime.js
import {h, hFragment} from '../../../lib/dist/react.js';

export function jsx(tag, props, key) {
  if (tag === Symbol.for('react.fragment')) {
    return hFragment(props.children || []);
  }

  const {children, ...otherProps} = props || {};

  // Преобразуем события из camelCase в lowercase
  const events = {};
  const attributes = {};

  Object.entries(otherProps).forEach(([key, value]) => {
    if (key.startsWith('on') && typeof value === 'function') {
      const eventName = key.slice(2).toLowerCase();
      events[eventName] = value;
    } else {
      attributes[key] = value;
    }
  });

  const allChildren = Array.isArray(children) ? children : children ? [children] : [];

  return h(tag, {...attributes, on: events, key}, allChildren);
}

export function jsxs(tag, props, key) {
  return jsx(tag, props, key);
}

export function jsxDEV(tag, props, key) {
  return jsx(tag, props, key);
}

export const Fragment = Symbol.for('react.fragment');
