export interface TodoItemProps {
  todo: {
    id: number;
    text: string;
  };
  key: number;
  onDelete: (id: number) => void;
  onStartEditing: (id: number, text: string) => void;
}
