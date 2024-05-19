'use strict';

import { app } from './app.mjs';

const port = app.get('port');
const name = app.get('name');

app
  .listen(port)
  .then(() => {
    console.log(`${name} started at http://${app.get('host')}:${port}`);
  })
  .catch(console.error);
