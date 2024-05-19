'use strict';

import { SequelizeService } from 'feathers-sequelize';

import { before, after } from './hooks/index.mjs';

export default async function () {
  const app = this;
  await app.dbLoaded;
  const { category } = app.get('sequelizeClient').models;
  let options = {
    Model: category,
    paginate: {
      default: 10,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/categories', new SequelizeService(options));


  // Get our initialize service to that we can bind hooks
  const categoriesService = app.service('/categories');

  // Set up our before & after hooks
  categoriesService.hooks({
    before,
    after
  });
};
