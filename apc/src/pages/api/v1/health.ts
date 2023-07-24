import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { getBackendPrisma } from '$data/prisma';
import { getCamundaPlatformRESTAPI } from '$service/generated/wfCamunda';

interface Query {
  resetCounter: 'true' | 'false';
  [key: string]: string | string[];
}

const { getRestAPIVersion } = getCamundaPlatformRESTAPI();

let count = 0;
const health: ApiHandler<any, string, Query> = async (req, res) => {
  // test db health
  const prisma = await getBackendPrisma();
  await prisma.$queryRaw`SELECT 1`;

  // test camunda health
  await getRestAPIVersion({
    headers: {
      authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjQ2NDI0NTAwNjksImlhdCI6MTY0MjQxNDA2OSwiYXV0aF90aW1lIjoxNjQyNDE0MDY5LCJqdGkiOiI0NTFlNDMyZC0yOTc5LTQyNjMtOTZmNi1mNDkzYTQ2YjQwNTkiLCJpc3MiOiJodHRwczovL2FjY291bnRzLmlrbml0by5jb20vYXV0aC9yZWFsbXMvU2NpZW5jZUh1YiIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJlZjc0ZjlmYi04YzNhLTQ4YWYtYTNmZC04NmUzZmNlYjY1ZjUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzbWFydGZ1bmQtYXBpIiwic2Vzc2lvbl9zdGF0ZSI6IjFiOTA1YjQ1LTEzY2UtNDNhYi1hZmU2LTI5YWIzNGQxODMxOSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cHM6Ly9zbWFydGZ1bmQuaWtuaXRvLmNvbSJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InNtYXJ0ZnVuZC1hcGkiOnsicm9sZXMiOlsiU3lzdGVtQWRtaW4iXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGFjYWRlbWljX3Byb2ZpbGUgcHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZ2VuZGVyIjoiTWFsZSIsInJvbGVzIjpbIlN5c3RlbUFkbWluIl0sIm5hbWUiOiJBZG1pbiBBZG1pbiIsIm9yY2lkIjoiMDAwMC0wMDAyLTE4MjUtMDA5WCIsImRlZmF1bHRfYWZmaWxpYXRpb24iOiI2MTEzYjY5YWRmYTA1ZTAwMDZmMGE5NzUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZG1pbiIsImdpdmVuX25hbWUiOiJBZG1pbiIsImZhbWlseV9uYW1lIjoiQWRtaW4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zMy5ldS1jZW50cmFsLTEuYW1hem9uYXdzLmNvbS9pa25pdG8td29ya2Zsb3ctcHJvZHVjdGlvbiIsImVtYWlsIjoiYWRtaW5Abm90aW9ud2F2ZS5jb20ifQ.fIEhQrgw51fOplC8ndBaa-lj4LbOaFP98HfZSXW2oXo`,
    },
  });

  if (req.query.resetCounter === 'true') {
    count = 0;
  }

  return `You've checked my health ${++count} times`;
};

export default withMiddleware(health)({
  operationId: 'checkServerHealth',
  description: 'Check Server Health',
  method: ['GET', 'HEAD'],
  isPublic: true,
  query: {
    type: 'object',
    properties: {
      resetCounter: {
        description: `resets the counter if set to "true"`,
        openApiIn: 'query',
        type: 'string',
        enum: ['true', 'false'],
        example: 'true',
      },
    },
  },
});
