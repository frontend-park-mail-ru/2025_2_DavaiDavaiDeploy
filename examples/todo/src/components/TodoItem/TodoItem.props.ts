export interface TodoItemProps {
  todo: {
    id: number;
    text: string;
  };
  onDelete: (id: number) => void;
  onStartEditing: (id: number, text: string) => void;
}
