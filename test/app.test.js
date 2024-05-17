'use strict';

const assert = require('assert');
const app = require('../src/app');

describe('Feathers application tests', function () {
  before(function (done) {
    this.server = app.listen(3030);
    this.server.once('listening', () => done());
  });

  after(function (done) {
    this.server.close(done);
  });

  it('starts and shows the index page', async function () {
    const res = await fetch('http://localhost:3030')
    const body = await res.text();
    assert.ok((body.indexOf('<title>') !== -1));
  });

  describe('404', function () {
    it('shows a 404 HTML page', async function () {
      const res = await fetch('http://localhost:3030/path/to/nowhere', {
        headers: { 'Accept': 'text/html' }
      });
      assert.equal(res.statusCode, 404);

      const body = await res.text();
      assert.ok(body.indexOf('<html>') !== -1);
    });

    it('shows a 404 JSON error without stack trace', async function () {
      const res = await fetch('http://localhost:3030/path/to/nowhere');
      const body = await res.json();
      assert.equal(res.statusCode, 404);
      assert.equal(body.code, 404);
      assert.equal(body.message, 'Page not found');
      assert.equal(body.name, 'NotFound');     
    });
  });
});
