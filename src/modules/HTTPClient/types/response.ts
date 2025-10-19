export type Response<T> = Promise<{
	data: T;
	status: number;
	statusText: string;
	headers: Record<string, string>;
}>;
