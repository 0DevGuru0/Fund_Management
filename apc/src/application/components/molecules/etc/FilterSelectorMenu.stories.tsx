import FilterSelectorMenu from './FilterSelectorMenu';

export default {
  title: 'Molecules / Etc / FilterSelectorMenu',
  component: FilterSelectorMenu,
  parameters: {
    zeplinLink:
      'https://app.zeplin.io/project/60865602084a7012b372e417/screen/610a34a60c31afb07aba913e',
  },
};

export const Default = (args) => <FilterSelectorMenu {...args} />;
Default.args = {
  items: [
    { id: '1', label: 'Gavin Edward' },
    { id: '2', label: 'Dominic Butler' },
    { id: '3', label: 'Nathan Churchill' },
    { id: '4', label: 'Paul Hodges' },
    { id: '5', label: 'William Hunter' },
    { id: '6', label: 'Paul Edward' },
  ],
  multiSelect: false,
};
