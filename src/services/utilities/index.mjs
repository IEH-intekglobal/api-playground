'use strict';

import HealthCheck from './healthcheck.mjs';
import versionService from './version.mjs';

export default function () {
  const app = this;

  app.use('/version', versionService);
  app.use('/healthcheck', new HealthCheck(app));
};
