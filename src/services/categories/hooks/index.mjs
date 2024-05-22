'use strict';

import * as globalHooks from '../../../hooks/index.mjs';
import validateSchema from '../../../hooks/validate-schema.mjs';
import categorySchema from '../schema.mjs';

export const before = {
  all: [],
  find: [includeAssociatedModels, globalHooks.allowNull(), globalHooks.wildcardsInLike()],
  get: [includeAssociatedModels],
  create: [globalHooks.errorIfReadonly, validateSchema(categorySchema)],
  update: [globalHooks.errorIfReadonly, validateSchema(categorySchema)],
  patch: [globalHooks.errorIfReadonly],
  remove: [globalHooks.errorIfReadonly]
};

export const after = {
  all: [],
  find: [filterParentsFromFind],
  get: [filterParentsFromGet],
  create: [],
  update: [],
  patch: [],
  remove: []
};

function includeAssociatedModels({ params, app }) {
  if (params.query.$select) return; // if selecting specific columns, do not include

  const { category } = app.get('sequelizeClient').models;
  
  params.sequelize = {
    nest: true,
    raw: false,
    include: [
      {
        model: category,
        as: 'subCategories',
      },
      {
        model: category,
        as: 'categoryPath',
      }],
    exclude: 'subCategories'
  };
}

function filterParentsFromFind(ctx) {
  ctx.result.data = ctx.result.data.map(d => {
    d = d.toJSON();
    d.subCategories = d.subCategories.map(sub => {
      delete sub.subCategories;
      return sub;
    });
    d.categoryPath = d.categoryPath.map(sub => {
      delete sub.categoryPath;
      return sub;
    });
    return d;
  });
}

function filterParentsFromGet(ctx) {
  if (ctx.result.toJSON) ctx.result = ctx.result.toJSON();
  if (ctx.result.subCategories) {
    ctx.result.subCategories = ctx.result.subCategories.map(sub => {
      delete sub.subCategories;
      return sub;
    });
  }
  if (ctx.result.categoryPath) {
    ctx.result.categoryPath = ctx.result.categoryPath.map(sub => {
      delete sub.categoryPath;
      return sub;
    });
  }
}
