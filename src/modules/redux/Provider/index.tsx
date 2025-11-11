import { Component } from '@robocotik/react';
import { StoreContext } from '../connect';
import type { Store } from '../types/store';

interface ProviderProps {
	store: Store;
}

export class Provider extends Component<ProviderProps> {
	constructor(props: ProviderProps) {
		super(props, null);
		StoreContext.defaultValue = this.props.store;
	}

	render() {
		return (
			<StoreContext.Provider value={this.props.store}>
				{this.props.children}
			</StoreContext.Provider>
		);
	}
}
