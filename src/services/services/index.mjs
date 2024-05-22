'use strict';

import { SequelizeService } from 'feathers-sequelize';
import { before, after } from './hooks/index.mjs';

export default async function () {
  const app = this;
  
  await app.dbLoaded;

  const { service } = app.get('sequelizeClient').models;

  let options = {
    Model: service,
    paginate: {
      default: 10,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/services', new SequelizeService(options));

  // Get our initialize service to that we can bind hooks
  const servicesService = app.service('/services');

  // Set up our before & after hooks
  servicesService.hooks({
    before,
    after,
  });
};
