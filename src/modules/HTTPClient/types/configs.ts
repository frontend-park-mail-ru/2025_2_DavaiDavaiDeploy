import { METHODS } from '../methods';

export type DefaultConfig = {
	baseUrl: string;
	headers?: Record<string, string | (() => string)>;
	timeout?: number;
};

export type RequestConfig = {
	method: METHODS;
	path: string;
	params?: Record<string | number, string | number>;
	data?: any;
};

export type Config = Pick<RequestConfig, 'params' | 'data'>;
