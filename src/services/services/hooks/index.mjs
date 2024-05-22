'use strict';

import * as globalHooks from '../../../hooks/index.mjs';
import validateSchema from '../../../hooks/validate-schema.mjs';
import serviceSchema from '../schema.mjs';

export const before = {
  all: [],
  find: [globalHooks.allowNull(), globalHooks.wildcardsInLike()],
  get: [],
  create: [globalHooks.errorIfReadonly, validateSchema(serviceSchema)],
  update: [globalHooks.errorIfReadonly, validateSchema(serviceSchema)],
  patch: [globalHooks.errorIfReadonly],
  remove: [globalHooks.errorIfReadonly]
};

export const after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
