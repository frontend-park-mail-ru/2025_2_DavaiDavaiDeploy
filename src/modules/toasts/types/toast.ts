export interface ToastItem {
	type: 'error' | 'success';
	message: string;
	isActive: boolean;
	timer?: ReturnType<typeof setTimeout>;
}
