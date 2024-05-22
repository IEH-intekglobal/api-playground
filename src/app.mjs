'use strict';

import { feathers } from '@feathersjs/feathers';
import { koa, rest, bodyParser, errorHandler, serveStatic } from '@feathersjs/koa';
import compress from 'koa-compress';
import cors from '@koa/cors';
import configuration from '@feathersjs/configuration';
import socketio from '@feathersjs/socketio';

import middleware from './middleware/index.mjs';
import logger from './middleware/logger.mjs';
import services from './services/index.mjs';

export const app = koa(feathers());

app
  .configure(configuration())
  .use(compress())
  .use(cors())
  .use(serveStatic('public', {root: 'public'}))
  .use(errorHandler())
  .configure(logger)
  .use(bodyParser())
  .configure(rest())
  .configure(socketio())
  .configure(services)
  .configure(middleware);
