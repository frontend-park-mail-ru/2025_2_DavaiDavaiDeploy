/* eslint-disable */
// @ts-nocheck

import 'reset-css/reset.css';

import { compose, connect, Provider } from '@/modules/redux';
import { RouterProvider } from '@/modules/router/RouterProvider.tsx';
import { store } from '@/redux/store.ts';
import '@/styles/constants.scss';
import '@/styles/globals.scss';
import '@fontsource/golos-ui';
import { Component, render } from '@robocotik/react';
import * as Sentry from '@sentry/browser';
import { Footer } from './components/footer/footer.tsx';
import { Header } from './components/header/header.tsx';
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
import notificationActions from './redux/features/notification/actions.ts';
import actions from './redux/features/user/actions.ts';
import { selectUser } from './redux/features/user/selectors.ts';
import type { Map } from './types/map.ts';
import type { ModelsUser } from './types/models.ts';

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
	requestNotificationPermission: () => {};
	connectToNotifications: () => {};
	disconnectFromNotifications: () => {};
}

class AppComponent extends Component<AppProps & WithRouterProps> {
	onMount() {
		this.props.checkUser();
		setTimeout(() => {
			if (
				NotificationManager.isSupported() &&
				Notification.permission === 'default'
			) {
				this.props.requestNotificationPermission();
			}

			const wsUrl = `wss://ddfilms.online/api/films/ws`;
			console.log('WebSocket URL:', wsUrl);

			let socket = new WebSocket(wsUrl);

			socket.onopen = function (e) {
				console.log('[open] Соединение установлено');
				console.log('Отправляем данные на сервер');
				socket.send('ping');
			};

			socket.onmessage = function (event) {
				console.log(`[message] Данные получены с сервера: ${event.data}`);
			};

			socket.onclose = function (event) {
				if (event.wasClean) {
					console.log(
						`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`,
					);
				} else {
					// например, сервер убил процесс или сеть недоступна
					// обычно в этом случае event.code 1006
					console.log('[close] Соединение прервано');
				}
			};

			socket.onerror = function (e) {
				console.log('[error] Ошибка WebSocket: ', e);
			};

			// this.props.connectToNotifications();
		}, 2000);
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
					<Route href="/calendar" component={<CalendarPage />} />
					<Route href="/search" component={<SearchPage />} />
					<Route href="/compilations/:id" component={<CompilationPage />} />
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
	requestNotificationPermission: () =>
		dispatch(notificationActions.requestNotificationPermission()),
	connectToNotifications: () =>
		dispatch(notificationActions.connectToNotifications()),
	disconnectFromNotifications: () =>
		dispatch(notificationActions.disconnectFromNotifications()),
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
