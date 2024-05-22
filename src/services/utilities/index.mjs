'use strict';
import koaRouter from '@koa/router';
import healthCheck from './healthcheck.mjs';
import version from './version.mjs';

export default function () {
  const app = this;

  const router = koaRouter();
  router
    .get('/version', version)
    .get('/healthcheck', healthCheck(app))

  app.use(router.routes());
};
