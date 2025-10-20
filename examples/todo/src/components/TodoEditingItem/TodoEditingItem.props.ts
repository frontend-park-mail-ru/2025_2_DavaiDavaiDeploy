export interface TodoEditingItemProps {
  initialText: string;
  onSave: (newText: string) => void;
  onCancel: () => void;
  id: string;
}
