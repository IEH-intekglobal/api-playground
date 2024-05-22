'use strict';

import { SequelizeService } from 'feathers-sequelize';
import { before, after } from './hooks/index.mjs';

export default async function () {
  const app = this;

  await app.dbLoaded;

  const { store } = app.get('sequelizeClient').models;

  let options = {
    Model: store,
    paginate: {
      default: 10,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/stores', new SequelizeService(options));

  // Get our initialize service to that we can bind hooks
  const storesService = app.service('/stores');

  // Set up our before & after hooks
  storesService.hooks({
    before,
    after,
  });
};
