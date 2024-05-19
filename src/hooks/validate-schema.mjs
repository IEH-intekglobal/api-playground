'use strict';

import Ajv from 'ajv';
import { BadRequest } from '@feathersjs/errors';

function formatErrorMessage(err) {
  if (err.dataPath) {
    return `'${err.dataPath.substring(1)}' ${err.message}`;
  } else {
    var message = `${err.message}`;
    if (err.params && err.params.additionalProperty) {
      message += `: '${err.params.additionalProperty}'`;
    }

    return message;
  }
}

export default function (schema) {
  return function validateSchema(hook) {
    var validator = new Ajv({ allErrors: true });
    var isValid = validator.validate(schema, hook.data);
    if (!isValid) {
      var errorMessages = validator.errors.map(formatErrorMessage);
      var validationErrors = new BadRequest('Invalid Parameters', { errors: errorMessages });
      throw validationErrors;
    }
  };
};
