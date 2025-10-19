export interface Props {
  todo: {
    id: string;
    text: string;
  };
  onDelete: (id: string) => void;
  onStartEditing: (id: string, text: string) => void;
}
