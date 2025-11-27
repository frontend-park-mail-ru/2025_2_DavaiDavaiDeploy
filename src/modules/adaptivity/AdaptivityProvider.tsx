import { Component } from '@robocotik/react';
import { AdaptivityContext } from './AdaptivityContext.ts';

export class ModalsProvider extends Component {
	state = {
		isDesktop: false,
	};

	render() {
		return (
			<AdaptivityContext.Provider
				value={{
					isDesktop: this.state.isDesktop,
				}}
			>
				{this.props.children}
			</AdaptivityContext.Provider>
		);
	}
}
