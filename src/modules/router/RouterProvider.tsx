import { Component } from '@robocotik/react';
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

		RouterContext.value = {
			path: this.state.path,
			navigate: this.navigate,
			params: this.state.params,
		};
	}

	navigate = (to: string) => {
		if (to === this.state.path) {
			return;
		}

		window.scrollTo(0, 0);

		window.history.pushState({}, '', trimRoute(to));
		this.setState({ path: trimRoute(to), params: to });

		RouterContext.value = {
			path: trimRoute(to),
			navigate: this.navigate,
			params: this.state.params,
		};
	};

	handlePopState = () => {
		this.setState({
			path: trimRoute(window.location.pathname),
			params: window.location.pathname + window.location.search,
		});

		RouterContext.value = {
			path: trimRoute(window.location.pathname),
			navigate: this.navigate,
			params: this.state.params,
		};
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
