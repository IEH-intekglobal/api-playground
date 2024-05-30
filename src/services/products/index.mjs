'use strict';

import { SequelizeService } from 'feathers-sequelize';
import { before, after } from './hooks/index.mjs';

export default async function () {
  const app = this;
  await app.dbLoaded;

  const { product } = app.get('sequelizeClient').models;

  let options = {
    Model: product,
    paginate: {
      default: 10,
      max: 25
    },
    nest: true
  };

  // Initialize our service with any options it requires
  app.use('/products', new SequelizeService(options));

  // Get our initialize service to that we can bind hooks
  const productsService = app.service('/products');

  // Set up our before & after hooks
  productsService.hooks({
    before,
    after,
  });
};
