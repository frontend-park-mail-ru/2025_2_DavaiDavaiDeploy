import { Component } from '@robocotik/react';
import { Route404 } from './route404/route404.tsx';
import type { WithRouterProps } from './types/withRouterProps.ts';
import { normalize } from './utils/normalize.ts';
import { withRouter } from './withRouter.tsx';

class RoutesNotConnected extends Component<WithRouterProps> {
	getParams(
		href: string,
		match: RegExpMatchArray,
		search: Record<string, string>,
	) {
		const params: Record<string, string> = {};
		const paramNames = [...href.matchAll(/:(\w+)/g)].map((m) => m[1]);
		paramNames.forEach((name, i) => {
			params[name] = match[i + 1];
		});

		if (window.location.hash) {
			const anchor = window.location.hash.slice(1);
			return { ...params, ...search, anchor };
		}

		return { ...params, ...search };
	}

	getCurrChild() {
		if (!this.props.children) {
			return <Route404 />;
		}

		if (!Array.isArray(this.props.children)) {
			return this.props.children;
		} else {
			if (this.props.children.length === 1) {
				return this.props.children[0];
			}

			const path = window.location.pathname + window.location.search;
			const [pathname, queryString] = normalize(path).split('?');
			const searchParams = new URLSearchParams(queryString);
			const search = Object.fromEntries(searchParams.entries());

			for (const child of this.props.children) {
				const href = normalize(child.props?.href as string);

				if (href === '*') {
					const pathSegments = pathname.split('/').filter(Boolean);

					if (pathSegments.length > 0) {
						search.id = pathSegments[pathSegments.length - 1];
					}

					this.props.router.params = search;
					return child;
				}

				const escapedPattern = href.replace(/[.+?^${}()|[\]\\]/g, '\\$&');
				const pattern = escapedPattern.replace(/:\w+/g, '([^/]+)');
				const regex = new RegExp(`^${pattern}$`);
				const match = pathname.match(regex);

				if (match) {
					this.props.router.params = this.getParams(href, match, search);
					return child;
				}
			}

			return <Route404 />;
		}
	}

	render() {
		return this.getCurrChild();
	}
}

export const Routes = withRouter(RoutesNotConnected);
