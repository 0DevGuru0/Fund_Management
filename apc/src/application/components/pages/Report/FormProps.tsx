import { Item } from '$application/components/molecules/etc/Menu';

export default interface FormProps {
  onSelect: (item: Item | any) => void;
  selectedItems: Item[];
}
