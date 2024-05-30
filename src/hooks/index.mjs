'use strict';

import { MethodNotAllowed } from '@feathersjs/errors';

export const allowNull = function (options) {
  // convert all strings that are "null" to null
  return function ({ params }) {
    var q = params.query;

    if (!q) return;

    Object.keys(q).forEach(key => {
      if (key && typeof q[key] === 'object') {
        Object.keys(q[key]).forEach(z => {
          if (q[key][z] === 'null') q[key][z] = null;
        });
      }
    });
  };
};

export const wildcardsInLike = function (options) {
  // convert all * in like/notLike to %
  return function (hook) {
    var q = hook.params.query;

    if (!q) return;

    Object.keys(q).forEach(key => {
      if (q[key].$like) q[key].$like = q[key].$like.replace(/\*/g, '%');
      if (q[key].$notLike) q[key].$notLike = q[key].$notLike.replace(/\*/g, '%');
    });
  };
};

export const errorIfReadonly = function ({ app }, next) {
  if (app.get('readonly')) {
    return next(new MethodNotAllowed('This HTTP method is not allowed when application is in read-only mode.'));
  }
  return next();
};
