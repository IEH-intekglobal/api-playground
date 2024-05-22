'use strict';
import products from './products/index.mjs';
import stores from './stores/index.mjs';
import services from './services/index.mjs';
import categories from './categories/index.mjs';
import utilities from './utilities/index.mjs';
import db from '../db/index.mjs';

export default function () {
  const app = this;

  app.configure(db);// setup app.get('sequelizeClient')

  app.configure(products);
  app.configure(stores);
  app.configure(services);
  app.configure(categories);
  app.configure(utilities);
};
