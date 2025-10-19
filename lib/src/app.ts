import {mountDOM} from './mount-dom.ts';
import {destroyDOM} from './destroy-dom.ts';
import {h} from './h.ts';
import type { Component } from './component.ts';
import type { VDOMNode } from './types/vdom.ts';
import type { IProp } from './types/types.ts';

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
