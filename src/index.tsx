import { Provider } from '@/modules/redux';
import { Route } from '@/modules/router/route.tsx';
import { RouterContext } from '@/modules/router/routerContext.ts';
import { RouterProvider } from '@/modules/router/RouterProvider.tsx';
import { Routes } from '@/modules/router/routes.tsx';
import { store } from '@/redux/store.ts';
import '@/styles/constants.scss';
import '@/styles/globals.scss';
import '@fontsource/golos-ui';
import { Component, render } from '@react';
import * as Sentry from '@sentry/browser';
import 'reset-css/reset.css';
import { isProduction } from './consts/isProduction';
import { sentryDSN, sentryEnabled } from './consts/sentry';
import { PRODUCTION_URL_WITH_SCHEMA } from './consts/urls';
import { HomePage } from './pages/homePage/homePage';

console.log(PRODUCTION_URL_WITH_SCHEMA);

if (sentryEnabled) {
	Sentry.init({
		dsn: sentryDSN,
		enabled: isProduction,
		integrations: [Sentry.browserTracingIntegration()],
		tracePropagationTargets: [PRODUCTION_URL_WITH_SCHEMA],
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
