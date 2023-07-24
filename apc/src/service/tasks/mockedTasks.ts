import { CreatedByProps } from '$application/components/organisms/tables/Table/InnerTable/CreatedBy';

interface Process {
  name: string;
}

interface State {
  name: string;
  updateDate: string;
}

interface MockedTask {
  id: number;
  title: string;
  taskKey: string;
  description: string;
  createdBy: CreatedByProps;
  assignee: string;
  activity: string;
  dueDate: string;
  state: State;
  processDefinition: Process;
}

export const mockedTasks: MockedTask[] = [
  {
    id: 0,
    title: 'Territories Attractiveness Volume',
    taskKey: '1234567889',
    description: 'Publisher: Elsevier, Journal: AACE Clinical Case Reports, Price: 10',
    createdBy: {
      name: 'Seyyed Ehsan Mahmoudi',
      image: './defaultUser.png',
      date: '2020-06-08 08:00:20',
    },
    assignee: 'Abdollah Esmailpour',
    dueDate: '2020-06-10 12:00:00',
    activity: 'Request additional information',
    state: {
      name: 'To Do',
      updateDate: '2020-06-08 09:10:30',
    },
    processDefinition: {
      name: 'Article Processing Charge',
    },
  },
  {
    id: 1,
    title: 'Predicting Chronic Kidney disease risk in patients type 2 Diabetics',
    taskKey: '1234567890',
    description: 'Springer Nature Medicine',
    createdBy: {
      name: 'Ora Clayton and friends who are unknown for us',
      image: './defaultUser.png',
      date: '2020-06-04 08:00:20',
    },
    assignee: 'Abdollah Esmailpour',
    dueDate: '2020-06-09 12:00:00',
    activity: 'Reviewed by Journals',
    state: {
      name: 'In Progress',
      updateDate: '2020-06-05 09:10:30',
    },
    processDefinition: {
      name: 'Article Processing Charge',
    },
  },
  {
    id: 2,
    title: 'Territories Attractiveness Volume',
    taskKey: '1234567891',
    description: 'Publisher: Elsevier, Journal: AACE Clinical Case Reports, Price: 10',
    createdBy: {
      name: 'Seyyed Ehsan Mahmoudi',
      image: './defaultUser.png',
      date: '2020-05-27 08:00:20',
    },
    assignee: 'Abdollah Esmailpour',
    dueDate: '2020-06-10 12:00:00',
    activity: 'Reviewed by authority',
    state: {
      name: 'In Progress',
      updateDate: '2020-06-01 09:10:30',
    },
    processDefinition: {
      name: 'Promotion Committee',
    },
  },
  {
    id: 3,
    title:
      'Pariatur velit ea ullamco voluptate pariatur in sint. Et nisi ad reprehenderit ad. Fugiat qui aute nostrud id anim laborum ut cillum ex qui anim aliqua. Velit amet magna consequat labore ullamco cupidatat.',
    taskKey: '1234567892',
    description: 'Publisher: Elsevier, Journal: AACE Clinical Case Reports, Price: 10',
    createdBy: {
      name: 'Abdollah Esmailpour',
      image: './defaultUser.png',
      date: '2020-06-04 08:00:20',
    },
    assignee: 'Seyyed Ehsan Mahmoudi',
    dueDate: '2020-06-08 12:00:00',
    activity: 'Approved by Oxford University',
    state: {
      name: 'Completed',
      updateDate: '2020-06-08 09:10:30',
    },
    processDefinition: {
      name: 'Test Process',
    },
  },
];
