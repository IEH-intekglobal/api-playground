'use strict';
import products from './products/index.mjs';
// const stores = require('./stores');
// const services = require('./services');
import categories from './categories/index.mjs';
import utilities from './utilities/index.mjs';
import db from '../db/index.mjs';

export default function () {
  const app = this;

  app.configure(db);// setup app.get('sequelizeClient')

  app.configure(products);
  // app.configure(stores);
  // app.configure(services);
  app.configure(categories);
  app.configure(utilities);
};
