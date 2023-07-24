import { Client } from 'camunda-external-task-client-js';

import { getBackendPrisma } from '$data/prisma';

const fundApplicationTopicStates = [
  { topic: 'preApproveInvoicePaymentState', state: 'PRE_APPROVE_INVOICE_PAYMENT' },
  { topic: 'uploadAcceptanceLetterState', state: 'UPLOAD_ACCEPTANCE_LETTER' },
  { topic: 'uploadJournalInvoiceState', state: 'UPLOAD_JOURNAL_INVOICE' },
  { topic: 'approveInvoiceState', state: 'PRE_APPROVE_INVOICE_PAYMENT' },
  { topic: 'processPaymentState', state: 'PROCESS_PAYMENT' },
  { topic: 'voucherApproveState', state: 'APPROVE_VOUCHER' },
];

const updateFundApplicationState = async (
  task,
  taskService,
  state: string,
): Promise<void> => {
  const { get: getVariable } = task.variables;
  const fundApplicationId = parseInt(getVariable('fundApplicationId'), 10);

  const prisma = await getBackendPrisma();
  await prisma.fundApplication.update({
    where: {
      id: fundApplicationId,
    },
    data: {
      state,
    },
  });
  await taskService.complete(task);
};

export const subscribeFundApplicationStates = (client: Client): void => {
  fundApplicationTopicStates.forEach((topicState) => {
    client.subscribe(topicState.topic, async ({ task, taskService }) => {
      await updateFundApplicationState(task, taskService, topicState.state);
    });
  });
};
