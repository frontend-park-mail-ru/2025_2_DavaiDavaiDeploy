import 'reset-css/reset.css';

import { compose, connect, Provider } from '@/modules/redux';
import { RouterProvider } from '@/modules/router/RouterProvider.tsx';
import { store } from '@/redux/store.ts';
import '@/styles/constants.scss';
import '@/styles/globals.scss';
import '@fontsource/golos-ui';
import { Component, render } from '@robocotik/react';
import * as Sentry from '@sentry/browser';
import * as VKID from '@vkid/sdk';
import 'ddd-ui-kit/dist/ddd-ui-kit.css';
import { Footer } from './components/footer/footer.tsx';
import { Header } from './components/header/header.tsx';
import Layout from './components/Layout/Layout';
import {
	AppToast,
	ToastContainer,
} from './components/toastContainer/toastContainer.tsx';
import { sentryDSN, sentryEnabled } from './consts/sentry';
import { isSwEnabled } from './consts/sw';
import { PRODUCTION_URL } from './consts/urls.ts';
import { ModalsProvider } from './modules/modals/modalsProvider.tsx';
import { NotificationManager } from './modules/notifications/notificationManager';
import type { Dispatch } from './modules/redux/types/actions.ts';
import type { State } from './modules/redux/types/store.ts';
import { Route } from './modules/router/route.tsx';
import { Routes } from './modules/router/routes.tsx';
import type { WithRouterProps } from './modules/router/types/withRouterProps.ts';
import { withRouter } from './modules/router/withRouter.tsx';
import { ActorPage } from './pages/actorPage/actorPage.tsx';
import { CalendarPage } from './pages/calendarPage/calendarPage.tsx';
import { CompilationPage } from './pages/compilationPage/compilationPage.tsx';
import { FilmPage } from './pages/filmPage/filmPage.tsx';
import { GenrePage } from './pages/genrePage/genrePage';
import { HomePage } from './pages/homePage/homePage.tsx';
import { LoginPage } from './pages/loginPage/loginPage.tsx';
import { RegisterPage } from './pages/registerPage/registerPage.tsx';
import { SearchPage } from './pages/searchPage/searchPage.tsx';
import { UserPage } from './pages/userPage/userPage.tsx';
import actions from './redux/features/user/actions.ts';
import {
	selectIsAuthentificated,
	selectIsChecked,
	selectUser,
} from './redux/features/user/selectors';
import type { Map } from './types/map.ts';

VKID.Config.init({
	app: import.meta.env.VITE_VK_SDK_APP_ID,
	redirectUrl: import.meta.env.VITE_VK_ID_REDIRECT_URL,
	source: VKID.ConfigSource.LOWCODE,
	scope: 'email',
	responseMode: VKID.ConfigResponseMode.Callback,
});

if (sentryEnabled) {
	Sentry.init({
		dsn: sentryDSN,
		enabled: true,
		integrations: [Sentry.browserTracingIntegration()],
		tracePropagationTargets: [PRODUCTION_URL],
		release: import.meta.env.VITE_RELEASE_VERSION,
		environment: import.meta.env.MODE,
	});
}

if (isSwEnabled && 'serviceWorker' in navigator) {
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
	isAuthentificated: boolean;
	isChecked: boolean;
	checkUser: () => {};
}

class AppComponent extends Component<AppProps & WithRouterProps> {
	onMount() {
		this.props.checkUser();

		alert(
			`NotificationManager.isSupported: ${NotificationManager.isSupported()}`,
		);
		alert(`Notification.permission: ${Notification.permission.toString()}`);
		alert(`'Notification' in window: ${'Notification' in window}`);
		alert(`'serviceWorker' in navigator: ${'serviceWorker' in navigator}`);

		if (
			NotificationManager.isSupported() &&
			Notification.permission === 'default'
		) {
			NotificationManager.requestPermission();
		}
	}

	onUpdate(): void | Promise<void> {
		if (
			!NotificationManager.hasWSConnection() &&
			this.props.isAuthentificated
		) {
			NotificationManager.connect();
		}
	}

	render() {
		if (!this.props.isChecked) {
			return <></>;
		}

		const isAuthPageOpen =
			this.props.router.path.startsWith('/login') ||
			this.props.router.path.startsWith('/register');

		return (
			<Layout>
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
					<Route href="/calendar" component={<CalendarPage />} />
					<Route href="/search" component={<SearchPage />} />
					<Route href="/compilations/:id" component={<CompilationPage />} />
				</Routes>
				{!isAuthPageOpen && <Footer />}
			</Layout>
		);
	}
}

class ProvidersLayout extends Component {
	render() {
		return (
			<Provider store={store}>
				<ModalsProvider>
					<RouterProvider>{this.props.children}</RouterProvider>
				</ModalsProvider>
			</Provider>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	user: selectUser(state),
	isChecked: selectIsChecked(state),
	isAuthentificated: selectIsAuthentificated(state),
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
