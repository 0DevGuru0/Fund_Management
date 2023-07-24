// TODO change my location to another folder

import { ReactElement } from 'react';

type ActionArgs =
  | 'onSelect'
  | 'onEdit'
  | 'onClick'
  | 'onSubmit'
  | 'onSearch'
  | 'onChange'
  | 'onFinished'
  | 'onChangeFilter'
  | 'onChangeTab'
  | 'onHover'
  | 'onViewClick'
  | 'onDownloadClick'
  | 'onClose'
  | 'onCancel'
  | 'onClear'
  | 'onToggle'
  | 'onSortClick'
  | 'onEditClick'
  | 'onFilterChange'
  | 'onShareClick'
  | 'onDeleteClick'
  | 'onCreateGroupClick'
  | 'onSelectAllChange'
  | 'onSelectGroup'
  | 'onLoadMoreItems';

interface ZeplinLink {
  name: string;
  link: string;
}

export interface StoryFC<T = any> {
  (args: T): ReactElement<any, any> | null;
  args?: Omit<T, ActionArgs>;
  parameters?: {
    zeplinLink: string | ZeplinLink[];
    [key: string]: any;
  };
}
