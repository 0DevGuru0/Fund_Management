import { Item } from '$application/components/molecules/etc/Menu';

interface APIItem {
  id: string;
  title: string;
}

const itemsMapper = (api?: APIItem[]): Item[] =>
  api?.map((item) => ({ id: item.id, label: item.title })) ?? [];

export default itemsMapper;
