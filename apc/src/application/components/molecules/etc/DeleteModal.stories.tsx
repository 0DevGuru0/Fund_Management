import DeleteModal from './DeleteModal';

export default {
  title: 'Molecules / Etc / DeleteModal',
  component: DeleteModal,
  parameters: {
    zeplinLink:
      'https://app.zeplin.io/project/60865602084a7012b372e417/screen/60dc6009d04ca906e0682f74',
  },
};

export const Default = (args) => <DeleteModal {...args} />;
Default.args = {
  open: true,
  title: 'Warning',
  description: 'Are you sure you want to remove this?',
};
