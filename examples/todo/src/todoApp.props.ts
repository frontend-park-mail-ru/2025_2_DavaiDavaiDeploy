export interface ITodo {
  id: number;
  text: string;
  completed: boolean;
}
export interface TodoAppState {
  todos: ITodo[];
  count: number;
  inputValue: string;
  editingId: number | null;
}
