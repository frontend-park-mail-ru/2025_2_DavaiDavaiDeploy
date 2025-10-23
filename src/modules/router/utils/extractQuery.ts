import { normalize } from './normalize.ts';

export function extractQuery(href: string) {
	console.log('на вход у extract ', href);
	href = normalize(href);
	console.log('после  нормализации  ', href);
	const escapedPattern = href.replace(/[.+?^${}()|[\]\\]/g, '\\$&');
	const pattern = escapedPattern.replace(/:\w+/g, '([^/]+)');
	console.log('паттерн', pattern);
	const regex = new RegExp(`^${pattern}$`);
	const match = href.match(regex);

	if (match) {
		const params: Record<string, string> = {};
		const paramNames = [...href.matchAll(/:(\w+)/g)].map((m) => m[1]);
		paramNames.forEach((name, i) => {
			params[name] = match[i + 1];
		});
		console.log('у меня метч', params);
		return params;
	}
	console.log('у НЕ метч');
}
