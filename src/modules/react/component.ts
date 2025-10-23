import equal from 'fast-deep-equal';
import { destroyDOM } from './destroy-dom.js';
import { extractChildren } from './h.js';
import { mountDOM } from './mount-dom.js';
import { patchDOM } from './patch-dom.js';
import { enqueueJob } from './scheduler.js';
import type {
	ComponentState,
	Context,
	ContextValue,
	VDOMNode,
	WithChildrenProps,
} from './types';
import { DOM_TYPES } from './types';

export abstract class Component<
	P = {},
	S = ComponentState,
	C extends ContextValue = any,
> {
	private isMounted = false;
	private vdom: VDOMNode | null = null;
	private hostEl: HTMLElement | null = null;
	private contextValue: C = {} as C;

	public props: P & WithChildrenProps;
	public state: S = {} as S;

	static contextType?: Context;

	get context(): C {
		return this.contextValue;
	}

	constructor(props = {} as P) {
		this.props = props as P & WithChildrenProps;
	}

	onMount(): void | Promise<void> {
		return Promise.resolve();
	}

	onUnmount(): void | Promise<void> {
		return Promise.resolve();
	}

	onUpdate(): void | Promise<void> {
		return Promise.resolve();
	}

	onWillUnmount(): void | Promise<void> {
		return Promise.resolve();
	}

	abstract render(): VDOMNode;

	get elements(): HTMLElement[] {
		if (this.vdom == null) {
			return [];
		}

		if (this.vdom.type === DOM_TYPES.FRAGMENT) {
			return extractChildren(this.vdom).flatMap((child) => {
				if (child.type === DOM_TYPES.COMPONENT && (child as any).component) {
					return (child as any).component.elements;
				}
				return (child as any).el ? [(child as any).el] : [];
			});
		}

		return (this.vdom as any).el ? [(this.vdom as any).el] : [];
	}

	get firstElement(): HTMLElement | undefined {
		return this.elements[0];
	}

	get offset(): number {
		if (
			this.vdom?.type === DOM_TYPES.FRAGMENT &&
			this.hostEl &&
			this.firstElement
		) {
			return Array.from(this.hostEl.children).indexOf(this.firstElement);
		}
		return 0;
	}

	updateProps(props: Partial<P>): void {
		const newProps = { ...this.props, ...props };
		if (equal(this.props, newProps)) {
			return;
		}
		this.props = newProps;
		this.patch();
	}

	setState(state: Partial<S> | ((prevState: S, props: P) => Partial<S>)): void {
		if (typeof state === 'function') {
			this.state = {
				...this.state,
				...(state as (prevState: S, props: P) => Partial<S>)(
					this.state,
					this.props,
				),
			};
		} else {
			this.state = { ...this.state, ...state };
		}
		this.patch();
	}

	mount(hostEl: HTMLElement, index: number | null = null): void {
		if (this.isMounted) {
			throw new Error('Component is already mounted');
		}

		const constructor = this.constructor as typeof Component & {
			contextType?: Context<C>;
		};

		if (constructor.contextType != null) {
			this.contextValue = constructor.contextType.value;
			constructor.contextType.subscribe(this as Component);
		}

		this.vdom = this.render();
		mountDOM(this.vdom, hostEl, index, this as Component);
		this.hostEl = hostEl;
		this.isMounted = true;
	}

	unmount(): void {
		if (!this.isMounted) {
			throw new Error('Component is not mounted');
		}

		const constructor = this.constructor as typeof Component & {
			contextType?: Context<C>;
		};
		constructor.contextType?.unsubscribe(this as Component);

		enqueueJob(() => this.onWillUnmount());

		if (this.vdom) {
			destroyDOM(this.vdom);
		}

		enqueueJob(() => this.onUnmount());
		this.vdom = null;
		this.hostEl = null;
		this.isMounted = false;
	}

	private patch(): void {
		if (!this.isMounted || !this.hostEl || !this.vdom) {
			throw new Error('Component is not mounted');
		}

		const vdom = this.render();
		this.vdom = patchDOM(this.vdom, vdom, this.hostEl, this as Component);
		enqueueJob(() => this.onUpdate());
	}

	setContext(context: C): void {
		this.contextValue = context;
		this.patch();
	}
}
