import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import addKeywords from 'ajv-keywords';
// import camundaSchema from '$service/wfEngine/camunda-7-15.openapi.json';

const ajv = new Ajv({
  allErrors: true,
  coerceTypes: true,
  strictSchema: false,
  removeAdditional: true,
});

addFormats(ajv);

const int32Min = -2147483648;
const int32Max = 2147483647;
const validateInt32 = (n: any): boolean => n >= int32Min && n <= int32Max;

ajv.addFormat('int32', validateInt32);

addKeywords(ajv);

// These are extra keywords for OpenAPI Documentation
ajv
  .addKeyword({
    keyword: 'openApiIn',
    type: 'string',
    metaSchema: { enum: ['query', 'path'] },
  })
  .addKeyword({
    keyword: 'example',
    type: 'string',
  })
  .addKeyword({
    keyword: 'faker',
    type: 'string',
  });

// we use camunda only in responses for docs and not for validation
// TODO: add this when we added response validation
// ajv.addSchema(camundaSchema.components, 'components');

export default ajv;
