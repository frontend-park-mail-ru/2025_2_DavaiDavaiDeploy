export function trimRoute(route: string): string {
	if (route.length > 1 && route.endsWith('/')) {
		route = route.slice(0, -1);
	}

	return route;
}
