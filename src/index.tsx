import '@/styles/constants.scss';
import '@/styles/globals.scss';
import '@fontsource/golos-ui';
import { Component, render } from '@robocotik/react';
import * as Sentry from '@sentry/browser';
import 'reset-css/reset.css';
import { Footer } from './components/footer/footer';
import { isProduction } from './consts/isProduction';
import { sentryDSN, sentryEnabled } from './consts/sentry';
import { PRODUCTION_URL_WITH_SCHEMA } from './consts/urls';
import { FilmPage } from './pages/filmPage/filmPage';
import { HomePage } from './pages/homePage/homePage';

import { Header } from '@/components/header/header';
import { Provider } from '@/modules/redux';
import { RouterProvider } from '@/modules/router/RouterProvider.tsx';
import { Route } from '@/modules/router/route.tsx';
import { RouterContext } from '@/modules/router/routerContext.ts';
import { Routes } from '@/modules/router/routes.tsx';
import { store } from '@/redux/store.ts';

if (sentryEnabled) {
	Sentry.init({
		dsn: sentryDSN,
		enabled: isProduction,
		integrations: [Sentry.browserTracingIntegration()],
		tracePropagationTargets: [PRODUCTION_URL_WITH_SCHEMA],
	});
}

class App extends Component {
	static readonly contextType = RouterContext;
	render() {
		return (
			<div>
				<Header />
				<Routes>
					<Route href="/" component={<HomePage />} />
					<Route href="/films/:id" component={<FilmPage />} />
				</Routes>
				<Footer />
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
