'use strict';

import { Koa, serveStatic } from '@feathersjs/koa';
import mount from 'koa-mount';
import koaRouter from '@koa/router';
import { getAbsoluteFSPath } from 'swagger-ui-dist';
// const path = require('path');
import *  as docs from '../../services/docs.mjs';
import swaggerJson from './swagger.mjs';

const { paths, definitions } = Object.values(docs).reduce((acc, value) => {
  Object.assign(acc.paths, value.paths);
  Object.assign(acc.definitions, value.definitions);
  return acc;
}, { paths: { ...swaggerJson.paths }, definitions: {} });

swaggerJson.paths = paths;
swaggerJson.definitions = definitions;

// const swaggerLib = path.join(__dirname, '..', '..', '..', 'node_modules', 'swagger-ui', 'dist', 'lib');

export default function () {
  let app = this;

  // app.use('/docs/lib', serveStatic(swaggerLib));
  // app.use('/docs', serveStatic(path.join(__dirname, 'swagger-ui')));
  // console.log(getAbsoluteFSPath())

  // .use('/docs', serveStatic('swagger-ui-dist', {
  //   root: getAbsoluteFSPath()
  // }))
  const swaggerDocsApp = new Koa();
  swaggerDocsApp.use(serveStatic(getAbsoluteFSPath()));

  app.use(mount('/docs', swaggerDocsApp));

  const router = koaRouter();
  router
    .get('/swagger.json', (ctx) => {
      ctx.body = swaggerJson
    });
  app.use(router.routes());

};
