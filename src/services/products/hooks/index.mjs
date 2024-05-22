'use strict';
import { Op } from 'sequelize';
import * as globalHooks from '../../../hooks/index.mjs';
import validateSchema from '../../../hooks/validate-schema.mjs';
import productSchema from '../schema.mjs';

export const before = {
  all: [],
  find: [includeAssociatedModels, findbyCategoryName, findCategoryById, globalHooks.allowNull(), globalHooks.wildcardsInLike()],
  get: [includeAssociatedModels],
  create: [globalHooks.errorIfReadonly, validateSchema(productSchema)],
  update: [globalHooks.errorIfReadonly, validateSchema(productSchema)],
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

function includeAssociatedModels({ params, app }) {
  if (params.query.$select) return; // if selecting specific columns, do not include
  const { category } = app.get('sequelizeClient').models;

  params.sequelize = {
    nest: true,
    raw: false,
    include: [{
      model: category, 
      as: 'categories', 
      through: { attributes: [] },
    }]
  };
}

function findCategoryById({params}) {
  /*
    This makes both of these work:
    /products?category[id]=abcat0208002
    /products?category.id=abcat0208002
  */
  let catId;
  let q = params.query;
  if (q['category.id']) {
    catId = q['category.id'];
    delete q['category.id'];
  } else if (q.category && q.category.id) {
    catId = q.category.id;
    delete q.category;
  }

  if (catId) {
    const sequelize = app.get('sequelizeClient');
    q.id = {
      // a bit gnarly but works https://github.com/sequelize/sequelize/issues/1869
      [Op.in]: sequelize.literal(`(
        SELECT DISTINCT productId FROM productcategory
        INNER JOIN categories ON categories.id = productcategory.categoryId
        WHERE categories.id = '${catId}')`)
    };
  }
}

function findbyCategoryName({ params, app }) {
  /*
    This makes both of these work:
    /products?category[name]=Coffee%20Pods
    /products?category.name=Coffee%20Pods
  */
  let catName;
  let q = params.query;
  if (q['category.name']) {
    catName = q['category.name'];
    delete q['category.name'];
  } else if (q.category && q.category.name) {
    catName = q.category.name;
    delete q.category;
  }

  if (catName) {
    const sequelize = app.get('sequelizeClient');
    q.id = {
      // a bit gnarly but works https://github.com/sequelize/sequelize/issues/1869
      [Op.in]: sequelize.literal(`(
        SELECT DISTINCT productId from productcategory
        INNER JOIN categories on categories.id = productcategory.categoryId
        where categories.name = '${catName}')`)
    };
  }
}


