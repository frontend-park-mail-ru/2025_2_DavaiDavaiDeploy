export interface MockResponse {
	statusCode: number;
	body?: object;
	headers?: Record<string, string>;
	delay?: number;
}

export interface RouteMock {
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
	url: string;
	response: MockResponse;
	alias: string;
}
