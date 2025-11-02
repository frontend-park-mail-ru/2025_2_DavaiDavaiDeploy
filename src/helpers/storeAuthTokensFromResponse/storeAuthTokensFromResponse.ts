import LocalStorageHelper from '../localStorageHelper/localStorageHelper.ts';

export function storeAuthTokensFromResponse(response: {
	headers: Record<string, string>;
}) {
	const csrfToken = response.headers['x-csrf-token'];

	if (csrfToken) {
		LocalStorageHelper.setItem('x-csrf-token', csrfToken);
	}
}
