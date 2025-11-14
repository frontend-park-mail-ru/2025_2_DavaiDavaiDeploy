import { Component } from '@robocotik/react';
import { Route404 } from './route404/route404.tsx';
import { RouterContext } from './routerContext.ts';
import type { WithRouterProps } from './types/withRouterProps.ts';
import { normalize } from './utils/normalize.ts';
import { withRouter } from './withRouter.tsx';

class RoutesNotConnected extends Component<WithRouterProps> {
	matchRoute(
		routes: any[],
		pathname: string,
		basePath: string = '',
	): { route: any; params: Record<string, string>; outlet: any } | null {
		for (const child of routes) {
			const href = normalize(child.props?.href as string);
			const fullPath = basePath + href;

			if (href === '*') {
				const pathSegments = pathname.split('/').filter(Boolean);
				const params: Record<string, string> = {};

				if (pathSegments.length > 0) {
					params.id = pathSegments[pathSegments.length - 1];
				}

				return { route: child, params, outlet: null };
			}

			const escapedPattern = fullPath.replace(/[.+?^${}()|[\]\\]/g, '\\$&');
			const pattern = escapedPattern.replace(/:\w+/g, '([^/]+)');
			const regex = new RegExp(`^${pattern}(/.*)?$`); // ✅ Разрешаем вложенные пути
			const match = pathname.match(regex);

			if (match) {
				const params: Record<string, string> = {};
				const paramNames = [...fullPath.matchAll(/:(\w+)/g)].map((m) => m[1]);
				paramNames.forEach((name, i) => {
					params[name] = match[i + 1];
				});

				if (child.props?.children && match[match.length - 1]) {
					const remainingPath = match[match.length - 1];
					const childRoutes = Array.isArray(child.props.children)
						? child.props.children
						: [child.props.children];

					const nestedMatch = this.matchRoute(
						childRoutes,
						remainingPath,
						fullPath,
					);

					if (nestedMatch) {
						return {
							route: child,
							params: { ...params, ...nestedMatch.params },
							outlet: nestedMatch.route,
						};
					}
				}

				return { route: child, params, outlet: null };
			}
		}

		return null;
	}

	getCurrChild() {
		if (!this.props.children) {
			return <Route404 />;
		}

		const routes = Array.isArray(this.props.children)
			? this.props.children
			: [this.props.children];

		if (routes.length === 1) {
			return routes[0];
		}

		const path = window.location.pathname + window.location.search;
		const [pathname, queryString] = normalize(path).split('?');
		const searchParams = new URLSearchParams(queryString);
		const search = Object.fromEntries(searchParams.entries());

		const matched = this.matchRoute(routes, pathname);

		if (matched) {
			const params = { ...matched.params, ...search };
			this.props.router.params = params;

			if (matched.outlet) {
				return (
					<RouterContext.Provider
						value={{
							...this.props.router,
							params,
							outlet: matched.outlet,
						}}
					>
						{matched.route}
					</RouterContext.Provider>
				);
			}

			return matched.route;
		}

		return <Route404 />;
	}

	render() {
		return this.getCurrChild();
	}
}

export const Routes = withRouter(RoutesNotConnected);
