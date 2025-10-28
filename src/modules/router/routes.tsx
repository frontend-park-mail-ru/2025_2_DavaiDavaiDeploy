import { Component } from '@robocotik/react';
import { Route404 } from './route404.tsx';
import { RouterContext } from './routerContext.ts';
import type { RoutesConfig } from './types/routesConfig.ts';
import { normalize } from './utils/normalize.ts';

interface ContextProps {
	path: string;
	params: Record<string, string>;
}

export class Routes extends Component<RoutesConfig, {}, ContextProps> {
	constructor(props: RoutesConfig) {
		super(props);
	}

	static readonly contextType = RouterContext;

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
				const escapedPattern = href.replace(/[.+?^${}()|[\]\\]/g, '\\$&');
				const pattern = escapedPattern.replace(/:\w+/g, '([^/]+)');
				const regex = new RegExp(`^${pattern}$`);
				const match = pathname.match(regex);

				if (match) {
					let params: Record<string, string> = {};
					const paramNames = [...href.matchAll(/:(\w+)/g)].map((m) => m[1]);
					paramNames.forEach((name, i) => {
						params[name] = match[i + 1];
					});

					params = { ...params, ...search };
					this.context.params = params;
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
