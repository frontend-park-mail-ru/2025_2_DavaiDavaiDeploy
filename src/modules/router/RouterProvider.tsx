import { Component } from '@react/index';
import type { VDOMNode } from '@react/types';
import { RouterContext } from './routerContext.ts';
import { trimRoute } from './utils/trimRoute.ts';

export class RouterProvider extends Component {
	state = {
		path: '/',
		params: {},
	};

	constructor(props: any) {
		super(props);
		this.state.path = window.location.pathname;
	}

	navigate = (to: string) => {
		if (to === this.state.path) {
			return;
		}
		window.history.pushState({}, '', trimRoute(to));
		this.setState({ path: trimRoute(to), params: to });
	};

	handlePopState = () => {
		this.setState({
			path: trimRoute(window.location.pathname),
			params: window.location.pathname + window.location.search,
		});
	};

	onMount() {
		this.setState({
			path: trimRoute(window.location.pathname),
			params: window.location.pathname + window.location.search,
		});
		window.addEventListener('popstate', this.handlePopState);
	}

	onWillUnmount() {
		window.removeEventListener('popstate', this.handlePopState);
	}

	render(): VDOMNode {
		return (
			<RouterContext.Provider
				value={{
					path: this.state.path,
					navigate: this.navigate,
					params: this.state.params,
				}}
			>
				{this.props.children}
			</RouterContext.Provider>
		);
	}
}
