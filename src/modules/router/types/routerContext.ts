export interface RouterContextValue {
	path: string;
	navigate: (to: string | number) => void;
	params: Record<string, any>;
}
