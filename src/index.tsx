// prettier-ignore
import 'reset-css/reset.css';

import { Provider } from '@/modules/redux';
import { Route } from '@/modules/router/route.tsx';
import { RouterContext } from '@/modules/router/routerContext.ts';
import { RouterProvider } from '@/modules/router/RouterProvider.tsx';
import { Routes } from '@/modules/router/routes.tsx';
import { store } from '@/redux/store.ts';
import '@/styles/constants.scss';
import '@/styles/globals.scss';
import { Component, render } from '@react';
import * as Sentry from '@sentry/browser';
import { isProduction } from './consts/isProduction';
import { sentryDSN, sentryEnabled } from './consts/sentry';
import { HomePage } from './pages/homePage';

if (sentryEnabled === 'true') {
	Sentry.init({
		dsn: sentryDSN,
		enabled: isProduction,
		integrations: [Sentry.browserTracingIntegration()],
		tracePropagationTargets: ['https://ddfilms.online/'],
	});
}

class App extends Component {
	static contextType = RouterContext;
	render() {
		return (
			<div>
				<Routes>
					<Route href="/" component={<HomePage />} />
				</Routes>
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
