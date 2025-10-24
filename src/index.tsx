import { connect, Provider } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import { Link } from '@/modules/router/link.tsx';
import { Route } from '@/modules/router/route.tsx';
import { RouterContext } from '@/modules/router/routerContext.ts';
import { RouterProvider } from '@/modules/router/RouterProvider.tsx';
import { Routes } from '@/modules/router/routes.tsx';
import { store } from '@/redux/store.ts';
import { Component, render } from '@react';

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
				<Link href="/contact/4?foo=52">Back to contact</Link>
				<br></br>
				<Link href="/login">Back to login</Link>
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
				<Link href="/contact/4?foo=52">Back to contact</Link>
				<ConnectedMyComponent />
			</div>
		);
	}
}

class ContactIDApp extends Component {
	static contextType = RouterContext;
	render() {
		return (
			<div>
				<p>Contact ID</p>
				<Link href="/">Back to Home</Link>
				<br></br>
				<Link href="/about">Back to About</Link>
				<p>на это странице id: {this.context.params.id}</p>
				<p>на это странице параметр из query: {this.context.params.foo}</p>
				<ConnectedMyComponent />
			</div>
		);
	}
}

class Header extends Component {
	render() {
		return (
			<header>
				<h1>My App Header</h1>
			</header>
		);
	}
}

class Footer extends Component {
	render() {
		return (
			<footer>
				<p>My App Footer</p>
			</footer>
		);
	}
}

class LoginApp extends Component {
	render() {
		return (
			<div>
				<p>Login</p>
				<p>а ты заметил, что нет footer и header?</p>
				<Link href="/">На главную</Link>
			</div>
		);
	}
}

class App extends Component {
	static contextType = RouterContext;
	render() {
		return (
			<div>
				{this.context.path != '/login' ? <Header /> : <></>}
				<Routes>
					<Route href="/" component={<MainApp />} />
					<Route href="/about" component={<AboutApp />} />
					<Route href="/contact/:id" component={<ContactIDApp />} />
					<Route href="/login" component={<LoginApp />} />
				</Routes>
				{this.context.path != '/login' ? <Footer /> : <></>}
			</div>
		);
	}
}

class ProvidersLayout extends Component {
	render() {
		return (
			<Provider store={store}>
				<RouterProvider>{this.props.children}</RouterProvider>
			</Provider>
		);
	}
}

render(
	<ProvidersLayout>
		<App />
	</ProvidersLayout>,
	document.body,
);
