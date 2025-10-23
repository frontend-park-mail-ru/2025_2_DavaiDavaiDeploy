export interface RouterContextValue {
	path: string;
	navigate: (to: string) => void;
	params: Record<string, any>;
}
