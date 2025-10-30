export function decode(text: string): string {
	if (!text) {
		return text;
	}

	const parser = new DOMParser();
	const decoded = parser.parseFromString(text, 'text/html').documentElement
		.textContent;

	return decoded ?? text;
}
