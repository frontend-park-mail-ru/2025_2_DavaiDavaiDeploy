// src/jsx-runtime.js
import {h, hFragment} from '../../../lib/dist/react.js';

export const Fragment = Symbol('Fragment');

export function jsx(tag, props, ...children) {
  if (tag === Fragment) {
    return hFragment(children.flat());
  }

  // Для компонентов передаем props как есть
  if (typeof tag === 'function' || (typeof tag === 'object' && 'render' in tag)) {
    const componentProps = {...props};

    // Добавляем children в props если они есть
    if (children.length > 0) {
      componentProps.children = children.flat().filter(child => child != null);
    }

    return h(tag, componentProps);
  }

  // Для DOM элементов обрабатываем события и атрибуты
  const events = {};
  const attributes = {};

  if (props) {
    Object.entries(props).forEach(([key, value]) => {
      if (key.startsWith('on') && typeof value === 'function') {
        const eventName = key.slice(2).toLowerCase();
        events[eventName] = value;
      } else if (key === 'className') {
        attributes['class'] = value;
      } else if (key === 'style' && typeof value === 'object') {
        attributes['style'] = value;
      } else if (key !== 'children' && key !== 'key') {
        attributes[key] = value;
      }
    });
  }

  const flatChildren = children.flat().filter(child => child != null);

  return h(tag, {...attributes, on: events}, flatChildren);
}

// Алиас для jsxs (для фрагментов с несколькими детьми)
export function jsxs(tag, props, ...children) {
  return jsx(tag, props, ...children);
}
