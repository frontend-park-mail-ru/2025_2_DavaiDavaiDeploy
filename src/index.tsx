import { Component, render } from '@react';
import { connect, Provider } from './modules/redux';
import type { Dispatch } from './modules/redux/types/actions.ts';
import type { State } from './modules/redux/types/store.ts';
import { Route } from './modules/router/route.tsx';
import { RouterProvider } from './modules/router/RouterProvider.tsx';
import { Routes } from './modules/router/routes.tsx';

import { Link } from './modules/router/link.tsx';
import { store } from './redux/store.ts';

interface MyComponentProps {
	count: number;
	increment: () => void;
}

class MyComponent extends Component<MyComponentProps> {
	render() {
		return (
			<div>
				<p>Count: {this.props.count}</p>
				<button onClick={this.props.increment}>+</button>
			</div>
		);
	}
}

const mapStateToProps = (state: State) => ({
	count: state.counter.count,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	increment: () => {
		dispatch({ type: 'INCREMENT' });
	},
});

const ConnectedMyComponent = connect(
	mapStateToProps,
	mapDispatchToProps,
)(MyComponent);

class MainApp extends Component {
	render() {
		return (
			<div>
				<p>Главная</p>
				<Link href="/about">Back to About</Link>
				<br></br>
				<Link href="/contact/4?sosal=52">Back to contact</Link>
				<ConnectedMyComponent />
			</div>
		);
	}
}

class AboutApp extends Component {
	render() {
		return (
			<div>
				<p>about</p>
				<Link href="/">Back to Home</Link>
				<br></br>
				<Link href="/contact/4?sosal=52">Back to contact</Link>
				<ConnectedMyComponent />
			</div>
		);
	}
}

class ContactIDApp extends Component {
	render() {
		return (
			<div>
				<p>Contact ID</p>
				<Link href="/">Back to Home</Link>
				<br></br>
				<Link href="/about">Back to About</Link>
				<ConnectedMyComponent />
			</div>
		);
	}
}

class App extends Component {
	render() {
		return (
			<RouterProvider>
				<Routes>
					<Route href="/" component={<MainApp />} />
					<Route href="/about" component={<AboutApp />} />
					<Route href="/contact/:id" component={<ContactIDApp />} />
				</Routes>
			</RouterProvider>
		);
	}
}

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.body,
);
