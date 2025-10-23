import '@/styles/globals.scss';
import { Component, render } from '@react';
import 'reset-css/reset.css';

import { Link } from '@/modules/router/link.tsx';
import { Route } from '@/modules/router/route.tsx';
import { RouterContext } from '@/modules/router/routerContext.ts';
import { RouterProvider } from '@/modules/router/routerProvider';
import { Routes } from '@/modules/router/routes.tsx';
import type { RouterContextValue } from '@/modules/router/types/routerContext.ts';
import type { VDOMNode } from '@react/types/';
import * as Sentry from '@sentry/browser';

Sentry.init({
	dsn: import.meta.env.VITE_SENTRY_DSN,
	enabled: import.meta.env.PROD,
	integrations: [Sentry.browserTracingIntegration()],
	tracePropagationTargets: ['https://ddfilms.online/'],
});

class Home extends Component {
	render(): VDOMNode {
		return (
			<>
				<div>У КАЖДОГО ДОЛЖЕН БЫТЬ СВОЙ HOME @kanev</div>;
				<Link href="/about">Перейти на страницу "Обо мне"</Link>
			</>
		);
	}
}

class About extends Component {
	render(): VDOMNode {
		return (
			<>
				<div>ОБО МНЕ: Я - КАНЕВ ВЛАДИСЛАВ</div>
				<Link href="/">Перейти на страницу "Главная"</Link>
			</>
		);
	}
}

class AboutId extends Component<{}, {}, RouterContextValue> {
	static contextType = RouterContext;

	render(): VDOMNode {
		return (
			<>
				<div>About ID</div>
				<p>{this.context.params.id}</p>
				<Link href="/">Перейти на страницу "Главная"</Link>
			</>
		);
	}
}

export class App extends Component {
	render() {
		return (
			<RouterProvider>
				<Routes>
					<Route href="/" component={<Home />} />
					<Route href="/about" component={<About />} />
					<Route href="/about/:id" component={<AboutId />} />
				</Routes>
			</RouterProvider>
		);
	}
}

render(<App />, document.body);
