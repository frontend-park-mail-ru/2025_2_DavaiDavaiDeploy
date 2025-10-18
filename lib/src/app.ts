import {mountDOM} from './mount-dom.js';
import {destroyDOM} from './destroy-dom.js';
import {h} from './h.js';
import {Component} from '@lib/react';
import type { VDOMNode } from 'lib/src/types/vdom';
import type { IProp } from 'lib/src/types/types';

interface AppInstance {
  mount: (parentEl: HTMLElement) => void;
  unmount: () => void;
}

export function createApp(RootComponent: typeof Component, props: IProp = {}): AppInstance {
  let parentEl: HTMLElement | null = null;
  let isMounted = false;
  let vdom: VDOMNode | null = null;

  function reset(): void {
    parentEl = null;
    isMounted = false;
    vdom = null;
  }

  return {
    mount(_parentEl: HTMLElement): void {
      if (isMounted) {
        throw new Error('The application is already mounted');
      }
      parentEl = _parentEl;
      vdom = h(RootComponent, props);
      mountDOM(vdom, parentEl, null);
      isMounted = true;
    },

    unmount(): void {
      if (!isMounted) {
        throw new Error('The application is not mounted');
      }
      if (!vdom) {
        throw new Error('Virtual DOM is not defined');
      }
      destroyDOM(vdom);
      reset();
    },
  };
}
