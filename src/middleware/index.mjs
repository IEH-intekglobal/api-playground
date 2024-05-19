'use strict';

// const notFound = require('./not-found-handler');
import logger from './logger.mjs';
// const swagger = require('./swagger');
// const markdownPages = require('./markdown-pages');

export default function () {
  // Add your custom middleware here. Remember, that
  // just like Express the order matters, so error
  // handling middleware should go last.
  const app = this;

  // app.configure(swagger);
  // app.configure(markdownPages);
  // app.use(notFound());
  app.use(logger(app));
};
