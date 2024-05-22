'use strict';

import { Koa, serveStatic } from '@feathersjs/koa';
import mount from 'koa-mount';
import koaRouter from '@koa/router';
import { getAbsoluteFSPath } from 'swagger-ui-dist';
import *  as docs from '../../services/docs.mjs';
import swaggerJson from './swagger.mjs';

const { paths, definitions } = Object.values(docs).reduce((acc, value) => {
  Object.assign(acc.paths, value.paths);
  Object.assign(acc.definitions, value.definitions);
  return acc;
}, { paths: { ...swaggerJson.paths }, definitions: {} });

swaggerJson.paths = paths;
swaggerJson.definitions = definitions;

export default function () {
  let app = this;

  const swaggerDocsApp = new Koa();
  const router = koaRouter();
  router
    .get('/swagger.json', (ctx) => {
      ctx.body = swaggerJson
    });
  swaggerDocsApp.use(router.routes());
  swaggerDocsApp.use(serveStatic('swagger-override'));
  swaggerDocsApp.use(serveStatic(getAbsoluteFSPath()));

  app.use(mount('/docs', swaggerDocsApp));
};
