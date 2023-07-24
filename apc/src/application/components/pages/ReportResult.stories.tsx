import { rest } from 'msw';

import { StoryFC } from '$application/components/StoryFC';
import { createServerAddress } from '$application/utils/createServerAddress';

import ReportResult, { ReportResultProps } from './ReportResult';

export const Default: StoryFC<ReportResultProps> = ReportResult;

export default {
  title: 'Pages / Report / Result',
  component: ReportResult,
  args: {
    totalCount: 1,
    totalPrice: 10000,
    filterItems: [
      {
        title: 'AffiliationIds',
        ids: '609fc51f18232d0006582c48',
        items: ['Charles Wise'],
      },
    ],
    applications: [
      {
        affiliationId: '609fc51f18232d0006582c48',
        voucher: {
          id: 'dolore esse',
          status: 'SUSPENDED',
          code: 'aliqua',
          policyId: 'Duis amet',
          publisherId: 'esse ea reprehenderit commodo elit',
          batchId: 'minim non',
          fundApplicationId: 24517070,
          note: 'laboris Lorem exercitation pariatur ipsum',
        },
        processInstanceId: 'a8b30887-47b9-11ec-89d1-0242ac130003',
        journalId: '609fc60c18232d000658460e',
        policyId: 'ae37f7e6-83b6-4ee6-a384-9f637ead35e2',
        publisherId: '609fc4f918232d000658284c',
        state: 'ut',
        userId: 'researcher1',
        policy: {
          id: 'ae37f7e6-83b6-4ee6-a384-9f637ead35e2',
          type: 'VOUCHER',
          title: 'quis sint sed',
          fundId: 'voluptate aliquip aliqua',
          terms: 'veniam',
          isActive: true,
          note: 'sint est mollit exercitation reprehenderit',
          createdBy: 'veniam',
          publisherId: 'velit nulla ad',
        },
        articleTitle: 'sample test title',
        fundId: 'ac8a015a-47b9-11ec-89d1-0242ac130003',
        id: 1,
      },
    ],
  },
  parameters: {
    msw: [
      rest.get(createServerAddress('tasks'), (req, res, ctx) =>
        res(
          ctx.delay(500),
          ctx.json({
            tasks: [
              {
                type: 'active',
                id: 'b42b969b-47b9-11ec-89d1-0242ac130003',
                name: 'Upload Acceptance Letter',
                assignee: 'researcher1',
                created: '2021-11-17T18:49:05.892+0330',
                due: null,
                followUp: null,
                delegationState: null,
                description: null,
                executionId: 'b0a46ba5-47b9-11ec-89d1-0242ac130003',
                owner: null,
                parentTaskId: null,
                priority: 50,
                processDefinitionId:
                  'APCFundRequest:2:f6dbaa6b-47b0-11ec-ba48-0242ac130004',
                processInstanceId: 'a8b30887-47b9-11ec-89d1-0242ac130003',
                taskDefinitionKey: 'UploadAcceptance',
                caseExecutionId: null,
                caseInstanceId: null,
                caseDefinitionId: null,
                suspended: false,
                formKey:
                  'http://localhost:3000/processes/apc/forms/UploadAcceptance.json',
                tenantId: null,
                processVariables: {
                  starter: {
                    value: 'researcher1',
                    type: 'String',
                    valueInfo: {},
                    id: 'a8b3f2e8-47b9-11ec-89d1-0242ac130003',
                  },
                  articleTitle: {
                    value: 'sample test title',
                    type: 'String',
                    valueInfo: {},
                    id: 'a8b4681b-47b9-11ec-89d1-0242ac130003',
                  },
                  startedBy: {
                    value: {
                      auth_time: 1637152932,
                      jti: 'f5fbf7f7-bf4a-4159-82fd-e08f0ee1d203',
                      iss:
                        'https://accounts.iknito.com/auth/realms/ScienceHubDevelopment',
                      sub: '595bf7b1-923d-43f9-b157-9053a2bba498',
                      typ: 'Bearer',
                      azp: 'local-development',
                      session_state: '37cef451-8962-4c37-93bf-a2e8eca9f2e4',
                      acr: '1',
                      'allowed-origins': [],
                      scope: 'openid academic_profile phone profile email',
                      country: 'deserunt ex sed aute',
                      email_verified: false,
                      gender: 'eu enim in veniam ullamco',
                      roles: {
                        Researcher: ['default'],
                        SystemAdmin: ['default'],
                      },
                      name: 'Jack Researcher 1',
                      phone_number: '8692216718',
                      orcid: '0109-1217-2793-3861',
                      preferred_username: 'researcher1',
                      default_affiliation: 'officia aute',
                      given_name: 'Jack',
                      family_name: 'Researcher 1',
                      email: 'researcher1@devknito.com',
                    },
                    type: 'Object',
                    valueInfo: {
                      objectTypeName: 'java.util.LinkedHashMap',
                      serializationDataFormat: 'application/x-java-serialized-object',
                    },
                    id: 'a8b7c37e-47b9-11ec-89d1-0242ac130003',
                  },
                  orcid: {
                    value: '0109-1217-2793-3861',
                    type: 'String',
                    valueInfo: {},
                    id: 'a8b7c382-47b9-11ec-89d1-0242ac130003',
                  },
                  publishPrice: {
                    value: 100,
                    type: 'Integer',
                    valueInfo: {},
                    id: 'a8b7ea94-47b9-11ec-89d1-0242ac130003',
                  },
                  selectedPolicy: {
                    value: {
                      id: 'ae37f7e6-83b6-4ee6-a384-9f637ead35e2',
                      type: 'VOUCHER',
                      title: 'policy 1',
                      fundId: '610f0e3f0023940006e0dc9b',
                      terms: 'terms',
                      isActive: true,
                      note: '',
                      createdBy: 'researcher1',
                      createdAt: '2021-11-17T08:30:57.288Z',
                      publisherId: '609fc4f918232d000658284c',
                      fund: {
                        id: '610f0e3f0023940006e0dc9b',
                        title: 'STDF',
                        description: 'Temp Fund',
                        url: null,
                        email: null,
                        type: 'Fund',
                      },
                    },
                    type: 'Object',
                    valueInfo: {
                      objectTypeName: 'java.util.LinkedHashMap',
                      serializationDataFormat: 'application/x-java-serialized-object',
                    },
                    id: 'a8b811a7-47b9-11ec-89d1-0242ac130003',
                  },
                  subjectCategory: {
                    value: {
                      id: '60fbbcac0023940006e0daa2',
                      title: 'Sciences',
                    },
                    type: 'Object',
                    valueInfo: {
                      objectTypeName: 'java.util.LinkedHashMap',
                      serializationDataFormat: 'application/x-java-serialized-object',
                    },
                    id: 'a8b838bc-47b9-11ec-89d1-0242ac130003',
                  },
                  journal: {
                    value: {
                      id: '609fc60c18232d000658460e',
                      title: 'Trees, Forests and People',
                    },
                    type: 'Object',
                    valueInfo: {
                      objectTypeName: 'java.util.LinkedHashMap',
                      serializationDataFormat: 'application/x-java-serialized-object',
                    },
                    id: 'a8b85fd1-47b9-11ec-89d1-0242ac130003',
                  },
                  affiliation: {
                    value: 'officia aute',
                    type: 'String',
                    valueInfo: {},
                    id: 'a8b85fd5-47b9-11ec-89d1-0242ac130003',
                  },
                  articlePdfFile: {
                    value: [
                      {
                        storage: 'url',
                        name:
                          'multiple-choice-questions-0ae83d29-25cd-43d4-a18a-792176586d23.pdf',
                        url:
                          'http://localhost:9000/general-repo/orgId/8f3fce4ed60da7a5e4a8fb200?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minio%2F20211117%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211117T151818Z&X-Amz-Expires=1200&X-Amz-Signature=f6471620e20622635041137701f56b5b3272aa60e3eae6c36cea99724a149fee&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3D%22multiple-choice-questions.pdf%22&response-content-type=application%2Fpdf',
                        size: 59174,
                        type: 'application/pdf',
                        data: {
                          name: 'multiple-choice-questions.pdf',
                          size: 59174,
                          url:
                            'http://localhost:9000/general-repo/orgId/8f3fce4ed60da7a5e4a8fb200?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minio%2F20211117%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211117T151818Z&X-Amz-Expires=1200&X-Amz-Signature=f6471620e20622635041137701f56b5b3272aa60e3eae6c36cea99724a149fee&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3D%22multiple-choice-questions.pdf%22&response-content-type=application%2Fpdf',
                          baseUrl: 'https://api.form.io',
                          project: '',
                          form: '',
                        },
                        originalName: 'multiple-choice-questions.pdf',
                      },
                    ],
                    type: 'Object',
                    valueInfo: {
                      objectTypeName: 'java.util.ArrayList',
                      serializationDataFormat: 'application/x-java-serialized-object',
                    },
                    id: 'a8b8adf8-47b9-11ec-89d1-0242ac130003',
                  },
                  publisher: {
                    value: {
                      id: '609fc4f918232d000658284c',
                      title: 'Elsevier',
                    },
                    type: 'Object',
                    valueInfo: {
                      objectTypeName: 'java.util.LinkedHashMap',
                      serializationDataFormat: 'application/x-java-serialized-object',
                    },
                    id: 'a8b8adfd-47b9-11ec-89d1-0242ac130003',
                  },
                  currency: {
                    value: 'usd',
                    type: 'String',
                    valueInfo: {},
                    id: 'a8b8d511-47b9-11ec-89d1-0242ac130003',
                  },
                  mainSubject: {
                    value: {
                      id: '60fbbcac0023940006e0da71',
                      title: 'Physics',
                    },
                    type: 'Object',
                    valueInfo: {
                      objectTypeName: 'java.util.LinkedHashMap',
                      serializationDataFormat: 'application/x-java-serialized-object',
                    },
                    id: 'a8b8d514-47b9-11ec-89d1-0242ac130003',
                  },
                  fundApplicationId: {
                    value: '1',
                    type: 'String',
                    valueInfo: {},
                    id: 'ac8a015a-47b9-11ec-89d1-0242ac130003',
                  },
                  description: {
                    value:
                      'Fund Application for Policy policy 1. Publisher:Elsevier, Journal:Trees, Forests and People, Price:100. (1)',
                    type: 'String',
                    valueInfo: {},
                    id: 'ac8e200c-47b9-11ec-89d1-0242ac130003',
                  },
                  reservedVoucher: {
                    value: {
                      note: null,
                      code: 'wid',
                      usableAfter: null,
                      batchId: '066a6305-33fd-4115-b541-4ac7c993d1f8',
                      expiresAt: '1950-12-01T20:30:00.000Z',
                      lastReservedAt: '2021-11-17T15:18:59.884Z',
                      createdAt: '2021-11-17T08:33:42.226Z',
                      publisherId: '609fc4f918232d000658284c',
                      policyId: 'ae37f7e6-83b6-4ee6-a384-9f637ead35e2',
                      id: '1b95e5cb-064e-4ac4-9f7c-e6385eb67fbd',
                      fundApplicationId: 1,
                      status: 'RESERVED',
                      allocatedAt: null,
                    },
                    type: 'Object',
                    valueInfo: {
                      objectTypeName: 'java.util.HashMap',
                      serializationDataFormat: 'application/x-java-serialized-object',
                    },
                    id: 'b0a44491-47b9-11ec-89d1-0242ac130003',
                  },
                },
              },
            ],
            count: 1,
          }),
        ),
      ),
    ],
    background: { noPadding: true },
    zeplinLink:
      'https://app.zeplin.io/project/60865602084a7012b372e417/screen/6138871e4f8429bb6bd02bb1',
  },
};
