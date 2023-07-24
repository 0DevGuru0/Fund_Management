import { Item } from '$application/components/molecules/etc/Menu';

interface APIItem {
  id: string;
  title: string;
}

const itemsMapper = (api?: APIItem[] | any): Item[] => {
  return api?.map((item) => ({ id: item.id ?? item._id, label: item.title })) ?? [];
};

export default itemsMapper;

export const idMapper = (items: Item[]): string => {
  const ids = items.map((item) => item.id);
  return ids.join(',');
};

export const titleMapper = (items: Item[]): string => {
  const titles = items.map((item) => item.label);
  return titles.join(',');
};
