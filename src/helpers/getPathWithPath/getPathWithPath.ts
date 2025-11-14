export function getPathWithPath(to: string, path: string) {
	if (path != '/') {
		return `/${to}?from=${path}`;
	}

	return `/${to}`;
}
