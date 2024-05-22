'use strict';
import { Op } from 'sequelize';
import * as globalHooks from '../../../hooks/index.mjs';
import validateSchema from '../../../hooks/validate-schema.mjs';
import storeSchema from '../schema.mjs';
import findNearby from './findNearby.mjs';

export const before = {
  all: [],
  find: [findNearby, includeAssociatedModels, findServiceByName, findServiceById, globalHooks.allowNull(), globalHooks.wildcardsInLike()],
  get: [includeAssociatedModels],
  create: [globalHooks.errorIfReadonly, validateSchema(storeSchema)],
  update: [globalHooks.errorIfReadonly, validateSchema(storeSchema)],
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

  const { service } = app.get('sequelizeClient').model;

  params.sequelize = {
    nest: true,
    raw: false,
    include: [{
      model: service,
      as: 'services'
    }]
  };
}

function findServiceById({ params }) {
  /*
    This makes both of these work:
    /products?service[id]=abcat0208002
    /products?service.id=abcat0208002
  */
  let serviceId;
  let q = params.query;
  if (q['service.id']) {
    serviceId = q['service.id'];
    delete q['service.id'];
  } else if (q.service && q.service.id) {
    serviceId = q.service.id;
    delete q.service;
  }

  if (serviceId) {
    const sequelize = app.get('sequelizeClient');
    q.id = {
      // a bit gnarly but works https://github.com/sequelize/sequelize/issues/1869
      [Op.in]: sequelize.literal(`(
        SELECT DISTINCT storeId FROM storeservices
        INNER JOIN services ON services.id = storeservices.serviceId
        WHERE services.id = '${serviceId}')`)
    };
  }
}

function findServiceByName(hook) {
  /*
    This makes both of these work:
    /stores?service[name]=Best+Buy+Mobile
    /stores?service.name=Best+Buy+Mobile
  */
  let serviceName;
  let q = hook.params.query;
  if (q['service.name']) {
    serviceName = q['service.name'];
    delete q['service.name'];
  } else if (q.service && q.service.name) {
    serviceName = q.service.name;
    delete q.service;
  }

  if (serviceName) {
    q.id = {
      // a bit gnarly but works https://github.com/sequelize/sequelize/issues/1869
      [Op.in]: sequelize.literal(`(
        SELECT DISTINCT storeId FROM storeservices
        INNER JOIN services ON services.id = storeservices.serviceId
        WHERE services.name = '${serviceName}')`)
    };
  }
}
