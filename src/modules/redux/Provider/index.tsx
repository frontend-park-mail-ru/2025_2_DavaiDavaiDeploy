import { Component } from '@react';
import type { VDOMNode } from '@react/types';
import { StoreContext } from '../connect';
import type { Store } from '../types/store';

interface ProviderProps {
	store: Store;
	children?: VDOMNode | VDOMNode[];
}

export class Provider extends Component<ProviderProps> {
	constructor(props: ProviderProps) {
		super(props);
		StoreContext.value = this.props.store;
	}

	render(): VDOMNode {
		return (
			<StoreContext.Provider value={this.props.store}>
				{this.props.children}
			</StoreContext.Provider>
		);
	}
}
