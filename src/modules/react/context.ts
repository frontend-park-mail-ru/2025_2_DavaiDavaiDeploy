import { Component } from './component';
import { hFragment } from './h';
import type { Context, VDOMNode } from './types';

export function createContext<T>(defaultValue: T): Context<T> {
	interface ProviderProps {
		value: T;
		children?: VDOMNode | VDOMNode[];
	}

	class Provider extends Component<ProviderProps> {
		render(): VDOMNode {
			let children: VDOMNode[] = [];

			if (Array.isArray(this.props.children)) {
				children = this.props.children;
			} else if (this.props.children) {
				children = [this.props.children];
			} else {
				children = [];
			}

			return hFragment(children);
		}
	}

	class Consumer extends Component {
		static contextType = {
			Provider,
			defaultValue,
		};

		render(): VDOMNode {
			let children = this.props.children;

			if (Array.isArray(children)) {
				if (children.length === 1 && typeof children[0] === 'function') {
					children = children[0] as (value: T) => VDOMNode | VDOMNode[];
				} else {
					throw new Error(
						'Consumer: expected single function child, got array',
					);
				}
			}

			if (typeof children !== 'function') {
				throw new Error('Consumer: children is not a function');
			}

			return children(this.context);
		}
	}

	return {
		Provider,
		Consumer,
		defaultValue,
	};
}
