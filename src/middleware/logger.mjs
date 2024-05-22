'use strict';

import winston from 'winston';

export default function () {
  const app = this;
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
  }

  function statusLogger(ctx, error) {
    if (ctx.status < 400) return;
    const code = ctx.status || error?.code || '';
    const errMsg = ctx.message || error?.message;
    const msg = `${code} - Route: ${ctx.path} - ${errMsg}`;

    if (!error && code === 404) {
      logger.info(msg);
    } else {
      logger.error(msg);
      error && logger.info(error.stack);
    }
  }

  app.use(async function (ctx, next) {
    try {
      await next();
      statusLogger(ctx, null);
    } catch (error) {
      statusLogger(ctx, error);
      throw error;
    }
  });
};
