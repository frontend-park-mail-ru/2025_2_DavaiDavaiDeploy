export function getPathWithFrom(to: string, params: Record<string, any>) {
	if ('from' in params) {
		return `/${to}?from=${params.from}`;
	}

	return `/${to}`;
}
