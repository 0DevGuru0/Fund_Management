import Validator from 'formio/src/resources/Validator';
import importedHook from 'formio/src/util/hook';

import { InvalidInputError } from '$service/errors';

// a dumb var to fill the role of the database lookup.
// submission model would have been used to check for certain values such as:
// - Is the field value "unique"? (unique in the context of all other previous submissions)
const submissionModel = (): string => 'test';
const hookedValidator = Validator;
const hook = importedHook({});

export const validateFormData = (
  config: Record<string, any>,
  data: {
    [key: string]: any;
  },
): Promise<any> => {
  const body = {
    data,
    owner: '',
    access: [],
    form: '',
  };

  const validator = new hookedValidator(config, submissionModel, {}, {}, hook);
  return new Promise((res, rej) => {
    validator.validate(body, (err, submission) => {
      if (err) {
        err.details.forEach((detail) => {
          detail.path = detail.path.join('.');
        });
        rej(new InvalidInputError(err));
      }
      res(submission);
    });
  });
};
