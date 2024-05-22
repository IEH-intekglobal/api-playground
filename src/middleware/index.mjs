'use strict';

import swagger from './swagger/index.mjs';
import markdownPages from './markdown/index.mjs';

export default function () {
  // Add your custom middleware here. Remember, that
  // just like Express the order matters, so error
  // handling middleware should go last.
  const app = this;

  app.configure(swagger);
  app.configure(markdownPages);
};
