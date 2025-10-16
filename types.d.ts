declare module '@lib/react.js' {
  export class Component<P = any, S = any> {
    props: P;
    state: S;
    context: any;
    constructor(props?: P, context?: any);
    setState(state: Partial<S> | ((prevState: S, props: P) => Partial<S>)): void;
    forceUpdate(): void;
    render(): any;
    onMount?(): void | Promise<void>;
    onUnmount?(): void | Promise<void>;
    onUpdate?(): void | Promise<void>;
    onWillUnmount?(): void | Promise<void>;
    mount(element: HTMLElement, index?: number): void;
    unmount(): void;
  }

  export function createApp(
    RootComponent: class,
    props?: any,
  ): {
    mount(element: HTMLElement): void;
    unmount(): void;
  };

  export const Fragment: unique symbol;
  export function jsx(tag: any, props: any, ...children: any[]): any;
}

declare namespace JSX {
  interface Element extends Object {}
  interface IntrinsicElements {
    [elemName: string]: any;
  }
  interface ElementClass {
    render(): any;
  }
}
