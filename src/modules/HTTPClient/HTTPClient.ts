import * as Sentry from '@sentry/browser';
import { METHODS } from './methods';
import type { Config, DefaultConfig, RequestConfig } from './types/configs';
import type { Response } from './types/response';

/**
 * HTTP-клиент для выполнения запросов к API
 * @class
 */
export class HTTPClient {
	/**
	 * Создаёт экземпляр HTTPClient.
	 * @constructor
	 */

	default: DefaultConfig;

	constructor({ baseUrl, headers, timeout }: DefaultConfig) {
		this.default = {
			baseUrl,
			headers,
			timeout,
		};
	}

	static create(config: DefaultConfig): HTTPClient {
		return new HTTPClient(config);
	}

	get<T = any>(path: string, config?: Config): Promise<Response<T>> {
		return this._request<T>({ path, ...config, method: METHODS.GET });
	}

	post<T = any>(path: string, config?: Config): Promise<Response<T>> {
		return this._request<T>({ path, ...config, method: METHODS.POST });
	}

	put<T = any>(path: string, config?: Config): Promise<Response<T>> {
		return this._request<T>({ path, ...config, method: METHODS.PUT });
	}

	delete<T = any>(path: string, config?: Config): Promise<Response<T>> {
		return this._request<T>({ path, ...config, method: METHODS.DELETE });
	}

	private _buildHeaders(): Headers {
		const requestHeaders = new Headers();

		for (const [headerName, header] of Object.entries(
			this.default.headers ?? {},
		)) {
			if (typeof header === 'function') {
				requestHeaders.set(headerName, header());
			} else {
				requestHeaders.set(headerName, header);
			}
		}

		return requestHeaders;
	}

	private _buildBody(
		data: any,
		requestMethod: string,
		requestHeaders: Headers,
	): string | undefined | FormData {
		if (!data || requestMethod === METHODS.GET) {
			return undefined;
		}

		if (data instanceof FormData) {
			return data;
		}

		if (typeof data === 'object') {
			requestHeaders.set('Content-Type', 'application/json');
			return JSON.stringify(data);
		}

		return data;
	}

	private async _request<T = any>({
		method = METHODS.GET,
		path,
		params = {},
		data,
	}: RequestConfig): Promise<Response<T>> {
		const requestMethod = method.toUpperCase();

		const requestUrl = new URL(
			this.default.baseUrl + path,
			window.location.origin,
		);

		for (const [key, value] of Object.entries(params)) {
			if (value != null) {
				requestUrl.searchParams.append(key, value.toString());
			}
		}

		const requestHeaders = this._buildHeaders();

		const requestBody = this._buildBody(data, requestMethod, requestHeaders);

		const controller = new AbortController();
		const signal = controller.signal;

		const timeout = setTimeout(() => {
			controller.abort();
		}, this.default.timeout);

		try {
			const response = await fetch(requestUrl.toString(), {
				method: requestMethod,
				headers: requestHeaders,
				body: requestBody,
				credentials: 'include',
				signal,
			});

			if (!response.ok) {
				const errorMessage = `HTTP error! status: ${response.status}`;

				Sentry.captureException(new Error(errorMessage), {
					extra: {
						url: requestUrl.toString(),
						method: requestMethod,
						status: response.status,
					},
				});

				throw new Error(errorMessage, { cause: response.status });
			}

			clearTimeout(timeout);

			const responseHeaders: Record<string, string> = {};
			response.headers.forEach((value, key) => {
				responseHeaders[key] = value;
			});

			let responseData: T;

			try {
				responseData = await response.json();
			} catch {
				responseData = {} as T;
			}

			return {
				data: responseData,
				status: response.status,
				statusText: response.statusText,
				headers: responseHeaders,
			};
		} catch (error: unknown) {
			if (error instanceof Error) {
				Sentry.captureException(error, {
					extra: {
						url: requestUrl.toString(),
						method: requestMethod,
					},
				});

				if (error.name === 'TypeError' && error.message.includes('fetch')) {
					throw new Error('Network error');
				}

				throw error;
			}

			throw new Error(String(error));
		}
	}
}
