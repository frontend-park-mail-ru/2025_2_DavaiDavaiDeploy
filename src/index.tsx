import { Component, render } from '@/modules/react';
import { compose, connect, Provider } from '@/modules/redux';
import { RouterProvider } from '@/modules/router/RouterProvider.tsx';
import { store } from '@/redux/store.ts';
import '@/styles/constants.scss';
import '@/styles/globals.scss';
import '@fontsource/golos-ui';
import * as Sentry from '@sentry/browser';
import 'reset-css/reset.css';
import { Footer } from './components/footer/footer.tsx';
import { Header } from './components/header/header.tsx';
import {
	AppToast,
	ToastContainer,
} from './components/toastContainer/toastContainer.tsx';
import { isProduction } from './consts/isProduction';
import { sentryDSN, sentryEnabled } from './consts/sentry';
import { PRODUCTION_URL_WITH_SCHEMA } from './consts/urls';
import { ModalsProvider } from './modules/modals/modalsProvider.tsx';
import type { Dispatch } from './modules/redux/types/actions.ts';
import type { State } from './modules/redux/types/store.ts';
import { Route } from './modules/router/route.tsx';
import { Routes } from './modules/router/routes.tsx';
import type { WithRouterProps } from './modules/router/types/withRouterProps.ts';
import { withRouter } from './modules/router/withRouter.tsx';
import { ActorPage } from './pages/actorPage/actorPage.tsx';
import { FilmPage } from './pages/filmPage/filmPage.tsx';
import { GenrePage } from './pages/genrePage/genrePage';
import { HomePage } from './pages/homePage/homePage.tsx';
import { LoginPage } from './pages/loginPage/loginPage.tsx';
import { RegisterPage } from './pages/registerPage/registerPage.tsx';
import { UserPage } from './pages/userPage/userPage.tsx';
import actions from './redux/features/user/actions.ts';
import { selectUser } from './redux/features/user/selectors.ts';
import type { Map } from './types/map.ts';
import type { ModelsUser } from './types/models.ts';

if (sentryEnabled) {
	Sentry.init({
		dsn: sentryDSN,
		enabled: isProduction,
		integrations: [Sentry.browserTracingIntegration()],
		tracePropagationTargets: [PRODUCTION_URL_WITH_SCHEMA],
		release: import.meta.env.VITE_RELEASE_VERSION,
	});
}

if (isProduction && 'serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('/sw.js', { scope: '/' })
			// eslint-disable-next-line no-console
			.catch(console.log);
	});
}

window.addEventListener('online', () => {
	AppToast.info('Соединение восстановлено!');
});

window.addEventListener('offline', () => {
	AppToast.info('Нет подключения к сети — вы в офлайн-режиме!');
});

interface AppProps {
	user: ModelsUser;
	checkUser: () => {};
}

class AppComponent extends Component<AppProps & WithRouterProps> {
	onMount() {
		this.props.checkUser();
		// eslint-disable-next-line no-console
		console.log('App mounted');
	}

	render() {
		const isAuthPageOpen =
			this.props.router.path.startsWith('/login') ||
			this.props.router.path.startsWith('/register');

		return (
			<div class="layout">
				<ToastContainer />
				{!isAuthPageOpen && <Header />}
				<Routes>
					<Route href="/" component={<HomePage />} />
					<Route href="/films/:id" component={<FilmPage />} />
					<Route href="/actors/:id" component={<ActorPage />} />
					<Route href="/login" component={<LoginPage />} />
					<Route href="/register" component={<RegisterPage />} />
					<Route href="/genres/:id" component={<GenrePage />} />
					<Route href="/profile" component={<UserPage />} />
				</Routes>
				{!isAuthPageOpen && <Footer />}
			</div>
		);
	}
}

class ProvidersLayout extends Component {
	render() {
		return (
			<ModalsProvider>
				<Provider store={store}>
					<RouterProvider>{this.props.children}</RouterProvider>
				</Provider>
			</ModalsProvider>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	user: selectUser(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	checkUser: () => dispatch(actions.checkUserAction()),
});

const App = compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
)(AppComponent);

render(
	<ProvidersLayout>
		<App />
	</ProvidersLayout>,
	document.body,
);
