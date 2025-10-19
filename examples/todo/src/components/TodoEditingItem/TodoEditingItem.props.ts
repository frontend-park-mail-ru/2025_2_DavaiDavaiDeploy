export interface Props {
  initialText: string;
  onSave: (newText: string) => void;
  onCancel: () => void;
  id: string;
}
