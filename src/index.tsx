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
import { ActorPage } from './pages/actorPage/actorPage';

import { Header } from '@/components/header/header';
import { compose, connect, Provider } from '@/modules/redux';
import { RouterProvider } from '@/modules/router/RouterProvider.tsx';
import { Route } from '@/modules/router/route.tsx';
import { Routes } from '@/modules/router/routes.tsx';
import { FilmPage } from '@/pages/filmPage/filmPage';
import { HomePage } from '@/pages/homePage/homePage';
import { LoginPage } from '@/pages/loginPage/loginPage.tsx';
import { RegisterPage } from '@/pages/registerPage/registerPage.tsx';
import { store } from '@/redux/store.ts';
import type { Dispatch } from './modules/redux/types/actions.ts';
import type { State } from './modules/redux/types/store.ts';
import type { WithRouterProps } from './modules/router/types/withRouterProps.ts';
import { withRouter } from './modules/router/withRouter.tsx';
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
	});
}

interface AppProps {
	user: ModelsUser;
	checkUser: () => {};
}

class AppComponent extends Component<AppProps & WithRouterProps> {
	onMount(): void | Promise<void> {
		this.props.checkUser();
	}

	render() {
		return (
			<div class="layout">
				{this.props.router.path != '/login' &&
					this.props.router.path != '/register' && <Header />}
				<Routes>
					<Route href="/" component={<HomePage />} />
					<Route href="/films/:id" component={<FilmPage />} />
					<Route href="/actors/:id" component={<ActorPage />} />
					<Route href="/login" component={<LoginPage />} />
					<Route href="/register" component={<RegisterPage />} />
				</Routes>
				{this.props.router.path != '/login' &&
					this.props.router.path != '/register' && <Footer />}
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
