import type { RouteMock } from '../../fixtures/types';

export class MockUtils {
	static intercept(mock: RouteMock) {
		const { method, url, response, alias } = mock;

		cy.intercept(method, url, {
			statusCode: response.statusCode,
			body: response.body,
			headers: response.headers,
		}).as(alias);
	}
}
