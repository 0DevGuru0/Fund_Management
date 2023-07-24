import Ajv from 'ajv';

const ajv = new Ajv();

const fileVariableDto = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: ['Object'],
    },
    value: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          storage: {
            type: 'string',
            enum: ['base64'],
          },
        },
      },
    },
  },
} as const;

export const fileVariableValidator = ajv.compile(fileVariableDto);
