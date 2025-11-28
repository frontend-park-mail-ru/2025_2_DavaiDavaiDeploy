import { Component } from '@/modules/react';
import { StoreContext } from '../connect';
import type { Store } from '../types/store';

interface ProviderProps {
	store: Store;
}

export class Provider extends Component<ProviderProps> {
	render() {
		return (
			<StoreContext.Provider value={this.props.store}>
				{this.props.children}
			</StoreContext.Provider>
		);
	}
}
