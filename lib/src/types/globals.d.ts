declare module '@lib/react.js' {
  import type {VDOMNode} from './vdom';
  export abstract class Component<P = any, S = any> {
    constructor(props?: P);
    props: P;
    state: S;
    onMount(): void | Promise<void>;
    onUnmount(): void | Promise<void>;
    onUpdate(): void | Promise<void>;
    onWillUnmount(): void | Promise<void>;
    abstract render(): VDOMNode;
    updateProps(props: Partial<P>): void;
    setState(state: Partial<S> | ((prevState: S, props: P) => Partial<S>)): void;
    mount(hostEl: HTMLElement, index?: number | null): void;
    unmount(): void;
  }
  export function createApp(RootComponent: any, props?: any): {mount(parentEl: HTMLElement): void};
  export function createContext<T = any>(defaultValue: T): any;
  export const Fragment: symbol;
  export function h(...args: any[]): any;
  export function jsx(...args: any[]): any;
}
export {};
