import { Component } from '@robocotik/react';
import { RouterContext } from './routerContext.ts';
import { trimRoute } from './utils/trimRoute.ts';

export class RouterProvider extends Component {
	state = {
		path: trimRoute(window.location.pathname),
		params: {},
	};

	back() {
		window.scrollTo(0, 0);
		window.history.back();
	}

	navigate = (to: string) => {
		if (to === this.state.path) {
			return;
		}

		window.scrollTo(0, 0);

		window.history.pushState({}, '', trimRoute(to));
		this.setState({ path: trimRoute(to), params: {} });
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
					back: this.back,
				}}
			>
				{this.props.children}
			</RouterContext.Provider>
		);
	}
}
