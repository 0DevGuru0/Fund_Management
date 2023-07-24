import { Client, logger } from 'camunda-external-task-client-js';

import { subscribeFundApplicationStates } from './fundApplicationStates';

const interceptors = (config): any => {
  const hooks = {
    beforeRequest: [
      async (options) => {
        const defaultHeaders = options.headers || {};
        const headers = {
          // TODO: static jwt now works because of validation=disabled in the camunda
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjQ2NDI0NTAwNjksImlhdCI6MTY0MjQxNDA2OSwiYXV0aF90aW1lIjoxNjQyNDE0MDY5LCJqdGkiOiI0NTFlNDMyZC0yOTc5LTQyNjMtOTZmNi1mNDkzYTQ2YjQwNTkiLCJpc3MiOiJodHRwczovL2FjY291bnRzLmlrbml0by5jb20vYXV0aC9yZWFsbXMvU2NpZW5jZUh1YiIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJlZjc0ZjlmYi04YzNhLTQ4YWYtYTNmZC04NmUzZmNlYjY1ZjUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzbWFydGZ1bmQtYXBpIiwic2Vzc2lvbl9zdGF0ZSI6IjFiOTA1YjQ1LTEzY2UtNDNhYi1hZmU2LTI5YWIzNGQxODMxOSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cHM6Ly9zbWFydGZ1bmQuaWtuaXRvLmNvbSJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InNtYXJ0ZnVuZC1hcGkiOnsicm9sZXMiOlsiU3lzdGVtQWRtaW4iXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGFjYWRlbWljX3Byb2ZpbGUgcHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZ2VuZGVyIjoiTWFsZSIsInJvbGVzIjpbIlN5c3RlbUFkbWluIl0sIm5hbWUiOiJBZG1pbiBBZG1pbiIsIm9yY2lkIjoiMDAwMC0wMDAyLTE4MjUtMDA5WCIsImRlZmF1bHRfYWZmaWxpYXRpb24iOiI2MTEzYjY5YWRmYTA1ZTAwMDZmMGE5NzUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZG1pbiIsImdpdmVuX25hbWUiOiJBZG1pbiIsImZhbWlseV9uYW1lIjoiQWRtaW4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zMy5ldS1jZW50cmFsLTEuYW1hem9uYXdzLmNvbS9pa25pdG8td29ya2Zsb3ctcHJvZHVjdGlvbiIsImVtYWlsIjoiYWRtaW5Abm90aW9ud2F2ZS5jb20ifQ.fIEhQrgw51fOplC8ndBaa-lj4LbOaFP98HfZSXW2oXo`,
        };

        options.headers = { ...defaultHeaders, ...headers };
      },
    ],
  };

  return { ...config, hooks: { ...config.hooks, ...hooks } };
};

const client = new Client({
  baseUrl: process.env.WF_CAMUNDA_SERVER_ADDRESS!,
  use: logger,
  interceptors,
});

subscribeFundApplicationStates(client);
