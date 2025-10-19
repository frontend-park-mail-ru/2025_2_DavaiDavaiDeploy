export interface Props {
  todos: Array<{
    id: string;
    text: string;
    completed: boolean;
  }>;
  count: number;
  inputValue: string;
  editingId: string | null;
}
