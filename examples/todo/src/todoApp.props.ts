export interface TodoAppState {
  todos: Array<{
    id: string;
    text: string;
    completed: boolean;
  }>;
  count: number;
  inputValue: string;
  editingId: number | null;
}
