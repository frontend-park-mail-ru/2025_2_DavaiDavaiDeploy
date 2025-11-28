import { Component } from '@/modules/react';
import { RouterContext } from './routerContext.ts';
import { trimRoute } from './utils/trimRoute.ts';

export class RouterProvider extends Component {
	state = {
		path: trimRoute(window.location.pathname),
		params: {},
	};

	navigate = (to: string | number) => {
		if (to === this.state.path) {
			return;
		}

		if (to === -1) {
			window.scrollTo(0, 0);
			window.history.back();
		}

		window.scrollTo(0, 0);

		window.history.pushState({}, '', trimRoute(to.toString()));
		this.setState({ path: trimRoute(to.toString()), params: {} });
	};

	handlePopState = () => {
		window.scrollTo(0, 0);

		this.setState({
			path: trimRoute(window.location.pathname),
			params: {},
		});
	};

	onMount() {
		window.addEventListener('popstate', this.handlePopState);
	}

	onWillUnmount() {
		window.removeEventListener('popstate', this.handlePopState);
	}

	render() {
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
