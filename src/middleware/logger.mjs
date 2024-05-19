'use strict';

import winston from 'winston';

export default function (app) {
  // Add a logger to our app object for convenience
  const logger = winston.createLogger({
    level: 'info',
    // level: 'debug',
    transports: [new winston.transports.Console()]
  });

  app.logger = logger;

  if (process.env.NODE_ENV === 'test') {
    // suppress logging when under test
    winston.remove(winston.transports.Console);
    return (error, req, res, next) => (next(error));
  }

  return function (error, req, res, next) {
    if (error) {
      const message = `${error.code ? `(${error.code}) ` : ''}Route: ${req.url} - ${error.message}`;

      if (error.code === 404) {
        logger.info(message);
      } else {
        logger.error(message);
        logger.info(error.stack);
      }
    }

    next(error);
  };
};
